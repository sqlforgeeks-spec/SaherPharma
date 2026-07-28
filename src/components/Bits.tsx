import { useEffect, useRef, useState } from "react";

/* ---------- Scroll progress ---------- */
export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const s = document.documentElement.scrollTop;
      const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setP(h > 0 ? (s / h) * 100 : 0);
    };
    window.addEventListener("scroll", on, { passive: true });
    on();
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div className="fixed left-0 top-0 z-[60] h-[2px] w-full bg-transparent">
      <div className="h-full bg-gradient-to-r from-teal-600 via-teal-400 to-teal-500 transition-[width] duration-75" style={{ width: p + "%" }} />
    </div>
  );
}

/* ---------- Back to top ---------- */
export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`fixed bottom-5 left-5 z-40 grid h-11 w-11 place-items-center rounded-full bg-white dark:bg-slate-800 shadow-lg shadow-black/10 border border-[var(--border)] text-[var(--muted)] transition-all duration-300 hover:border-teal-400/50 hover:text-teal-600 dark:hover:text-teal-400 ${
        show ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0 pointer-events-none"
      }`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}

/* ---------- Subtle particle background ---------- */
export function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!;
    const c = canvas.getContext("2d")!;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const N = Math.min(35, Math.floor(w / 38));
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.2 + 0.4,
    }));
    let raf = 0;
    const draw = () => {
      c.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        c.beginPath();
        c.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        c.fillStyle = "rgba(13,148,136,0.25)";
        c.fill();
      }
      for (let i = 0; i < N; i++)
        for (let j = i + 1; j < N; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.hypot(dx, dy);
          if (d < 130) {
            c.beginPath();
            c.moveTo(pts[i].x, pts[i].y);
            c.lineTo(pts[j].x, pts[j].y);
            c.strokeStyle = `rgba(13,148,136,${0.06 * (1 - d / 130)})`;
            c.lineWidth = 0.5;
            c.stroke();
          }
        }
      raf = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={ref} className="pointer-events-none fixed inset-0 -z-10 opacity-50" aria-hidden />;
}

/**
 * SaherPharma Logo — teal palette
 */
export function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="SaherPharma"
    >
      <defs>
        <linearGradient id="sp-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0f766e" />
          <stop offset="100%" stopColor="#0d9488" />
        </linearGradient>
      </defs>

      {/* Badge background */}
      <rect width="40" height="40" rx="11" fill="url(#sp-bg)" />

      {/* Globe outline */}
      <circle cx="18" cy="20" r="9.5" stroke="white" strokeWidth="1.5" strokeOpacity="0.9" fill="none" />

      {/* Horizontal equator */}
      <ellipse cx="18" cy="20" rx="9.5" ry="3.5" stroke="white" strokeWidth="1.2" strokeOpacity="0.6" fill="none" />

      {/* Vertical meridian */}
      <ellipse cx="18" cy="20" rx="3.5" ry="9.5" stroke="white" strokeWidth="1.2" strokeOpacity="0.6" fill="none" />

      {/* Export arrow */}
      <polyline
        points="27,8 33,8 33,14"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="26" y1="15"
        x2="33" y2="8"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 dark:border-teal-800/60 bg-teal-50 dark:bg-teal-900/20 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-300">
      <span className="h-1.5 w-1.5 rounded-full bg-teal-500 dark:bg-teal-400 shadow-[0_0_8px_2px_rgba(13,148,136,0.7)]" />
      {children}
    </span>
  );
}

/* ---------- Minimal ripple button ---------- */
export function RippleButton({
  children, className = "", as = "button", href, onClick, ...rest
}: {
  children: React.ReactNode; className?: string; as?: "button" | "a"; href?: string; onClick?: (e: any) => void;
  [k: string]: any;
}) {
  const handle = (e: React.MouseEvent) => onClick?.(e);
  if (as === "a") {
    return (
      <a href={href} className={`transition ${className}`} onClick={handle} {...rest}>{children}</a>
    );
  }
  return (
    <button type="button" className={`transition ${className}`} onClick={handle} {...rest}>
      {children}
    </button>
  );
}
