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
      <div className="h-full bg-gradient-to-r from-blue-500 via-sky-400 to-blue-600 transition-[width] duration-75" style={{ width: p + "%" }} />
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
      className={`fixed bottom-5 left-5 z-40 grid h-11 w-11 place-items-center rounded-full glass transition-all duration-300 hover:border-blue-400/40 ${
        show ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0 pointer-events-none"
      }`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}

/* ---------- Particle background canvas ---------- */
export function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!;
    const c = canvas.getContext("2d")!;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const N = Math.min(50, Math.floor(w / 28));
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.4 + 0.4,
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
        c.fillStyle = "rgba(96,165,250,0.4)";
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
            c.strokeStyle = `rgba(59,130,246,${0.08 * (1 - d / 130)})`;
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
  return <canvas ref={ref} className="pointer-events-none fixed inset-0 -z-10 opacity-60" aria-hidden />;
}

/* ---------- Logo mark ---------- */
export function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden>
      <defs>
        <linearGradient id="sp-lg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1e3a8a" />
          <stop offset="1" stopColor="#2563eb" />
        </linearGradient>
        <clipPath id="sp-clip">
          <circle cx="24" cy="24" r="20" />
        </clipPath>
      </defs>
      {/* Filled globe circle */}
      <circle cx="24" cy="24" r="22" fill="url(#sp-lg)" />
      {/* Subtle globe grid lines */}
      <g clipPath="url(#sp-clip)" stroke="white" fill="none" strokeWidth="1.2" opacity="0.45">
        {/* Equator ellipse */}
        <ellipse cx="24" cy="24" rx="20" ry="7.5" />
        {/* Central meridian */}
        <line x1="24" y1="4" x2="24" y2="44" />
        {/* Upper & lower latitudes */}
        <line x1="4" y1="16" x2="44" y2="16" />
        <line x1="4" y1="32" x2="44" y2="32" />
      </g>
      {/* Bold pharmaceutical cross in white */}
      <path d="M18 24h12M24 18v12" stroke="white" strokeWidth="3.2" strokeLinecap="round" />
      {/* Outer ring for depth */}
      <circle cx="24" cy="24" r="22" stroke="rgba(255,255,255,0.18)" strokeWidth="1" fill="none" />
    </svg>
  );
}

export function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300">
      <span className="h-1.5 w-1.5 rounded-full bg-blue-500 dark:bg-blue-400 shadow-[0_0_8px_2px_rgba(59,130,246,0.8)]" />
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
