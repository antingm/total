/**
 * PageLoader Component
 * 頁面載入中的佔位組件
 */

import { motion } from 'framer-motion';

export const PageLoader = () => {
    return (
        <div className="min-h-screen bg-bg-primary flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
            >
                {/* Loading Spinner */}
                <div className="inline-block w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />

                {/* Loading Text */}
                <p className="text-slate-400 text-lg">載入中...</p>
            </motion.div>
        </div>
    );
};

export default PageLoader;
