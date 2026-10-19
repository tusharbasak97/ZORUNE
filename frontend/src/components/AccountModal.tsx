import React, { useState, useEffect } from 'react';
import { 
  X, 
  User, 
  Mail, 
  Lock, 
  Phone, 
  CheckCircle2, 
  LogOut, 
  Sparkles, 
  Package, 
  Truck, 
  ShieldCheck, 
  Clock,
  ArrowRight
} from 'lucide-react';

export interface UserAccount {
  fullName: string;
  email: string;
  phone?: string;
  tier?: string;
  memberSince?: string;
}

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserAccount | null;
  onLogin: (user: UserAccount) => void;
  onLogout: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  user,
  onLogin,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<'signin' | 'register'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if ((window as any).lenis) (window as any).lenis.stop();
    } else {
      document.body.style.overflow = '';
      if ((window as any).lenis) (window as any).lenis.start();
    }
    return () => {
      document.body.style.overflow = '';
      if ((window as any).lenis) (window as any).lenis.start();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage({ text: 'Please enter both email and password.', type: 'error' });
      return;
    }
    const loggedInUser: UserAccount = {
      fullName: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email,
      phone: '+91 9820123456',
      tier: '30% Extrait Patron',
      memberSince: 'October 2026'
    };
    onLogin(loggedInUser);
    setMessage({ text: 'Welcome back to ZORUNE.', type: 'success' });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      setMessage({ text: 'Please complete all required fields.', type: 'error' });
      return;
    }
    const newUser: UserAccount = {
      fullName,
      email,
      phone: phone || '+91 9876543210',
      tier: 'Registered Connoisseur',
      memberSince: 'October 2026'
    };
    onLogin(newUser);
    setMessage({ text: 'Account created successfully! Welcome to ZORUNE.', type: 'success' });
  };

  const handleQuickDemoLogin = () => {
    onLogin({
      fullName: 'Arnaud Valmont',
      email: 'arnaud.valmont@zorune.com',
      phone: '+91 9820123456',
      tier: 'VIP Connoisseur & Maitre Patron',
      memberSince: 'September 2026'
    });
    setMessage(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Dialog */}
      <div 
        data-lenis-prevent
        className="relative w-full max-w-lg bg-white rounded-3xl border border-[oklch(0.926_0.01_81.8)] shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[oklch(0.926_0.01_81.8)] flex items-center justify-between bg-[oklch(0.98_0.005_78.3)]">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-[oklch(0.179_0.004_286)] flex items-center justify-center text-white">
              <User className="w-4 h-4 text-[oklch(0.683_0.102_82.6)]" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-[oklch(0.179_0.004_286)] leading-tight">
                {user ? 'Patron Account' : 'Patron Authentication'}
              </h2>
              <p className="text-[10px] text-[oklch(0.552_0.014_286)] uppercase tracking-wider font-semibold">
                Haute Parfumerie Private Desk
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[oklch(0.552_0.014_286)] hover:text-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.959_0.01_87.5)] transition-colors cursor-pointer"
            aria-label="Close Account Modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {message && (
            <div className={`p-3 rounded-xl text-xs flex items-center space-x-2 ${
              message.type === 'success' 
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{message.text}</span>
            </div>
          )}

          {user ? (
            /* ─── LOGGED IN PATRON VIEW ─── */
            <div className="space-y-6">
              {/* Patron Profile Badge */}
              <div className="p-4 rounded-2xl bg-[oklch(0.98_0.005_78.3)] border border-[oklch(0.926_0.01_81.8)]">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[oklch(0.179_0.004_286)] text-[oklch(0.683_0.102_82.6)] mb-2">
                      <Sparkles className="w-3 h-3" />
                      <span>{user.tier || '30% Extrait Patron'}</span>
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[oklch(0.179_0.004_286)]">
                      {user.fullName}
                    </h3>
                    <p className="text-xs text-[oklch(0.442_0.015_286)] mt-0.5">
                      {user.email}
                    </p>
                    {user.phone && (
                      <p className="text-xs text-[oklch(0.552_0.014_286)] mt-0.5">
                        {user.phone}
                      </p>
                    )}
                  </div>
                  <span className="text-[10px] text-[oklch(0.552_0.014_286)] font-semibold">
                    Since {user.memberSince || '2026'}
                  </span>
                </div>
              </div>

              {/* Patron Privileges */}
              <div className="p-4 rounded-2xl bg-[oklch(0.977_0.013_86.8)] border border-[oklch(0.926_0.01_81.8)] text-xs space-y-2">
                <div className="flex items-center space-x-2 font-bold text-[oklch(0.179_0.004_286)]">
                  <ShieldCheck className="w-4 h-4 text-[oklch(0.683_0.102_82.6)]" />
                  <span>Patron Quality & Transit Guarantee</span>
                </div>
                <p className="text-[oklch(0.442_0.015_286)] leading-relaxed">
                  Complimentary batch exchange within 7 days if maceration bouquet does not meet our rigorous 30% Elixir concentration standards.
                </p>
              </div>

              {/* Recent Orders */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[oklch(0.552_0.014_286)] mb-3 flex items-center space-x-1.5">
                  <Package className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
                  <span>Flacon Dispatch Archive</span>
                </h4>
                <div className="space-y-2.5">
                  <div className="p-3.5 rounded-xl border border-[oklch(0.926_0.01_81.8)] bg-white text-xs">
                    <div className="flex items-center justify-between font-semibold text-[oklch(0.179_0.004_286)]">
                      <span>Order #ZR-383628</span>
                      <span className="text-emerald-700 font-bold flex items-center space-x-1">
                        <Truck className="w-3 h-3" />
                        <span>In Dispatch Transit</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-[oklch(0.552_0.014_286)] mt-1">
                      <span>1 × Yuzu Kōdō (50ml Refillable PCR Flacon)</span>
                      <span>€205 / ₹18,500 (Prepaid Order)</span>
                    </div>
                    <p className="text-[10px] text-[oklch(0.442_0.015_286)] mt-2 pt-2 border-t border-[oklch(0.959_0.01_87.5)]">
                      Estimated Metro Air Arrival: <strong>Today by 9:00 PM</strong> (AWB: ZR-EXP-23342064)
                    </p>
                  </div>
                </div>
              </div>

              {/* Sign Out Button */}
              <div className="pt-2 border-t border-[oklch(0.926_0.01_81.8)] flex justify-between items-center">
                <span className="text-xs text-[oklch(0.552_0.014_286)]">
                  Active session encrypted
                </span>
                <button
                  onClick={() => {
                    onLogout();
                    setMessage({ text: 'You have been signed out.', type: 'success' });
                  }}
                  className="px-4 py-2 rounded-full border border-red-200 text-red-700 hover:bg-red-50 text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          ) : (
            /* ─── UNAUTHENTICATED GUEST AUTH VIEW ─── */
            <div className="space-y-5">
              {/* Tabs */}
              <div className="grid grid-cols-2 p-1 rounded-xl bg-[oklch(0.959_0.01_87.5)] text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('signin');
                    setMessage(null);
                  }}
                  className={`py-2 rounded-lg transition-all cursor-pointer ${
                    activeTab === 'signin'
                      ? 'bg-white text-[oklch(0.179_0.004_286)] shadow-xs font-bold'
                      : 'text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)]'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('register');
                    setMessage(null);
                  }}
                  className={`py-2 rounded-lg transition-all cursor-pointer ${
                    activeTab === 'register'
                      ? 'bg-white text-[oklch(0.179_0.004_286)] shadow-xs font-bold'
                      : 'text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)]'
                  }`}
                >
                  Create Account
                </button>
              </div>

              {activeTab === 'signin' ? (
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div>
                    <label htmlFor="signin-email" className="block text-[11px] font-bold uppercase tracking-wider text-[oklch(0.442_0.015_286)] mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[oklch(0.552_0.014_286)]" />
                      <input
                        id="signin-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="patron@domain.com"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[oklch(0.926_0.01_81.8)] text-xs text-[oklch(0.179_0.004_286)] focus:outline-hidden focus:border-[oklch(0.683_0.102_82.6)] transition-all bg-[oklch(0.98_0.005_78.3)]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="signin-password" className="block text-[11px] font-bold uppercase tracking-wider text-[oklch(0.442_0.015_286)] mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[oklch(0.552_0.014_286)]" />
                      <input
                        id="signin-password"
                        name="password"
                        type="password"
                        required
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[oklch(0.926_0.01_81.8)] text-xs text-[oklch(0.179_0.004_286)] focus:outline-hidden focus:border-[oklch(0.683_0.102_82.6)] transition-all bg-[oklch(0.98_0.005_78.3)]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.262_0.007_286)] text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg"
                  >
                    Sign In to Patron Desk
                  </button>
                </form>
              ) : (
                <form onSubmit={handleRegister} className="space-y-3.5">
                  <div>
                    <label htmlFor="register-fullname" className="block text-[11px] font-bold uppercase tracking-wider text-[oklch(0.442_0.015_286)] mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[oklch(0.552_0.014_286)]" />
                      <input
                        id="register-fullname"
                        name="fullName"
                        type="text"
                        required
                        autoComplete="name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Tushar Basak"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[oklch(0.926_0.01_81.8)] text-xs text-[oklch(0.179_0.004_286)] focus:outline-hidden focus:border-[oklch(0.683_0.102_82.6)] transition-all bg-[oklch(0.98_0.005_78.3)]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="register-email" className="block text-[11px] font-bold uppercase tracking-wider text-[oklch(0.442_0.015_286)] mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[oklch(0.552_0.014_286)]" />
                      <input
                        id="register-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="connoisseur@domain.com"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[oklch(0.926_0.01_81.8)] text-xs text-[oklch(0.179_0.004_286)] focus:outline-hidden focus:border-[oklch(0.683_0.102_82.6)] transition-all bg-[oklch(0.98_0.005_78.3)]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="register-phone" className="block text-[11px] font-bold uppercase tracking-wider text-[oklch(0.442_0.015_286)] mb-1">
                      Mobile Number (For WhatsApp Track)
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[oklch(0.552_0.014_286)]" />
                      <input
                        id="register-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 9820123456"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[oklch(0.926_0.01_81.8)] text-xs text-[oklch(0.179_0.004_286)] focus:outline-hidden focus:border-[oklch(0.683_0.102_82.6)] transition-all bg-[oklch(0.98_0.005_78.3)]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="register-password" className="block text-[11px] font-bold uppercase tracking-wider text-[oklch(0.442_0.015_286)] mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[oklch(0.552_0.014_286)]" />
                      <input
                        id="register-password"
                        name="password"
                        type="password"
                        required
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[oklch(0.926_0.01_81.8)] text-xs text-[oklch(0.179_0.004_286)] focus:outline-hidden focus:border-[oklch(0.683_0.102_82.6)] transition-all bg-[oklch(0.98_0.005_78.3)]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.262_0.007_286)] text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg"
                  >
                    Register as Patron
                  </button>
                </form>
              )}

              {/* Demo 1-Click Access for Instant Evaluation */}
              <div className="pt-3 border-t border-[oklch(0.926_0.01_81.8)]">
                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  className="w-full py-2.5 px-3 rounded-xl bg-[oklch(0.977_0.013_86.8)] hover:bg-[oklch(0.959_0.01_87.5)] text-[oklch(0.683_0.102_82.6)] hover:text-[oklch(0.588_0.096_80.7)] border border-[oklch(0.926_0.01_81.8)] text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Instant 1-Click VIP Patron Preview</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
