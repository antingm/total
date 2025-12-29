import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    TrendingUp, Users, ShoppingCart, Eye,
    ArrowUpRight, ArrowDownRight, BarChart3
} from 'lucide-react';
import { getThemeVars } from '../../utils/themeUtils';

/**
 * AnalyticsModule - 統計分析儀表板模組
 * 顯示各種業務指標的統計數據
 * 支援深淺主題（透過 CSS 變數自動適應）
 */
export default function AnalyticsModule({
    title = "數據分析",
    stats = [],
    configStyle = {}
}) {
    const [animatedStats, setAnimatedStats] = useState([]);
    const themeVars = getThemeVars(configStyle?.theme);

    // 預設統計數據
    const defaultStats = [
        {
            id: 'visitors',
            label: '訪客數',
            value: 12847,
            change: 12.5,
            icon: 'Users',
            format: 'number'
        },
        {
            id: 'pageviews',
            label: '頁面瀏覽',
            value: 48392,
            change: 8.2,
            icon: 'Eye',
            format: 'number'
        },
        {
            id: 'orders',
            label: '訂單數',
            value: 847,
            change: -3.1,
            icon: 'ShoppingCart',
            format: 'number'
        },
        {
            id: 'revenue',
            label: '營收',
            value: 284750,
            change: 15.8,
            icon: 'TrendingUp',
            format: 'currency'
        }
    ];

    const displayStats = stats.length > 0 ? stats : defaultStats;

    const IconMap = {
        Users, Eye, ShoppingCart, TrendingUp, BarChart3
    };

    // 數字動畫效果
    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimatedStats(displayStats);
        }, 100);
        return () => clearTimeout(timer);
    }, [displayStats]);

    const formatValue = (value, format) => {
        if (format === 'currency') {
            return `NT$ ${value.toLocaleString()}`;
        }
        return value.toLocaleString();
    };

    return (
        <div
            className="p-6 rounded-3xl shadow-sm"
            style={{
                backgroundColor: 'var(--module-bg)',
                border: '1px solid var(--module-border)',
                '--module-accent': themeVars.accent,
                '--module-accent-bg': themeVars.accentBg
            }}
        >
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: 'var(--module-accent)' }}
                    >
                        <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold" style={{ color: 'var(--module-text)' }}>{title}</h2>
                        <p className="text-sm" style={{ color: 'var(--module-text-muted)' }}>過去 30 天</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {displayStats.map((stat, index) => {
                    const Icon = IconMap[stat.icon] || TrendingUp;
                    const isPositive = stat.change >= 0;

                    return (
                        <motion.div
                            key={stat.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-4 rounded-xl"
                            style={{
                                backgroundColor: 'var(--module-bg-subtle)',
                                border: '1px solid var(--module-border)'
                            }}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div
                                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: 'var(--module-accent)' }}
                                >
                                    <Icon className="w-5 h-5 text-white" />
                                </div>
                                <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                                    {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                    {Math.abs(stat.change)}%
                                </div>
                            </div>
                            <div className="text-2xl font-bold" style={{ color: 'var(--module-text)' }}>
                                {formatValue(stat.value, stat.format)}
                            </div>
                            <div className="text-sm" style={{ color: 'var(--module-text-muted)' }}>{stat.label}</div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
