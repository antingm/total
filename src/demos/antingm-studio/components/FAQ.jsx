import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronDown, CheckCircle, Clock, RefreshCw, HeartHandshake } from 'lucide-react';
import { faqContent } from '../constants';

const commitmentIcons = {
    CheckCircle,
    Clock,
    RefreshCw,
    HeartHandshake,
};

const FAQ = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section id="faq" className="section-padding bg-bg-primary relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-grid opacity-30" />

            <div className="max-w-4xl mx-auto relative z-10" ref={ref}>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="heading-lg text-white mb-4">
                        {faqContent.sectionTitle}
                    </h2>
                    <p className="text-slate-400 text-lg">
                        {faqContent.sectionSubtitle}
                    </p>
                </motion.div>

                {/* FAQ Accordion */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="space-y-4 mb-16"
                >
                    {faqContent.questions.map((faq, index) => (
                        <div
                            key={index}
                            className="card overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                                className="w-full flex items-center justify-between gap-4 text-left"
                            >
                                <span className="text-white font-medium">{faq.question}</span>
                                <motion.div
                                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex-shrink-0"
                                >
                                    <ChevronDown className="w-5 h-5 text-primary" />
                                </motion.div>
                            </button>
                            <motion.div
                                initial={false}
                                animate={{
                                    height: openIndex === index ? 'auto' : 0,
                                    opacity: openIndex === index ? 1 : 0,
                                }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <p className="pt-4 text-slate-400 text-sm leading-relaxed">
                                    {faq.answer}
                                </p>
                            </motion.div>
                        </div>
                    ))}
                </motion.div>

                {/* Commitments */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <h3 className="text-xl font-bold text-white text-center mb-8">
                        {faqContent.commitments.title}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {faqContent.commitments.items.map((item, index) => {
                            const IconComponent = commitmentIcons[item.icon];
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                                    className="text-center p-4"
                                >
                                    <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary/10 flex items-center justify-center">
                                        {IconComponent && <IconComponent className="w-6 h-6 text-primary" />}
                                    </div>
                                    <h4 className="text-white font-medium text-sm mb-1">{item.title}</h4>
                                    <p className="text-slate-500 text-xs">{item.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default FAQ;
