/**
 * FloatingCTA Component
 * 浮動的 CTA 按鈕，滾動時顯示
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

export const FloatingCTA = ({
    to = '/contact',
    text = '開始諮詢',
    threshold = 800
}) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const shouldShow = window.scrollY > threshold;
            setVisible(shouldShow);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // 初始檢查

        return () => window.removeEventListener('scroll', handleScroll);
    }, [threshold]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="fixed bottom-8 right-8 z-40"
                >
                    <Link
                        to={to}
                        className="btn-primary shadow-2xl shadow-primary/30 flex items-center gap-2 group"
                    >
                        <MessageSquare className="w-5 h-5 transition-transform group-hover:scale-110" />
                        <span>{text}</span>
                    </Link>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FloatingCTA;
