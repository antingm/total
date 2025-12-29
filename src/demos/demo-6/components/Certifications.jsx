import { motion } from 'framer-motion';
import { Shield, Award, FileCheck, Microscope, Leaf, BadgeCheck } from 'lucide-react';

const certifications = [
    {
        id: 1,
        icon: Shield,
        name: 'SGS 食品安全檢驗',
        description: '通過國際級 SGS 檢驗認證',
        color: 'from-blue-500 to-blue-600',
    },
    {
        id: 2,
        icon: Award,
        name: 'HACCP 認證',
        description: '食品安全管理系統認證',
        color: 'from-green-500 to-green-600',
    },
    {
        id: 3,
        icon: FileCheck,
        name: 'ISO 22000',
        description: '國際食品安全管理標準',
        color: 'from-purple-500 to-purple-600',
    },
    {
        id: 4,
        icon: Microscope,
        name: 'GMP 認證工廠',
        description: '藥品級生產標準製造',
        color: 'from-orange-500 to-orange-600',
    },
    {
        id: 5,
        icon: Leaf,
        name: '無農藥殘留',
        description: '通過 380 項農藥殘留檢測',
        color: 'from-emerald-500 to-emerald-600',
    },
    {
        id: 6,
        icon: BadgeCheck,
        name: '素食認證',
        description: '純植物性膠囊，素食可食',
        color: 'from-teal-500 to-teal-600',
    },
];

export default function Certifications() {
    return (
        <section className="py-20 bg-surface-dark">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* 標題 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
                        品質保證
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-text-main mb-4">
                        國際級品質認證
                    </h2>
                    <p className="text-text-muted text-lg max-w-2xl mx-auto">
                        嚴格把關每一道生產環節，從原料到成品，為您的健康層層把關
                    </p>
                </motion.div>

                {/* 認證卡片 */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certifications.map((cert, index) => (
                        <motion.div
                            key={cert.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all border border-gray-100"
                        >
                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cert.color} flex items-center justify-center mb-4`}>
                                <cert.icon className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-text-main mb-2">
                                {cert.name}
                            </h3>
                            <p className="text-text-muted text-sm">
                                {cert.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* 底部強調 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 text-center"
                >
                    <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-md">
                        <div className="flex -space-x-2">
                            {[...Array(4)].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-dark border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                                >
                                    ✓
                                </div>
                            ))}
                        </div>
                        <span className="text-text-main font-medium">
                            100% 台灣在地生產，品質有保障
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
