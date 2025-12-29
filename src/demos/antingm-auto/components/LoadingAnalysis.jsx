import { motion } from "framer-motion";
import { Brain, Sparkles, TrendingUp } from "lucide-react";

const LoadingAnalysis = () => {
    return (
        <section className="min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-24 bg-mesh">
            <div className="w-full max-w-2xl mx-auto px-6 sm:px-12 md:px-16 text-center">
                {/* 主动画区 */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    {/* 旋转动画圈 */}
                    <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-8 relative">
                        {/* 外圈ping */}
                        <motion.div
                            className="absolute inset-0 rounded-full border-4 border-accent-400/30"
                            animate={{
                                scale: [1, 1.3, 1],
                                opacity: [0.6, 0, 0.6],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />

                        {/* 旋转圈 */}
                        <motion.div
                            className="absolute inset-0 rounded-full border-4 border-transparent border-t-accent-400"
                            animate={{ rotate: 360 }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        />

                        {/* 中心图标 */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                <Brain className="w-12 h-12 sm:w-16 sm:h-16 text-accent-400" />
                            </motion.div>
                        </div>
                    </div>

                    {/* 主标题 */}
                    <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
                    >
                        🧠 AI 正在分析您的需求...
                    </motion.h2>

                    {/* 副标题 */}
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-white/60 text-base sm:text-lg"
                    >
                        系統正在計算最適合的方案
                    </motion.p>
                </motion.div>

                {/* 分析步骤动画 */}
                <div className="space-y-4 max-w-md mx-auto">
                    {[
                        { icon: Sparkles, text: "分析您的業務需求", delay: 0.8 },
                        { icon: TrendingUp, text: "計算投資報酬率", delay: 1.3 },
                        { icon: Brain, text: "推薦最佳方案", delay: 1.8 },
                    ].map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: step.delay }}
                            className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10"
                        >
                            <div className="w-10 h-10 rounded-full bg-accent-500/20 flex items-center justify-center flex-shrink-0">
                                <step.icon className="w-5 h-5 text-accent-400" />
                            </div>
                            <span className="text-white/80 text-sm sm:text-base">
                                {step.text}
                            </span>
                            <motion.div
                                className="ml-auto"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: step.delay + 0.3 }}
                            >
                                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-success-500/20 flex items-center justify-center">
                                    <motion.svg
                                        className="w-4 h-4 sm:w-5 sm:h-5 text-success-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ delay: step.delay + 0.3, duration: 0.3 }}
                                    >
                                        <motion.path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </motion.svg>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LoadingAnalysis;
