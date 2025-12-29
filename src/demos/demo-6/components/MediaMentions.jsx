import { motion } from 'framer-motion';

const mediaLogos = [
    { name: 'TVBS', initial: 'T' },
    { name: '東森新聞', initial: '東' },
    { name: '自由時報', initial: '自' },
    { name: 'ETtoday', initial: 'E' },
    { name: '聯合報', initial: '聯' },
    { name: '中時電子報', initial: '中' },
];

export default function MediaMentions() {
    return (
        <section className="py-12 bg-white border-y border-gray-100">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-8"
                >
                    <p className="text-text-muted text-sm font-medium uppercase tracking-wider">
                        各大媒體報導推薦
                    </p>
                </motion.div>

                <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                    {mediaLogos.map((media, index) => (
                        <motion.div
                            key={media.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center font-bold text-lg">
                                {media.initial}
                            </div>
                            <span className="font-medium hidden sm:block">{media.name}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
