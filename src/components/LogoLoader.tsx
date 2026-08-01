import { useEffect, useState } from "react";
import { Logo } from "./Bits";

export function LogoLoader({ onDone }: { onDone: () => void }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setDone(true);
      onDone();
    }, 2000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className={`fixed inset-0 z-[200] grid place-items-center bg-white dark:bg-[#080d18] ${done ? "loader-fade" : ""}`}>
      <div className="flex flex-col items-center gap-4">
        <div className="logo-load">
          <Logo className="h-20 w-20" />
        </div>

        <div className="flex flex-col items-center gap-1 text-center">
          <div className="font-display text-2xl font-bold tracking-tight text-[var(--text)]">
            Saher<span className="gradient-text">Pharma</span>
          </div>
          <p className="text-sm font-semibold text-muted tracking-wide">
            Global Pharma Exports
          </p>
          <p className="text-[11px] text-muted/60 tracking-widest uppercase mt-0.5">
            B2B Exports · Serving 25+ Countries
          </p>
        </div>

        <div className="line-load h-[2px] w-32 rounded-full bg-gradient-to-r from-teal-600 to-teal-400" />
      </div>
    </div>
  );
}
