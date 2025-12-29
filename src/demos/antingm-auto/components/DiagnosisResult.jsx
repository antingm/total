import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { planResults, portfolioCases } from "../constants";

const DiagnosisResult = ({ result, onViewDemo, onRestart }) => {
    const plan = planResults[result];
    const relatedCases = portfolioCases.filter(c => c.planType === result);

    // 動態獲取圖標
    const getIcon = (iconName, className = "w-8 h-8") => {
        const IconComponent = LucideIcons[iconName];
        return IconComponent ? <IconComponent className={className} /> : null;
    };

    // 打開案例網站
    const handleViewCase = (url) => {
        window.open(url, "_blank", "noopener,noreferrer");
    };

    return (
        <section className="min-h-screen py-20 md:py-28 bg-mesh pb-sticky-cta">
            <div className="container-narrow">
                {/* 結果標題 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-success-500/20 text-success-500 text-base font-medium mb-10">
                        <LucideIcons.CheckCircle2 className="w-5 h-5" />
                        診斷完成
                    </div>

                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                        您的最佳策略：
                    </h1>
                    <div
                        className={`inline-block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent leading-tight`}
                    >
                        【方案 {plan.id}】{plan.title}
                    </div>
                    <p className="text-white/50 mt-5 text-base sm:text-lg">
                        {plan.subtitle}
                    </p>
                    <p className="text-white/60 mt-3 text-lg sm:text-xl">
                        {plan.tagline}
                    </p>
                </motion.div>

                {/* 分析卡片 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="card-glass mb-8"
                >
                    <div className="flex items-start gap-5">
                        <div
                            className={`w-16 h-16 flex-shrink-0 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center text-white`}
                        >
                            {getIcon(plan.icon, "w-8 h-8")}
                        </div>
                        <div>
                            <h3 className="text-xl sm:text-2xl font-semibold mb-2">
                                商業解讀
                            </h3>
                            <p className="text-white/40 text-base">根據您的回答分析</p>
                        </div>
                    </div>

                    <blockquote className="text-base sm:text-lg text-white/80 leading-relaxed border-l-4 border-accent-400 pl-6 py-4 bg-white/5 rounded-r-lg">
                        {plan.analysis}
                    </blockquote>
                </motion.div>

                {/* 適合客群 */}
                {plan.targetAudience && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="card-glass mb-8"
                    >
                        <h3 className="text-lg sm:text-xl font-semibold mb-5 flex items-center gap-3">
                            <LucideIcons.Users className="w-6 h-6 text-primary-400" />
                            最適合的客群
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {plan.targetAudience.map((audience, index) => (
                                <span
                                    key={index}
                                    className="px-5 py-2.5 rounded-full bg-primary-500/10 text-primary-300 text-base font-medium border border-primary-500/20"
                                >
                                    {audience}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* 行銷賣點 */}
                {plan.sellingPoints && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.18 }}
                        className="card-glass mb-8"
                    >
                        <h3 className="text-lg sm:text-xl font-semibold mb-5 flex items-center gap-3">
                            <LucideIcons.Target className="w-6 h-6 text-accent-400" />
                            為什麼選擇此方案？
                        </h3>
                        <ul className="space-y-5">
                            {plan.sellingPoints.map((point, index) => (
                                <li key={index} className="flex items-start gap-4">
                                    <div className="w-7 h-7 flex-shrink-0 rounded-full bg-accent-500/20 flex items-center justify-center mt-0.5">
                                        <LucideIcons.Check className="w-4 h-4 text-accent-400" />
                                    </div>
                                    <span className="text-white/80 text-base sm:text-lg leading-relaxed">
                                        {point}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}

                {/* 功能亮點 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="card-glass mb-8"
                >
                    <h3 className="text-lg sm:text-xl font-semibold mb-5 flex items-center gap-3">
                        <LucideIcons.Sparkles className="w-6 h-6 text-accent-400" />
                        方案功能
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mobile-single-col">
                        {plan.features.map((feature, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-4 p-4 rounded-xl bg-white/5"
                            >
                                <div className="w-8 h-8 flex-shrink-0 rounded-full bg-success-500/20 flex items-center justify-center">
                                    <LucideIcons.Check className="w-5 h-5 text-success-500" />
                                </div>
                                <span className="text-white/80 text-base">
                                    {feature}
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* 相關案例 */}
                {relatedCases.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        className="card-glass mb-8"
                    >
                        <h3 className="text-lg sm:text-xl font-semibold mb-5 flex items-center gap-3">
                            <LucideIcons.Briefcase className="w-6 h-6 text-primary-400" />
                            相關成功案例
                        </h3>
                        <div className="space-y-4">
                            {relatedCases.map((caseItem) => (
                                <div
                                    key={caseItem.id}
                                    className="flex items-center gap-5 p-5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                                    onClick={() => handleViewCase(caseItem.url)}
                                >
                                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${caseItem.gradient} flex items-center justify-center text-white`}>
                                        {getIcon(caseItem.icon, "w-7 h-7")}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h5 className="font-semibold text-white/90 text-base mb-1">
                                            {caseItem.name}
                                        </h5>
                                        <p className="text-white/50 text-sm leading-relaxed">
                                            {caseItem.industry} · {caseItem.description}
                                        </p>
                                    </div>
                                    <LucideIcons.ExternalLink className="w-6 h-6 text-white/40 flex-shrink-0" />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* 價格區塊 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="card-glass mb-10 text-center"
                >
                    <div className="mb-6">
                        <p className="text-white/40 text-base mb-4">
                            市面行情：
                            <span className="price-strike ml-2">
                                {plan.marketPrice}
                                {plan.marketPriceNote && (
                                    <span className="text-xs"> {plan.marketPriceNote}</span>
                                )}
                            </span>
                        </p>
                        <div className="flex flex-wrap items-baseline justify-center gap-3">
                            <span className="text-white/60 text-base sm:text-lg">
                                您的專屬啟動價：
                            </span>
                            <span className="price-main">{plan.yourPrice}</span>
                            <span className="price-suffix">{plan.priceNote}</span>
                        </div>
                    </div>

                    <div className="p-5 rounded-xl bg-accent-500/10 border border-accent-500/30">
                        <p className="text-accent-300 font-medium text-base sm:text-lg">
                            💡 {plan.valueProposition}
                        </p>
                    </div>
                </motion.div>

                {/* CTA 按鈕 - 桌面版 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-5 hidden sm:block"
                >
                    <button
                        onClick={() => onViewDemo(plan)}
                        className="btn btn-primary btn-large w-full btn-glow group"
                    >
                        <LucideIcons.ExternalLink className="w-6 h-6 flex-shrink-0" />
                        <span className="truncate">看此方案 Demo：{plan.demoName}</span>
                        <LucideIcons.ArrowRight className="w-6 h-6 flex-shrink-0 transition-transform group-hover:translate-x-1" />
                    </button>

                    <button onClick={onRestart} className="btn btn-secondary w-full">
                        <LucideIcons.RotateCcw className="w-5 h-5" />
                        <span>重新診斷</span>
                    </button>
                </motion.div>

                {/* Sticky Bottom CTA - 手機版 */}
                <div className="sticky-bottom-cta sm:hidden">
                    <button
                        onClick={() => onViewDemo(plan)}
                        className="btn btn-primary w-full btn-glow group"
                    >
                        <LucideIcons.ExternalLink className="w-5 h-5 flex-shrink-0" />
                        <span className="truncate flex-1">看 Demo：{plan.demoName}</span>
                        <LucideIcons.ArrowRight className="w-5 h-5 flex-shrink-0 transition-transform group-hover:translate-x-1" />
                    </button>
                </div>

                {/* 額外說明 */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-16 text-center"
                >
                    <p className="text-white/40 text-base">
                        想了解其他方案？
                        <button
                            onClick={onRestart}
                            className="text-accent-400 hover:text-accent-300 ml-2 underline"
                        >
                            重新回答診斷問題
                        </button>
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default DiagnosisResult;
