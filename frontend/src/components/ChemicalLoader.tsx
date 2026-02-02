import { useEffect, useRef, useState } from "react";
import { useTranslation } from "../hooks/useTranslation";

type Props = {
  onLoadComplete: () => void;
  /** total duration in ms (optional) */
  duration?: number;
};

export default function ChemicalLoader({
  onLoadComplete,
  duration = 2500,
}: Props) {
  const { t } = useTranslation();
  const [progress, setProgress] = useState<number>(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  // Easing function (easeOutCubic) for a pleasing finish
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      // if user prefers reduced motion, immediately jump to 100% and finish
      setProgress(100);
      // slight micro-delay to allow UI to settle
      const id = window.setTimeout(onLoadComplete, 120);
      return () => window.clearTimeout(id);
    }

    const step = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const raw = Math.min(1, elapsed / duration);
      const eased = easeOutCubic(raw);
      const newProgress = Math.round(eased * 100);
      setProgress(newProgress);

      if (raw < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        // Completed — give a tiny fade-out buffer, then call onLoadComplete
        rafRef.current = null;
        setTimeout(onLoadComplete, 260);
      }
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      startRef.current = null;
    };
  }, [duration, onLoadComplete]);

  // Bubble generation helper (deterministic-ish — avoids re-rendering location every frame)
  const bubbles = useRef(
    Array.from({ length: 6 }).map((_, i) => ({
      left: 12 + i * 14 + (i % 2 ? 6 : -4),
      size: 4 + (i % 3),
      delay: (i * 260) % 1200,
      duration: 1600 + (i % 3) * 400,
    }))
  ).current;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white"
      aria-hidden={false}
    >
      {/* subtle blurred orbs background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -left-16 -top-10 w-96 h-96 rounded-full opacity-6 blur-3xl animate-slow-rotate"
          aria-hidden
        />
        <div
          className="absolute -right-14 -bottom-12 w-72 h-72 rounded-full opacity-5 blur-2xl animate-slow-rotate-rev"
          aria-hidden
        />
      </div>

      {/* main card */}
      <div
        className="relative z-10 flex flex-col items-center gap-6 px-8 py-10 rounded-2xl bg-black/40 backdrop-blur-sm border border-white/6 shadow-2xl"
        role="status"
        aria-live="polite"
      >
        {/* SVG Flask + Molecule */}
        <div className="relative flex items-center gap-6">
          <svg
            width="120"
            height="150"
            viewBox="0 0 120 150"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            {/* Flask outline */}
            <defs>
              <linearGradient id="liquidGrad" x1="0" x2="0" y1="1" y2="0">
                <stop offset="0%" stopColor="#0ea5e9" stopOpacity="1" />
                <stop offset="60%" stopColor="#06b6d4" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.9" />
              </linearGradient>
              <clipPath id="flaskClip">
                {/* simplified flask shape */}
                <path d="M60 10 v24 a6 6 0 0 1 -6 6 H46 v10 h28 v-10 h-8 a6 6 0 0 1 -6 -6 V10 z M34 50 q0 35 26 60 h0 q26 -25 26 -60 z" />
              </clipPath>
            </defs>

            {/* glass silhouette (subtle stroke) */}
            <path
              d="M60 10 v24 a6 6 0 0 1 -6 6 H46 v10 h28 v-10 h-8 a6 6 0 0 1 -6 -6 V10 z M34 50 q0 35 26 60 h0 q26 -25 26 -60 z"
              stroke="rgba(255,255,255,0.14)"
              strokeWidth="3"
              fill="transparent"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* liquid - height controlled by progress */}
            <g clipPath="url(#flaskClip)">
              <rect
                x="34"
                y={50 + (1 - progress / 100) * 60}
                width="52"
                height={(progress / 100) * 60}
                fill="url(#liquidGrad)"
                style={{ transition: "y 220ms linear, height 220ms linear" }}
              />
              {/* animated small highlight */}
              <rect
                x="38"
                y={50 + (1 - progress / 100) * 60 + 2}
                width="12"
                height={Math.max(6, (progress / 100) * 6)}
                fill="rgba(255,255,255,0.06)"
                rx="3"
                style={{ transition: "y 220ms linear, height 220ms linear" }}
              />
              {/* bubbles (CSS will move them up) */}
              {bubbles.map((b, i) => (
                <circle
                  key={i}
                  className="bubble"
                  cx={34 + b.left}
                  cy={50 + (1 - progress / 100) * 60 + 8 + (i % 2) * 6}
                  r={b.size}
                  fill="rgba(255,255,255,0.12)"
                  style={
                    {
                      // provide custom properties to CSS for each bubble
                      ["--b-left" as any]: b.left + "px",
                      ["--b-delay" as any]: `${b.delay}ms`,
                      ["--b-dur" as any]: `${b.duration}ms`,
                      ["--bubble-rise" as any]: `${Math.max(
                        40,
                        40 + progress / 2
                      )}%`,
                    } as React.CSSProperties
                  }
                />
              ))}
            </g>
          </svg>

          {/* rotating molecule (subtle, creative) */}
          <div
            className="w-28 h-28 flex items-center justify-center"
            aria-hidden
            style={{ transformOrigin: "50% 50%" }}
          >
            <svg viewBox="0 0 64 64" width="64" height="64" fill="none">
              <g
                className="molecule-rotate"
                style={{ transformOrigin: "32px 32px" }}
              >
                <line
                  x1="16"
                  y1="32"
                  x2="32"
                  y2="20"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <line
                  x1="48"
                  y1="32"
                  x2="32"
                  y2="20"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <circle cx="32" cy="20" r="4.2" fill="rgba(255,255,255,0.14)" />
                <circle cx="16" cy="32" r="3.2" fill="rgba(255,255,255,0.09)" />
                <circle cx="48" cy="32" r="3.2" fill="rgba(255,255,255,0.09)" />
                <circle cx="32" cy="44" r="2.8" fill="rgba(255,255,255,0.06)" />
              </g>
            </svg>
          </div>
        </div>

        {/* Progress numeric + textual */}
        <div className="w-full max-w-xs text-center">
          <div className="text-4xl font-light tabular-nums">{progress}%</div>
          <div className="mt-1 text-xs tracking-wider text-blue-200 uppercase">
            {t ? t("loader.text") : "Loading"}
          </div>

          {/* Accessible progress bar */}
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            aria-label={t ? t("loader.progressLabel") : "Loading progress"}
            className="mt-4 h-2 w-full bg-white/6 rounded-full overflow-hidden"
          >
            <div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg,#06b6d4,#60a5fa)",
                transition: "width 160ms linear",
                boxShadow: "0 0 18px rgba(34,197,94,0.06)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Inline styles for custom animations - keep small and scoped */}
      <style>{`
        /* slow rotations */
        @keyframes slow-rot {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes slow-rot-rev {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }

        .animate-slow-rotate {
          animation: slow-rot 30s linear infinite;
          background: radial-gradient(circle at 30% 30%, rgba(6,182,212,0.09), transparent 25%), radial-gradient(circle at 70% 70%, rgba(96,165,250,0.06), transparent 20%);
        }

        .animate-slow-rotate-rev {
          animation: slow-rot-rev 42s linear infinite;
          background: radial-gradient(circle at 40% 60%, rgba(96,165,250,0.05), transparent 20%);
        }

        .molecule-rotate {
          animation: slow-rot 18s linear infinite;
          transform-origin: center;
          opacity: 0.95;
        }

        /* bubbles: they rise inside the liquid; use CSS custom props set inline for per-bubble variance */
        @keyframes bubble-rise {
          0% { transform: translateY(0) scale(0.88); opacity: 0.92; }
          50% { transform: translateY(-30%) scale(1); opacity: 0.8; }
          100% { transform: translateY(-100%) scale(1.08); opacity: 0; }
        }
        .bubble {
          transform-origin: center;
          animation-name: bubble-rise;
          animation-iteration-count: infinite;
          animation-timing-function: cubic-bezier(.2,.9,.2,1);
          animation-duration: var(--b-dur, 1600ms);
          animation-delay: var(--b-delay, 0ms);
        }

        /* reduce motion: remove animations */
        @media (prefers-reduced-motion: reduce) {
          .animate-slow-rotate, .animate-slow-rotate-rev, .molecule-rotate, .bubble {
            animation: none !important;
          }
          .bubble { opacity: 1; transform: translateY(0) !important; }
        }

        /* small responsive tweaks */
        @media (max-width: 420px) {
          .relative.z-10 { padding: 16px; }
        }
      `}</style>
    </div>
  );
}
