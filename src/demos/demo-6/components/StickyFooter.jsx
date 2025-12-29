import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../../modules/Cart';
import { pricingPlans } from '../data/products';

export default function StickyFooter() {
    const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 15, seconds: 30 });
    const { addToCart, cartCount, setIsCartOpen } = useCart();

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                let { hours, minutes, seconds } = prev;

                if (seconds > 0) {
                    seconds--;
                } else if (minutes > 0) {
                    minutes--;
                    seconds = 59;
                } else if (hours > 0) {
                    hours--;
                    minutes = 59;
                    seconds = 59;
                } else {
                    // 重置倒數計時
                    return { hours: 2, minutes: 15, seconds: 30 };
                }

                return { hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (num) => num.toString().padStart(2, '0');

    const handleBuyNow = () => {
        // 預設加入熱銷組
        const popularPlan = pricingPlans.find(p => p.isPopular) || pricingPlans[1];
        addToCart(popularPlan);
    };

    const handleViewCart = () => {
        if (cartCount > 0) {
            setIsCartOpen(true);
        } else {
            handleBuyNow();
        }
    };

    return (
        <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl"
        >
            <div className="flex items-center justify-between px-4 py-3">
                {/* 左側倒數計時 */}
                <div className="flex flex-col">
                    <span className="text-xs text-text-muted">限時優惠倒數</span>
                    <div className="flex items-center gap-1 font-mono font-bold text-primary">
                        <span className="bg-primary text-white px-1.5 py-0.5 rounded text-sm">
                            {formatTime(timeLeft.hours)}
                        </span>
                        <span>:</span>
                        <span className="bg-primary text-white px-1.5 py-0.5 rounded text-sm">
                            {formatTime(timeLeft.minutes)}
                        </span>
                        <span>:</span>
                        <span className="bg-primary text-white px-1.5 py-0.5 rounded text-sm">
                            {formatTime(timeLeft.seconds)}
                        </span>
                    </div>
                </div>

                {/* 右側購買按鈕 */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleViewCart}
                    className="relative flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold px-6 py-3 rounded-full shadow-lg transition-colors"
                >
                    <ShoppingCart className="w-5 h-5" />
                    <span>{cartCount > 0 ? '查看購物車' : '立即搶購'}</span>
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                            {cartCount}
                        </span>
                    )}
                </motion.button>
            </div>
        </motion.div>
    );
}
