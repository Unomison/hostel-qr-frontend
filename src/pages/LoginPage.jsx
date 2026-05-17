import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import toast from 'react-hot-toast';

// ── Demo credentials data ──────────────────────────────────────────────────
const DEMO_CREDS = [
  {
    role: 'student',
    label: 'Student',
    color: 'text-blue-400',
    dot: 'bg-blue-400',
    email: 'utka230101079@iiitmanipur.ac.in',
    password: 'Utkarsh@hb613',
  },
  {
    role: 'guard',
    label: 'Guard',
    color: 'text-green-400',
    dot: 'bg-green-400',
    email: 'guard@hostel.com',
    password: 'guard123456',
  },
  {
    role: 'admin',
    label: 'Admin',
    color: 'text-purple-400',
    dot: 'bg-purple-400',
    email: 'admin@hostel.com',
    password: 'admin123456',
  },
];

// ── BuildingIcon ───────────────────────────────────────────────────────────
const BuildingIcon = () => (
  <svg
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
    className="w-7 h-7"
  >
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

// ── CopyButton ─────────────────────────────────────────────────────────────
const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = async (e) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      onClick={handleCopy}
      className="ml-1 flex-shrink-0 px-1.5 py-0.5 rounded text-xs
        bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white
        transition-all duration-150 border border-slate-600"
    >
      {copied ? '✓' : 'copy'}
    </button>
  );
};

// ── DemoPanel ──────────────────────────────────────────────────────────────
const DemoPanel = ({ onFill }) => {
  const [open, setOpen] = useState(true);

  return (
    <div
      className={`
        fixed z-50 transition-all duration-300 ease-in-out
        bottom-4 right-4
        sm:bottom-6 sm:right-6
        animate-fadeIn
      `}
      style={{ maxWidth: 'min(92vw, 320px)' }}
    >
      {/* Collapsed toggle button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="ml-auto flex items-center gap-1.5 px-3 py-2 rounded-xl
            bg-slate-800/90 backdrop-blur border border-slate-600
            text-slate-300 text-xs font-medium shadow-lg
            hover:bg-slate-700 transition-all"
        >
          <span className="text-yellow-400">🔑</span> Demo credentials
        </button>
      )}

      {/* Expanded panel */}
      {open && (
        <div
          className="rounded-2xl border border-slate-600/60 shadow-2xl overflow-hidden
            bg-slate-900/80 backdrop-blur-md"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2.5
            bg-slate-800/80 border-b border-slate-700/60">
            <div className="flex items-center gap-2">
              <span className="text-base">🔑</span>
              <span className="text-slate-200 text-sm font-semibold tracking-wide">
                Demo Credentials
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-slate-500 hover:text-slate-300 text-lg leading-none
                transition-colors w-6 h-6 flex items-center justify-center rounded"
            >
              ×
            </button>
          </div>

          {/* Hint */}
          <p className="px-4 pt-2.5 pb-1 text-xs text-slate-500">
            Click a row to auto-fill the login form
          </p>

          {/* Credential rows */}
          <div className="px-3 pb-3 space-y-2">
            {DEMO_CREDS.map((c) => (
              <div
                key={c.role}
                onClick={() => onFill(c)}
                className="rounded-xl border border-slate-700/70 bg-slate-800/60
                  hover:bg-slate-700/70 hover:border-slate-500
                  cursor-pointer transition-all duration-150 p-2.5 group"
              >
                {/* Role label */}
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.dot}`} />
                  <span className={`text-xs font-bold uppercase tracking-wider ${c.color}`}>
                    {c.label}
                  </span>
                  <span className="ml-auto text-xs text-slate-600
                    group-hover:text-slate-400 transition-colors">
                    click to fill →
                  </span>
                </div>

                {/* Email row */}
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-slate-500 text-xs w-14 flex-shrink-0">email</span>
                  <span className="text-slate-300 text-xs font-mono truncate flex-1 min-w-0">
                    {c.email}
                  </span>
                  <CopyButton text={c.email} />
                </div>

                {/* Password row */}
                <div className="flex items-center gap-1">
                  <span className="text-slate-500 text-xs w-14 flex-shrink-0">password</span>
                  <span className="text-slate-300 text-xs font-mono flex-1 min-w-0">
                    {c.password}
                  </span>
                  <CopyButton text={c.password} />
                </div>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div className="px-4 pb-3 pt-0">
            <p className="text-xs text-slate-600 text-center">
              For demo/testing purposes only
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// ── Role config ────────────────────────────────────────────────────────────
const ROLES = [
  {
    key: 'student', label: 'Student',
    activeStyle: { background: '#E6F1FB', borderColor: '#378ADD', color: '#185FA5' },
    btnBg: '#378ADD',
  },
  {
    key: 'guard', label: 'Guard',
    activeStyle: { background: '#EAF3DE', borderColor: '#639922', color: '#3B6D11' },
    btnBg: '#639922',
  },
  {
    key: 'admin', label: 'Admin',
    activeStyle: { background: '#EEEDFE', borderColor: '#7F77DD', color: '#3C3489' },
    btnBg: '#7F77DD',
  },
];

// ── Main LoginPage ─────────────────────────────────────────────────────────
const LoginPage = () => {
  const navigate = useNavigate();
  const { login, user, loading } = useAuth();

  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      if (user.role === 'student') navigate('/student/dashboard', { replace: true });
      else if (user.role === 'guard') navigate('/guard/dashboard', { replace: true });
      else if (user.role === 'admin') navigate('/admin/dashboard', { replace: true });
    }
  }, [user, loading, navigate]);

  // Auto-fill from demo panel click
  const handleFill = (cred) => {
    setRole(cred.role);
    setEmail(cred.email);
    setPassword(cred.password);
    setErrorMsg('');
    toast.success(`${cred.label} credentials filled — press Login`, { duration: 2000 });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password, role });
      const { token, user: userData } = response.data;
      login(userData, token);
      toast.success(`Welcome, ${userData.name}!`);
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed. Please try again.';
      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setErrorMsg('');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ background: 'var(--color-background-tertiary)' }}>
        <div className="w-8 h-8 border-4 border-slate-600 border-t-blue-500
          rounded-full animate-spin" />
      </div>
    );
  }

  const activeRole = ROLES.find(r => r.key === role);

  return (
    <>
      {/* Fade-in keyframe injected once */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
      `}</style>

      <main
        className="min-h-screen flex items-center justify-center p-4"
        style={{ background: 'var(--color-background-tertiary)' }}
      >
        {/* ── Login card ── */}
        <div
          className="animate-fadeIn w-full"
          style={{ maxWidth: 400 }}
        >
          {/* Logo */}
          <div className="text-center mb-7">
            <div
              className="w-13 h-13 rounded-xl flex items-center justify-center
                mx-auto mb-3"
              style={{
                width: 52, height: 52,
                background: 'var(--color-background-info)',
                color: '#185FA5',
              }}
            >
              <BuildingIcon />
            </div>
            <h1 className="text-xl font-medium"
              style={{ color: 'var(--color-text-primary)' }}>
              Hostel QR System
            </h1>
            <p className="text-sm mt-1"
              style={{ color: 'var(--color-text-secondary)' }}>
              Entry-Exit Attendance Management
            </p>
          </div>

          <div
            className="rounded-2xl p-6 shadow-xl"
            style={{
              background: 'var(--color-background-primary)',
              border: '0.5px solid var(--color-border-tertiary)',
            }}
          >
            {/* Role tabs */}
            <p className="text-xs uppercase tracking-widest mb-2"
              style={{ color: 'var(--color-text-tertiary)' }}>
              Login as
            </p>
            <div className="grid grid-cols-3 gap-1.5 mb-5">
              {ROLES.map((r) => (
                <button
                  key={r.key}
                  type="button"
                  onClick={() => handleRoleChange(r.key)}
                  style={
                    role === r.key
                      ? { ...r.activeStyle, border: `0.5px solid ${r.activeStyle.borderColor}` }
                      : {
                          background: 'var(--color-background-secondary)',
                          border: '0.5px solid var(--color-border-secondary)',
                          color: 'var(--color-text-secondary)',
                        }
                  }
                  className="py-2 px-1 rounded-lg text-xs font-medium transition-all duration-150"
                >
                  {r.label}
                </button>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label
                  className="block text-sm mb-1.5"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrorMsg(''); }}
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-2.5 rounded-lg text-sm outline-none
                    transition-all duration-150"
                  style={{
                    background: 'var(--color-background-secondary)',
                    border: errorMsg
                      ? '0.5px solid var(--color-border-danger)'
                      : '0.5px solid var(--color-border-secondary)',
                    color: 'var(--color-text-primary)',
                  }}
                />
              </div>

              <div>
                <label
                  className="block text-sm mb-1.5"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrorMsg(''); }}
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-2.5 rounded-lg text-sm outline-none
                    transition-all duration-150"
                  style={{
                    background: 'var(--color-background-secondary)',
                    border: errorMsg
                      ? '0.5px solid var(--color-border-danger)'
                      : '0.5px solid var(--color-border-secondary)',
                    color: 'var(--color-text-primary)',
                  }}
                />
              </div>

              {/* Inline error */}
              {errorMsg && (
                <div
                  className="flex items-start gap-2 px-4 py-2.5 rounded-lg text-sm"
                  style={{
                    background: 'var(--color-background-danger)',
                    border: '0.5px solid var(--color-border-danger)',
                    color: 'var(--color-text-danger)',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                    className="flex-shrink-0 mt-0.5">
                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M8 5v3.5M8 11h.01" stroke="currentColor"
                      strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 rounded-lg text-sm font-medium text-white
                  transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: activeRole.btnBg }}
              >
                {isLoading
                  ? 'Logging in…'
                  : `Login as ${role.charAt(0).toUpperCase() + role.slice(1)}`}
              </button>
            </form>

            {role === 'student' && (
              <p className="text-center text-sm mt-4"
                style={{ color: 'var(--color-text-secondary)' }}>
                New student?{' '}
                <Link to="/register"
                  style={{ color: 'var(--color-text-info)' }}
                  className="hover:underline">
                  Register here
                </Link>
              </p>
            )}
          </div>
        </div>

        {/* ── Floating demo panel ── */}
        <DemoPanel onFill={handleFill} />
      </main>
    </>
  );
};

export default LoginPage;