import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { promotions } from '../../data/mock';

export default function HeroBanner() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // 自動輪播
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % promotions.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const handlePrev = () => {
        setCurrentIndex(prev => (prev - 1 + promotions.length) % promotions.length);
    };

    const handleNext = () => {
        setCurrentIndex(prev => (prev + 1) % promotions.length);
    };

    return (
        <div className="relative mx-4 mt-4 rounded-3xl overflow-hidden shadow-xl">
            {/* 輪播圖片 */}
            <div className="relative h-48 lg:h-56 bg-gray-100">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0"
                    >
                        <img
                            src={promotions[currentIndex].image}
                            alt={promotions[currentIndex].title}
                            className="w-full h-full object-cover"
                        />
                        {/* 漸層遮罩 */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                        {/* 文字內容 */}
                        <div className="absolute bottom-5 left-5 right-5 text-white">
                            <motion.span
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium mb-2"
                            >
                                限時優惠
                            </motion.span>
                            <motion.h3
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 }}
                                className="text-xl font-bold mb-1"
                            >
                                {promotions[currentIndex].title}
                            </motion.h3>
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-sm text-white/80"
                            >
                                {promotions[currentIndex].subtitle}
                            </motion.p>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* 導航按鈕 */}
                <button
                    onClick={handlePrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                    <ChevronLeft size={20} />
                </button>
                <button
                    onClick={handleNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* 指示器 */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {promotions.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${index === currentIndex
                                ? 'w-5 bg-white'
                                : 'w-1.5 bg-white/50 hover:bg-white/70'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
