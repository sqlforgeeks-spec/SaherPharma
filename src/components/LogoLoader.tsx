import { useEffect, useState } from "react";
import { Logo } from "./Bits";

export function LogoLoader({ onDone }: { onDone: () => void }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setDone(true);
      onDone();
    }, 1800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className={`fixed inset-0 z-[200] grid place-items-center bg-[var(--bg)] ${done ? "loader-fade" : ""}`}>
      <div className="flex flex-col items-center gap-5">
        <div className="logo-load">
          <Logo className="h-20 w-20" />
        </div>
        <div className="font-display text-xl font-bold tracking-tight">
          Saher<span className="gradient-text">Pharma</span>
        </div>
        <div className="line-load h-[2px] rounded-full bg-gradient-to-r from-blue-500 to-sky-400" />
      </div>
    </div>
  );
}
