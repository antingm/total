import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, LogIn, UserPlus, Loader2 } from 'lucide-react';
import { useAuth } from './AuthProvider';

/**
 * AuthModal - 登入/註冊彈窗組件
 * 支援深淺主題（透過 CSS 變數自動適應）
 */
export default function AuthModal({
    isOpen,
    onClose,
    onSuccess,
    configStyle = {}
}) {
    const [mode, setMode] = useState('login'); // login | register
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const { login, register, isLoading, error, clearError } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        clearError();

        try {
            if (mode === 'login') {
                await login(email, password);
            } else {
                await register(email, password, name);
            }
            onSuccess?.();
            onClose?.();
            resetForm();
        } catch {
            // Error is handled in AuthProvider
        }
    };

    const resetForm = () => {
        setEmail('');
        setPassword('');
        setName('');
    };

    const switchMode = () => {
        setMode(mode === 'login' ? 'register' : 'login');
        clearError();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="rounded-3xl p-8 w-full max-w-md mx-4 shadow-2xl"
                    style={{
                        backgroundColor: 'var(--module-bg)',
                        border: '1px solid var(--module-border)'
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold" style={{ color: 'var(--module-text)' }}>
                            {mode === 'login' ? '登入' : '註冊'}
                        </h2>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                            style={{ backgroundColor: 'var(--module-bg-subtle)' }}
                        >
                            <X className="w-5 h-5" style={{ color: 'var(--module-text-muted)' }} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {mode === 'register' && (
                            <div className="relative">
                                <User
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                                    style={{ color: 'var(--module-text-muted)' }}
                                />
                                <input
                                    type="text"
                                    placeholder="您的名字"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl outline-none transition-all"
                                    style={{
                                        backgroundColor: 'var(--module-bg-subtle)',
                                        border: '1px solid var(--module-border)',
                                        color: 'var(--module-text)'
                                    }}
                                />
                            </div>
                        )}

                        <div className="relative">
                            <Mail
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                                style={{ color: 'var(--module-text-muted)' }}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl outline-none transition-all"
                                style={{
                                    backgroundColor: 'var(--module-bg-subtle)',
                                    border: '1px solid var(--module-border)',
                                    color: 'var(--module-text)'
                                }}
                                required
                            />
                        </div>

                        <div className="relative">
                            <Lock
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                                style={{ color: 'var(--module-text-muted)' }}
                            />
                            <input
                                type="password"
                                placeholder="密碼"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl outline-none transition-all"
                                style={{
                                    backgroundColor: 'var(--module-bg-subtle)',
                                    border: '1px solid var(--module-border)',
                                    color: 'var(--module-text)'
                                }}
                                required
                            />
                        </div>

                        {error && (
                            <div className="p-3 rounded-lg bg-red-500/10 text-red-500 text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 rounded-xl text-white font-bold flex items-center justify-center gap-2 transition-opacity disabled:opacity-50"
                            style={{ backgroundColor: 'var(--module-accent)' }}
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : mode === 'login' ? (
                                <>
                                    <LogIn className="w-5 h-5" /> 登入
                                </>
                            ) : (
                                <>
                                    <UserPlus className="w-5 h-5" /> 註冊
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <button
                            onClick={switchMode}
                            className="text-sm font-medium transition-colors"
                            style={{ color: 'var(--module-accent)' }}
                        >
                            {mode === 'login' ? '還沒有帳號？立即註冊' : '已有帳號？立即登入'}
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
