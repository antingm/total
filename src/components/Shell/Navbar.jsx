// Navbar Component - Main navigation with logout
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Settings, Layout, LogOut, ChevronDown } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useAuth } from '../../hooks/useAuth';
import { useFeatureFlags } from '../../hooks/useFeatureFlags';

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { isAdmin } = useFeatureFlags();
    const [showUserMenu, setShowUserMenu] = useState(false);

    const isActive = (path) => location.pathname === path;

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setShowUserMenu(false);
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <nav className="glass fixed top-0 left-0 right-0 z-50 px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-purple-600 flex items-center justify-center">
                        <Layout className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-white group-hover:text-[var(--color-primary)] transition-colors">
                        Demo Platform
                    </span>
                </Link>

                {/* Navigation Links */}
                <div className="flex items-center gap-4">
                    <Link
                        to="/"
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${isActive('/')
                                ? 'bg-[var(--color-primary)] text-white'
                                : 'text-[var(--color-text-muted)] hover:text-white hover:bg-[var(--color-surface)]'
                            }`}
                    >
                        <Home className="w-4 h-4" />
                        <span>首頁</span>
                    </Link>

                    {/* Admin Link - Only show if user is admin */}
                    {user && isAdmin(user.uid) && (
                        <Link
                            to="/admin"
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${isActive('/admin')
                                    ? 'bg-[var(--color-primary)] text-white'
                                    : 'text-[var(--color-text-muted)] hover:text-white hover:bg-[var(--color-surface)]'
                                }`}
                        >
                            <Settings className="w-4 h-4" />
                            <span>管理後台</span>
                        </Link>
                    )}

                    {/* User Menu or Login */}
                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] transition-colors"
                            >
                                <img
                                    src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || 'U'}&background=6366f1&color=fff`}
                                    alt={user.displayName || 'User'}
                                    className="w-8 h-8 rounded-full border-2 border-[var(--color-border)]"
                                />
                                <ChevronDown className={`w-4 h-4 text-[var(--color-text-muted)] transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {showUserMenu && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setShowUserMenu(false)}
                                    />
                                    <div className="absolute right-0 mt-2 w-56 z-20 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg shadow-xl overflow-hidden">
                                        <div className="px-4 py-3 border-b border-[var(--color-border)]">
                                            <p className="text-sm font-medium text-white truncate">
                                                {user.displayName || 'User'}
                                            </p>
                                            <p className="text-xs text-[var(--color-text-muted)] truncate">
                                                {user.email}
                                            </p>
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-4 py-3 text-left text-red-400 hover:bg-red-500/10 transition-colors"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            <span>登出</span>
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="btn btn-primary">
                            登入
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
