import { useState } from 'react';
import { User, LogOut, Settings } from 'lucide-react';
import { AuthProvider, useAuth } from './AuthProvider';
import AuthModal from './AuthModal';
import { getThemeVars } from '../../utils/themeUtils';

/**
 * AuthModule - 完整的會員認證解決方案
 * 包含登入按鈕、會員選單、登入/註冊彈窗
 * 支援深淺主題（透過 CSS 變數自動適應）
 */
export function AuthModule({
    configStyle = {},
    onLoginSuccess,
    onLogoutSuccess
}) {
    return (
        <AuthProvider>
            <AuthModuleContent
                configStyle={configStyle}
                onLoginSuccess={onLoginSuccess}
                onLogoutSuccess={onLogoutSuccess}
            />
        </AuthProvider>
    );
}

function AuthModuleContent({ configStyle, onLoginSuccess, onLogoutSuccess }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const { user, isAuthenticated, logout } = useAuth();
    const themeVars = getThemeVars(configStyle?.theme);

    const handleLogout = () => {
        logout();
        setShowMenu(false);
        onLogoutSuccess?.();
    };

    const handleLoginSuccess = () => {
        setIsModalOpen(false);
        onLoginSuccess?.();
    };

    return (
        <>
            {isAuthenticated ? (
                <div className="relative">
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className="flex items-center gap-2 px-4 py-2 rounded-full transition-colors"
                        style={{ backgroundColor: 'var(--module-bg-subtle)' }}
                    >
                        <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                            style={{ backgroundColor: 'var(--module-accent)' }}
                        >
                            {user?.name?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <span className="font-medium hidden sm:block" style={{ color: 'var(--module-text)' }}>
                            {user?.name}
                        </span>
                    </button>

                    {showMenu && (
                        <div
                            className="absolute right-0 top-full mt-2 w-48 rounded-xl shadow-xl overflow-hidden z-50"
                            style={{
                                backgroundColor: 'var(--module-bg)',
                                border: '1px solid var(--module-border)'
                            }}
                        >
                            <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--module-border)' }}>
                                <div className="font-medium" style={{ color: 'var(--module-text)' }}>{user?.name}</div>
                                <div className="text-sm" style={{ color: 'var(--module-text-muted)' }}>{user?.email}</div>
                            </div>
                            <button
                                className="w-full px-4 py-3 flex items-center gap-3 transition-colors"
                                style={{ color: 'var(--module-text-muted)' }}
                            >
                                <Settings className="w-4 h-4" />
                                帳戶設定
                            </button>
                            <button
                                onClick={handleLogout}
                                className="w-full px-4 py-3 flex items-center gap-3 text-red-500 transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                登出
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-white font-medium transition-colors"
                    style={{ backgroundColor: 'var(--module-accent)' }}
                >
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline">登入</span>
                </button>
            )}

            <AuthModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleLoginSuccess}
                configStyle={configStyle}
            />
        </>
    );
}

// 統一導出
export { AuthProvider, useAuth } from './AuthProvider';
export { default as AuthModal } from './AuthModal';
export default AuthModule;
