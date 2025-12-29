// Demo Card Component - Enhanced with icons and gradients
import { Link } from 'react-router-dom';
import { ExternalLink, ShoppingCart, Calendar, Users, Sparkles, Car, Film, Paintbrush, Building } from 'lucide-react';
import { motion } from 'framer-motion';

// Demo icon mapping
const demoIcons = {
    'demo-1': { icon: Paintbrush, gradient: 'from-orange-500 to-pink-500' },
    'demo-2': { icon: Building, gradient: 'from-blue-500 to-cyan-500' },
    'demo-3': { icon: ShoppingCart, gradient: 'from-emerald-500 to-teal-500' },
    'demo-4': { icon: Building, gradient: 'from-purple-500 to-indigo-500' },
    'demo-5': { icon: Calendar, gradient: 'from-pink-500 to-rose-500' },
    'demo-6': { icon: Users, gradient: 'from-amber-500 to-orange-500' },
    'antingm-auto': { icon: Car, gradient: 'from-slate-600 to-zinc-700' },
    'antingm-studio': { icon: Film, gradient: 'from-violet-600 to-purple-700' },
};

export default function DemoCard({ demo }) {
    const { id, name, description, thumbnail, route, tags = [] } = demo;
    const iconConfig = demoIcons[id] || { icon: Sparkles, gradient: 'from-indigo-500 to-purple-600' };
    const IconComponent = iconConfig.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
        >
            <Link to={route || `/${id}`} className="block">
                <div className="card group cursor-pointer overflow-hidden">
                    {/* Thumbnail */}
                    <div className={`relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden bg-gradient-to-br ${iconConfig.gradient}`}>
                        {thumbnail ? (
                            <img
                                src={thumbnail}
                                alt={name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <IconComponent className="w-20 h-20 text-white/30" strokeWidth={1.5} />
                            </div>
                        )}

                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <span className="flex items-center gap-2 text-white font-medium px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                                <ExternalLink className="w-4 h-4" />
                                查看專案
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                            {name}
                        </h3>
                        <p className="text-[var(--color-text-muted)] text-sm line-clamp-2 mb-4">
                            {description || '點擊查看更多詳情'}
                        </p>

                        {/* Tags */}
                        {tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {tags.slice(0, 3).map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-2 py-1 text-xs rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
