import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';

export default function LoadingScreen({ isLoading, isSuccess, onComplete }) {
    const navigate = useNavigate();

    // 成功後自動跳轉
    useEffect(() => {
        if (isSuccess) {
            const timer = setTimeout(() => {
                navigate('/member', { replace: true });
                if (onComplete) {
                    onComplete();
                }
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [isSuccess, navigate, onComplete]);

    return (
        <AnimatePresence>
            {(isLoading || isSuccess) && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
                >
                    <div className="flex flex-col items-center gap-6">
                        {isLoading && !isSuccess && (
                            <motion.div
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1, rotate: 360 }}
                                transition={{
                                    rotate: { duration: 1, repeat: Infinity, ease: 'linear' },
                                    scale: { type: 'spring' }
                                }}
                                className="w-16 h-16 rounded-full border-4 border-rose-200 border-t-rose-500"
                            />
                        )}

                        {isSuccess && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 200,
                                    damping: 15,
                                    delay: 0.1
                                }}
                                className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center shadow-lg"
                            >
                                <Check size={48} className="text-white" strokeWidth={3} />
                            </motion.div>
                        )}

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl font-semibold text-gray-800"
                        >
                            {isLoading && !isSuccess ? '預約處理中...' : '預約成功！'}
                        </motion.p>

                        {isSuccess && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-sm text-gray-500"
                            >
                                即將跳轉至會員中心...
                            </motion.p>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
