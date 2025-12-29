import { motion } from 'framer-motion';
import { Users, Award, Truck, Clock } from 'lucide-react';

const stats = [
    {
        id: 1,
        icon: Users,
        value: '150,000+',
        label: '滿意顧客',
        suffix: '人',
    },
    {
        id: 2,
        icon: Award,
        value: '12',
        label: '專利認證',
        suffix: '項',
    },
    {
        id: 3,
        icon: Truck,
        value: '98.5%',
        label: '準時到貨率',
        suffix: '',
    },
    {
        id: 4,
        icon: Clock,
        value: '6',
        label: '年專業經驗',
        suffix: '年',
    },
];

export default function Stats() {
    return (
        <section className="py-16 bg-gradient-to-r from-primary to-primary-dark">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="text-center text-white"
                        >
                            <div className="w-14 h-14 mx-auto mb-4 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                <stat.icon className="w-7 h-7" />
                            </div>
                            <div className="text-3xl md:text-4xl font-bold mb-1">
                                {stat.value}
                            </div>
                            <div className="text-white/80 text-sm">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
