import { motion } from 'framer-motion';
import { Layout, ArrowUp, ArrowDown, Move, Sidebar, Smartphone } from 'lucide-react';

/**
 * ModulePreview - 視覺化預覽組件
 * 顯示模組在頁面不同區域的佈局預覽
 */
export default function ModulePreview({ moduleConfig = {}, themeColor = 'indigo' }) {
    // 按位置分組模組
    const modulesByPosition = {
        header: [],
        main: [],
        sidebar: [],
        footer: [],
        floating: []
    };

    Object.entries(moduleConfig).forEach(([moduleId, config]) => {
        if (config.enabled && modulesByPosition[config.position]) {
            modulesByPosition[config.position].push({
                id: moduleId,
                ...config
            });
        }
    });

    const colorMap = {
        indigo: 'bg-indigo-500',
        emerald: 'bg-emerald-500',
        rose: 'bg-rose-500',
        amber: 'bg-amber-500',
        sky: 'bg-sky-500',
        purple: 'bg-purple-500'
    };

    const ModuleBlock = ({ module, small = false }) => (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`${colorMap[module.style?.theme || themeColor]} text-white rounded-lg ${small ? 'px-2 py-1 text-xs' : 'px-3 py-2 text-sm'} font-medium truncate`}
        >
            {module.id.replace('Module', '')}
        </motion.div>
    );

    return (
        <div className="bg-gray-900 rounded-2xl p-4 border border-gray-700">
            <div className="flex items-center gap-2 mb-3">
                <Smartphone className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-400">佈局預覽</span>
            </div>

            <div className="bg-white rounded-xl overflow-hidden" style={{ minHeight: 300 }}>
                {/* Header 區域 */}
                <div className="bg-gray-100 px-3 py-2 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <ArrowUp className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">Header</span>
                    </div>
                    <div className="flex gap-1">
                        {modulesByPosition.header.map(m => (
                            <ModuleBlock key={m.id} module={m} small />
                        ))}
                    </div>
                </div>

                {/* 主內容區 */}
                <div className="flex min-h-[200px]">
                    {/* Main 區域 */}
                    <div className="flex-1 p-3">
                        <div className="flex items-center gap-2 mb-2">
                            <Layout className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-500">Main</span>
                        </div>
                        <div className="space-y-2">
                            {modulesByPosition.main.length > 0 ? (
                                modulesByPosition.main.map(m => (
                                    <ModuleBlock key={m.id} module={m} />
                                ))
                            ) : (
                                <div className="text-xs text-gray-300 text-center py-8">
                                    拖曳模組到此區域
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar 區域 */}
                    {modulesByPosition.sidebar.length > 0 && (
                        <div className="w-24 bg-gray-50 p-2 border-l border-gray-200">
                            <div className="flex items-center gap-1 mb-2">
                                <Sidebar className="w-3 h-3 text-gray-400" />
                                <span className="text-xs text-gray-500">Sidebar</span>
                            </div>
                            <div className="space-y-1">
                                {modulesByPosition.sidebar.map(m => (
                                    <ModuleBlock key={m.id} module={m} small />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer 區域 */}
                <div className="bg-gray-100 px-3 py-2 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <ArrowDown className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-500">Footer</span>
                        </div>
                        <div className="flex gap-1">
                            {modulesByPosition.footer.map(m => (
                                <ModuleBlock key={m.id} module={m} small />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Floating 區域 */}
                {modulesByPosition.floating.length > 0 && (
                    <div className="absolute bottom-6 right-6">
                        <div className="flex flex-col gap-2">
                            {modulesByPosition.floating.map(m => (
                                <div
                                    key={m.id}
                                    className={`w-10 h-10 rounded-full ${colorMap[m.style?.theme || themeColor]} flex items-center justify-center text-white shadow-lg`}
                                >
                                    <Move className="w-4 h-4" />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
