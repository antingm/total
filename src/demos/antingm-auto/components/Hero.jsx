import { motion } from "framer-motion";
import { Sparkles, ArrowRight, TrendingUp, Clock, Shield, ChevronDown } from "lucide-react";
import { heroContent } from "../constants";

const Hero = ({ onStartDiagnosis }) => {
    return (
        <section className="relative min-h-[85vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-mesh">
            {/* 背景裝飾 */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-float" />
                <div
                    className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl animate-float"
                    style={{ animationDelay: "-3s" }}
                />
            </div>

            {/* 主內容區 - 手机端优化padding */}
            <div className="container-wide relative z-10 py-12 sm:py-32 md:py-40">
                <div className="text-center mx-auto max-w-5xl px-6 sm:px-12">

                    {/* 品牌徽章 - 增大手机端尺寸 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8 sm:mb-12"
                    >
                        <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-accent-500/10 to-primary-500/10 border border-accent-500/20 text-accent-400 text-lg sm:text-base backdrop-blur-sm">
                            <Sparkles className="w-6 h-6 sm:w-5 sm:h-5" />
                            AI 驅動的商業數位解決方案
                        </span>
                    </motion.div>

                    {/* 核心訊息 - 优化手机端行高和间距 */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mb-12 sm:mb-16"
                    >
                        <h1
                            className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 sm:mb-10"
                            style={{ lineHeight: 1.2 }}
                        >
                            別讓您的生意
                            <br className="sm:hidden" />
                            在網路上
                            <span className="text-gradient">「隱形」</span>
                        </h1>

                        {/* 副標題 - 手机端加大字体 */}
                        <p
                            className="text-xl sm:text-2xl md:text-3xl text-white/70 mx-auto leading-relaxed"
                            style={{ lineHeight: 1.6 }}
                        >
                            {heroContent.subheadline}
                        </p>
                    </motion.div>

                    {/* CTA 區塊 - 手机端质感优化 */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mb-12 sm:mb-16"
                    >
                        {/* 引導提示 - 简洁清晰 */}
                        <div className="flex items-center justify-center gap-4 mb-24 sm:mb-20">
                            <span className="w-16 h-0.5 bg-gradient-to-r from-transparent via-accent-400/40 to-accent-400/25"></span>
                            <span className="text-lg sm:text-base font-medium text-accent-400/90">
                                👆 點擊開始診斷
                            </span>
                            <span className="w-16 h-0.5 bg-gradient-to-r from-accent-400/25 via-accent-400/40 to-transparent"></span>
                        </div>

                        {/* CTA 按鈕 - 简洁有力 */}
                        <button
                            onClick={onStartDiagnosis}
                            className="group relative w-full sm:w-auto"
                        >
                            {/* 微弱发光层 */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-accent-400 to-accent-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>

                            {/* 主按钮 */}
                            <div className="relative flex items-center justify-center gap-4 px-12 py-6 sm:px-14 sm:py-7 bg-gradient-to-r from-accent-400 to-accent-600 rounded-2xl shadow-xl shadow-accent-500/30 group-hover:shadow-2xl group-hover:shadow-accent-500/40 transition-all duration-300 group-hover:-translate-y-1 cursor-pointer">
                                <span className="text-2xl sm:text-3xl font-bold text-business-900 tracking-tight">
                                    {heroContent.ctaText}
                                </span>
                                <ArrowRight className="w-8 h-8 sm:w-9 sm:h-9 text-business-900 group-hover:translate-x-2 transition-transform duration-300" />
                            </div>
                        </button>

                        {/* 信任提示 - 简洁 */}
                        <div className="flex items-center justify-center gap-2 mt-16 sm:mt-12 mb-24 sm:mb-20">
                            <svg className="w-5 h-5 sm:w-4 sm:h-4 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <p className="text-base sm:text-sm text-white/50 font-medium">
                                {heroContent.ctaSubtext}
                            </p>
                        </div>
                    </motion.div>

                    {/* 價值主張 - 横排一目了然 */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-3xl mx-auto px-4"
                    >
                        {[
                            { icon: TrendingUp, text: "省 50% 成本" },
                            { icon: Clock, text: "最快 3 天上線" },
                            { icon: Shield, text: "終身技術支援" }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + index * 0.1 }}
                                className="flex flex-col items-center gap-3 sm:gap-4 p-3 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-accent-500/30 transition-colors"
                            >
                                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-accent-500/20 to-primary-500/20 flex items-center justify-center text-accent-400 flex-shrink-0">
                                    <item.icon className="w-5 h-5 sm:w-7 sm:h-7" />
                                </div>
                                <span className="text-xs sm:text-base md:text-lg font-semibold text-white text-center leading-tight">
                                    {item.text}
                                </span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* 滾動提示 */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
            >
                <ChevronDown className="w-8 h-8 text-white/30 animate-bounce" />
            </motion.div>
        </section>
    );
};

export default Hero;
