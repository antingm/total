import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Shield, Zap, Wallet, Heart } from 'lucide-react';
import { whyUsContent } from '../constants';

const iconMap = {
    Shield,
    Zap,
    Wallet,
    Heart,
};

const WhyUs = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="why-us" className="section-padding bg-bg-secondary relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid opacity-20" />

            <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="heading-lg text-white mb-4">
                        {whyUsContent.sectionTitle}
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        {whyUsContent.sectionSubtitle}
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                    {whyUsContent.features.map((feature, index) => {
                        const IconComponent = iconMap[feature.icon];
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="card card-hover group p-4 sm:p-8 flex flex-col h-full"
                            >
                                {/* Icon */}
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                                    {IconComponent && <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />}
                                </div>

                                {/* Title */}
                                <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug sm:leading-tight" style={{ textWrap: 'balance' }}>
                                    {feature.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm sm:text-sm text-slate-400 leading-relaxed mb-5 flex-1 line-clamp-4">
                                    {feature.description}
                                </p>

                                {/* Highlight Badge */}
                                <div className="mt-auto">
                                    <span className="inline-flex items-center gap-1.5 text-xs sm:text-xs font-medium text-primary bg-primary/10 px-3 sm:px-3 py-1.5 sm:py-1.5 rounded-full">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                        {feature.highlight}
                                    </span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default WhyUs;
