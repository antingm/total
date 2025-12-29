// Feature Flags Hook - Real-time Firestore listener
import { useState, useEffect, useMemo, useCallback } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';

export function useFeatureFlags() {
    const [demos, setDemos] = useState({});
    const [adminUids, setAdminUids] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            doc(db, 'config', 'features'),
            (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.data();
                    setDemos(data.demos || {});
                    setAdminUids(data.admin_uids || []);
                }
                setLoading(false);
            },
            (err) => {
                console.error('Feature flags error:', err);
                setError(err);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    const isDemoEnabled = (demoId) => demos[demoId]?.enabled ?? false;

    const getDemoConfig = (demoId) => demos[demoId] ?? null;

    // 新增：取得指定 Demo 的啟用模組清單
    const getActiveModules = useCallback((demoId) => {
        return demos[demoId]?.activeModules ?? [];
    }, [demos]);

    // 新增：取得指定 Demo 的完整模組配置
    const getModuleConfig = useCallback((demoId) => {
        return demos[demoId]?.moduleConfig ?? {};
    }, [demos]);

    const getAllDemos = useMemo(() => {
        return Object.entries(demos)
            .filter(([_, config]) => config.enabled)
            .sort((a, b) => (a[1].order || 0) - (b[1].order || 0))
            .map(([id, config]) => ({ id, ...config }));
    }, [demos]);

    const isAdmin = (uid) => adminUids.includes(uid);

    return {
        demos,
        loading,
        error,
        isDemoEnabled,
        getDemoConfig,
        getActiveModules,
        getModuleConfig,
        getAllDemos,
        isAdmin,
        adminUids
    };
}

export default useFeatureFlags;

