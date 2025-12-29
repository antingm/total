import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Pencil, X, Save, Plus, Check, RefreshCw,
    ShoppingCart, Calendar, Sparkles, Mail, HelpCircle,
    Star, CreditCard, Image, User, BarChart3, Trash2,
    Search, Filter, ChevronDown, Layers, Zap
} from 'lucide-react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { AVAILABLE_MODULES, THEME_COLORS, AVAILABLE_POSITIONS, MODULE_CATEGORIES } from '../../constants/moduleRegistry';

// Icon 對應表
const IconMap = {
    ShoppingCart, Calendar, Sparkles, Mail, HelpCircle,
    Star, CreditCard, Image, User, BarChart3
};

// 模組漸層色配置
const MODULE_GRADIENTS = {
    ExampleModule: { from: '#8B5CF6', to: '#EC4899', bg: 'from-violet-500/20 to-pink-500/20' },
    CartModule: { from: '#10B981', to: '#06B6D4', bg: 'from-emerald-500/20 to-cyan-500/20' },
    BookingModule: { from: '#F43F5E', to: '#F97316', bg: 'from-rose-500/20 to-orange-500/20' },
    ContactModule: { from: '#6366F1', to: '#8B5CF6', bg: 'from-indigo-500/20 to-violet-500/20' },
    FAQModule: { from: '#0EA5E9', to: '#6366F1', bg: 'from-sky-500/20 to-indigo-500/20' },
    TestimonialModule: { from: '#F59E0B', to: '#EF4444', bg: 'from-amber-500/20 to-red-500/20' },
    PricingModule: { from: '#A855F7', to: '#EC4899', bg: 'from-purple-500/20 to-pink-500/20' },
    GalleryModule: { from: '#14B8A6', to: '#3B82F6', bg: 'from-teal-500/20 to-blue-500/20' },
    AuthModule: { from: '#6366F1', to: '#06B6D4', bg: 'from-indigo-500/20 to-cyan-500/20' },
    AnalyticsModule: { from: '#8B5CF6', to: '#3B82F6', bg: 'from-violet-500/20 to-blue-500/20' }
};

/**
 * InlineEditor - 即時視覺化模組編輯器
 * 
 * 在 Demo 頁面右下角顯示浮動編輯按鈕，
 * 點擊展開模組配置面板，即時新增/編輯模組。
 * 
 * @param {string} demoId - Demo 的 ID
 * @param {object} moduleConfig - 當前模組配置
 * @param {function} onConfigChange - 配置變更回調
 * @param {boolean} isAdmin - 是否為管理員
 * @param {string[]} builtInFeatures - 網站已內建的功能模組 ID 列表
 */
export default function InlineEditor({
    demoId,
    moduleConfig = {},
    onConfigChange,
    isAdmin = true,
    builtInFeatures = []
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [localConfig, setLocalConfig] = useState(() => moduleConfig || {});
    const [saving, setSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [selectedModule, setSelectedModule] = useState(null);

    // 新增：搜尋和篩選狀態
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

    // 新增：Toast 提示狀態
    const [toast, setToast] = useState(null);

    const isLocalChange = useRef(false);
    const prevRemoteConfig = useRef(moduleConfig);
    const dropdownRef = useRef(null);
    const toastTimeoutRef = useRef(null);

    // 顯示 Toast 提示
    const showToast = (message, type = 'success') => {
        if (toastTimeoutRef.current) {
            clearTimeout(toastTimeoutRef.current);
        }
        setToast({ message, type });
        toastTimeoutRef.current = setTimeout(() => {
            setToast(null);
        }, 3000);
    };

    // 點擊外部關閉下拉選單
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowCategoryDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // 篩選後的模組
    const filteredModules = useMemo(() => {
        return AVAILABLE_MODULES.filter(module => {
            const matchesSearch = module.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                module.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || module.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    // 內建功能模組（網站本身已有的功能）
    const builtInModules = useMemo(() =>
        filteredModules.filter(m => builtInFeatures.includes(m.id)),
        [filteredModules, builtInFeatures]
    );

    // 已啟用的模組（排除內建的）
    const enabledModules = useMemo(() =>
        filteredModules.filter(m => localConfig[m.id]?.enabled && !builtInFeatures.includes(m.id)),
        [filteredModules, localConfig, builtInFeatures]
    );

    // 可新增的模組（排除內建和已啟用的）
    const disabledModules = useMemo(() =>
        filteredModules.filter(m => !localConfig[m.id]?.enabled && !builtInFeatures.includes(m.id)),
        [filteredModules, localConfig, builtInFeatures]
    );

    // 只在遠端配置真正變更時同步（且不是編輯中）
    useEffect(() => {
        if (isLocalChange.current) {
            isLocalChange.current = false;
            return;
        }

        const remoteStr = JSON.stringify(moduleConfig);
        const prevStr = JSON.stringify(prevRemoteConfig.current);

        if (remoteStr !== prevStr && !isEditing) {
            setLocalConfig(moduleConfig || {});
            prevRemoteConfig.current = moduleConfig;
        }
    }, [moduleConfig, isEditing]);

    const startEditing = () => {
        setLocalConfig({ ...(moduleConfig || {}) });
        setIsEditing(true);
        setIsOpen(true);
    };

    const cancelEditing = () => {
        setLocalConfig(moduleConfig || {});
        setIsEditing(false);
        setSelectedModule(null);
        setSearchQuery('');
        setSelectedCategory('all');
        isLocalChange.current = true;
        onConfigChange?.(moduleConfig);
    };

    const toggleModule = (moduleId) => {
        const newConfig = { ...localConfig };
        const moduleDef = AVAILABLE_MODULES.find(m => m.id === moduleId);

        if (newConfig[moduleId]?.enabled) {
            // 移除模組
            newConfig[moduleId] = { ...newConfig[moduleId], enabled: false };
            showToast(`✕ 已移除「${moduleDef?.name || moduleId}」`, 'remove');
        } else {
            // 新增模組
            const defaultPosition = moduleDef?.positions[0] || 'main';
            const positionLabels = {
                'floating': '浮動按鈕（右下角）',
                'header': '頁首區',
                'main': '主內容區',
                'sidebar': '側邊欄',
                'footer': '頁尾區'
            };
            const positionLabel = positionLabels[defaultPosition] || defaultPosition;

            newConfig[moduleId] = {
                enabled: true,
                position: defaultPosition,
                order: Object.keys(newConfig).filter(k => newConfig[k]?.enabled).length + 1,
                style: moduleDef?.defaultStyle || { theme: 'indigo' }
            };

            showToast(`✓ 已新增「${moduleDef?.name}」到 ${positionLabel}`, 'success');

            // 自動展開該模組的設定面板
            setSelectedModule(moduleId);
        }

        setLocalConfig(newConfig);
        isLocalChange.current = true;
        onConfigChange?.(newConfig);
    };

    const updateModuleSetting = (moduleId, key, value) => {
        const newConfig = {
            ...localConfig,
            [moduleId]: {
                ...localConfig[moduleId],
                [key]: value
            }
        };
        setLocalConfig(newConfig);
        isLocalChange.current = true;
        onConfigChange?.(newConfig);
    };

    const updateModuleStyle = (moduleId, styleKey, value) => {
        const newConfig = {
            ...localConfig,
            [moduleId]: {
                ...localConfig[moduleId],
                style: {
                    ...localConfig[moduleId]?.style,
                    [styleKey]: value
                }
            }
        };
        setLocalConfig(newConfig);
        isLocalChange.current = true;
        onConfigChange?.(newConfig);
    };

    // 更新模組內容（標題、服務項目等）
    const updateModuleContent = (moduleId, contentKey, value) => {
        const newConfig = {
            ...localConfig,
            [moduleId]: {
                ...localConfig[moduleId],
                content: {
                    ...localConfig[moduleId]?.content,
                    [contentKey]: value
                }
            }
        };
        setLocalConfig(newConfig);
        isLocalChange.current = true;
        onConfigChange?.(newConfig);
    };

    const handleSave = async () => {
        if (!demoId) return;

        setSaving(true);
        try {
            const enabledModuleIds = Object.entries(localConfig)
                .filter(([_, config]) => config.enabled)
                .map(([id]) => id);

            await updateDoc(doc(db, 'config', 'features'), {
                [`demos.${demoId}.moduleConfig`]: localConfig,
                [`demos.${demoId}.activeModules`]: enabledModuleIds
            });

            setSaveSuccess(true);
            setIsEditing(false);
            setTimeout(() => setSaveSuccess(false), 2000);
        } catch (error) {
            console.error('儲存失敗:', error);
            alert('儲存失敗：' + error.message);
        } finally {
            setSaving(false);
        }
    };

    if (!isAdmin) return null;

    const totalEnabled = AVAILABLE_MODULES.filter(m => localConfig[m.id]?.enabled).length;
    const currentCategoryName = MODULE_CATEGORIES.find(c => c.id === selectedCategory)?.name || '全部';

    return (
        <>
            {/* 浮動編輯按鈕 */}
            <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3">
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="w-96 max-h-[80vh] overflow-hidden rounded-3xl shadow-2xl"
                            style={{
                                background: 'linear-gradient(180deg, rgba(17,24,39,0.98) 0%, rgba(31,41,55,0.98) 100%)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(139,92,246,0.3)'
                            }}
                        >
                            {/* 標題列 - 漸層背景 */}
                            <div
                                className="p-5 relative overflow-hidden"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(139,92,246,0.2) 0%, rgba(236,72,153,0.2) 100%)'
                                }}
                            >
                                {/* 裝飾光暈 */}
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />
                                <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-pink-500/20 rounded-full blur-3xl" />

                                <div className="relative flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <motion.div
                                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                                            style={{
                                                background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)'
                                            }}
                                            animate={{ rotate: [0, 5, -5, 0] }}
                                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                                        >
                                            <Layers className="w-5 h-5 text-white" />
                                        </motion.div>
                                        <div>
                                            <h3 className="font-bold text-white text-lg">模組編輯器</h3>
                                            <p className="text-xs text-purple-300/70">已啟用 {totalEnabled} 個模組</p>
                                        </div>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.1, rotate: 90 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setIsOpen(false)}
                                        className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-300 transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </motion.button>
                                </div>
                            </div>

                            {/* 搜尋和篩選區 */}
                            <div className="px-4 py-3 border-b border-white/5 space-y-3">
                                {/* 搜尋框 */}
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="搜尋模組..."
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all"
                                    />
                                    {searchQuery && (
                                        <motion.button
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            onClick={() => setSearchQuery('')}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gray-600 flex items-center justify-center hover:bg-gray-500 transition-colors"
                                        >
                                            <X className="w-3 h-3 text-gray-300" />
                                        </motion.button>
                                    )}
                                </div>

                                {/* 分類篩選 */}
                                <div className="relative" ref={dropdownRef}>
                                    <button
                                        onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                                        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300 hover:bg-white/10 hover:border-purple-500/30 transition-all"
                                    >
                                        <Filter className="w-4 h-4 text-purple-400" />
                                        <span>{currentCategoryName}</span>
                                        <ChevronDown className={`w-4 h-4 transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} />
                                    </button>

                                    <AnimatePresence>
                                        {showCategoryDropdown && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="absolute top-full left-0 mt-2 w-48 py-2 rounded-xl bg-gray-800 border border-gray-700 shadow-xl z-10"
                                            >
                                                {MODULE_CATEGORIES.map(category => (
                                                    <button
                                                        key={category.id}
                                                        onClick={() => {
                                                            setSelectedCategory(category.id);
                                                            setShowCategoryDropdown(false);
                                                        }}
                                                        className={`w-full px-4 py-2 text-left text-sm transition-colors ${selectedCategory === category.id
                                                            ? 'bg-purple-500/20 text-purple-300'
                                                            : 'text-gray-300 hover:bg-white/5'
                                                            }`}
                                                    >
                                                        {category.name}
                                                    </button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            {/* 內容區 */}
                            <div className="p-4 max-h-[45vh] overflow-y-auto custom-scrollbar">
                                {/* 內建功能 - 網站本身已有的功能 */}
                                {builtInModules.length > 0 && (
                                    <div className="mb-6">
                                        <div className="flex items-center justify-center gap-2 mb-4">
                                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
                                            <div className="flex items-center gap-2 px-3">
                                                <div className="w-2 h-2 rounded-full bg-blue-400" />
                                                <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider">已內建</h4>
                                                <span className="text-xs text-blue-400/60">({builtInModules.length})</span>
                                            </div>
                                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
                                        </div>
                                        <div className="space-y-2">
                                            {builtInModules.map((module, index) => {
                                                const Icon = IconMap[module.icon] || Sparkles;
                                                const gradient = MODULE_GRADIENTS[module.id] || MODULE_GRADIENTS.ExampleModule;

                                                return (
                                                    <motion.div
                                                        key={module.id}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: index * 0.05 }}
                                                        className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 relative overflow-hidden opacity-60 cursor-not-allowed"
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-3">
                                                                <div
                                                                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                                                                    style={{
                                                                        background: `linear-gradient(135deg, ${gradient.from}40 0%, ${gradient.to}40 100%)`
                                                                    }}
                                                                >
                                                                    <Icon className="w-5 h-5 text-gray-400" />
                                                                </div>
                                                                <div>
                                                                    <span className="font-semibold text-gray-400 text-sm block">{module.name}</span>
                                                                    <span className="text-xs text-gray-600">網站已內建此功能</span>
                                                                </div>
                                                            </div>
                                                            <div className="px-2 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20">
                                                                <span className="text-xs text-blue-400 font-medium">已內建</span>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* 已啟用的模組 */}
                                {enabledModules.length > 0 && (
                                    <div className="mb-6">
                                        <div className="flex items-center justify-center gap-2 mb-4">
                                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
                                            <div className="flex items-center gap-2 px-3">
                                                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">已啟用</h4>
                                                <span className="text-xs text-emerald-400/60">({enabledModules.length})</span>
                                            </div>
                                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
                                        </div>
                                        <div className="space-y-2">
                                            {enabledModules.map((module, index) => {
                                                const Icon = IconMap[module.icon] || Sparkles;
                                                const config = localConfig[module.id] || {};
                                                const isSelected = selectedModule === module.id;
                                                const gradient = MODULE_GRADIENTS[module.id] || MODULE_GRADIENTS.ExampleModule;

                                                return (
                                                    <motion.div
                                                        key={module.id}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: index * 0.05 }}
                                                    >
                                                        <motion.div
                                                            whileHover={{ scale: 1.01 }}
                                                            whileTap={{ scale: 0.99 }}
                                                            className={`p-3 rounded-2xl cursor-pointer transition-all relative overflow-hidden ${isSelected
                                                                ? 'ring-2 ring-purple-500'
                                                                : 'hover:bg-white/5'
                                                                }`}
                                                            style={{
                                                                background: isSelected
                                                                    ? `linear-gradient(135deg, ${gradient.from}15 0%, ${gradient.to}15 100%)`
                                                                    : 'rgba(255,255,255,0.02)'
                                                            }}
                                                            onClick={() => setSelectedModule(isSelected ? null : module.id)}
                                                        >
                                                            <div className="flex items-center justify-between relative z-10">
                                                                <div className="flex items-center gap-3">
                                                                    <div
                                                                        className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                                                                        style={{
                                                                            background: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`
                                                                        }}
                                                                    >
                                                                        <Icon className="w-5 h-5 text-white" />
                                                                    </div>
                                                                    <div>
                                                                        <span className="font-semibold text-white text-sm block">{module.name}</span>
                                                                        <span className="text-xs text-gray-500">{module.description.slice(0, 20)}...</span>
                                                                    </div>
                                                                </div>
                                                                <motion.button
                                                                    whileHover={{ scale: 1.1 }}
                                                                    whileTap={{ scale: 0.9 }}
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        toggleModule(module.id);
                                                                    }}
                                                                    className="w-8 h-8 rounded-xl bg-red-500/10 flex items-center justify-center hover:bg-red-500/30 transition-colors group"
                                                                >
                                                                    <Trash2 className="w-4 h-4 text-red-400 group-hover:text-red-300" />
                                                                </motion.button>
                                                            </div>
                                                        </motion.div>

                                                        {/* 展開的設定面板 */}
                                                        <AnimatePresence>
                                                            {isSelected && (
                                                                <motion.div
                                                                    initial={{ height: 0, opacity: 0 }}
                                                                    animate={{ height: 'auto', opacity: 1 }}
                                                                    exit={{ height: 0, opacity: 0 }}
                                                                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                                                                    className="overflow-hidden"
                                                                >
                                                                    <div className="p-4 mt-2 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                                                                        {/* 位置選擇 */}
                                                                        <div>
                                                                            <label className="text-xs font-medium text-gray-400 mb-2 block">顯示位置</label>
                                                                            <div className="flex flex-wrap gap-2">
                                                                                {module.positions.map(pos => (
                                                                                    <motion.button
                                                                                        key={pos}
                                                                                        whileHover={{ scale: 1.05 }}
                                                                                        whileTap={{ scale: 0.95 }}
                                                                                        onClick={() => updateModuleSetting(module.id, 'position', pos)}
                                                                                        className={`px-3 py-1.5 text-xs rounded-lg transition-all ${config.position === pos
                                                                                            ? 'text-white shadow-lg'
                                                                                            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-300'
                                                                                            }`}
                                                                                        style={config.position === pos ? {
                                                                                            background: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`
                                                                                        } : {}}
                                                                                    >
                                                                                        {AVAILABLE_POSITIONS.find(p => p.id === pos)?.name || pos}
                                                                                    </motion.button>
                                                                                ))}
                                                                            </div>
                                                                        </div>

                                                                        {/* 主題色選擇 */}
                                                                        <div>
                                                                            <label className="text-xs font-medium text-gray-400 mb-2 block">主題色彩</label>
                                                                            <div className="flex gap-2">
                                                                                {THEME_COLORS.map(theme => (
                                                                                    <motion.button
                                                                                        key={theme.id}
                                                                                        whileHover={{ scale: 1.15 }}
                                                                                        whileTap={{ scale: 0.9 }}
                                                                                        onClick={() => updateModuleStyle(module.id, 'theme', theme.id)}
                                                                                        className={`w-7 h-7 rounded-full transition-all shadow-lg ${config.style?.theme === theme.id
                                                                                            ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-900 scale-110'
                                                                                            : 'hover:ring-2 hover:ring-white/30'
                                                                                            }`}
                                                                                        style={{
                                                                                            backgroundColor: theme.color,
                                                                                            boxShadow: `0 4px 12px ${theme.color}40`
                                                                                        }}
                                                                                        title={theme.name}
                                                                                    />
                                                                                ))}
                                                                            </div>
                                                                        </div>

                                                                        {/* 內容編輯區塊 */}
                                                                        {module.editableFields && module.editableFields.length > 0 && (
                                                                            <div className="pt-3 border-t border-white/10">
                                                                                <label className="text-xs font-medium text-gray-400 mb-3 flex items-center gap-2">
                                                                                    <span className="text-purple-400">✎</span>
                                                                                    內容編輯
                                                                                </label>
                                                                                <div className="space-y-3">
                                                                                    {module.editableFields.map(field => {
                                                                                        const currentValue = config.content?.[field.key] ?? field.default;

                                                                                        // 文字欄位
                                                                                        if (field.type === 'text') {
                                                                                            return (
                                                                                                <div key={field.key}>
                                                                                                    <label className="text-xs text-gray-500 mb-1 block">{field.label}</label>
                                                                                                    <input
                                                                                                        type="text"
                                                                                                        value={currentValue || ''}
                                                                                                        onChange={(e) => updateModuleContent(module.id, field.key, e.target.value)}
                                                                                                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:border-purple-500 focus:outline-none transition-colors"
                                                                                                        placeholder={field.default || `輸入${field.label}...`}
                                                                                                    />
                                                                                                </div>
                                                                                            );
                                                                                        }

                                                                                        // 長文字欄位
                                                                                        if (field.type === 'textarea') {
                                                                                            return (
                                                                                                <div key={field.key}>
                                                                                                    <label className="text-xs text-gray-500 mb-1 block">{field.label}</label>
                                                                                                    <textarea
                                                                                                        value={currentValue || ''}
                                                                                                        onChange={(e) => updateModuleContent(module.id, field.key, e.target.value)}
                                                                                                        rows={2}
                                                                                                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:border-purple-500 focus:outline-none transition-colors resize-none"
                                                                                                        placeholder={field.default || `輸入${field.label}...`}
                                                                                                    />
                                                                                                </div>
                                                                                            );
                                                                                        }

                                                                                        // 數字欄位
                                                                                        if (field.type === 'number') {
                                                                                            return (
                                                                                                <div key={field.key}>
                                                                                                    <label className="text-xs text-gray-500 mb-1 block">{field.label}</label>
                                                                                                    <input
                                                                                                        type="number"
                                                                                                        value={currentValue || field.default}
                                                                                                        min={field.min}
                                                                                                        max={field.max}
                                                                                                        onChange={(e) => updateModuleContent(module.id, field.key, parseInt(e.target.value))}
                                                                                                        className="w-24 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:border-purple-500 focus:outline-none transition-colors"
                                                                                                    />
                                                                                                </div>
                                                                                            );
                                                                                        }

                                                                                        // 服務列表（預約系統用）
                                                                                        if (field.type === 'serviceList') {
                                                                                            const services = Array.isArray(currentValue) ? currentValue : field.default;
                                                                                            return (
                                                                                                <div key={field.key}>
                                                                                                    <label className="text-xs text-gray-500 mb-2 block">{field.label}</label>
                                                                                                    <div className="space-y-2">
                                                                                                        {services.map((service, idx) => (
                                                                                                            <div key={idx} className="flex items-center gap-2 bg-white/5 rounded-lg p-2">
                                                                                                                <input
                                                                                                                    type="text"
                                                                                                                    value={service.name}
                                                                                                                    onChange={(e) => {
                                                                                                                        const updated = [...services];
                                                                                                                        updated[idx] = { ...updated[idx], name: e.target.value };
                                                                                                                        updateModuleContent(module.id, field.key, updated);
                                                                                                                    }}
                                                                                                                    className="flex-1 px-2 py-1 bg-transparent border-b border-white/10 text-white text-xs focus:border-purple-500 focus:outline-none"
                                                                                                                    placeholder="服務名稱"
                                                                                                                />
                                                                                                                <div className="flex items-center gap-1">
                                                                                                                    <span className="text-gray-500 text-xs">$</span>
                                                                                                                    <input
                                                                                                                        type="number"
                                                                                                                        value={service.price}
                                                                                                                        onChange={(e) => {
                                                                                                                            const updated = [...services];
                                                                                                                            updated[idx] = { ...updated[idx], price: parseInt(e.target.value) || 0 };
                                                                                                                            updateModuleContent(module.id, field.key, updated);
                                                                                                                        }}
                                                                                                                        className="w-16 px-1 py-1 bg-transparent border-b border-white/10 text-white text-xs focus:border-purple-500 focus:outline-none"
                                                                                                                    />
                                                                                                                </div>
                                                                                                                <button
                                                                                                                    onClick={() => {
                                                                                                                        const updated = services.filter((_, i) => i !== idx);
                                                                                                                        updateModuleContent(module.id, field.key, updated);
                                                                                                                    }}
                                                                                                                    className="p-1 text-rose-400 hover:text-rose-300"
                                                                                                                >
                                                                                                                    <X className="w-3 h-3" />
                                                                                                                </button>
                                                                                                            </div>
                                                                                                        ))}
                                                                                                        <button
                                                                                                            onClick={() => {
                                                                                                                const newId = Math.max(...services.map(s => s.id), 0) + 1;
                                                                                                                updateModuleContent(module.id, field.key, [...services, { id: newId, name: '新服務', price: 0, duration: 60 }]);
                                                                                                            }}
                                                                                                            className="w-full py-1.5 text-xs text-purple-400 hover:text-purple-300 border border-dashed border-purple-500/30 rounded-lg hover:border-purple-500/50 transition-colors"
                                                                                                        >
                                                                                                            + 新增服務
                                                                                                        </button>
                                                                                                    </div>
                                                                                                </div>
                                                                                            );
                                                                                        }

                                                                                        // 服務人員列表
                                                                                        if (field.type === 'staffList') {
                                                                                            const staff = Array.isArray(currentValue) ? currentValue : field.default;
                                                                                            return (
                                                                                                <div key={field.key}>
                                                                                                    <label className="text-xs text-gray-500 mb-2 block">{field.label}</label>
                                                                                                    <div className="flex flex-wrap gap-2">
                                                                                                        {staff.map((person, idx) => (
                                                                                                            <div key={idx} className="flex items-center gap-1 bg-white/5 rounded-full px-3 py-1">
                                                                                                                <input
                                                                                                                    type="text"
                                                                                                                    value={person.name}
                                                                                                                    onChange={(e) => {
                                                                                                                        const updated = [...staff];
                                                                                                                        updated[idx] = { ...updated[idx], name: e.target.value };
                                                                                                                        updateModuleContent(module.id, field.key, updated);
                                                                                                                    }}
                                                                                                                    className="w-20 bg-transparent text-white text-xs focus:outline-none"
                                                                                                                />
                                                                                                                <button
                                                                                                                    onClick={() => {
                                                                                                                        const updated = staff.filter((_, i) => i !== idx);
                                                                                                                        updateModuleContent(module.id, field.key, updated);
                                                                                                                    }}
                                                                                                                    className="text-rose-400 hover:text-rose-300"
                                                                                                                >
                                                                                                                    <X className="w-3 h-3" />
                                                                                                                </button>
                                                                                                            </div>
                                                                                                        ))}
                                                                                                        <button
                                                                                                            onClick={() => {
                                                                                                                const newId = Math.max(...staff.map(s => s.id), 0) + 1;
                                                                                                                updateModuleContent(module.id, field.key, [...staff, { id: newId, name: '新人員' }]);
                                                                                                            }}
                                                                                                            className="px-3 py-1 text-xs text-purple-400 hover:text-purple-300 border border-dashed border-purple-500/30 rounded-full hover:border-purple-500/50 transition-colors"
                                                                                                        >
                                                                                                            +
                                                                                                        </button>
                                                                                                    </div>
                                                                                                </div>
                                                                                            );
                                                                                        }

                                                                                        // FAQ 問答列表
                                                                                        if (field.type === 'faqList') {
                                                                                            const items = Array.isArray(currentValue) ? currentValue : field.default;
                                                                                            return (
                                                                                                <div key={field.key}>
                                                                                                    <label className="text-xs text-gray-500 mb-2 block">{field.label}</label>
                                                                                                    <div className="space-y-2">
                                                                                                        {items.map((item, idx) => (
                                                                                                            <div key={idx} className="bg-white/5 rounded-lg p-2 space-y-2">
                                                                                                                <div className="flex items-start gap-2">
                                                                                                                    <span className="text-purple-400 text-xs mt-1">Q</span>
                                                                                                                    <input
                                                                                                                        type="text"
                                                                                                                        value={item.question}
                                                                                                                        onChange={(e) => {
                                                                                                                            const updated = [...items];
                                                                                                                            updated[idx] = { ...updated[idx], question: e.target.value };
                                                                                                                            updateModuleContent(module.id, field.key, updated);
                                                                                                                        }}
                                                                                                                        className="flex-1 px-2 py-1 bg-transparent border-b border-white/10 text-white text-xs focus:border-purple-500 focus:outline-none"
                                                                                                                        placeholder="問題"
                                                                                                                    />
                                                                                                                    <button
                                                                                                                        onClick={() => {
                                                                                                                            const updated = items.filter((_, i) => i !== idx);
                                                                                                                            updateModuleContent(module.id, field.key, updated);
                                                                                                                        }}
                                                                                                                        className="p-1 text-rose-400 hover:text-rose-300"
                                                                                                                    >
                                                                                                                        <X className="w-3 h-3" />
                                                                                                                    </button>
                                                                                                                </div>
                                                                                                                <div className="flex items-start gap-2 pl-4">
                                                                                                                    <span className="text-emerald-400 text-xs mt-1">A</span>
                                                                                                                    <textarea
                                                                                                                        value={item.answer}
                                                                                                                        onChange={(e) => {
                                                                                                                            const updated = [...items];
                                                                                                                            updated[idx] = { ...updated[idx], answer: e.target.value };
                                                                                                                            updateModuleContent(module.id, field.key, updated);
                                                                                                                        }}
                                                                                                                        rows={2}
                                                                                                                        className="flex-1 px-2 py-1 bg-transparent border border-white/10 rounded text-white text-xs focus:border-purple-500 focus:outline-none resize-none"
                                                                                                                        placeholder="答案"
                                                                                                                    />
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        ))}
                                                                                                        <button
                                                                                                            onClick={() => {
                                                                                                                updateModuleContent(module.id, field.key, [...items, { question: '新問題', answer: '' }]);
                                                                                                            }}
                                                                                                            className="w-full py-1.5 text-xs text-purple-400 hover:text-purple-300 border border-dashed border-purple-500/30 rounded-lg hover:border-purple-500/50 transition-colors"
                                                                                                        >
                                                                                                            + 新增問答
                                                                                                        </button>
                                                                                                    </div>
                                                                                                </div>
                                                                                            );
                                                                                        }

                                                                                        return null;
                                                                                    })}
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* 可新增的模組 */}
                                {disabledModules.length > 0 && (
                                    <div>
                                        <div className="flex items-center justify-center gap-2 mb-4">
                                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                                            <div className="flex items-center gap-2 px-3">
                                                <Plus className="w-4 h-4 text-purple-400" />
                                                <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider">點擊新增到網站</h4>
                                            </div>
                                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            {disabledModules.map((module, index) => {
                                                const Icon = IconMap[module.icon] || Sparkles;
                                                const gradient = MODULE_GRADIENTS[module.id] || MODULE_GRADIENTS.ExampleModule;

                                                return (
                                                    <motion.button
                                                        key={module.id}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: index * 0.03 }}
                                                        whileHover={{ scale: 1.03, y: -3 }}
                                                        whileTap={{ scale: 0.97 }}
                                                        onClick={() => toggleModule(module.id)}
                                                        className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-purple-500/40 transition-all group text-center relative overflow-hidden"
                                                    >
                                                        {/* 懸停時的漸層背景 */}
                                                        <div
                                                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                            style={{
                                                                background: `linear-gradient(135deg, ${gradient.from}15 0%, ${gradient.to}15 100%)`
                                                            }}
                                                        />

                                                        <div className="relative z-10 flex flex-col items-center">
                                                            <div
                                                                className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg mx-auto"
                                                                style={{
                                                                    background: `linear-gradient(135deg, ${gradient.from}30 0%, ${gradient.to}30 100%)`,
                                                                }}
                                                            >
                                                                <Icon
                                                                    className="w-6 h-6 transition-colors duration-300"
                                                                    style={{ color: gradient.from }}
                                                                />
                                                            </div>
                                                            <div className="text-sm font-semibold text-white mb-1">{module.name}</div>
                                                            <div className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{module.description}</div>
                                                        </div>

                                                        {/* 新增按鈕指示 - 懸停時顯示 */}
                                                        <div className="absolute inset-x-0 -bottom-8 group-hover:bottom-2 transition-all duration-300 flex justify-center">
                                                            <div
                                                                className="px-3 py-1 rounded-full text-xs font-medium text-white flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                                style={{ background: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)` }}
                                                            >
                                                                <Plus className="w-3 h-3" />
                                                                新增
                                                            </div>
                                                        </div>
                                                    </motion.button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* 無搜尋結果 */}
                                {filteredModules.length === 0 && (
                                    <div className="py-12 text-center">
                                        <Search className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                                        <p className="text-gray-500 text-sm">找不到符合的模組</p>
                                        <button
                                            onClick={() => {
                                                setSearchQuery('');
                                                setSelectedCategory('all');
                                            }}
                                            className="mt-3 text-purple-400 text-sm hover:text-purple-300 transition-colors"
                                        >
                                            清除篩選條件
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* 底部操作按鈕 */}
                            <div
                                className="p-4 flex gap-3"
                                style={{
                                    background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 100%)',
                                    borderTop: '1px solid rgba(255,255,255,0.05)'
                                }}
                            >
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={cancelEditing}
                                    className="flex-1 py-3 rounded-xl bg-white/5 text-gray-400 font-medium hover:bg-white/10 hover:text-gray-300 transition-all border border-white/10"
                                >
                                    取消
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="flex-1 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all text-white shadow-lg"
                                    style={{
                                        background: saveSuccess
                                            ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                                            : 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
                                        boxShadow: saveSuccess
                                            ? '0 4px 20px rgba(16,185,129,0.4)'
                                            : '0 4px 20px rgba(139,92,246,0.4)'
                                    }}
                                >
                                    {saving ? (
                                        <RefreshCw className="w-4 h-4 animate-spin" />
                                    ) : saveSuccess ? (
                                        <Check className="w-4 h-4" />
                                    ) : (
                                        <Save className="w-4 h-4" />
                                    )}
                                    {saveSuccess ? '已儲存' : '儲存'}
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* 主按鈕 */}
                <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => isOpen ? setIsOpen(false) : startEditing()}
                    className="w-14 h-14 rounded-2xl shadow-2xl flex items-center justify-center transition-all relative overflow-hidden"
                    style={{
                        background: isOpen
                            ? 'linear-gradient(135deg, #374151 0%, #1F2937 100%)'
                            : 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
                        boxShadow: isOpen
                            ? '0 4px 20px rgba(0,0,0,0.3)'
                            : '0 4px 30px rgba(139,92,246,0.5)'
                    }}
                >
                    {/* 光暈效果 */}
                    {!isOpen && (
                        <motion.div
                            className="absolute inset-0 rounded-2xl"
                            animate={{
                                boxShadow: [
                                    '0 0 20px rgba(139,92,246,0.4)',
                                    '0 0 40px rgba(236,72,153,0.4)',
                                    '0 0 20px rgba(139,92,246,0.4)'
                                ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    )}
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ type: 'spring', damping: 15 }}
                    >
                        {isOpen ? (
                            <X className="w-6 h-6 text-white" />
                        ) : (
                            <Pencil className="w-6 h-6 text-white" />
                        )}
                    </motion.div>
                </motion.button>

                {/* 啟用數量指示 */}
                {!isOpen && totalEnabled > 0 && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center shadow-lg"
                        style={{ boxShadow: '0 2px 8px rgba(16,185,129,0.5)' }}
                    >
                        {totalEnabled}
                    </motion.div>
                )}
            </div>

            {/* 自定義滾動條樣式 */}
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(139,92,246,0.3);
                    border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(139,92,246,0.5);
                }
            `}</style>

            {/* Toast 提示 */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: 20, x: '-50%' }}
                        className={`fixed bottom-24 left-1/2 z-[200] px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-xl flex items-center gap-3 ${toast.type === 'success'
                            ? 'bg-emerald-500/90 text-white'
                            : toast.type === 'remove'
                                ? 'bg-rose-500/90 text-white'
                                : 'bg-gray-800/90 text-white'
                            }`}
                        style={{
                            boxShadow: toast.type === 'success'
                                ? '0 8px 32px rgba(16,185,129,0.4)'
                                : toast.type === 'remove'
                                    ? '0 8px 32px rgba(244,63,94,0.4)'
                                    : '0 8px 32px rgba(0,0,0,0.4)'
                        }}
                    >
                        <span className="text-sm font-medium whitespace-nowrap">{toast.message}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
