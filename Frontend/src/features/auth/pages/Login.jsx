import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { useSelector } from "react-redux";
import { useAuth } from "../hooks/useAuth";
import clovynLogo from "../../../assets/clovyn-logo.jpg";
import "./auth.animations.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const { handleLogin, clearAuthError } = useAuth();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    clearAuthError();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    await handleLogin({ email, password });
  };

  const handleNavigateToRegister = (e) => {
    e.preventDefault();
    setIsExiting(true);
    setTimeout(() => {
      navigate("/register");
    }, 350);
  };

  return (
    <div className="stitch-auth-container no-scrollbar">
      {/* ── 60% Left Panel: Fashion Marketplace Client & Merchant Login ── */}
      <div
        className={`stitch-form-panel no-scrollbar ${isExiting ? "auth-page-exit" : "auth-page-enter"}`}
      >
        <div className="w-full max-w-[480px] mx-auto flex flex-col justify-center my-auto">
          {/* Editorial Title */}
          <div className="text-center mb-7">
            <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#f7f7f8] font-normal tracking-tight mb-2">
              Welcome Back
            </h1>
            <p className="font-sans-editorial text-xs sm:text-sm text-neutral-400 tracking-subtle max-w-sm mx-auto">
              Sign in to manage your orders, wardrobe wishlist, or merchant
              storefront
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-5 p-3.5 bg-red-950/40 border border-red-500/30 text-red-300 text-xs flex items-center gap-2.5">
              <svg
                className="w-4 h-4 shrink-0 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span className="font-sans-editorial">{error}</span>
            </div>
          )}

          {/* Authentication Form with Ample Breathing Space */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="stitch-input-wrapper">
              <label className="stitch-label">Email Address</label>
              <div className="relative">
                <input
                  type= "text"
                  required
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="shopper@domain.com or merchant@brand.com"
                  className="stitch-input w-full px-4 py-3 text-sm focus:outline-none"
                />
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div className="stitch-input-wrapper">
              <label className="stitch-label">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="stitch-input w-full px-4 py-3 text-sm pr-10 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-[#d4af37] transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Utility Row */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label
                onClick={() => setRememberMe(!rememberMe)}
                className="stitch-checkbox-container flex items-center gap-2.5 cursor-pointer select-none"
              >
                <div
                  className={`stitch-checkbox ${rememberMe ? "active" : ""}`}
                >
                  {rememberMe && (
                    <svg
                      className="w-3 h-3 stroke-[3]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
                <span className="font-sans-editorial text-xs text-neutral-400 hover:text-neutral-300 transition-colors">
                  Remember credentials
                </span>
              </label>

              <a
                href="#forgot-password"
                className="font-sans-editorial text-xs text-[#d4af37] hover:text-[#e5c378] transition-colors"
              >
                Forgot password?
              </a>
            </div>

            {/* Primary Submit CTA */}
            <button
              type="submit"
              disabled={loading}
              className="btn-stitch-primary w-full py-3.5 px-6 flex items-center justify-center gap-2.5 cursor-pointer mt-4"
            >
              {loading ? (
                <span className="stitch-spinner" />
              ) : (
                <>
                  <span>Sign In </span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-5 flex items-center justify-center">
            <div className="w-full border-t border-white/10" />
            <span className="absolute bg-[#0c0c0e] px-4 font-sans-editorial text-[10px] tracking-caps-wide text-neutral-500 uppercase">
              Or Authenticate With
            </span>
          </div>

          {/* Ghost Google OAuth Button */}
          <div>
            <button
              type="button"
              className="btn-stitch-oauth w-full py-3 px-4 flex items-center justify-center gap-3 cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          {/* Navigation to Register */}
          <div className="mt-3 text-center text-xs text-neutral-400">
            <span>New to the Marketplace? </span>
            <Link
              to="/register"
              onClick={handleNavigateToRegister}
              className="text-[#d4af37] hover:text-[#e5c378] font-semibold tracking-wide transition-colors"
            >
              Create a Buyer or Seller Account
            </Link>
          </div>
        </div>
      </div>

      {/* ── 40% Right Panel: Marketplace Brand Showcase & Ecosystem Stories ── */}
      <div className="stitch-editorial-panel no-scrollbar">
        <div className="editorial-fabric-texture" />
        <div className="stitch-grid-lines" />
        <div className="ambient-gold-glow" />

        {/* Top Header Tag */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="editorial-tag-pill">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
            <span>Fashion Marketplace</span>
          </div>
          <span className="font-sans-editorial text-[9.5px] tracking-caps-wide text-neutral-400 uppercase">
            Curated Ecosystem
          </span>
        </div>

        {/* Center: Brand Identity & Dual-Sided Marketplace Story */}
        <div className="relative z-10 flex flex-col items-center text-center my-auto py-6">
          <div className="brand-logo-emblem-frame mb-6">
            <img
              src={clovynLogo}
              alt="Clovyn Marketplace"
              className="w-36 h-36 sm:w-44 sm:h-44 object-cover gold-monogram-ambient"
            />
          </div>

          <span className="font-sans-editorial text-[10px] tracking-ultra-wide uppercase text-[#d4af37] mb-2.5">
            Where Style Meets Commerce
          </span>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#f7f7f8] font-normal tracking-wide mb-3 leading-tight">
            THE FASHION EXCHANGE
          </h2>

          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mb-5" />

          {/* Two-Sided Marketplace Value Propositions */}
          <div className="w-full max-w-sm space-y-3 text-left">
            <div className="marketplace-feature-card p-3.5 border">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs">🛍️</span>
                <span className="font-sans-editorial text-xs font-semibold text-[#f7f7f8] tracking-wider uppercase">
                  For Fashion Shoppers
                </span>
              </div>
              <p className="font-sans-editorial text-[11px] text-neutral-400 leading-relaxed">
                Discover exclusive apparel collections, limited drop runs, and
                verified luxury designers all in one destination.
              </p>
            </div>

            <div className="marketplace-feature-card p-3.5 border">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs">🏷️</span>
                <span className="font-sans-editorial text-xs font-semibold text-[#d4af37] tracking-wider uppercase">
                  For Brand Sellers & Ateliers
                </span>
              </div>
              <p className="font-sans-editorial text-[11px] text-neutral-400 leading-relaxed">
                Showcase your clothing line to thousands of high-intent buyers
                with seamless inventory, order management, and global payouts.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Archival Metadata */}
        <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/[0.08] text-[9.5px] tracking-caps-wide text-neutral-400 uppercase">
          <span>500+ Verified Labels</span>
          <span>100% Authentic Trade</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
