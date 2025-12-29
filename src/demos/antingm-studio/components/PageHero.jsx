/**
 * PageHero Component
 * 統一的頁面標題橫幅組件
 */

import { motion } from 'framer-motion';

export const PageHero = ({
    title,
    subtitle,
    image,
    gradient = true,
    className = ''
}) => {
    return (
        <section className={`relative py-24 md:py-32 bg-bg-secondary overflow-hidden ${className}`}>
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid opacity-20" />

            {/* Gradient Overlay */}
            {gradient && (
                <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/50 to-transparent" />
            )}

            {/* Background Image */}
            {image && (
                <div className="absolute inset-0">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover opacity-20"
                    />
                </div>
            )}

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h1 className="heading-xl text-gradient mb-6">
                        {title}
                    </h1>

                    {subtitle && (
                        <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                            {subtitle}
                        </p>
                    )}
                </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        </section>
    );
};

export default PageHero;
