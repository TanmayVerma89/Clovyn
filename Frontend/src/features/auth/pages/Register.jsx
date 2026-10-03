import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useSelector } from "react-redux";
import { useAuth } from "../hooks/useAuth";
import clovynLogo from "../../../assets/clovyn-logo.jpg";
import "./auth.animations.css";

const Register = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSeller, setIsSeller] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [isExiting, setIsExiting] = useState(false);

  const { handleRegister } = useAuth();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError("");

    if (password !== confirmPassword) {
      setValidationError("Passwords do not match");
      return;
    }

    const role = isSeller ? "seller" : "buyer";

    await handleRegister({
      fullname,
      email,
      password,
      contact,
      role,
    });
    console.log("Registration successful");
    navigate("/");
  };

  const handleNavigateToLogin = (e) => {
    e.preventDefault();
    setIsExiting(true);
    setTimeout(() => {
      navigate("/login");
    }, 350);
  };

  const displayError = validationError || error;

  return (
    <div className="stitch-auth-container h-screen max-h-screen overflow-hidden no-scrollbar">
      {/* ── Left Panel: Haute Couture Registration Form ── */}
      <div className={`stitch-form-panel no-scrollbar ${isExiting ? "auth-page-exit" : "auth-page-enter"}`}>
        <div className="w-full max-w-[440px] mx-auto flex flex-col justify-center">
          
          {/* Brand Header */}
          <div className="flex flex-col items-center text-center mb-3">
            <div className="brand-logo-header-thumb mb-1.5 w-8 h-8">
              <img src={clovynLogo} alt="Clovyn Emblem" />
            </div>
            <div className="flex items-center gap-1">
              <span className="font-display-cinzel text-lg text-[#d4af37] font-bold">C</span>
              <span className="font-display-cinzel text-lg text-[#f7f7f8] tracking-ultra-wide font-semibold">
                LOVYN
              </span>
            </div>
            <div className="w-6 h-[1px] bg-[#d4af37]/40 mt-1 mb-0.5" />
            <span className="font-sans-editorial text-[8.5px] tracking-caps-wide uppercase text-neutral-400">
              Private Client Registration
            </span>
          </div>

          {/* Editorial Title */}
          <div className="text-center mb-3">
            <h1 className="font-serif-luxury text-2xl sm:text-3xl text-[#f7f7f8] font-normal tracking-tight mb-1">
              Join the Maison
            </h1>
            <p className="font-sans-editorial text-[11px] text-neutral-400 tracking-subtle">
              Create an exclusive account to explore bespoke collections
            </p>
          </div>

          {/* Error Alert */}
          {displayError && (
            <div className="mb-2.5 p-2 bg-red-950/40 border border-red-500/30 text-red-300 text-[11px] flex items-center gap-2">
              <svg
                className="w-3.5 h-3.5 shrink-0 text-red-400"
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
              <span className="font-sans-editorial">{displayError}</span>
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-2.5">
            {/* Full Name */}
            <div className="stitch-input-wrapper">
              <label className="stitch-label">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  placeholder="Lord Alexander Sterling"
                  className="stitch-input w-full px-3 py-2 text-xs sm:text-sm focus:outline-none"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Email Address & Contact Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="stitch-input-wrapper">
                <label className="stitch-label">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="client@clovyn.com"
                  className="stitch-input w-full px-3 py-2 text-xs sm:text-sm focus:outline-none"
                />
              </div>

              <div className="stitch-input-wrapper">
                <label className="stitch-label">Contact Number</label>
                <input
                  type="tel"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="+1 (555) 019-2834"
                  className="stitch-input w-full px-3 py-2 text-xs sm:text-sm focus:outline-none"
                />
              </div>
            </div>

            {/* Password & Confirm Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="stitch-input-wrapper">
                <label className="stitch-label">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="stitch-input w-full px-3 py-2 text-xs sm:text-sm pr-8 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-[#d4af37] transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
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

              <div className="stitch-input-wrapper">
                <label className="stitch-label">Confirm Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="stitch-input w-full px-3 py-2 text-xs sm:text-sm focus:outline-none"
                />
              </div>
            </div>

            {/* Is Seller Checkbox / Membership Tier */}
            <div className="pt-0.5">
              <label
                onClick={() => setIsSeller(!isSeller)}
                className="stitch-checkbox-container flex items-center gap-2.5 p-2 bg-[#121216] border border-[#222228] hover:border-[#d4af37]/40 cursor-pointer select-none transition-all"
              >
                <div className={`stitch-checkbox ${isSeller ? "active" : ""}`}>
                  {isSeller && (
                    <svg className="w-3 h-3 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="font-sans-editorial text-[11px] font-medium text-[#f7f7f8]">
                    Register as a Merchant / Atelier Partner
                  </span>
                  <span className="font-sans-editorial text-[9.5px] text-neutral-400 leading-tight">
                    Apply to curate and showcase collections on the Clovyn platform
                  </span>
                </div>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-stitch-primary w-full py-2.5 px-5 flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {loading ? (
                <span className="stitch-spinner" />
              ) : (
                <>
                  <span>Create Account</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-3 flex items-center justify-center">
            <div className="w-full border-t border-white/10" />
            <span className="absolute bg-[#0c0c0e] px-3 font-sans-editorial text-[9.5px] tracking-caps-wide text-neutral-500 uppercase">
              Or Authenticate With
            </span>
          </div>

          {/* Ghost Google OAuth Button */}
          <div>
            <button
              type="button"
              className="btn-stitch-oauth w-full py-2 px-3.5 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
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

          {/* Navigation to Login */}
          <div className="mt-3.5 text-center text-xs text-neutral-400">
            <span>Already hold membership? </span>
            <Link
              to="/login"
              onClick={handleNavigateToLogin}
              className="text-[#d4af37] hover:text-[#e5c378] font-semibold tracking-wide transition-colors"
            >
              Sign In
            </Link>
          </div>

        </div>
      </div>

      {/* ── Right Panel: Brand Editorial & Haute Couture Monogram ── */}
      <div className="stitch-editorial-panel no-scrollbar">
        <div className="editorial-fabric-texture" />
        <div className="stitch-grid-lines" />
        <div className="ambient-gold-glow" />

        {/* Top Editorial Bar */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="editorial-tag-pill">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
            <span>VIP Membership</span>
          </div>
          <span className="font-sans-editorial text-[9.5px] tracking-caps-wide text-neutral-400 uppercase">
            Privileges &bull; N&deg; 02
          </span>
        </div>

        {/* Centerpiece: Sculptured Brand Logo & Manifesto */}
        <div className="relative z-10 flex flex-col items-center text-center my-auto py-4">
          <div className="brand-logo-emblem-frame mb-5">
            <img
              src={clovynLogo}
              alt="Clovyn Haute Couture"
              className="w-40 h-40 sm:w-48 sm:h-48 object-cover gold-monogram-ambient"
            />
          </div>

          <span className="font-sans-editorial text-[10px] tracking-ultra-wide uppercase text-[#d4af37] mb-2">
            Bespoke Luxury & Atelier
          </span>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#f7f7f8] font-light tracking-wide mb-2.5 leading-tight">
            YOUR IDENTITY, REFINED
          </h2>

          <div className="w-14 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mb-3" />

          <p className="font-sans-editorial text-xs text-neutral-400 max-w-xs leading-relaxed tracking-subtle">
            Immerse yourself in our private runway archives, priority bespoke drops, and tailored couture recommendations.
          </p>
        </div>

        {/* Bottom Archival Metadata */}
        <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/[0.06] text-[9.5px] tracking-caps-wide text-neutral-400 uppercase">
          <span>Est. 2025 Paris &bull; Milan</span>
          <span>Access Granted to Verified Patrons</span>
        </div>
      </div>
    </div>
  );
};

export default Register;
