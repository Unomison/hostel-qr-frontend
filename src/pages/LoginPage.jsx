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
    <>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .demo-panel-anim { animation: fadeInUp 0.4s ease-out forwards; }
      `}</style>

      <div
        className="fixed z-50 bottom-4 right-4 sm:bottom-6 sm:right-6 demo-panel-anim"
        style={{ maxWidth: 'min(92vw, 320px)' }}
      >
        {/* Collapsed button */}
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
          <div className="rounded-2xl border border-slate-600/60 shadow-2xl overflow-hidden
            bg-slate-900/80 backdrop-blur-md">

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
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-slate-500 text-xs w-14 flex-shrink-0">email</span>
                    <span className="text-slate-300 text-xs font-mono truncate flex-1 min-w-0">
                      {c.email}
                    </span>
                    <CopyButton text={c.email} />
                  </div>
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

            <div className="px-4 pb-3 pt-0">
              <p className="text-xs text-slate-600 text-center">
               Login as student->laptop/mobile & as Guard->other SmartPhone.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

// ── Main LoginPage — original UI preserved exactly ─────────────────────────
const LoginPage = () => {
  const navigate = useNavigate();
  const { login, user, loading } = useAuth();

  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      if (user.role === 'student') navigate('/student/dashboard', { replace: true });
      else if (user.role === 'guard') navigate('/guard/dashboard', { replace: true });
      else if (user.role === 'admin') navigate('/admin/dashboard', { replace: true });
    }
  }, [user, loading, navigate]);

  // Called when recruiter clicks a demo credential row
  const handleFill = (cred) => {
    setRole(cred.role);
    setEmail(cred.email);
    setPassword(cred.password);
    toast.success(`${cred.label} credentials filled — press Login`, { duration: 2000 });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password, role });
      const { token, user: userData } = response.data;
      login(userData, token);
      toast.success(`Welcome, ${userData.name}!`);
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed. Try again.';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-slate-600 border-t-blue-500
          rounded-full animate-spin"></div>
      </div>
    );
  }

  // ── Exact original role config ──────────────────────────────────────────
  const roles = [
    { key: 'student', label: '👨‍🎓 Student', active: 'bg-blue-600', ring: 'ring-blue-500' },
    { key: 'guard',   label: '🛡️ Guard',    active: 'bg-green-600',  ring: 'ring-green-500' },
    { key: 'admin',   label: '⚙️ Admin',    active: 'bg-purple-600', ring: 'ring-purple-500' },
  ];

  const submitColors = {
    student: 'bg-blue-600 hover:bg-blue-700',
    guard:   'bg-green-600 hover:bg-green-700',
    admin:   'bg-purple-600 hover:bg-purple-700',
  };

  return (
    <>
      {/* ── Original login UI — unchanged ── */}
      <main className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">

          <div className="text-center mb-8">
            <div className="text-5xl mb-3">🏠</div>
            <h1 className="text-2xl font-bold text-white">Hostel QR System</h1>
            <p className="text-slate-400 text-sm mt-1">Entry-Exit Attendance Management</p>
          </div>

          <div className="bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700">

            <div className="mb-6">
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-3">Login as</p>
              <div className="grid grid-cols-3 gap-2">
                {roles.map((r) => (
                  <button
                    key={r.key}
                    type="button"
                    onClick={() => setRole(r.key)}
                    className={`py-2 px-1 rounded-lg text-xs font-semibold text-white transition-all ${
                      role === r.key
                        ? `${r.active} ring-2 ${r.ring} ring-offset-2 ring-offset-slate-800`
                        : 'bg-slate-700 hover:bg-slate-600'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full bg-slate-700 border border-slate-600 text-white
                    rounded-lg px-4 py-2.5 text-sm focus:outline-none
                    focus:ring-2 focus:ring-blue-500 placeholder-slate-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-slate-700 border border-slate-600 text-white
                    rounded-lg px-4 py-2.5 text-sm focus:outline-none
                    focus:ring-2 focus:ring-blue-500 placeholder-slate-500"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-lg font-semibold text-white transition-all
                  ${submitColors[role]} disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            {role === 'student' && (
              <p className="text-center text-slate-500 text-sm mt-4">
                New student?{' '}
                <Link to="/register" className="text-blue-400 hover:underline">
                  Register here
                </Link>
              </p>
            )}
          </div>
        </div>
      </main>

      {/* ── Demo credentials panel — floats independently ── */}
      <DemoPanel onFill={handleFill} />
    </>
  );
};

export default LoginPage;