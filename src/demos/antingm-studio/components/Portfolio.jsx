import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { portfolioContent } from '../constants';

const Portfolio = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [hoveredId, setHoveredId] = useState(null);

    return (
        <section id="portfolio" className="section-padding bg-bg-secondary relative overflow-hidden">
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
                        {portfolioContent.sectionTitle}
                    </h2>
                    <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto px-4">
                        {portfolioContent.sectionSubtitle}
                    </p>
                </motion.div>

                {/* Portfolio Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {portfolioContent.projects.map((project, index) => {
                        const hasRealLink = project.link && project.link !== '#';

                        const handleClick = () => {
                            if (hasRealLink) {
                                window.open(project.link, '_blank', 'noopener,noreferrer');
                            }
                        };

                        return (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 50 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                onMouseEnter={() => setHoveredId(project.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                onClick={handleClick}
                                className={`group relative rounded-2xl overflow-hidden ${hasRealLink ? 'cursor-pointer' : 'cursor-default'}`}
                            >
                                {/* Image */}
                                <div className="aspect-[4/3] overflow-hidden">
                                    <motion.img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>

                                {/* Overlay */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent transition-opacity duration-300
                                    ${hoveredId === project.id ? 'opacity-100' : 'opacity-0 md:opacity-0'}`}
                                />

                                {/* Content */}
                                <motion.div
                                    initial={false}
                                    animate={{
                                        y: hoveredId === project.id ? 0 : 20,
                                        opacity: hoveredId === project.id ? 1 : 0,
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute inset-x-0 bottom-0 p-6 md:translate-y-0"
                                >
                                    {/* Category Badge */}
                                    <span className="inline-block text-xs font-medium text-primary bg-primary/20 px-3 py-1 rounded-full mb-3">
                                        {project.category}
                                    </span>

                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                        {project.title}
                                        <ArrowUpRight className={`w-5 h-5 text-primary transition-opacity ${hasRealLink ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`} />
                                    </h3>

                                    {/* Description */}
                                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                                        {project.description}
                                    </p>

                                    {/* Technologies & Link Button */}
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.map((tech, idx) => (
                                                <span
                                                    key={idx}
                                                    className="text-xs text-slate-300 bg-slate-700/50 px-2 py-1 rounded"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>

                                        {hasRealLink && (
                                            <span className="flex items-center gap-1 text-xs font-medium text-primary bg-primary/20 px-3 py-1.5 rounded-full whitespace-nowrap">
                                                <ExternalLink className="w-3 h-3" />
                                                查看網站
                                            </span>
                                        )}
                                    </div>
                                </motion.div>

                                {/* Featured Badge */}
                                {project.featured && (
                                    <div className="absolute top-4 right-4">
                                        <span className="flex items-center gap-1 text-xs font-medium text-slate-900 bg-gradient-to-r from-primary to-accent px-3 py-1 rounded-full">
                                            {hasRealLink ? '🔗 已上線' : '精選'}
                                        </span>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default Portfolio;
