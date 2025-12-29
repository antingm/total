import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { planResults, portfolioCases, solutionPlans } from "../constants";

const PlanDetailPage = ({ planId, onBack, onStartDiagnosis }) => {
    const plan = planResults[planId];
    const planInfo = solutionPlans.find(p => p.id === planId);
    const relatedCases = portfolioCases.filter(c => c.planType === planId);

    // 動態獲取圖標
    const getIcon = (iconName, className = "w-8 h-8") => {
        const IconComponent = LucideIcons[iconName];
        return IconComponent ? <IconComponent className={className} /> : null;
    };

    // 打開案例網站
    const handleViewCase = (url) => {
        window.open(url, "_blank", "noopener,noreferrer");
    };

    // 打開 Demo
    const handleViewDemo = () => {
        if (plan.demoUrl) {
            window.open(plan.demoUrl, "_blank", "noopener,noreferrer");
        }
    };

    if (!plan) {
        return (
            <section className="min-h-screen flex items-center justify-center py-16 bg-mesh">
                <div className="text-center">
                    <p className="text-white/60">找不到此方案</p>
                    <button onClick={onBack} className="btn btn-secondary mt-4">
                        返回
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-screen py-16 md:py-24 bg-mesh">
            <div className="container-narrow">
                {/* 返回按鈕 */}
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={onBack}
                    className="flex items-center gap-2 text-white/60 hover:text-white mb-10 transition-colors text-sm"
                >
                    <LucideIcons.ArrowLeft className="w-5 h-5" />
                    <span>返回方案列表</span>
                </motion.button>

                {/* 方案標題 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-14"
                >
                    <div className={`inline-flex w-20 h-20 rounded-3xl bg-gradient-to-br ${plan.color} items-center justify-center text-white mb-6`}>
                        {getIcon(plan.icon, "w-10 h-10")}
                    </div>

                    <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="px-3 py-1 rounded-full bg-white/10 text-white/60 text-sm font-medium">
                            方案 {plan.id}
                        </span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
                        <span className={`bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>
                            {plan.title}
                        </span>
                    </h1>
                    <p className="text-white/50 text-base sm:text-lg mb-2">
                        {plan.subtitle}
                    </p>
                    <p className="text-white/70 text-lg font-medium">
                        {plan.tagline}
                    </p>
                </motion.div>

                {/* 方案描述 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="card-glass mb-6"
                >
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <LucideIcons.Info className="w-5 h-5 text-primary-400" />
                        方案說明
                    </h3>
                    <p className="text-white/80 leading-relaxed">
                        {planInfo?.description || plan.analysis}
                    </p>
                </motion.div>

                {/* 適合客群 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="card-glass mb-6"
                >
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <LucideIcons.Users className="w-5 h-5 text-violet-400" />
                        最適合的客群
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {(planInfo?.targetAudience || plan.targetAudience || []).map((audience, index) => (
                            <span
                                key={index}
                                className="px-4 py-2 rounded-full bg-violet-500/10 text-violet-300 text-sm font-medium border border-violet-500/20"
                            >
                                {audience}
                            </span>
                        ))}
                    </div>
                </motion.div>

                {/* 行銷賣點 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="card-glass mb-6"
                >
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <LucideIcons.Target className="w-5 h-5 text-accent-400" />
                        為什麼選擇此方案？
                    </h3>
                    <ul className="space-y-4">
                        {(planInfo?.sellingPoints || plan.sellingPoints || []).map((point, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <div className="w-8 h-8 flex-shrink-0 rounded-full bg-accent-500/20 flex items-center justify-center">
                                    <span className="text-accent-400 font-bold text-sm">{index + 1}</span>
                                </div>
                                <span className="text-white/80 leading-relaxed pt-1">
                                    {point}
                                </span>
                            </li>
                        ))}
                    </ul>
                </motion.div>

                {/* 功能列表 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="card-glass mb-6"
                >
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <LucideIcons.Sparkles className="w-5 h-5 text-success-500" />
                        包含功能
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {(planInfo?.features || plan.features || []).map((feature, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3 p-4 rounded-xl bg-white/5"
                            >
                                <div className="w-8 h-8 flex-shrink-0 rounded-full bg-success-500/20 flex items-center justify-center">
                                    <LucideIcons.Check className="w-5 h-5 text-success-500" />
                                </div>
                                <span className="text-white/80">
                                    {feature}
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* 成功案例 */}
                {relatedCases.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="card-glass mb-6"
                    >
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <LucideIcons.Briefcase className="w-5 h-5 text-primary-400" />
                            成功案例展示
                        </h3>
                        <div className="space-y-3">
                            {relatedCases.map((caseItem) => (
                                <div
                                    key={caseItem.id}
                                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
                                    onClick={() => handleViewCase(caseItem.url)}
                                >
                                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${caseItem.gradient} flex items-center justify-center text-white`}>
                                        {getIcon(caseItem.icon, "w-7 h-7")}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h5 className="font-semibold text-white/90 group-hover:text-primary-400 transition-colors">
                                            {caseItem.name}
                                        </h5>
                                        <p className="text-white/50 text-sm">
                                            {caseItem.industry}
                                        </p>
                                        <p className="text-white/40 text-sm truncate">
                                            {caseItem.description}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 text-primary-400">
                                        <span className="text-sm hidden sm:block">查看網站</span>
                                        <LucideIcons.ExternalLink className="w-5 h-5" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* 價格區塊 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="card-glass mb-8 text-center"
                >
                    <h3 className="text-lg font-semibold mb-6">專屬方案價格</h3>
                    <div className="mb-4">
                        <p className="text-white/40 text-sm mb-3">
                            市面行情：
                            <span className="price-strike ml-2">
                                {plan.marketPrice}
                                {plan.marketPriceNote && (
                                    <span className="text-xs"> {plan.marketPriceNote}</span>
                                )}
                            </span>
                        </p>
                        <div className="flex flex-wrap items-baseline justify-center gap-2">
                            <span className="text-white/60 text-sm sm:text-base">
                                您的專屬啟動價：
                            </span>
                            <span className="price-main">{plan.yourPrice}</span>
                            <span className="price-suffix">{plan.priceNote}</span>
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-accent-500/10 border border-accent-500/30">
                        <p className="text-accent-300 font-medium">
                            💡 {plan.valueProposition}
                        </p>
                    </div>
                </motion.div>

                {/* CTA 按鈕 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-4"
                >
                    <button
                        onClick={handleViewDemo}
                        className="btn btn-primary btn-large w-full btn-glow group"
                    >
                        <LucideIcons.ExternalLink className="w-5 h-5 flex-shrink-0" />
                        <span className="truncate">查看 Demo：{plan.demoName}</span>
                        <LucideIcons.ArrowRight className="w-5 h-5 flex-shrink-0 transition-transform group-hover:translate-x-1" />
                    </button>

                    <button onClick={onStartDiagnosis} className="btn btn-secondary w-full">
                        <LucideIcons.Compass className="w-4 h-4" />
                        <span>開始免費診斷，確認是否適合</span>
                    </button>
                </motion.div>

                {/* 其他方案連結 */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-14 text-center"
                >
                    <p className="text-white/40 text-sm mb-4">
                        想了解其他方案？
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {Object.keys(planResults).filter(id => id !== planId).map((id) => {
                            const otherPlan = planResults[id];
                            return (
                                <button
                                    key={id}
                                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                    className="px-4 py-2 rounded-full bg-white/5 text-white/60 text-sm hover:bg-white/10 hover:text-white transition-colors border border-white/10"
                                >
                                    方案 {id}：{otherPlan.title}
                                </button>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default PlanDetailPage;
