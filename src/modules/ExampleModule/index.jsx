import React from 'react';
import { Sparkles, CheckCircle } from 'lucide-react';

/**
 * 範例功能模組 - 專業版解鎖組件
 * 當 Demo 被標記為 pro 級別時，可以輕鬆引入此組件
 */
export default function ExampleModule({ title = "進階功能已啟用", description = "這是從共享模組池引用的功能塊" }) {
    return (
        <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
            <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-indigo-500/20 text-indigo-400">
                    <Sparkles className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                        {title}
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                    </h3>
                    <p className="text-[var(--color-text-muted)]">
                        {description}
                    </p>
                    <div className="mt-4 flex gap-2">
                        <button className="px-4 py-2 rounded-lg bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-600 transition-colors">
                            立即體驗
                        </button>
                        <button className="px-4 py-2 rounded-lg bg-white/5 text-white text-sm font-medium hover:bg-white/10 transition-colors">
                            查看文件
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
