import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin, Maximize2 } from 'lucide-react';
import { portfolioImages } from '../constants';

const Gallery = () => {
    const [selectedCategory, setSelectedCategory] = useState('全部');

    // 取得所有類別
    const categories = ['全部', ...new Set(portfolioImages.map(item => item.category))];

    // 過濾作品
    const filteredWorks = selectedCategory === '全部'
        ? portfolioImages
        : portfolioImages.filter(item => item.category === selectedCategory);

    return (
        <section id="gallery" className="section-padding bg-slate-800/30">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h2 className="heading-lg mb-4">
                        <span className="text-gradient">作品案例</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        精選近期完成的設計作品，每一個案例都是我們用心雕琢的成果
                    </p>
                </motion.div>

                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-4 mb-12"
                >
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${selectedCategory === category
                                    ? 'bg-gold text-slate-900'
                                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </motion.div>

                {/* Gallery Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredWorks.map((work, index) => (
                        <motion.div
                            key={work.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
                        >
                            {/* Image */}
                            <img
                                src={work.image}
                                alt={work.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <div className="flex items-center gap-2 text-gold text-sm mb-2">
                                        <span className="px-2 py-0.5 bg-gold/20 rounded">
                                            {work.category}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Maximize2 className="w-3 h-3" />
                                            {work.size}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-1">
                                        {work.title}
                                    </h3>
                                    <p className="text-slate-300 text-sm flex items-center gap-1">
                                        <MapPin className="w-3 h-3" />
                                        {work.location}
                                    </p>
                                </div>

                                {/* Arrow Icon */}
                                <div className="absolute top-4 right-4 w-10 h-10 bg-gold rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                    <ArrowUpRight className="w-5 h-5 text-slate-900" />
                                </div>
                            </div>

                            {/* Featured Badge */}
                            {work.featured && (
                                <div className="absolute top-4 left-4 px-3 py-1 bg-gold text-slate-900 text-xs font-bold rounded-full">
                                    精選
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
