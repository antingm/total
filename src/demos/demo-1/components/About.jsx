import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { aboutContent } from '../constants';

const About = () => {
    return (
        <section id="about" className="section-padding bg-slate-800/50">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                            <img
                                src={aboutContent.image}
                                alt="關於我們"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Decorative Element */}
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 border-4 border-gold rounded-2xl -z-10"></div>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="heading-lg mb-4">
                            <span className="text-gradient">{aboutContent.title}</span>
                        </h2>
                        <p className="text-xl text-gold mb-6">{aboutContent.subtitle}</p>
                        <p className="text-slate-300 mb-10 leading-relaxed">
                            {aboutContent.description}
                        </p>

                        {/* Highlights */}
                        <div className="space-y-6">
                            {aboutContent.highlights.map((highlight, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="flex gap-4"
                                >
                                    <CheckCircle2 className="text-gold w-6 h-6 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-2">
                                            {highlight.title}
                                        </h3>
                                        <p className="text-slate-400">{highlight.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
