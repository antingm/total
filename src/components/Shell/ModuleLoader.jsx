import React, { lazy, Suspense, useMemo } from 'react';
import * as Modules from '../../modules';
import ModuleErrorBoundary from './ModuleErrorBoundary';

// 預載入的模組對應表（用於需要動態載入的大型模組）
const LazyModules = {
    // 如果有大型模組，可以在這裡定義 lazy 版本
};

/**
 * ModuleLoader - 核心模組渲染組件
 * 
 * 支援兩種配置格式：
 * 1. 簡單陣列：activeModules: ['CartModule', 'BookingModule']
 * 2. 完整配置：moduleConfig: { CartModule: { enabled: true, position: 'floating', style: {...} } }
 * 
 * Props:
 * - activeModules: string[] - 簡單模式的模組清單
 * - moduleConfig: object - 完整配置物件
 * - position: string - 只渲染指定位置的模組（用於分區渲染）
 * - props: object - 傳遞給各模組的參數
 * - fallback: ReactNode - 載入中的 fallback UI
 */
export default function ModuleLoader({
    activeModules = [],
    moduleConfig = {},
    position = null, // 篩選特定位置的模組
    props = {},
    fallback = null
}) {
    // 統一處理兩種配置格式
    const normalizedConfig = useMemo(() => {
        // 如果有 moduleConfig，優先使用
        if (Object.keys(moduleConfig).length > 0) {
            return Object.entries(moduleConfig)
                .filter(([_, config]) => config.enabled)
                .sort((a, b) => (a[1].order || 0) - (b[1].order || 0))
                .map(([id, config]) => ({
                    id,
                    position: config.position || 'main',
                    style: config.style || {},
                    content: config.content || {}, // 新增：自訂內容
                    order: config.order || 0
                }));
        }

        // 否則使用簡單陣列格式
        return activeModules.map((id, index) => ({
            id,
            position: 'main',
            style: {},
            content: {},
            order: index
        }));
    }, [activeModules, moduleConfig]);

    // 根據 position 篩選
    const filteredModules = useMemo(() => {
        if (!position) return normalizedConfig;
        return normalizedConfig.filter(m => m.position === position);
    }, [normalizedConfig, position]);

    if (filteredModules.length === 0) return null;

    return (
        <div className={`module-loader module-loader--${position || 'default'} flex flex-col gap-6`}>
            {filteredModules.map(({ id, style, content }) => {
                const ModuleComponent = LazyModules[id] || Modules[id];

                if (!ModuleComponent) {
                    console.warn(`ModuleLoader: 找不到模組 "${id}"`);
                    return (
                        <div key={id} className="p-4 rounded-xl bg-yellow-50 border border-yellow-200 text-center">
                            <p className="text-yellow-700 text-sm">⚠️ 模組 "{id}" 尚未實作</p>
                        </div>
                    );
                }

                // 合併 props：Demo 提供的 props < 編輯器設定的 content
                // 自訂內容優先，覆蓋 demo 預設值
                const moduleProps = {
                    ...props[id],           // Demo 提供的預設 props
                    ...content,             // 編輯器設定的自訂內容（優先）
                    configStyle: style      // 樣式配置
                };

                // 如果是 lazy 組件，需要用 Suspense 包裹
                if (LazyModules[id]) {
                    return (
                        <ModuleErrorBoundary key={id} moduleName={id}>
                            <Suspense fallback={fallback || <ModuleLoadingFallback name={id} />}>
                                <div className="module-wrapper" data-module={id} data-theme={style?.theme}>
                                    <ModuleComponent {...moduleProps} />
                                </div>
                            </Suspense>
                        </ModuleErrorBoundary>
                    );
                }

                return (
                    <ModuleErrorBoundary key={id} moduleName={id}>
                        <div className="module-wrapper" data-module={id} data-theme={style?.theme}>
                            <ModuleComponent {...moduleProps} />
                        </div>
                    </ModuleErrorBoundary>
                );
            })}
        </div>
    );
}

/**
 * 分區渲染輔助組件
 * 用於在頁面的不同區域渲染對應位置的模組
 */
export function ModuleSlot({ position, moduleConfig, props }) {
    return <ModuleLoader moduleConfig={moduleConfig} position={position} props={props} />;
}

// 模組載入中的 fallback UI
function ModuleLoadingFallback({ name }) {
    return (
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 animate-pulse">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10" />
                <div>
                    <div className="h-4 w-32 bg-white/10 rounded mb-2" />
                    <div className="h-3 w-48 bg-white/5 rounded" />
                </div>
            </div>
        </div>
    );
}

/**
 * 浮動模組容器
 * 專門渲染設定為 floating 位置的模組
 */
export function FloatingModules({ moduleConfig, props }) {
    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
            <ModuleLoader moduleConfig={moduleConfig} position="floating" props={props} />
        </div>
    );
}
