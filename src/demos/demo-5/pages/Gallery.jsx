import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { galleryItems } from '../data/mock';

const categories = ['全部', '日式', '法式', '藝術', '簡約', '延甲'];

export default function Gallery() {
    const [activeCategory, setActiveCategory] = useState('全部');
    const [likedItems, setLikedItems] = useState([]);

    const filteredItems = activeCategory === '全部'
        ? galleryItems
        : galleryItems.filter(item => item.category === activeCategory);

    const toggleLike = (id) => {
        setLikedItems(prev =>
            prev.includes(id)
                ? prev.filter(i => i !== id)
                : [...prev, id]
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pb-8"
        >
            {/* Header */}
            <header className="sticky top-0 bg-surface/95 backdrop-blur-sm z-40 px-4 pt-6 pb-4">
                <h1 className="text-xl font-bold text-secondary mb-4">作品集</h1>

                {/* Category Filter */}
                <div className="scroll-snap-x -mx-4 px-4">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`scroll-snap-item chip press-effect ${activeCategory === category ? 'chip-active' : ''
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                    <div className="scroll-snap-item w-4 flex-shrink-0" />
                </div>
            </header>

            {/* Masonry Grid */}
            <div className="px-4 grid grid-cols-2 gap-3">
                {filteredItems.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.08 }}
                        className={`relative overflow-hidden rounded-2xl ${index % 3 === 0 ? 'row-span-2' : ''
                            }`}
                    >
                        <img
                            src={item.image}
                            alt={`Gallery ${item.id}`}
                            className="w-full h-full object-cover aspect-square"
                            style={{ minHeight: index % 3 === 0 ? '240px' : '160px' }}
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                                <span className="text-xs text-white/80 bg-black/20 backdrop-blur-sm px-2 py-1 rounded-full">
                                    {item.category}
                                </span>
                                <button
                                    onClick={() => toggleLike(item.id)}
                                    className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center press-effect"
                                >
                                    <Heart
                                        size={16}
                                        className={likedItems.includes(item.id) ? 'text-red-500 fill-red-500' : 'text-white'}
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Like Button (Always Visible on Mobile) */}
                        <button
                            onClick={() => toggleLike(item.id)}
                            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 shadow-sm flex items-center justify-center press-effect"
                        >
                            <Heart
                                size={16}
                                className={likedItems.includes(item.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'}
                            />
                        </button>
                    </motion.div>
                ))}
            </div>

            {/* Load More */}
            <div className="px-4 mt-6">
                <button className="w-full btn-outline">
                    載入更多作品
                </button>
            </div>
        </motion.div>
    );
}
