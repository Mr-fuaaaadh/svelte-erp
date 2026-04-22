import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";

export default function LoginPage() {
  const { isAuthenticated, login, loginStatus } = useInternetIdentity();
  const navigate = useNavigate();
  const isLoading = loginStatus === "logging-in";

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/dashboard" });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Animated gradient orbs */}
      <OrbBackground />

      {/* Login card */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md mx-4"
        data-ocid="login.card"
      >
        {/* Glassmorphism card */}
        <div className="glass rounded-2xl p-10 shadow-2xl shadow-black/40 border border-white/10">
          {/* Logo & branding */}
          <div className="flex flex-col items-center gap-5 mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 0.15,
                duration: 0.45,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              className="relative"
              data-ocid="login.logo"
            >
              {/* Logo shield */}
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[oklch(0.45_0.22_258)] to-[oklch(0.35_0.28_280)] shadow-lg shadow-[oklch(0.45_0.22_258)]/30 border border-white/20">
                <SchoolLogoSvg />
              </div>
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[oklch(0.55_0.22_258)] to-[oklch(0.4_0.28_280)] blur-xl opacity-30 -z-10 scale-110" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="text-center"
            >
              <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
                AIPSA ERP
              </h1>
              <p className="mt-1.5 text-sm text-muted-foreground leading-snug max-w-xs text-center">
                All India Private School Association
                <br />
                <span className="text-xs opacity-70">
                  School Management Platform
                </span>
              </p>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

          {/* Sign in section */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.4 }}
            className="flex flex-col gap-4"
          >
            <p className="text-center text-sm text-muted-foreground">
              Sign in to access your school management dashboard
            </p>

            <button
              type="button"
              data-ocid="login.submit_button"
              onClick={() => login()}
              disabled={isLoading || isAuthenticated}
              className="
                w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl
                bg-gradient-to-r from-[oklch(0.55_0.22_258)] to-[oklch(0.48_0.25_275)]
                hover:from-[oklch(0.62_0.22_258)] hover:to-[oklch(0.55_0.25_275)]
                text-white font-semibold text-sm tracking-wide
                shadow-lg shadow-[oklch(0.5_0.22_258)]/30
                border border-white/20
                transition-all duration-200
                disabled:opacity-60 disabled:cursor-not-allowed
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.65_0.22_258)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent
              "
            >
              {isLoading ? (
                <>
                  <LoadingSpinner />
                  <span>Authenticating…</span>
                </>
              ) : (
                <>
                  <InternetIdentityIcon />
                  <span>Sign in with Internet Identity</span>
                </>
              )}
            </button>

            {/* Loading state indicator */}
            {isLoading && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                data-ocid="login.loading_state"
                className="text-center text-xs text-muted-foreground"
              >
                Opening Internet Identity window…
              </motion.p>
            )}
          </motion.div>

          {/* Feature badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="mt-8 flex flex-wrap justify-center gap-2"
          >
            {["Multi-School", "GST Billing", "Analytics", "Portals"].map(
              (badge) => (
                <span
                  key={badge}
                  className="px-2.5 py-1 text-xs rounded-full bg-muted text-muted-foreground border border-border/40"
                >
                  {badge}
                </span>
              ),
            )}
          </motion.div>
        </div>

        {/* Footer text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="text-center text-xs text-muted-foreground/60 mt-5 tracking-wide"
          data-ocid="login.footer"
        >
          Powered by Internet Identity • Secure &amp; Password-Free
        </motion.p>
      </motion.div>
    </div>
  );
}

// ── Floating orb background ──────────────────────────────────────────────────

function OrbBackground() {
  return (
    <>
      {/* Deep background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.12_0.02_264)] via-[oklch(0.09_0.01_280)] to-[oklch(0.07_0.005_240)]" />

      {/* Orb 1 — blue-purple */}
      <motion.div
        className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.45 0.22 258 / 0.22) 0%, transparent 70%)",
        }}
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{
          duration: 18,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      {/* Orb 2 — indigo */}
      <motion.div
        className="absolute bottom-[-15%] right-[-10%] w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.4 0.2 280 / 0.18) 0%, transparent 70%)",
        }}
        animate={{ x: [0, -25, 0], y: [0, 20, 0] }}
        transition={{
          duration: 22,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 3,
        }}
      />
      {/* Orb 3 — accent teal */}
      <motion.div
        className="absolute top-[40%] right-[15%] w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.6 0.15 190 / 0.1) 0%, transparent 70%)",
        }}
        animate={{ x: [0, 15, 0], y: [0, -30, 0] }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 7,
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.9 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(0.9 0 0) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
    </>
  );
}

// ── SVG helpers ──────────────────────────────────────────────────────────────

function SchoolLogoSvg() {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      aria-hidden="true"
    >
      {/* Main building */}
      <rect
        x="8"
        y="20"
        width="28"
        height="18"
        rx="1"
        fill="white"
        fillOpacity="0.9"
      />
      {/* Roof / triangle */}
      <polygon points="4,22 22,6 40,22" fill="white" fillOpacity="0.7" />
      {/* Door */}
      <rect
        x="18"
        y="28"
        width="8"
        height="10"
        rx="1"
        fill="white"
        fillOpacity="0.3"
      />
      {/* Flag pole */}
      <line
        x1="22"
        y1="6"
        x2="22"
        y2="2"
        stroke="white"
        strokeWidth="1.5"
        strokeOpacity="0.8"
      />
      {/* Flag */}
      <polygon points="22,2 30,4 22,6" fill="white" fillOpacity="0.8" />
      {/* Windows */}
      <rect
        x="11"
        y="24"
        width="5"
        height="5"
        rx="0.5"
        fill="white"
        fillOpacity="0.4"
      />
      <rect
        x="28"
        y="24"
        width="5"
        height="5"
        rx="0.5"
        fill="white"
        fillOpacity="0.4"
      />
    </svg>
  );
}

function InternetIdentityIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M9 1C9 1 6 5 6 9C6 13 9 17 9 17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M9 1C9 1 12 5 12 9C12 13 9 17 9 17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M1 9H17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M2 5H16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M2 13H16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LoadingSpinner() {
  return (
    <svg
      className="animate-spin"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="8"
        cy="8"
        r="6"
        stroke="currentColor"
        strokeWidth="2"
        strokeOpacity="0.25"
      />
      <path
        d="M8 2A6 6 0 0 1 14 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
