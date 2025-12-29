import { motion } from "framer-motion";
import { ArrowLeft, Check, Sparkles, Rocket, Building2, Calendar, ShoppingCart } from "lucide-react";
import { solutionPlans } from "../constants";

const PlansPage = ({ onBack }) => {
    const getIcon = (iconName) => {
        const icons = {
            Rocket: <Rocket className="w-8 h-8" />,
            Building2: <Building2 className="w-8 h-8" />,
            Calendar: <Calendar className="w-8 h-8" />,
            ShoppingCart: <ShoppingCart className="w-8 h-8" />,
        };
        return icons[iconName] || <Sparkles className="w-8 h-8" />;
    };

    return (
        <div className="min-h-screen bg-business-950">
            {/* 返回按钮 - 固定间距 */}
            <div className="container-wide py-8">
                <button
                    onClick={onBack}
                    className="inline-flex items-center gap-3 text-white/50 hover:text-accent-400 transition-all duration-300 text-lg group"
                >
                    <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                    <span>返回首頁</span>
                </button>
            </div>

            {/* 标题区 - 使用统一的垂直间距 */}
            <div className="container-wide py-16 md:py-20">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                        style={{ lineHeight: 1.2 }}
                    >
                        選擇最適合您的
                        <span className="text-gradient"> 數位方案</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg sm:text-xl md:text-2xl text-white/60 leading-relaxed"
                    >
                        不確定選哪個？立即
                        <button
                            onClick={onBack}
                            className="text-accent-400 hover:text-accent-300 underline underline-offset-4 mx-2 font-medium transition-colors"
                        >
                            免費診斷
                        </button>
                        30 秒找到最適合您的方案
                    </motion.p>
                </div>
            </div>

            {/* 方案卡片 - Grid布局，统一间距 */}
            <div className="container-wide pb-24 md:pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
                    {solutionPlans.map((plan, index) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="card group hover:border-accent-500/40 transition-all duration-500"
                        >
                            {/* 图标和标题 - Flex布局对齐 */}
                            <div className="flex items-start gap-6 mb-8">
                                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    <div className="text-white">
                                        {getIcon(plan.icon)}
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3" style={{ lineHeight: 1.3 }}>
                                        {plan.name}
                                    </h2>
                                    <p className="text-accent-400 text-lg sm:text-xl font-medium">
                                        {plan.subtitle}
                                    </p>
                                </div>
                            </div>

                            {/* 简短描述 - 统一行高 */}
                            <p className="text-white/70 text-lg leading-relaxed mb-8">
                                {plan.description}
                            </p>

                            {/* 适合对象 - 8px间距系统 */}
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold mb-4 text-white/90">
                                    適合對象
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {plan.targetAudience.map((audience, idx) => (
                                        <span
                                            key={idx}
                                            className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/70 text-base border border-white/5 hover:border-accent-500/30 hover:bg-white/15 transition-colors"
                                        >
                                            {audience}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* 核心功能 - List间距统一 */}
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold mb-4 text-white/90">
                                    核心功能
                                </h3>
                                <ul className="space-y-3">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-white/70 text-lg">
                                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-success-500/20 flex items-center justify-center mt-0.5">
                                                <Check className="w-4 h-4 text-success-500" />
                                            </div>
                                            <span className="flex-1 leading-relaxed">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* 卖点 - 背景高亮 */}
                            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 mb-8 border border-white/10">
                                <h3 className="text-xl font-semibold mb-4 text-accent-400 flex items-center gap-2">
                                    <Sparkles className="w-6 h-6" />
                                    為什麼選擇這個方案？
                                </h3>
                                <ul className="space-y-3">
                                    {plan.sellingPoints.map((point, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-white/80 text-base leading-relaxed">
                                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-500/20 flex items-center justify-center text-accent-400 font-bold text-sm mt-0.5">
                                                {idx + 1}
                                            </span>
                                            <span className="flex-1">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* CTA按钮 - 充分padding */}
                            <button
                                onClick={onBack}
                                className="btn-primary w-full text-xl py-5 group-hover:shadow-2xl group-hover:shadow-accent-500/20 transition-shadow"
                            >
                                立即開始免費診斷
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PlansPage;
