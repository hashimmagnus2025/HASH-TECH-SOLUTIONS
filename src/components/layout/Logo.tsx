import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-fg"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-sm font-bold text-ink">
        H
      </span>
      <span>
        Hash<span className="text-accent">Tech</span>
      </span>
    </Link>
  );
}
