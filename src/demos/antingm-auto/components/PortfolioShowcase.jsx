import { motion, AnimatePresence } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { portfolioCases } from "../constants";

const PortfolioShowcase = () => {
    const getIcon = (iconName, className = "w-6 h-6") => {
        const IconComponent = LucideIcons[iconName];
        return IconComponent ? <IconComponent className={className} /> : null;
    };

    const handleViewCase = (url, e) => {
        e.stopPropagation();
        window.open(url, "_blank", "noopener,noreferrer");
    };

    return (
        <section id="portfolio" className="py-16 sm:py-24 md:py-32 bg-gradient-to-b from-business-800 to-business-900">
            <div className="container-wide">
                {/* 標題區 - 手机端优化 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 sm:mb-16 md:mb-20 px-6 sm:px-0"
                >
                    <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-500/20 text-primary-400 text-lg sm:text-base mb-6 backdrop-blur-sm">
                        <LucideIcons.Briefcase className="w-6 h-6 sm:w-5 sm:h-5" />
                        成功案例
                    </span>

                    <h2 className="text-[2.5rem] sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8" style={{ lineHeight: 1.2 }}>
                        看看我們的
                        <span className="text-gradient"> 作品實績</span>
                    </h2>

                    <p className="text-white/70 mx-auto text-lg sm:text-xl md:text-2xl max-w-3xl leading-relaxed">
                        每一個案例都是客戶信任的見證，點擊查看實際網站效果
                    </p>
                </motion.div>

                {/* 案例網格 - 优化手机端gap */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-6 sm:px-0">
                    <AnimatePresence mode="popLayout">
                        {portfolioCases.map((caseItem, index) => (
                            <motion.div
                                key={caseItem.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ delay: index * 0.08 }}
                                className="group cursor-pointer"
                                onClick={(e) => handleViewCase(caseItem.url, e)}
                            >
                                <div className="card hover:border-accent-500/40 transition-all duration-500 overflow-hidden p-0">
                                    {/* 圖片 */}
                                    <div className="relative aspect-[4/3] overflow-hidden bg-business-700">
                                        <img
                                            src={caseItem.image}
                                            alt={caseItem.name}
                                            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                            }}
                                        />

                                        {/* 渐变遮罩 */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-business-950 via-business-950/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                                        {/* Hover时显示的标签 */}
                                        <div className="absolute top-4 right-4 flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {caseItem.tags?.slice(0, 2).map((tag, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-3 py-1.5 text-sm rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* 内容区 - 增加padding */}
                                    <div className="p-6 sm:p-8">
                                        {/* 分类标签 */}
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${caseItem.gradient} flex items-center justify-center text-white`}>
                                                {getIcon(caseItem.icon, "w-5 h-5")}
                                            </div>
                                            <span className="text-sm text-accent-400 font-medium">
                                                {caseItem.category}
                                            </span>
                                        </div>

                                        {/* 标题 */}
                                        <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white group-hover:text-accent-400 transition-colors" style={{ lineHeight: 1.3 }}>
                                            {caseItem.name}
                                        </h3>

                                        {/* 描述 */}
                                        <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-6">
                                            {caseItem.description}
                                        </p>

                                        {/* 查看按钮 */}
                                        <div className="flex items-center gap-2 text-accent-400 font-medium text-base group-hover:gap-3 transition-all">
                                            <span>查看案例</span>
                                            <LucideIcons.ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default PortfolioShowcase;
