import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, CreditCard, Image, MapPin } from 'lucide-react';

const actions = [
    { icon: Calendar, label: '立即預約', path: '/booking', color: 'bg-primary/10 text-primary' },
    { icon: CreditCard, label: '價目表', path: '/pricing', color: 'bg-blue-50 text-blue-500' },
    { icon: Image, label: '作品集', path: '/gallery', color: 'bg-purple-50 text-purple-500' },
    { icon: MapPin, label: '店家據點', path: '/locations', color: 'bg-green-50 text-green-500' }
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function QuickActions() {
    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-4 gap-3 mx-4 mt-6"
        >
            {actions.map(({ icon: Icon, label, path, color }) => (
                <motion.div key={path} variants={item}>
                    <Link
                        to={path}
                        className="flex flex-col items-center gap-2 p-3 card-hover press-effect"
                    >
                        <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center`}>
                            <Icon size={24} strokeWidth={1.5} />
                        </div>
                        <span className="text-xs font-medium text-secondary">{label}</span>
                    </Link>
                </motion.div>
            ))}
        </motion.div>
    );
}
