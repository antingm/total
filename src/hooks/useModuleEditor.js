import { useState, useEffect, useRef, useCallback } from 'react';
import { useFeatureFlags } from './useFeatureFlags';

/**
 * useModuleEditor - 用於整合模組編輯器的通用 Hook
 * 
 * 提供：
 * - liveModuleConfig: 即時的模組配置狀態（用於即時預覽）
 * - handleConfigChange: 配置變更的回調函數
 * - moduleConfig: 從 Firestore 取得的遠端配置
 * 
 * @param {string} demoId - Demo 的 ID（如 'demo-1', 'demo-2'）
 * @returns {{ liveModuleConfig, handleConfigChange, moduleConfig }}
 */
export function useModuleEditor(demoId) {
    const { getModuleConfig } = useFeatureFlags();
    const remoteConfig = getModuleConfig(demoId);

    // 本地模組配置狀態（用於即時編輯）
    const [liveModuleConfig, setLiveModuleConfig] = useState(() => remoteConfig || {});

    // 追蹤遠端配置變化
    const prevRemoteConfigStr = useRef(JSON.stringify(remoteConfig));

    // 只在遠端配置真正變更時同步
    useEffect(() => {
        const currentStr = JSON.stringify(remoteConfig);

        if (currentStr !== prevRemoteConfigStr.current) {
            prevRemoteConfigStr.current = currentStr;
            setLiveModuleConfig(remoteConfig || {});
        }
    }, [remoteConfig]);

    // 穩定的配置變更回調
    const handleConfigChange = useCallback((newConfig) => {
        setLiveModuleConfig(newConfig);
    }, []);

    return {
        liveModuleConfig,
        handleConfigChange,
        moduleConfig: remoteConfig
    };
}

export default useModuleEditor;
