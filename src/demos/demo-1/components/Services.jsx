import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { services } from '../constants';

const Services = () => {
    // 動態取得圖示元件
    const getIcon = (iconName) => {
        const IconComponent = LucideIcons[iconName];
        return IconComponent ? <IconComponent className="w-8 h-8" /> : null;
    };

    return (
        <section id="services" className="section-padding">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="heading-lg mb-4">
                        <span className="text-gradient">服務項目</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        從設計規劃到施工完成，我們提供一站式的專業服務，讓您的夢想空間輕鬆實現
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group bg-slate-800/50 rounded-2xl p-8 border border-slate-700 hover:border-gold/50 transition-all duration-300 hover:shadow-lg hover:shadow-gold/10"
                        >
                            {/* Icon */}
                            <div className="w-16 h-16 bg-gold/10 rounded-xl flex items-center justify-center text-gold mb-6 group-hover:bg-gold group-hover:text-slate-900 transition-all duration-300">
                                {getIcon(service.icon)}
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-bold text-white mb-4">
                                {service.title}
                            </h3>

                            {/* Description */}
                            <p className="text-slate-400 mb-6 leading-relaxed">
                                {service.description}
                            </p>

                            {/* Features */}
                            <div className="flex flex-wrap gap-2">
                                {service.features.map((feature, i) => (
                                    <span
                                        key={i}
                                        className="text-xs bg-slate-700/50 text-slate-300 px-3 py-1 rounded-full"
                                    >
                                        {feature}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
