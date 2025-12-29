// Admin Dashboard Component
import { motion } from 'framer-motion';
import { Settings, Power, LayoutDashboard } from 'lucide-react';
import { useFeatureFlags } from '../../hooks/useFeatureFlags';
import { useAuth } from '../../hooks/useAuth';
import FeatureToggle from './FeatureToggle';

export default function Dashboard() {
    const { demos, loading, getAllDemos } = useFeatureFlags();
    const { user } = useAuth();

    const enabledCount = Object.values(demos).filter(d => d.enabled).length;
    const totalCount = Object.keys(demos).length;

    return (
        <div className="min-h-screen pt-24 pb-12 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    className="mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-purple-600 flex items-center justify-center">
                            <Settings className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white">管理後台</h1>
                            <p className="text-[var(--color-text-muted)]">
                                歡迎回來，{user?.displayName || '管理員'}
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Stats Cards */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="card">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/20 flex items-center justify-center">
                                <LayoutDashboard className="w-5 h-5 text-[var(--color-primary)]" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white">{totalCount}</div>
                                <div className="text-sm text-[var(--color-text-muted)]">總專案數</div>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-[var(--color-secondary)]/20 flex items-center justify-center">
                                <Power className="w-5 h-5 text-[var(--color-secondary)]" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white">{enabledCount}</div>
                                <div className="text-sm text-[var(--color-text-muted)]">已啟用</div>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                                <Power className="w-5 h-5 text-red-400" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white">{totalCount - enabledCount}</div>
                                <div className="text-sm text-[var(--color-text-muted)]">已停用</div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Module Config Entry */}
                <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                >
                    <a
                        href="/admin/modules"
                        className="card flex items-center gap-4 hover:bg-[var(--color-surface-hover)] transition-colors group"
                    >
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                            <LayoutDashboard className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-white group-hover:text-[var(--color-primary)] transition-colors">模組配置中心</h3>
                            <p className="text-sm text-[var(--color-text-muted)]">為每個 Demo 配置功能模組、位置與樣式</p>
                        </div>
                        <Power className="w-5 h-5 text-gray-500 group-hover:text-[var(--color-primary)] transition-colors" />
                    </a>
                </motion.div>

                {/* Feature Toggles */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        <Power className="w-5 h-5 text-[var(--color-primary)]" />
                        專案開關控制
                    </h2>

                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="w-10 h-10 border-4 border-t-[var(--color-primary)] border-[var(--color-border)] rounded-full animate-spin" />
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {Object.entries(demos)
                                .sort((a, b) => (a[1].order || 0) - (b[1].order || 0))
                                .map(([id, config]) => (
                                    <FeatureToggle key={id} demoId={id} config={config} />
                                ))}

                            {Object.keys(demos).length === 0 && (
                                <div className="text-center py-12 text-[var(--color-text-muted)]">
                                    <p>尚未設定任何專案</p>
                                    <p className="text-sm mt-2">請在 Firestore 中新增 config/features 文件</p>
                                </div>
                            )}
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
