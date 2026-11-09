/**
 * lucide-react no longer ships brand/social glyphs, so the handful this
 * site needs are defined here as minimal inline SVGs — same `className`
 * contract as a lucide icon component, so they drop into IconBox/IconButton
 * without any special-casing.
 */

export function FacebookIcon({
  className
}) {
  return <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M13.5 21v-7.2h2.4l.45-2.8h-2.85V9.3c0-.77.21-1.3 1.32-1.3h1.4V5.5c-.24-.03-1.08-.1-2.06-.1-2.04 0-3.44 1.24-3.44 3.53v2.08H8.4v2.8h2.32V21h2.78z" />
    </svg>;
}
export function InstagramIcon({
  className
}) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className} aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="16.9" cy="7.1" r="0.9" fill="currentColor" stroke="none" />
    </svg>;
}
export function LinkedinIcon({
  className
}) {
  return <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M4.98 3.5a2.48 2.48 0 1 0 0 4.96 2.48 2.48 0 0 0 0-4.96zM3.2 9.9h3.56V21H3.2zM10.2 9.9h3.4v1.52h.05c.47-.9 1.63-1.85 3.35-1.85 3.58 0 4.24 2.36 4.24 5.43V21h-3.56v-5.45c0-1.3-.02-2.98-1.82-2.98-1.82 0-2.1 1.42-2.1 2.88V21H10.2z" />
    </svg>;
}
export function XIcon({
  className
}) {
  return <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M4 3.5h4.2l4 5.4 4.4-5.4h2.9l-6 7.3 6.4 8.7h-4.2l-4.3-5.8-4.7 5.8H3.4l6.3-7.7z" />
    </svg>;
}
export function WhatsAppIcon({
  className
}) {
  return <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2.5A9.5 9.5 0 0 0 3.8 17L2.5 21.5l4.6-1.3A9.5 9.5 0 1 0 12 2.5zm0 1.8a7.7 7.7 0 1 1 0 15.4 7.6 7.6 0 0 1-3.9-1.1l-.3-.17-2.6.74.75-2.5-.18-.3A7.7 7.7 0 0 1 12 4.3zm4.3 9.9c-.23-.12-1.37-.68-1.58-.76-.21-.08-.37-.12-.52.12-.16.23-.6.76-.74.92-.14.15-.27.17-.5.06-1.37-.68-2.27-1.22-3.18-2.76-.24-.42.24-.39.69-1.29.08-.15.04-.28-.03-.4-.08-.12-.6-1.45-.82-1.98-.22-.52-.44-.45-.6-.46h-.52c-.17 0-.44.06-.68.32-.23.26-.9.88-.9 2.13 0 1.26.92 2.48 1.05 2.65.13.17 1.78 2.72 4.31 3.71 2.14.84 2.14.56 2.52.52.38-.04 1.37-.56 1.56-1.1.19-.54.19-1 .13-1.1-.06-.1-.22-.16-.45-.28z" />
    </svg>;
}
