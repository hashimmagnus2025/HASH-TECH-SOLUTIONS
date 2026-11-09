"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const VERTEX_SRC = `
  attribute vec2 aPos;
  void main() {
    gl_Position = vec4(aPos, 0.0, 1.0);
  }
`;

// Domain-warped FBM noise field in the brand's ink/primary/accent palette,
// brightening near the cursor. Noise core is the standard Ashima Arts
// 2D simplex implementation (the most battle-tested GLSL snippet there
// is) — nothing here is experimental math.
const FRAGMENT_SRC = `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;

  vec2 mod289(vec2 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 mod289(vec3 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x){ return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m; m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p){
    float sum = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 5; i++) {
      sum += amp * snoise(p);
      p *= 2.02;
      amp *= 0.5;
    }
    return sum;
  }

  void main(){
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    float aspect = uResolution.x / uResolution.y;
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0) * 3.2;

    vec2 q = vec2(fbm(p + uTime * 0.045), fbm(p + vec2(1.3, 2.1) + uTime * 0.04));
    vec2 r = vec2(
      fbm(p + 1.8 * q + vec2(1.7, 9.2) + uTime * 0.03),
      fbm(p + 1.8 * q + vec2(8.3, 2.8) + uTime * 0.032)
    );
    float field = fbm(p + 1.6 * r);

    vec2 mp = (uMouse - 0.5) * vec2(aspect, 1.0) * 3.2;
    float d = distance(p, mp);
    float glow = smoothstep(1.4, 0.0, d) * 0.65;

    float t = clamp(field * 0.5 + 0.5 + glow, 0.0, 1.0);

    vec3 colInk = vec3(0.0196, 0.0275, 0.0510);
    vec3 colPrimary = vec3(0.1843, 0.3882, 0.8784);
    vec3 colAccent = vec3(0.2157, 0.9020, 0.7686);

    vec3 color = mix(colInk, colPrimary, smoothstep(0.08, 0.62, t));
    color = mix(color, colAccent, smoothstep(0.58, 0.98, t + glow * 0.4));

    float vig = smoothstep(1.15, 0.2, length(uv - 0.5) * 1.3);
    color *= mix(0.5, 1.0, vig);

    gl_FragColor = vec4(color, 1.0);
  }
`;

/**
 * "Signal Field" — the hero's full-bleed background: a custom WebGL
 * fragment shader rendering a slowly evolving, cursor-reactive light
 * field in the brand palette. No objects, no particles-as-attraction —
 * just the field itself, which is the point (HashTech's actual product
 * is invisible: signal, connectivity, uptime).
 *
 * Raw WebGL, deliberately not Three.js/R3F — a single full-screen shader
 * plane doesn't need a scene graph. Pauses when the tab is hidden or the
 * hero scrolls out of view, caps device pixel ratio for mobile GPUs, and
 * renders exactly one static frame under prefers-reduced-motion instead
 * of looping.
 */
const HeroShaderField = forwardRef<HTMLDivElement>(function HeroShaderField(_props, ref) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [supported, setSupported] = useState(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const gl = (canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) {
      setSupported(false);
      return;
    }

    const compile = (type: number, src: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      return shader;
    };

    const vertexShader = compile(gl.VERTEX_SHADER, VERTEX_SRC);
    const fragmentShader = compile(gl.FRAGMENT_SHADER, FRAGMENT_SRC);
    const program = gl.createProgram();
    if (!vertexShader || !fragmentShader || !program) {
      setSupported(false);
      return;
    }
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, "uTime");
    const uResolution = gl.getUniformLocation(program, "uResolution");
    const uMouse = gl.getUniformLocation(program, "uMouse");

    let mouse = [0.5, 0.5];
    let targetMouse = [0.5, 0.5];

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouse = [
        (event.clientX - rect.left) / rect.width,
        1 - (event.clientY - rect.top) / rect.height,
      ];
    };
    container.addEventListener("pointermove", onPointerMove);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1.25 : 2);
      canvas.width = Math.max(1, Math.round(canvas.clientWidth * dpr));
      canvas.height = Math.max(1, Math.round(canvas.clientHeight * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    window.addEventListener("resize", resize);
    resize();

    let raf = 0;
    let visible = true;
    let tabVisible = document.visibilityState === "visible";
    const start = performance.now();

    const frame = (now: number) => {
      mouse = [mouse[0] + (targetMouse[0] - mouse[0]) * 0.08, mouse[1] + (targetMouse[1] - mouse[1]) * 0.08];
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform2f(uMouse, mouse[0], mouse[1]);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      if (!reducedMotion && visible && tabVisible) {
        raf = requestAnimationFrame(frame);
      }
    };
    raf = requestAnimationFrame(frame);

    const onVisibilityChange = () => {
      tabVisible = document.visibilityState === "visible";
      if (tabVisible && visible && !reducedMotion && !raf) {
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    let observer: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          visible = entries[0].isIntersecting;
          if (visible && tabVisible && !reducedMotion && !raf) {
            raf = requestAnimationFrame(frame);
          }
        },
        { threshold: 0.05 }
      );
      observer.observe(container);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      container.removeEventListener("pointermove", onPointerMove);
      observer?.disconnect();
    };
  }, [reducedMotion]);

  return (
    <div
      ref={(node) => {
        containerRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      aria-hidden
      className="absolute inset-0 overflow-hidden"
    >
      {supported ? (
        <canvas ref={canvasRef} className="h-full w-full" />
      ) : (
        <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(47,99,224,0.35),transparent_55%),radial-gradient(circle_at_75%_70%,rgba(55,230,196,0.22),transparent_55%)] bg-ink" />
      )}
    </div>
  );
});

export default HeroShaderField;
