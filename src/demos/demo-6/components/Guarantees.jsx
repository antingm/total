import { motion } from 'framer-motion';
import { Gift, Truck, RotateCcw, Headphones, CreditCard, Lock } from 'lucide-react';

const guarantees = [
    {
        id: 1,
        icon: Truck,
        title: '全館免運',
        description: '滿額即享免運優惠',
    },
    {
        id: 2,
        icon: RotateCcw,
        title: '30天鑑賞期',
        description: '不滿意全額退款',
    },
    {
        id: 3,
        icon: Gift,
        title: '精美包裝',
        description: '送禮自用兩相宜',
    },
    {
        id: 4,
        icon: Headphones,
        title: '專屬客服',
        description: '一對一健康諮詢',
    },
    {
        id: 5,
        icon: CreditCard,
        title: '多元付款',
        description: '信用卡/ATM/超商',
    },
    {
        id: 6,
        icon: Lock,
        title: '安全交易',
        description: 'SSL 加密保護',
    },
];

export default function Guarantees() {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <h2 className="text-2xl font-bold text-text-main">
                        購物保障
                    </h2>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {guarantees.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="text-center"
                        >
                            <div className="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-xl flex items-center justify-center">
                                <item.icon className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="font-bold text-text-main text-sm mb-1">
                                {item.title}
                            </h3>
                            <p className="text-text-muted text-xs">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
