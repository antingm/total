import { useState, useMemo } from 'react';
import GridLayout from 'react-grid-layout';
import { motion, AnimatePresence } from 'framer-motion';
import { Move, Maximize2, Minimize2, X, GripVertical } from 'lucide-react';
import * as Modules from '../../modules';
import { getThemeVars } from '../../utils/themeUtils';
import 'react-grid-layout/css/styles.css';

/**
 * DraggableModuleLayout - 可拖放的模組排版系統
 * 
 * 讓使用者自由拖放模組到頁面任意位置，並調整大小。
 * 
 * @param {object} moduleConfig - 模組配置
 * @param {object} moduleProps - 傳遞給各模組的 props
 * @param {function} onLayoutChange - 布局變更回調
 * @param {boolean} isEditing - 是否處於編輯模式
 * @param {number} width - 容器寬度
 */
export default function DraggableModuleLayout({
    moduleConfig = {},
    moduleProps = {},
    onLayoutChange,
    isEditing = false,
    width = 1200
}) {
    const [localLayout, setLocalLayout] = useState([]);

    // 將 moduleConfig 轉換為 react-grid-layout 格式
    const layoutItems = useMemo(() => {
        const enabledModules = Object.entries(moduleConfig)
            .filter(([_, cfg]) => cfg.enabled && cfg.position === 'canvas')
            .map(([id, cfg], index) => ({
                i: id,
                x: cfg.layout?.x ?? (index % 3) * 4,
                y: cfg.layout?.y ?? Math.floor(index / 3) * 4,
                w: cfg.layout?.w ?? 4,
                h: cfg.layout?.h ?? 4,
                minW: 2,
                minH: 2
            }));
        return enabledModules;
    }, [moduleConfig]);

    const handleLayoutChange = (newLayout) => {
        setLocalLayout(newLayout);

        // 轉換為 moduleConfig 格式並回調
        if (onLayoutChange) {
            const layoutUpdate = {};
            newLayout.forEach(item => {
                layoutUpdate[item.i] = {
                    x: item.x,
                    y: item.y,
                    w: item.w,
                    h: item.h
                };
            });
            onLayoutChange(layoutUpdate);
        }
    };

    if (layoutItems.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[400px] border-2 border-dashed border-white/20 rounded-2xl">
                <div className="text-center text-gray-400">
                    <Move className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">在模組編輯器中選擇「自由畫布」位置</p>
                    <p className="text-xs text-gray-500 mt-1">模組將顯示在此處，可自由拖放調整</p>
                </div>
            </div>
        );
    }

    return (
        <div className="draggable-module-layout relative">
            {isEditing && (
                <div className="absolute top-2 right-2 z-20 px-3 py-1.5 bg-purple-500/20 border border-purple-500/30 rounded-lg">
                    <span className="text-xs text-purple-300 font-medium">📐 拖放編輯模式</span>
                </div>
            )}

            <GridLayout
                className="layout"
                layout={layoutItems}
                cols={12}
                rowHeight={60}
                width={width}
                onLayoutChange={handleLayoutChange}
                isDraggable={isEditing}
                isResizable={isEditing}
                draggableHandle=".drag-handle"
                margin={[16, 16]}
            >
                {layoutItems.map(item => {
                    const ModuleComponent = Modules[item.i];
                    const config = moduleConfig[item.i] || {};
                    const themeVars = getThemeVars(config.style?.theme);
                    const props = {
                        ...moduleProps[item.i],
                        ...config.content,
                        configStyle: config.style
                    };

                    if (!ModuleComponent) return null;

                    return (
                        <div
                            key={item.i}
                            className="module-canvas-item relative group"
                            style={{
                                '--module-accent': themeVars.accent,
                                '--module-accent-bg': themeVars.accentBg
                            }}
                        >
                            {/* 拖動手柄 - 僅編輯模式顯示 */}
                            {isEditing && (
                                <div className="drag-handle absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity cursor-move flex items-center justify-center z-10 rounded-t-xl">
                                    <GripVertical className="w-4 h-4 text-white/70" />
                                </div>
                            )}

                            {/* 模組容器 */}
                            <div className="h-full overflow-auto rounded-xl">
                                <ModuleComponent {...props} />
                            </div>

                            {/* 調整大小指示器 */}
                            {isEditing && (
                                <div className="absolute bottom-0 right-0 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Maximize2 className="w-3 h-3 text-white/50" />
                                </div>
                            )}
                        </div>
                    );
                })}
            </GridLayout>
        </div>
    );
}
