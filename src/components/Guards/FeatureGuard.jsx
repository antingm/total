// Feature Guard Component - Routes protection based on feature flags
import { Navigate } from 'react-router-dom';
import { useFeatureFlags } from '../../hooks/useFeatureFlags';

// Loading Spinner Component
function LoadingSpinner() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[var(--color-background)]">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-t-[var(--color-primary)] border-[var(--color-border)] rounded-full animate-spin" />
                <p className="text-[var(--color-text-muted)]">載入中...</p>
            </div>
        </div>
    );
}

// Feature Guard Component
export function FeatureGuard({ demoId, children, fallback = null }) {
    const { isDemoEnabled, loading } = useFeatureFlags();

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!isDemoEnabled(demoId)) {
        return fallback || <Navigate to="/" replace />;
    }

    return children;
}

// Higher-Order Component version
export function withFeatureGuard(WrappedComponent, demoId) {
    return function FeatureGuardedComponent(props) {
        return (
            <FeatureGuard demoId={demoId}>
                <WrappedComponent {...props} />
            </FeatureGuard>
        );
    };
}

export default FeatureGuard;
