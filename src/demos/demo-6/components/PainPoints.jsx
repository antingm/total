import { motion } from 'framer-motion';
import { X, Thermometer, Moon, UtensilsCrossed, ShieldAlert, AlertTriangle, ArrowRight } from 'lucide-react';
import { painPoints } from '../data/products';

const iconMap = {
    thermometer: Thermometer,
    moon: Moon,
    utensils: UtensilsCrossed,
    shield: ShieldAlert,
};

export default function PainPoints() {
    const scrollToPricing = () => {
        const element = document.querySelector('#pricing');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
            {/* 背景裝飾 */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl opacity-50" />

            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* 標題區 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', delay: 0.2 }}
                        className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-medium mb-6"
                    >
                        <AlertTriangle className="w-4 h-4" />
                        <span>健康警訊</span>
                    </motion.div>

                    <h2 className="text-3xl sm:text-4xl font-bold text-text-main mb-4">
                        你是否也有這些困擾？
                    </h2>
                    <p className="text-text-muted text-lg max-w-xl mx-auto">
                        現代人的健康隱憂，你中了幾項？
                        <br />
                        <span className="text-red-500 font-medium">超過 2 項就要特別注意！</span>
                    </p>
                </motion.div>

                {/* 痛點列表 */}
                <div className="space-y-4 mb-12">
                    {painPoints.map((point, index) => {
                        const IconComponent = iconMap[point.icon] || ShieldAlert;

                        return (
                            <motion.div
                                key={point.id}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ x: 5, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-start gap-4 cursor-pointer transition-all"
                            >
                                {/* 紅色 X 圖標 */}
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-red-400 to-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-200"
                                >
                                    <X className="w-6 h-6 text-white" strokeWidth={3} />
                                </motion.div>

                                {/* 問題描述 */}
                                <div className="flex-1 pt-1">
                                    <p className="text-text-main font-medium text-lg leading-relaxed">
                                        {point.text}
                                    </p>
                                </div>

                                {/* 相關圖標 */}
                                <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                    <IconComponent className="w-5 h-5 text-text-muted" />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* 統計數據 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 mb-8"
                >
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <p className="text-2xl sm:text-3xl font-bold text-red-500">78%</p>
                            <p className="text-xs sm:text-sm text-text-muted">現代人有健康困擾</p>
                        </div>
                        <div>
                            <p className="text-2xl sm:text-3xl font-bold text-orange-500">3.2</p>
                            <p className="text-xs sm:text-sm text-text-muted">項平均困擾數</p>
                        </div>
                        <div>
                            <p className="text-2xl sm:text-3xl font-bold text-amber-500">65%</p>
                            <p className="text-xs sm:text-sm text-text-muted">忽視保健重要性</p>
                        </div>
                    </div>
                </motion.div>

                {/* 底部提示 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-center"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={scrollToPricing}
                        className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-primary/30 transition-colors"
                    >
                        <span>是時候正視健康問題了</span>
                        <ArrowRight className="w-5 h-5" />
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}
