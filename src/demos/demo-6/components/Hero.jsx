import { motion } from 'framer-motion';
import { ShoppingCart, Shield, Leaf, Award, CheckCircle } from 'lucide-react';
import { products, pricingPlans } from '../data/products';
import { useCart } from '../../../modules/Cart';

const trustBadges = [
    { icon: Shield, text: 'SGS檢驗合格' },
    { icon: Leaf, text: '無農藥殘留' },
    { icon: Award, text: 'HACCP認證' },
];

export default function Hero() {
    const { addToCart } = useCart();

    const handleBuyNow = () => {
        // 預設加入熱銷組
        const popularPlan = pricingPlans.find(p => p.isPopular) || pricingPlans[1];
        addToCart(popularPlan);
    };

    const scrollToSection = (e, href) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative min-h-screen bg-gradient-to-br from-surface via-white to-surface-dark overflow-hidden pt-16">
            {/* 背景裝飾 */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* 左側 - 產品圖片 */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative order-2 lg:order-1"
                    >
                        <div className="relative aspect-square max-w-md mx-auto">
                            {/* 發光效果 */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl animate-pulse-glow" />

                            {/* 產品圖片容器 */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="relative z-10 flex items-center justify-center h-full"
                            >
                                {/* 模擬產品圖片 */}
                                <div className="relative w-64 h-80 bg-gradient-to-br from-primary to-primary-dark rounded-3xl shadow-2xl flex items-center justify-center">
                                    <div className="absolute inset-2 bg-white/10 rounded-2xl backdrop-blur-sm" />
                                    <div className="relative text-center text-white p-6">
                                        <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                                            <Leaf className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">綠研生醫</h3>
                                        <p className="text-sm opacity-90">專利植萃膠囊</p>
                                        <p className="text-xs mt-2 opacity-75">60粒 / 盒</p>
                                    </div>

                                    {/* 專利標章 */}
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.5, type: "spring" }}
                                        className="absolute -top-3 -right-3 w-16 h-16 bg-accent rounded-full flex items-center justify-center shadow-lg"
                                    >
                                        <div className="text-center text-white">
                                            <span className="text-xs font-bold">專利</span>
                                            <Award className="w-5 h-5 mx-auto" />
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>

                            {/* 浮動認證標章 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-full px-4 py-2 shadow-lg flex items-center gap-2"
                            >
                                <CheckCircle className="w-5 h-5 text-primary" />
                                <span className="text-sm font-medium text-text-main">GMP認證工廠製造</span>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* 右側 - 文字內容 */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="order-1 lg:order-2 text-center lg:text-left"
                    >
                        {/* 品牌標籤 */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
                        >
                            <Leaf className="w-4 h-4" />
                            <span>綠研生醫 Nature Lab</span>
                        </motion.div>

                        {/* 主標題 */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-main leading-tight mb-6">
                            專利植萃
                            <br />
                            <span className="text-primary">喚醒原生保護力</span>
                        </h1>

                        {/* 副標題 */}
                        <p className="text-lg sm:text-xl text-text-muted mb-8 max-w-lg mx-auto lg:mx-0">
                            中西醫博士聯手研發，結合東方草本智慧與西方科學驗證，
                            為您打造最安心有效的保健選擇。
                        </p>

                        {/* CTA 按鈕區 */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleBuyNow}
                                className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-primary/30 transition-all"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                <span>立即選購</span>
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => scrollToSection(e, '#solution')}
                                className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-primary font-bold px-8 py-4 rounded-full border-2 border-primary transition-all"
                            >
                                <span>了解更多</span>
                            </motion.button>
                        </div>

                        {/* 信任標章 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-wrap items-center gap-4 justify-center lg:justify-start"
                        >
                            {trustBadges.map((badge, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm"
                                >
                                    <badge.icon className="w-4 h-4 text-primary" />
                                    <span className="text-sm text-text-main font-medium">{badge.text}</span>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* 向下滾動提示 */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-6 h-10 border-2 border-text-muted/30 rounded-full flex justify-center"
                >
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-1.5 h-3 bg-text-muted/50 rounded-full mt-2"
                    />
                </motion.div>
            </motion.div>
        </section>
    );
}
