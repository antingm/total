import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { trustSignals } from "../constants";

const TrustSignals = () => {
    // 動態獲取圖標
    const getIcon = (iconName, className = "w-8 h-8") => {
        const IconComponent = LucideIcons[iconName];
        return IconComponent ? <IconComponent className={className} /> : null;
    };

    return (
        <section id="trust" className="py-16 sm:py-32 md:py-40 bg-gradient-to-b from-business-900 to-business-800">
            <div className="container-wide px-6 sm:px-12">
                {/* 標題區 - 手机端优化 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 sm:mb-24 md:mb-32"
                >
                    <h2
                        className="text-[2.5rem] sm:text-5xl md:text-6xl font-bold mb-8 sm:mb-10"
                        style={{ lineHeight: 1.2 }}
                    >
                        為什麼我們能做到
                        <span className="text-gradient"> 「降維打擊」</span>？
                    </h2>
                    <p
                        className="text-white/70 mx-auto text-lg sm:text-xl md:text-2xl max-w-3xl leading-relaxed"
                    >
                        傳統網頁公司靠人力堆疊，我們靠 AI 驅動。
                        <br className="hidden sm:block" />
                        同樣的品質，一半的價格。
                    </p>
                </motion.div>

                {/* 信任卡片 - Grid优化 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
                    {trustSignals.map((signal, index) => (
                        <motion.div
                            key={signal.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="card group text-center hover:border-accent-500/40 transition-all duration-500"
                        >
                            {/* 圖標 - 增大并优化 */}
                            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center text-accent-400 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-accent-500/10">
                                {getIcon(signal.icon, "w-10 h-10 sm:w-12 sm:h-12")}
                            </div>

                            {/* 亮點標籤 - 增大手机端 */}
                            <div className="inline-block px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-accent-500/10 backdrop-blur-sm text-accent-400 text-lg sm:text-base font-semibold mb-5 sm:mb-6 border border-accent-500/20">
                                {signal.highlight}
                            </div>

                            {/* 標題 - 优化大小 */}
                            <h3
                                className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 group-hover:text-accent-400 transition-colors"
                                style={{ lineHeight: 1.3 }}
                            >
                                {signal.title}
                            </h3>

                            {/* 描述 - 增大字体 */}
                            <p className="text-white/70 text-lg sm:text-base leading-relaxed">
                                {signal.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustSignals;
