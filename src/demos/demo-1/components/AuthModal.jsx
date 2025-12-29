// 登入/註冊彈窗元件
import { useState } from 'react';
import { X, Mail, Lock, User, Chrome } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { signUpWithEmail, signInWithEmail, signInWithGoogle } from '../firebase/auth';

const AuthModal = ({ isOpen, onClose }) => {
    const [mode, setMode] = useState('login'); // 'login' | 'register'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // 錯誤訊息對照表
    const errorMessages = {
        'auth/email-already-in-use': '此電子郵件已被註冊',
        'auth/invalid-email': '無效的電子郵件格式',
        'auth/operation-not-allowed': '此登入方式未啟用',
        'auth/weak-password': '密碼強度不足，至少需要 6 個字元',
        'auth/user-disabled': '此帳號已被停用',
        'auth/user-not-found': '找不到此帳號',
        'auth/wrong-password': '密碼錯誤',
        'auth/invalid-credential': '帳號或密碼錯誤',
        'auth/popup-closed-by-user': '登入視窗已關閉',
        'auth/cancelled-popup-request': '登入已取消'
    };

    const getErrorMessage = (code) => {
        return errorMessages[code] || '發生未知錯誤，請稍後再試';
    };

    const resetForm = () => {
        setEmail('');
        setPassword('');
        setDisplayName('');
        setError('');
    };

    const handleModeSwitch = () => {
        setMode(mode === 'login' ? 'register' : 'login');
        resetForm();
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (mode === 'register') {
                await signUpWithEmail(email, password, displayName);
            } else {
                await signInWithEmail(email, password);
            }
            handleClose();
        } catch (err) {
            setError(getErrorMessage(err.code));
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError('');
        setLoading(true);

        try {
            await signInWithGoogle();
            handleClose();
        } catch (err) {
            if (err.code !== 'auth/popup-closed-by-user') {
                setError(getErrorMessage(err.code));
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* 背景遮罩 */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />

                    {/* 彈窗內容 */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
                    >
                        <div className="bg-white rounded-2xl shadow-2xl p-8 mx-4">
                            {/* 標題區 */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {mode === 'login' ? '歡迎回來' : '建立帳號'}
                                </h2>
                                <button
                                    onClick={handleClose}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X size={20} className="text-gray-500" />
                                </button>
                            </div>

                            {/* 錯誤訊息 */}
                            {error && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}

                            {/* 表單 */}
                            <form onSubmit={handleEmailSubmit} className="space-y-4">
                                {/* 註冊時顯示名稱欄位 */}
                                {mode === 'register' && (
                                    <div className="relative">
                                        <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="您的名稱"
                                            value={displayName}
                                            onChange={(e) => setDisplayName(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                        />
                                    </div>
                                )}

                                <div className="relative">
                                    <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="email"
                                        placeholder="電子郵件"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                    />
                                </div>

                                <div className="relative">
                                    <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="password"
                                        placeholder="密碼"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        minLength={6}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? '處理中...' : (mode === 'login' ? '登入' : '註冊')}
                                </button>
                            </form>

                            {/* 分隔線 */}
                            <div className="flex items-center my-6">
                                <div className="flex-1 border-t border-gray-200"></div>
                                <span className="px-4 text-sm text-gray-400">或</span>
                                <div className="flex-1 border-t border-gray-200"></div>
                            </div>

                            {/* Google 登入 */}
                            <button
                                onClick={handleGoogleLogin}
                                disabled={loading}
                                className="w-full py-3 border border-gray-200 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Chrome size={20} className="text-gray-600" />
                                <span className="font-medium text-gray-700">使用 Google 帳號繼續</span>
                            </button>

                            {/* 切換模式 */}
                            <p className="text-center mt-6 text-gray-600">
                                {mode === 'login' ? '還沒有帳號？' : '已經有帳號？'}
                                <button
                                    onClick={handleModeSwitch}
                                    className="ml-1 text-orange-500 hover:text-orange-600 font-medium"
                                >
                                    {mode === 'login' ? '立即註冊' : '返回登入'}
                                </button>
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default AuthModal;
