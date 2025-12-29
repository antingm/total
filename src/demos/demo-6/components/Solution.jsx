import { motion } from 'framer-motion';
import { Eye, Sparkles, Shield, Flame, Quote, Award } from 'lucide-react';
import { ingredients, doctorEndorsement } from '../data/products';

const iconMap = {
    eye: Eye,
    sparkles: Sparkles,
    shield: Shield,
    flame: Flame,
};

const colorMap = {
    green: 'from-green-400 to-green-600',
    blue: 'from-blue-400 to-blue-600',
    amber: 'from-amber-400 to-amber-600',
    orange: 'from-orange-400 to-orange-600',
};

export default function Solution() {
    return (
        <section id="solution" className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* 標題區 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
                        專利科學配方
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-text-main mb-4">
                        為什麼這麼有效？
                    </h2>
                    <p className="text-text-muted text-lg max-w-2xl mx-auto">
                        嚴選四大天然成分，每一項都有專利認證與臨床實驗背書
                    </p>
                </motion.div>

                {/* 成分 Grid */}
                <div className="grid sm:grid-cols-2 gap-6 mb-16">
                    {ingredients.map((ingredient, index) => {
                        const IconComponent = iconMap[ingredient.icon] || Shield;
                        const gradientClass = colorMap[ingredient.color] || colorMap.green;

                        return (
                            <motion.div
                                key={ingredient.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="bg-surface rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all"
                            >
                                <div className="flex items-start gap-4">
                                    {/* 圓形圖標 */}
                                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${gradientClass} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                                        <IconComponent className="w-8 h-8 text-white" />
                                    </div>

                                    {/* 內容 */}
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-text-main mb-2">
                                            {ingredient.name}
                                        </h3>
                                        <p className="text-text-muted">
                                            {ingredient.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* 醫師推薦區塊 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-8 lg:p-12"
                >
                    <div className="flex flex-col lg:flex-row items-center gap-8">
                        {/* 醫師照片 */}
                        <div className="relative flex-shrink-0">
                            <div className="w-40 h-40 lg:w-48 lg:h-48 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-xl">
                                <div className="w-36 h-36 lg:w-44 lg:h-44 rounded-full bg-white/20 flex items-center justify-center">
                                    <div className="text-white text-center">
                                        <div className="text-4xl font-bold mb-1">李</div>
                                        <div className="text-sm">博士</div>
                                    </div>
                                </div>
                            </div>

                            {/* 認證徽章 */}
                            <div className="absolute -bottom-2 -right-2 w-14 h-14 bg-accent rounded-full flex items-center justify-center shadow-lg">
                                <Award className="w-7 h-7 text-white" />
                            </div>
                        </div>

                        {/* 推薦語 */}
                        <div className="flex-1 text-center lg:text-left">
                            <Quote className="w-10 h-10 text-primary/30 mb-4 mx-auto lg:mx-0" />

                            <blockquote className="text-xl lg:text-2xl text-text-main font-medium leading-relaxed mb-6">
                                {doctorEndorsement.quote}
                            </blockquote>

                            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                                <div>
                                    <p className="font-bold text-text-main text-lg">
                                        {doctorEndorsement.name}
                                    </p>
                                    <p className="text-text-muted">
                                        {doctorEndorsement.title} · {doctorEndorsement.qualification}
                                    </p>
                                </div>

                                {/* 手寫簽名模擬 */}
                                <div className="font-serif italic text-2xl text-primary/60 border-l-2 border-primary/20 pl-4">
                                    {doctorEndorsement.signature}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
