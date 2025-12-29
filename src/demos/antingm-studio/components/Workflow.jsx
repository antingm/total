import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { workflowContent } from '../constants';

const Workflow = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="workflow" className="section-padding bg-bg-primary relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid opacity-30" />

            <div className="max-w-5xl mx-auto relative z-10" ref={ref}>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="heading-lg text-white mb-4">
                        {workflowContent.sectionTitle}
                    </h2>
                    <p className="text-slate-400 text-lg">
                        {workflowContent.sectionSubtitle}
                    </p>
                </motion.div>

                {/* Workflow Steps */}
                <div className="relative">
                    {/* Vertical Line (Desktop) */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary to-primary/50 transform -translate-x-1/2" />

                    <div className="space-y-12">
                        {workflowContent.steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.15 }}
                                className={`relative flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    }`}
                            >
                                {/* Content */}
                                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                    <div className="card">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="text-4xl font-bold text-gradient">
                                                {step.step}
                                            </span>
                                            <h3 className="text-xl font-bold text-white">
                                                {step.title}
                                            </h3>
                                        </div>
                                        <p className="text-slate-400 text-sm leading-relaxed mb-3">
                                            {step.description}
                                        </p>
                                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-accent bg-accent/10 px-3 py-1.5 rounded-full">
                                            ⏱ {step.duration}
                                        </span>
                                    </div>
                                </div>

                                {/* Center Point (Desktop) */}
                                <div className="hidden md:flex w-4 h-4 rounded-full bg-primary border-4 border-bg-primary shadow-lg shadow-primary/50 z-10" />

                                {/* Empty Space (Desktop) */}
                                <div className="hidden md:block flex-1" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Workflow;
