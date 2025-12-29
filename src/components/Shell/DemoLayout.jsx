import { useState, useRef, useEffect } from 'react';
import { ModuleSlot, FloatingModules } from './ModuleLoader';
import DraggableModuleLayout from './DraggableModuleLayout';

/**
 * DemoLayout - 標準化 Demo 頁面布局組件
 * 
 * 提供完整的模組插槽區域，讓模組可放置在任何位置:
 * - header: 頁首區
 * - main: 主內容區
 * - sidebar: 側邊欄
 * - footer: 頁尾區
 * - floating: 浮動按鈕區
 * - canvas: 自由畫布（可拖放排版）
 * 
 * @param {object} moduleConfig - 模組配置
 * @param {object} moduleProps - 傳遞給各模組的 props
 * @param {ReactNode} children - 頁面原有內容
 * @param {boolean} showSidebar - 是否顯示側邊欄
 * @param {boolean} isEditing - 是否處於編輯模式
 * @param {function} onLayoutChange - 拖放布局變更回調
 * @param {string} className - 額外的 CSS 類別
 */
export default function DemoLayout({
    moduleConfig = {},
    moduleProps = {},
    children,
    showSidebar = true,
    isEditing = false,
    onLayoutChange,
    className = ''
}) {
    const containerRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(1200);

    // 監測容器寬度
    useEffect(() => {
        if (!containerRef.current) return;
        const observer = new ResizeObserver(entries => {
            for (const entry of entries) {
                setContainerWidth(entry.contentRect.width);
            }
        });
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    // 檢查各區域是否有模組
    const hasHeaderModules = Object.entries(moduleConfig).some(
        ([_, cfg]) => cfg.enabled && cfg.position === 'header'
    );
    const hasMainModules = Object.entries(moduleConfig).some(
        ([_, cfg]) => cfg.enabled && cfg.position === 'main'
    );
    const hasSidebarModules = Object.entries(moduleConfig).some(
        ([_, cfg]) => cfg.enabled && cfg.position === 'sidebar'
    );
    const hasFooterModules = Object.entries(moduleConfig).some(
        ([_, cfg]) => cfg.enabled && cfg.position === 'footer'
    );
    const hasCanvasModules = Object.entries(moduleConfig).some(
        ([_, cfg]) => cfg.enabled && cfg.position === 'canvas'
    );

    return (
        <div
            ref={containerRef}
            className={`demo-layout min-h-screen ${className}`}
        >
            {/* 頁首區模組 */}
            {hasHeaderModules && (
                <header className="demo-header border-b border-white/10 py-4 px-6">
                    <ModuleSlot
                        position="header"
                        moduleConfig={moduleConfig}
                        props={moduleProps}
                    />
                </header>
            )}

            {/* 主體區域 */}
            <div className={`demo-body flex ${hasSidebarModules && showSidebar ? 'gap-6' : ''}`}>
                {/* 主內容區 */}
                <main className={`demo-main flex-1 ${hasSidebarModules && showSidebar ? '' : 'w-full'}`}>
                    {/* 頁面原有內容 */}
                    {children}

                    {/* 主內容區模組 */}
                    {hasMainModules && (
                        <div className="demo-main-modules mt-6 space-y-6 px-6">
                            <ModuleSlot
                                position="main"
                                moduleConfig={moduleConfig}
                                props={moduleProps}
                            />
                        </div>
                    )}

                    {/* 自由畫布區 - 可拖放排版 */}
                    {hasCanvasModules && (
                        <div className="demo-canvas mt-6 px-6">
                            <DraggableModuleLayout
                                moduleConfig={moduleConfig}
                                moduleProps={moduleProps}
                                onLayoutChange={onLayoutChange}
                                isEditing={isEditing}
                                width={containerWidth - 48}
                            />
                        </div>
                    )}
                </main>

                {/* 側邊欄 */}
                {hasSidebarModules && showSidebar && (
                    <aside className="demo-sidebar w-80 p-6 border-l border-white/10">
                        <ModuleSlot
                            position="sidebar"
                            moduleConfig={moduleConfig}
                            props={moduleProps}
                        />
                    </aside>
                )}
            </div>

            {/* 頁尾區模組 */}
            {hasFooterModules && (
                <footer className="demo-footer border-t border-white/10 py-6 px-6 mt-8">
                    <ModuleSlot
                        position="footer"
                        moduleConfig={moduleConfig}
                        props={moduleProps}
                    />
                </footer>
            )}

            {/* 浮動模組 */}
            <FloatingModules moduleConfig={moduleConfig} props={moduleProps} />
        </div>
    );
}

