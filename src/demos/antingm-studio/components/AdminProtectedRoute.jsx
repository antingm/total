/**
 * 管理員路由保護組件
 * 提供多層安全防護，防止未授權訪問
 */

import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const AdminProtectedRoute = ({ children }) => {
    const { isAdmin, loading } = useAuth();

    // Loading 狀態：顯示友善的載入畫面
    if (loading) {
        return (
            <div className="min-h-screen bg-bg-primary flex items-center justify-center pt-32">
                <div className="text-center">
                    <div className="inline-block w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
                    <p className="text-slate-400">驗證權限中...</p>
                </div>
            </div>
        );
    }

    // 非管理員：立即重定向到首頁
    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    // 管理員：渲染受保護的內容
    return children;
};

export default AdminProtectedRoute;
