import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { zhTW } from 'date-fns/locale';
import { Calendar, Clock, User, Sparkles, CreditCard, CheckCircle2 } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export default function Confirmation() {
    const { booking } = useBooking();

    const summaryItems = [
        {
            icon: Sparkles,
            label: '服務項目',
            value: booking.services.map(s => s.title).join('、'),
            color: 'from-rose-400 to-rose-500'
        },
        {
            icon: User,
            label: '指定設計師',
            value: booking.stylist?.name,
            color: 'from-violet-400 to-violet-500'
        },
        {
            icon: Calendar,
            label: '預約日期',
            value: booking.date
                ? format(booking.date, 'yyyy年MM月dd日 (EEEE)', { locale: zhTW })
                : '',
            color: 'from-blue-400 to-blue-500'
        },
        {
            icon: Clock,
            label: '預約時間',
            value: booking.time,
            color: 'from-amber-400 to-amber-500'
        }
    ];

    return (
        <div className="space-y-6">
            {/* 摘要標題 */}
            <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center shadow-lg shadow-green-300/40">
                    <CheckCircle2 size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">預約確認</h3>
                <p className="text-sm text-gray-500 mt-1">請確認以下預約資訊</p>
            </div>

            {/* 摘要卡片 */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 space-y-4"
            >
                {summaryItems.map(({ icon: Icon, label, value, color }, index) => (
                    <motion.div
                        key={label}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-4"
                    >
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 shadow-md`}>
                            <Icon size={18} className="text-white" />
                        </div>
                        <div className="flex-1 pt-1">
                            <p className="text-xs text-gray-400 uppercase tracking-wider">{label}</p>
                            <p className="font-semibold text-gray-800 mt-0.5">{value}</p>
                        </div>
                    </motion.div>
                ))}

                {/* 費用明細 */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="pt-4 mt-4 border-t border-gray-100"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-500 flex items-center justify-center flex-shrink-0 shadow-md">
                            <CreditCard size={18} className="text-white" />
                        </div>
                        <div className="flex-1 pt-1">
                            <p className="text-xs text-gray-400 uppercase tracking-wider">預估費用</p>
                            <div className="flex items-baseline gap-2 mt-0.5">
                                <span className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-rose-600 bg-clip-text text-transparent">
                                    NT$ {booking.totalPrice.toLocaleString()}
                                </span>
                                <span className="text-xs text-gray-400">
                                    約 {booking.totalDuration} 分鐘
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* 服務明細 */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
            >
                <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">服務明細</h4>
                <div className="space-y-3">
                    {booking.services.map(service => (
                        <div
                            key={service.id}
                            className="flex items-center justify-between text-sm"
                        >
                            <div className="flex items-center gap-3">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-10 h-10 rounded-lg object-cover"
                                />
                                <span className="text-gray-700 font-medium">{service.title}</span>
                            </div>
                            <span className="text-gray-500 font-semibold">
                                NT$ {service.price.toLocaleString()}
                            </span>
                        </div>
                    ))}
                    <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between">
                        <span className="font-semibold text-gray-700">合計</span>
                        <span className="font-bold text-rose-600 text-lg">
                            NT$ {booking.totalPrice.toLocaleString()}
                        </span>
                    </div>
                </div>
            </motion.div>

            {/* 注意事項 */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-100"
            >
                <p className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
                    📋 注意事項
                </p>
                <ul className="text-sm space-y-1.5 text-amber-700">
                    <li className="flex items-start gap-2">
                        <span className="text-amber-400">•</span>
                        請於預約時間前 10 分鐘抵達
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-amber-400">•</span>
                        如需更改或取消，請提前 24 小時通知
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-amber-400">•</span>
                        實際費用可能因設計複雜度略有調整
                    </li>
                </ul>
            </motion.div>
        </div>
    );
}
