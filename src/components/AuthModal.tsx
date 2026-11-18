import React, { useState } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
  onLoginSuccess: (user: { name: string; email: string; role: string; avatar: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  onLoginSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [agreedTerms, setAgreedTerms] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  
  // Status states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [forgotPasswordSent, setForgotPasswordSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (mode === 'signup' && password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const userName = fullName.trim() || email.split('@')[0] || 'Commander';
      onLoginSuccess({
        name: userName,
        email: email || 'commander@ascend.io',
        role: mode === 'signup' ? 'New Member • Kinetic Pro' : 'Lead Architect • Kinetic Pro',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      });
      onClose();
    }, 600);
  };

  const handleGoogleSSO = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess({
        name: 'Alex Vance',
        email: 'alex.vance@ascend.io',
        role: 'Commander • Ascend Pro',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      });
      onClose();
    }, 500);
  };

  const handleDemoLogin = (roleName: string, name: string, userEmail: string) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess({
        name,
        email: userEmail,
        role: `${roleName} • Kinetic Pro`,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      });
      onClose();
    }, 400);
  };

  const handleForgotPassword = () => {
    if (!email) {
      setErrorMessage('Please enter your email address to reset password');
      return;
    }
    setErrorMessage('');
    setForgotPasswordSent(true);
    setTimeout(() => {
      setForgotPasswordSent(false);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#051424]/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#051424] sm:bg-surface-container rounded-3xl border border-white/10 p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col gap-5 max-h-[92vh] overflow-y-auto no-scrollbar">
        {/* Kinetic Ambient Glow */}
        <div className="absolute -right-12 -top-12 w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-40 h-40 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top Bar with Brand & Close */}
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-primary-container flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-on-primary-container text-[20px]">
                bolt
              </span>
            </div>
            <span className="font-extrabold text-base text-on-surface tracking-tight">Ascend</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-on-surface-variant hover:text-on-surface hover:bg-white/10 rounded-full transition-colors"
            title="Close"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Header Title */}
        <div className="flex flex-col gap-1 relative z-10">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary">
            {mode === 'login' ? 'Kinetic Authentication' : 'Momentum Entry'}
          </span>
          <h2 className="text-2xl font-bold text-on-surface">
            {mode === 'login' ? 'Welcome Back' : 'Create Your Account'}
          </h2>
          <p className="text-xs text-on-surface-variant">
            {mode === 'login'
              ? 'Access your high-performance workspace and focus metrics.'
              : 'Join the next generation of precision workflows and momentum tracking.'}
          </p>
        </div>

        {/* Google SSO Button */}
        <button
          type="button"
          onClick={handleGoogleSSO}
          disabled={isSubmitting}
          className="relative z-10 flex items-center justify-center gap-3 w-full h-12 rounded-xl bg-surface-container-high hover:bg-surface-container-highest border border-white/10 transition-all font-semibold text-xs text-on-surface active:scale-[0.98] shadow-md"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          <span>
            {mode === 'login' ? 'Continue with Google' : 'Sign up with Google'}
          </span>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="h-[1px] flex-1 bg-white/10" />
          <span className="text-[10px] font-bold text-outline uppercase tracking-wider">
            OR WITH EMAIL
          </span>
          <div className="h-[1px] flex-1 bg-white/10" />
        </div>

        {/* Error / Success Notifications */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-error/15 border border-error/30 text-error text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">error</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {forgotPasswordSent && (
          <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">mark_email_read</span>
            <span>Password reset instructions sent to your email.</span>
          </div>
        )}

        {/* Form Fields */}
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-3.5 relative z-10">
          {mode === 'signup' && (
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-on-surface-variant">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Commander Vance"
                  className="w-full h-11 bg-surface-container-high border border-white/5 rounded-xl px-3.5 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary-container transition-all"
                />
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-on-surface-variant">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex.vance@ascend.io"
              className="w-full h-11 bg-surface-container-high border border-white/5 rounded-xl px-3.5 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary-container transition-all"
            />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-on-surface-variant">
                Password
              </label>
              {mode === 'login' && (
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-[11px] font-semibold text-primary hover:underline"
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div className="relative flex items-center">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-11 bg-surface-container-high border border-white/5 rounded-xl pl-3.5 pr-10 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary-container transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {mode === 'signup' && (
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-on-surface-variant">
                Confirm Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-11 bg-surface-container-high border border-white/5 rounded-xl px-3.5 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary-container transition-all"
              />
            </div>
          )}

          {/* Checkboxes */}
          {mode === 'login' ? (
            <label className="flex items-center gap-2 cursor-pointer text-xs text-on-surface-variant pt-1">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded bg-surface-container-highest accent-primary"
              />
              <span>Remember this device for 30 days</span>
            </label>
          ) : (
            <label className="flex items-center gap-2 cursor-pointer text-xs text-on-surface-variant pt-1">
              <input
                type="checkbox"
                required
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                className="rounded bg-surface-container-highest accent-primary"
              />
              <span>I agree to the Terms of Service & Privacy Policy</span>
            </label>
          )}

          {/* Primary Action Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 mt-2 rounded-xl bg-primary-container text-on-primary-container font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:scale-[1.01] active:scale-95 transition-all"
          >
            {isSubmitting ? (
              <span className="animate-pulse">Authenticating...</span>
            ) : (
              <>
                <span>{mode === 'login' ? 'Sign In to Workspace' : 'Create Account'}</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </>
            )}
          </button>
        </form>

        {/* Quick Demo Credentials */}
        <div className="flex flex-col gap-2 pt-2 border-t border-white/5 relative z-10">
          <span className="text-[10px] font-bold text-outline uppercase tracking-wider text-center">
            Or test with one-click demo profiles
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin('Commander', 'Alex Vance', 'alex.vance@ascend.io')}
              className="py-2 px-3 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-[11px] font-bold text-primary flex items-center justify-center gap-1.5 border border-white/5 transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">military_tech</span>
              <span>Alex Vance</span>
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('Architect', 'Sarah Jenkins', 'sarah.j@ascend.io')}
              className="py-2 px-3 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-[11px] font-bold text-primary flex items-center justify-center gap-1.5 border border-white/5 transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">engineering</span>
              <span>Sarah Jenkins</span>
            </button>
          </div>
        </div>

        {/* Mode Switcher Footer */}
        <div className="text-center pt-2 relative z-10">
          {mode === 'login' ? (
            <p className="text-xs text-on-surface-variant">
              Don&apos;t have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setErrorMessage('');
                }}
                className="font-bold text-primary hover:underline ml-1"
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p className="text-xs text-on-surface-variant">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setErrorMessage('');
                }}
                className="font-bold text-primary hover:underline ml-1"
              >
                Log In
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
