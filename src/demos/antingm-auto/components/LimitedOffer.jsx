import { useState, useEffect } from "react";
import { Clock, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LimitedOffer = ({ onClose }) => {
    // 设置优惠到期时间（3天后）
    const getEndTime = () => {
        const saved = localStorage.getItem("offerEndTime");
        if (saved) {
            return parseInt(saved);
        }
        const endTime = Date.now() + (3 * 24 * 60 * 60 * 1000); // 3天
        localStorage.setItem("offerEndTime", endTime.toString());
        return endTime;
    };

    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        const endTime = getEndTime();

        const timer = setInterval(() => {
            const now = Date.now();
            const diff = endTime - now;

            if (diff <= 0) {
                setIsExpired(true);
                clearInterval(timer);
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (isExpired) {
        return null;
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-600 via-red-500 to-orange-500 shadow-2xl"
            >
                <div className="container-wide px-4 sm:px-6 py-4 sm:py-5">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        {/* 优惠信息 */}
                        <div className="flex items-center gap-3 sm:gap-4">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center animate-pulse">
                                <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg sm:text-xl mb-1">
                                    🎉 限時優惠！立減 $3,000
                                </h3>
                                <p className="text-white/90 text-sm sm:text-base">
                                    現在填寫診斷，即享專屬折扣
                                </p>
                            </div>
                        </div>

                        {/* 倒计时 */}
                        <div className="flex items-center gap-3 sm:gap-4">
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 sm:px-4 py-2">
                                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                <div className="flex items-center gap-1 sm:gap-2 text-white font-bold text-base sm:text-lg">
                                    <span className="min-w-[28px] sm:min-w-[32px] text-center">{timeLeft.days}</span>
                                    <span className="text-white/60">天</span>
                                    <span className="min-w-[28px] sm:min-w-[32px] text-center">{String(timeLeft.hours).padStart(2, '0')}</span>
                                    <span className="text-white/60">:</span>
                                    <span className="min-w-[28px] sm:min-w-[32px] text-center">{String(timeLeft.minutes).padStart(2, '0')}</span>
                                    <span className="text-white/60">:</span>
                                    <span className="min-w-[28px] sm:min-w-[32px] text-center">{String(timeLeft.seconds).padStart(2, '0')}</span>
                                </div>
                            </div>

                            {/* 关闭按钮 */}
                            {onClose && (
                                <button
                                    onClick={onClose}
                                    className="text-white/60 hover:text-white transition-colors p-2"
                                    aria-label="关闭"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default LimitedOffer;
