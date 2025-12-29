// Admin Guard Component - Protects admin routes
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useFeatureFlags } from '../../hooks/useFeatureFlags';

function LoadingSpinner() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[var(--color-background)]">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-t-[var(--color-primary)] border-[var(--color-border)] rounded-full animate-spin" />
                <p className="text-[var(--color-text-muted)]">驗證權限中...</p>
            </div>
        </div>
    );
}

export function AdminGuard({ children }) {
    const { user, loading: authLoading } = useAuth();
    const { isAdmin, loading: flagsLoading } = useFeatureFlags();

    if (authLoading || flagsLoading) {
        return <LoadingSpinner />;
    }

    if (!user || !isAdmin(user.uid)) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default AdminGuard;
