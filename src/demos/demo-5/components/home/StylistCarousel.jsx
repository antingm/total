import { motion } from 'framer-motion';
import { Star, ChevronRight } from 'lucide-react';
import { stylists } from '../../data/mock';

export default function StylistCarousel() {
    return (
        <div className="mt-8">
            {/* 標題 */}
            <div className="flex items-center justify-between px-4 mb-4">
                <h2 className="text-lg font-bold text-gray-800">設計師團隊</h2>
                <button className="text-sm text-rose-500 font-semibold flex items-center gap-0.5 hover:text-rose-600 transition-colors">
                    查看全部
                    <ChevronRight size={16} />
                </button>
            </div>

            {/* 橫向捲動容器 */}
            <div className="flex gap-4 overflow-x-auto pb-4 pl-4 pr-4 snap-x snap-mandatory no-scrollbar">
                {stylists.map((stylist, index) => (
                    <motion.div
                        key={stylist.id}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="snap-start flex-shrink-0 w-36"
                    >
                        <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer active:scale-[0.98]">
                            {/* 首字母頭像 */}
                            <div className="relative w-20 h-20 mx-auto mb-3">
                                <div className={`w-full h-full rounded-full flex items-center justify-center bg-gradient-to-br ${stylist.color} shadow-md`}>
                                    <span className="text-2xl font-bold text-white">{stylist.initial}</span>
                                </div>
                                {/* 評分徽章 */}
                                <div className="absolute -bottom-1 -right-1 bg-white rounded-full px-1.5 py-0.5 shadow-sm flex items-center gap-0.5">
                                    <Star size={10} className="text-amber-400 fill-amber-400" />
                                    <span className="text-xs font-bold text-gray-700">{stylist.rating}</span>
                                </div>
                            </div>

                            {/* 資訊 */}
                            <h3 className="font-semibold text-gray-800">{stylist.name}</h3>
                            <p className="text-xs text-gray-500 mt-0.5">{stylist.expertise}</p>
                            <p className="text-xs text-gray-400 mt-1">{stylist.experience}經驗</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
