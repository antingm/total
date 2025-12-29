import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { pricingContent } from '../constants';
import { useAuth } from '../context/AuthContext';

const Pricing = ({ showTitle = true, className = "" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const { isAuthenticated } = useAuth();

    const navigate = useNavigate();

    const handleContactClick = () => {
        navigate('/contact');
    };

    return (
        <section id="pricing" className={`section-padding bg-bg-secondary relative overflow-hidden ${className}`}>
            {/* Background */}
            <div className="absolute inset-0 bg-grid opacity-20" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full filter blur-3xl" />

            <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
                {/* Section Header */}
                {showTitle && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="heading-lg text-white mb-4">
                            {pricingContent.sectionTitle}
                        </h2>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-6">
                            {pricingContent.sectionSubtitle}
                        </p>
                    </motion.div>
                )}

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {pricingContent.plans.map((plan, index) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className={`relative rounded-2xl p-6 flex flex-col ${plan.popular
                                ? 'bg-[#1a2b3b] border-2 border-primary shadow-2xl shadow-primary/20 scale-105 z-20'
                                : 'bg-[#15202b] border border-slate-800'
                                }`}
                        >
                            {/* Popular Badge */}
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <div className="flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-600 text-slate-900 font-bold text-sm whitespace-nowrap shadow-lg">
                                        最受歡迎 🔥
                                    </div>
                                </div>
                            )}

                            {/* Plan Header */}
                            <div className="text-center mb-6 pt-2">
                                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                                <p className="text-sm text-slate-400 mb-4 min-h-[2.5rem] flex items-center justify-center line-clamp-2 leading-tight">
                                    {plan.subtitle}
                                </p>

                                {/* Badge - Only show if not popular (to avoid double badges) */}
                                {plan.badge && !plan.popular && (
                                    <div className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-xs font-bold mb-6">
                                        {plan.badge}
                                    </div>
                                )}

                                {plan.popular && <div className="mb-6 h-0" />} {/* Spacer for popular cards to keep height consistent */}

                                {/* Price Area */}
                                <div className="mb-6">
                                    <div className={`flex items-baseline justify-center gap-1 ${plan.popular ? 'text-primary' : 'text-white'}`}>
                                        {plan.price !== '彈性組合' && <span className="text-xl font-normal opacity-70">NT$</span>}
                                        <span className="text-4xl font-extrabold">{plan.price}</span>
                                        {plan.priceNote && <span className="text-slate-400 text-sm">{plan.priceNote}</span>}
                                    </div>
                                </div>

                                <p className="text-slate-400 text-sm leading-relaxed mb-6 min-h-[4.5rem]">
                                    {plan.description}
                                </p>
                            </div>

                            {/* Highlights Section */}
                            {plan.highlights && plan.highlights.length > 0 && (
                                <div className="mb-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
                                    <div className="space-y-2">
                                        {plan.highlights.map((highlight, idx) => (
                                            <div key={idx} className="flex items-start gap-2">
                                                <span className="text-primary text-sm mt-0.5">✨</span>
                                                <span className="text-slate-200 text-xs font-medium leading-tight">{highlight}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Features List */}
                            <div className="space-y-3 mb-8 flex-1">
                                {plan.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                                            <Check className="w-3 h-3 text-primary font-bold" />
                                        </div>
                                        <span className="text-slate-300 text-[13px] leading-snug">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Not Included (Optional) */}
                            {plan.notIncluded && plan.notIncluded.length > 0 && (
                                <div className="space-y-2 mb-6 pt-4 border-t border-slate-800">
                                    {plan.notIncluded.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-3 opacity-40">
                                            <X className="w-4 h-4 text-slate-500" />
                                            <span className="text-slate-500 text-xs">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* CTA Button */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleContactClick}
                                className={`w-full py-4 mt-auto rounded-xl font-bold transition-all duration-300 ${plan.popular
                                    ? 'bg-gradient-to-r from-primary to-accent text-slate-900 shadow-lg shadow-primary/25 hover:shadow-primary/40'
                                    : plan.isAddon
                                        ? 'bg-[#00c897] text-white hover:bg-[#00b085] shadow-lg shadow-[#00c897]/20 border border-[#00c897]/50'
                                        : 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700'
                                    }`}
                            >
                                {plan.cta}
                            </motion.button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
