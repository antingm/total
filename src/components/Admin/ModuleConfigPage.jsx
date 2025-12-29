import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Puzzle, ChevronDown, ChevronRight, Save, RefreshCw, Check,
    ShoppingCart, Calendar, Sparkles, Layout, Move, ArrowUp, ArrowDown, Sidebar, Maximize2,
    Mail, HelpCircle, Star, CreditCard, Image, User, BarChart3, GripVertical
} from 'lucide-react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useFeatureFlags } from '../../hooks/useFeatureFlags';
import { AVAILABLE_MODULES, AVAILABLE_POSITIONS, THEME_COLORS } from '../../constants/moduleRegistry';
import ModulePreview from './ModulePreview';
import ModuleSortableList from './ModuleSortableList';

// Icon 對應表
const IconMap = {
    ShoppingCart, Calendar, Sparkles, Layout, Move, ArrowUp, ArrowDown, Sidebar, Maximize2,
    Mail, HelpCircle, Star, CreditCard, Image, User, BarChart3
};

export default function ModuleConfigPage() {
    const { demos, loading } = useFeatureFlags();
    const [selectedDemo, setSelectedDemo] = useState(null);
    const [moduleConfig, setModuleConfig] = useState({});
    const [saving, setSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    // 當選擇 Demo 時，載入其現有配置
    useEffect(() => {
        if (selectedDemo && demos[selectedDemo]) {
            const existingConfig = demos[selectedDemo].moduleConfig || {};
            // 將 activeModules 轉換為 moduleConfig 格式（向下兼容）
            const legacyModules = demos[selectedDemo].activeModules || [];
            const config = { ...existingConfig };

            legacyModules.forEach(moduleId => {
                if (!config[moduleId]) {
                    config[moduleId] = {
                        enabled: true,
                        position: 'main',
                        order: Object.keys(config).length + 1,
                        style: AVAILABLE_MODULES.find(m => m.id === moduleId)?.defaultStyle || {}
                    };
                }
            });

            setModuleConfig(config);
        }
    }, [selectedDemo, demos]);

    // 切換模組啟用狀態
    const toggleModule = (moduleId) => {
        setModuleConfig(prev => ({
            ...prev,
            [moduleId]: prev[moduleId]
                ? { ...prev[moduleId], enabled: !prev[moduleId].enabled }
                : {
                    enabled: true,
                    position: AVAILABLE_MODULES.find(m => m.id === moduleId)?.positions[0] || 'main',
                    order: Object.keys(prev).length + 1,
                    style: AVAILABLE_MODULES.find(m => m.id === moduleId)?.defaultStyle || {}
                }
        }));
    };

    // 更新模組位置
    const updatePosition = (moduleId, position) => {
        setModuleConfig(prev => ({
            ...prev,
            [moduleId]: { ...prev[moduleId], position }
        }));
    };

    // 更新模組樣式
    const updateStyle = (moduleId, styleKey, value) => {
        setModuleConfig(prev => ({
            ...prev,
            [moduleId]: {
                ...prev[moduleId],
                style: { ...prev[moduleId]?.style, [styleKey]: value }
            }
        }));
    };

    // 儲存配置到 Firestore
    const handleSave = async () => {
        if (!selectedDemo) return;

        setSaving(true);
        try {
            const enabledModules = Object.entries(moduleConfig)
                .filter(([_, config]) => config.enabled)
                .map(([id]) => id);

            await updateDoc(doc(db, 'config', 'features'), {
                [`demos.${selectedDemo}.moduleConfig`]: moduleConfig,
                [`demos.${selectedDemo}.activeModules`]: enabledModules
            });

            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 2000);
        } catch (error) {
            console.error('Save error:', error);
            alert('儲存失敗：' + error.message);
        } finally {
            setSaving(false);
        }
    };

    const demoList = Object.entries(demos).sort((a, b) => (a[1].order || 0) - (b[1].order || 0));

    return (
        <div className="min-h-screen pt-24 pb-12 px-6">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                            <Puzzle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white">模組配置中心</h1>
                            <p className="text-[var(--color-text-muted)]">為每個 Demo 配置功能模組</p>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* 左側：Demo 選擇器 */}
                    <div className="lg:col-span-1">
                        <div className="card">
                            <h3 className="font-bold text-white mb-4">選擇專案</h3>
                            {loading ? (
                                <div className="flex justify-center py-8">
                                    <RefreshCw className="w-6 h-6 animate-spin text-gray-400" />
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {demoList.map(([id, config]) => (
                                        <button
                                            key={id}
                                            onClick={() => setSelectedDemo(id)}
                                            className={`w-full p-3 rounded-xl text-left transition-all ${selectedDemo === id
                                                ? 'bg-[var(--color-primary)] text-white'
                                                : 'bg-white/5 text-gray-300 hover:bg-white/10'
                                                }`}
                                        >
                                            <div className="font-medium">{config.name}</div>
                                            <div className="text-xs opacity-70">{id}</div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 右側：模組配置 */}
                    <div className="lg:col-span-2">
                        {selectedDemo ? (
                            <motion.div
                                key={selectedDemo}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                <div className="card mb-4">
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h3 className="text-xl font-bold text-white">{demos[selectedDemo]?.name}</h3>
                                            <p className="text-sm text-gray-400">配置 {selectedDemo} 的功能模組</p>
                                        </div>
                                        <button
                                            onClick={handleSave}
                                            disabled={saving}
                                            className={`px-6 py-2 rounded-xl font-bold flex items-center gap-2 transition-all ${saveSuccess
                                                ? 'bg-green-500 text-white'
                                                : 'bg-[var(--color-primary)] text-white hover:opacity-90'
                                                }`}
                                        >
                                            {saving ? (
                                                <RefreshCw className="w-4 h-4 animate-spin" />
                                            ) : saveSuccess ? (
                                                <Check className="w-4 h-4" />
                                            ) : (
                                                <Save className="w-4 h-4" />
                                            )}
                                            {saveSuccess ? '已儲存' : '儲存'}
                                        </button>
                                    </div>

                                    {/* 模組清單 */}
                                    <div className="space-y-4">
                                        {AVAILABLE_MODULES.map((module) => {
                                            const config = moduleConfig[module.id] || { enabled: false };
                                            const Icon = IconMap[module.icon] || Puzzle;

                                            return (
                                                <div
                                                    key={module.id}
                                                    className={`p-4 rounded-xl border-2 transition-all ${config.enabled
                                                        ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5'
                                                        : 'border-white/10 bg-white/5'
                                                        }`}
                                                >
                                                    {/* 模組標題列 */}
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${config.enabled ? 'bg-[var(--color-primary)]/20' : 'bg-white/10'
                                                                }`}>
                                                                <Icon className={`w-5 h-5 ${config.enabled ? 'text-[var(--color-primary)]' : 'text-gray-400'}`} />
                                                            </div>
                                                            <div>
                                                                <div className="font-bold text-white">{module.name}</div>
                                                                <div className="text-xs text-gray-400">{module.description}</div>
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={() => toggleModule(module.id)}
                                                            className={`w-14 h-7 rounded-full transition-all relative ${config.enabled ? 'bg-[var(--color-primary)]' : 'bg-gray-600'
                                                                }`}
                                                        >
                                                            <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all ${config.enabled ? 'left-8' : 'left-1'
                                                                }`} />
                                                        </button>
                                                    </div>

                                                    {/* 展開的配置選項 */}
                                                    <AnimatePresence>
                                                        {config.enabled && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: 'auto', opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                className="overflow-hidden"
                                                            >
                                                                <div className="mt-4 pt-4 border-t border-white/10 space-y-4">
                                                                    {/* 位置選擇 */}
                                                                    <div>
                                                                        <label className="text-sm text-gray-400 mb-2 block">擺放位置</label>
                                                                        <div className="flex flex-wrap gap-2">
                                                                            {module.positions.map(posId => {
                                                                                const pos = AVAILABLE_POSITIONS.find(p => p.id === posId);
                                                                                const PosIcon = IconMap[pos?.icon] || Layout;
                                                                                return (
                                                                                    <button
                                                                                        key={posId}
                                                                                        onClick={() => updatePosition(module.id, posId)}
                                                                                        className={`px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-all ${config.position === posId
                                                                                            ? 'bg-[var(--color-primary)] text-white'
                                                                                            : 'bg-white/10 text-gray-300 hover:bg-white/20'
                                                                                            }`}
                                                                                    >
                                                                                        <PosIcon className="w-4 h-4" />
                                                                                        {pos?.name || posId}
                                                                                    </button>
                                                                                );
                                                                            })}
                                                                        </div>
                                                                    </div>

                                                                    {/* 主題色選擇 */}
                                                                    <div>
                                                                        <label className="text-sm text-gray-400 mb-2 block">主題色</label>
                                                                        <div className="flex gap-2">
                                                                            {THEME_COLORS.map(theme => (
                                                                                <button
                                                                                    key={theme.id}
                                                                                    onClick={() => updateStyle(module.id, 'theme', theme.id)}
                                                                                    className={`w-8 h-8 rounded-full transition-all ${config.style?.theme === theme.id
                                                                                        ? 'ring-2 ring-white ring-offset-2 ring-offset-[var(--color-surface)]'
                                                                                        : ''
                                                                                        }`}
                                                                                    style={{ backgroundColor: theme.color }}
                                                                                    title={theme.name}
                                                                                />
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* 預覽區 */}
                                <div className="card">
                                    <h4 className="font-bold text-white mb-3">佈局預覽</h4>
                                    <ModulePreview moduleConfig={moduleConfig} />
                                </div>
                            </motion.div>
                        ) : (
                            <div className="card text-center py-16">
                                <Puzzle className="w-16 h-16 mx-auto text-gray-500 mb-4" />
                                <p className="text-gray-400">請從左側選擇一個專案</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
