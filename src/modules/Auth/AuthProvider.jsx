import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext();

/**
 * AuthProvider - 會員認證狀態管理
 * 提供登入、登出、註冊等功能
 */
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // 模擬登入
    const login = useCallback(async (email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            // 模擬 API 請求
            await new Promise(resolve => setTimeout(resolve, 1000));

            // 簡單驗證
            if (!email || !password) {
                throw new Error('請輸入帳號密碼');
            }

            const mockUser = {
                id: Date.now(),
                email,
                name: email.split('@')[0],
                avatar: null
            };

            setUser(mockUser);
            return mockUser;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    // 登出
    const logout = useCallback(() => {
        setUser(null);
        setError(null);
    }, []);

    // 模擬註冊
    const register = useCallback(async (email, password, name) => {
        setIsLoading(true);
        setError(null);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (!email || !password) {
                throw new Error('請填寫完整資訊');
            }

            const mockUser = {
                id: Date.now(),
                email,
                name: name || email.split('@')[0],
                avatar: null
            };

            setUser(mockUser);
            return mockUser;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    // 更新個人資料
    const updateProfile = useCallback(async (updates) => {
        if (!user) return;
        setUser(prev => ({ ...prev, ...updates }));
    }, [user]);

    const value = {
        user,
        isLoading,
        error,
        isAuthenticated: !!user,
        login,
        logout,
        register,
        updateProfile,
        clearError: () => setError(null)
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export default AuthProvider;
