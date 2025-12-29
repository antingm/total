import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Sparkles, ArrowRight, Phone } from 'lucide-react';
import { useCart } from '../../../modules/Cart';
import { pricingPlans } from '../data/products';

export default function FinalCTA() {
    const { addToCart, setIsCartOpen } = useCart();

    const handleBuyNow = () => {
        const popularPlan = pricingPlans.find(p => p.isPopular) || pricingPlans[1];
        addToCart(popularPlan);
    };

    return (
        <section className="relative py-24 overflow-hidden">
            {/* 背景 */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-primary" />

            {/* 裝飾元素 */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

            {/* 浮動裝飾 */}
            <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute top-20 right-20 hidden lg:block"
            >
                <Sparkles className="w-12 h-12 text-white/20" />
            </motion.div>

            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* 限時標籤 */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-full text-sm font-bold mb-8"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span>
                    限時優惠進行中
                </motion.div>

                {/* 主標題 */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
                >
                    現在下單，立即開啟
                    <br />
                    <span className="text-accent">健康新生活</span>
                </motion.h2>

                {/* 副標題 */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-white/80 mb-10 max-w-2xl mx-auto"
                >
                    加入超過 150,000 位顧客的行列，體驗專利植萃帶來的改變。
                    <br className="hidden sm:block" />
                    首次購買再享 9 折優惠！
                </motion.p>

                {/* CTA 按鈕組 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
                >
                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleBuyNow}
                        className="inline-flex items-center justify-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-full text-lg shadow-xl hover:bg-gray-50 transition-all"
                    >
                        <ShoppingCart className="w-5 h-5" />
                        <span>立即搶購</span>
                        <ArrowRight className="w-5 h-5" />
                    </motion.button>

                    <motion.a
                        href="tel:0800888888"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-full text-lg border border-white/30 hover:bg-white/20 transition-all"
                    >
                        <Phone className="w-5 h-5" />
                        <span>免費諮詢</span>
                    </motion.a>
                </motion.div>

                {/* 信任指標 */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-wrap items-center justify-center gap-6 text-white/70 text-sm"
                >
                    <span className="flex items-center gap-1">
                        <span className="text-accent">★★★★★</span>
                        <span>4.9 分好評</span>
                    </span>
                    <span>|</span>
                    <span>30天無條件退款</span>
                    <span>|</span>
                    <span>免費配送</span>
                </motion.div>
            </div>
        </section>
    );
}
