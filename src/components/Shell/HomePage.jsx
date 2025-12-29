// Home Page Component - Shell Application Entry
import { motion } from 'framer-motion';
import { Sparkles, Database, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFeatureFlags } from '../../hooks/useFeatureFlags';
import DemoGrid from './DemoGrid';

export default function HomePage() {
    const { getAllDemos, demos, loading, error } = useFeatureFlags();

    // Check if Firestore has been initialized
    const needsSetup = !loading && !error && Object.keys(demos).length === 0;

    return (
        <div className="min-h-screen pt-24 pb-12 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-sm font-medium mb-6">
                        <Sparkles className="w-4 h-4" />
                        <span>Demo 作品集平台</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                        探索我的
                        <span className="bg-gradient-to-r from-[var(--color-primary)] to-purple-400 bg-clip-text text-transparent">
                            {' '}創意作品
                        </span>
                    </h1>

                    <p className="text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto">
                        精心打造的網站 Demo 作品集，展示各種現代化的設計與技術實現
                    </p>
                </motion.div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center py-16">
                        <div className="w-12 h-12 border-4 border-t-[var(--color-primary)] border-[var(--color-border)] rounded-full animate-spin" />
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">⚠️</div>
                        <h3 className="text-xl font-semibold text-white mb-2">載入失敗</h3>
                        <p className="text-[var(--color-text-muted)] mb-4">請稍後再試或聯絡管理員</p>
                        <p className="text-sm text-red-400">{error.message}</p>
                    </div>
                )}

                {/* Setup Required State */}
                {needsSetup && (
                    <motion.div
                        className="max-w-xl mx-auto"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="card text-center">
                            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                                <Database className="w-8 h-8 text-white" />
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-3">系統需要初始化</h3>
                            <p className="text-[var(--color-text-muted)] mb-6">
                                Firestore 資料庫尚未設定，請先完成初始化以啟用所有 Demo 專案。
                            </p>

                            <Link
                                to="/setup"
                                className="btn btn-primary inline-flex items-center gap-2"
                            >
                                前往初始化
                                <ArrowRight className="w-4 h-4" />
                            </Link>

                            <p className="mt-4 text-xs text-[var(--color-text-muted)]">
                                此步驟僅需執行一次
                            </p>
                        </div>
                    </motion.div>
                )}

                {/* Demo Grid */}
                {!loading && !error && !needsSetup && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                    >
                        <DemoGrid demos={getAllDemos} />
                    </motion.div>
                )}

                {/* Stats Section */}
                {!loading && !error && !needsSetup && getAllDemos.length > 0 && (
                    <motion.div
                        className="mt-20 flex justify-center gap-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                    >
                        <div className="text-center">
                            <div className="text-4xl font-bold text-[var(--color-primary)] mb-1">
                                {getAllDemos.length}
                            </div>
                            <div className="text-[var(--color-text-muted)]">作品數量</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-[var(--color-secondary)] mb-1">
                                100%
                            </div>
                            <div className="text-[var(--color-text-muted)]">自主開發</div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
