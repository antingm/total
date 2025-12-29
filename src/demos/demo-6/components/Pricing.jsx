import { motion } from 'framer-motion';
import { Check, Star, ShoppingCart, TrendingUp } from 'lucide-react';
import { pricingPlans } from '../data/products';
import { useCart } from '../../../modules/Cart';

export default function Pricing() {
    const { addToCart, setIsCartOpen } = useCart();

    const handleAddToCart = (plan) => {
        addToCart(plan);
        setIsCartOpen(true); // 加入後開啟購物車
    };

    return (
        <section id="pricing" className="py-20 bg-surface">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* 標題區 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="inline-block bg-accent/10 text-accent px-4 py-1 rounded-full text-sm font-medium mb-4">
                        限時優惠
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-text-main mb-4">
                        選擇適合您的方案
                    </h2>
                    <p className="text-text-muted text-lg">
                        多件組合更優惠，養成健康習慣趁現在
                    </p>
                </motion.div>

                {/* 價格卡片 */}
                <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                    {pricingPlans.map((plan, index) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                            className={`relative bg-white rounded-2xl overflow-hidden transition-all ${plan.isPopular
                                ? 'border-2 border-accent shadow-xl shadow-accent/10 ring-4 ring-accent/10'
                                : 'border border-gray-200 shadow-lg'
                                }`}
                        >
                            {/* 熱銷標籤 */}
                            {plan.badge && (
                                <div className={`absolute top-0 right-0 px-4 py-1 text-sm font-bold text-white ${plan.isPopular ? 'bg-accent' : 'bg-primary'
                                    }`}>
                                    {plan.badge}
                                </div>
                            )}

                            <div className="p-6 lg:p-8">
                                {/* 方案名稱 */}
                                <div className="text-center mb-6">
                                    <h3 className="text-xl font-bold text-text-main mb-1">
                                        {plan.name}
                                    </h3>
                                    <p className="text-text-muted">
                                        {plan.quantity} 盒裝
                                    </p>
                                </div>

                                {/* 價格 */}
                                <div className="text-center mb-6">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <span className="text-text-muted line-through text-lg">
                                            ${plan.originalPrice.toLocaleString()}
                                        </span>
                                        {plan.savings > 0 && (
                                            <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded">
                                                省 ${plan.savings.toLocaleString()}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-baseline justify-center gap-1">
                                        <span className="text-lg text-text-muted">$</span>
                                        <span className={`text-5xl font-bold ${plan.isPopular ? 'text-accent' : 'text-primary'}`}>
                                            {plan.price.toLocaleString()}
                                        </span>
                                    </div>

                                    <p className="text-sm text-text-muted mt-2">
                                        平均每盒 ${plan.perUnit.toLocaleString()}
                                    </p>
                                </div>

                                {/* 特色列表 */}
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center gap-2">
                                        <Check className={`w-5 h-5 ${plan.isPopular ? 'text-accent' : 'text-primary'}`} />
                                        <span className="text-text-main">免運費配送</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className={`w-5 h-5 ${plan.isPopular ? 'text-accent' : 'text-primary'}`} />
                                        <span className="text-text-main">30天無條件退貨</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className={`w-5 h-5 ${plan.isPopular ? 'text-accent' : 'text-primary'}`} />
                                        <span className="text-text-main">專屬客服諮詢</span>
                                    </li>
                                    {plan.quantity >= 3 && (
                                        <li className="flex items-center gap-2">
                                            <Star className={`w-5 h-5 ${plan.isPopular ? 'text-accent' : 'text-primary'}`} />
                                            <span className="text-text-main font-medium">贈送健康手冊</span>
                                        </li>
                                    )}
                                    {plan.quantity >= 6 && (
                                        <li className="flex items-center gap-2">
                                            <TrendingUp className={`w-5 h-5 ${plan.isPopular ? 'text-accent' : 'text-primary'}`} />
                                            <span className="text-text-main font-medium">VIP 尊榮回購價</span>
                                        </li>
                                    )}
                                </ul>

                                {/* 購買按鈕 */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleAddToCart(plan)}
                                    className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-lg transition-colors ${plan.isPopular
                                        ? 'bg-accent hover:bg-amber-600 text-white shadow-lg shadow-accent/30'
                                        : 'bg-primary hover:bg-primary-dark text-white'
                                        }`}
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    <span>加入購物車</span>
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* 底部保障 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-12 text-center"
                >
                    <div className="inline-flex flex-wrap items-center justify-center gap-6 text-sm text-text-muted">
                        <span className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-primary" />
                            安全加密付款
                        </span>
                        <span className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-primary" />
                            7-11 / 全家取貨
                        </span>
                        <span className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-primary" />
                            宅配到府
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
