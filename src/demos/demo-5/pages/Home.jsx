import { motion } from 'framer-motion';
import { Bell, ChevronRight, Sparkles, Clock, Star, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroBanner from '../components/home/HeroBanner';
import QuickActions from '../components/home/QuickActions';
import StylistCarousel from '../components/home/StylistCarousel';
import { services, stylists } from '../data/mock';

export default function Home() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white min-h-screen"
        >
            {/* 手機版 Header - 只在手機顯示 */}
            <header className="lg:hidden relative px-5 pt-8 pb-4">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-sm text-gray-400">歡迎回來</p>
                        <h1 className="text-2xl font-bold text-gray-800 mt-1">
                            小珊 <span className="text-rose-400">✨</span>
                        </h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="relative w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors">
                            <Bell size={20} strokeWidth={1.5} className="text-gray-600" />
                            <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white" />
                        </button>
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-rose-400 to-rose-500 flex items-center justify-center shadow-lg shadow-rose-200/50">
                            <span className="text-white font-bold text-sm">L</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* 電腦版 Hero Section */}
            <section className="hidden lg:block relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 py-20">
                    <div className="grid grid-cols-2 gap-16 items-center">
                        {/* 左側文字 */}
                        <div className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 rounded-full"
                            >
                                <Sparkles size={16} className="text-rose-500" />
                                <span className="text-sm font-medium text-rose-600">台北市大安區・專業美甲沙龍</span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-5xl font-bold text-gray-800 leading-tight"
                            >
                                讓指尖綻放
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-rose-600">
                                    專屬於你的美麗
                                </span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-lg text-gray-600 leading-relaxed"
                            >
                                LUNA Fashion Nail 擁有專業設計師團隊，提供日式凝膠、法式經典、
                                手繪藝術等多元服務，為您打造獨一無二的指尖藝術。
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex items-center gap-4"
                            >
                                <Link
                                    to="/booking"
                                    className="px-8 py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 shadow-xl shadow-rose-200/50 hover:shadow-rose-300/60 transition-all active:scale-[0.98]"
                                >
                                    立即預約
                                </Link>
                                <Link
                                    to="/gallery"
                                    className="px-8 py-4 rounded-2xl font-semibold text-rose-600 border-2 border-rose-200 hover:border-rose-300 hover:bg-rose-50 transition-all"
                                >
                                    瀏覽作品
                                </Link>
                            </motion.div>

                            {/* 統計數據 */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="flex items-center gap-8 pt-4"
                            >
                                <div>
                                    <p className="text-3xl font-bold text-gray-800">2000+</p>
                                    <p className="text-sm text-gray-500">滿意顧客</p>
                                </div>
                                <div className="w-px h-12 bg-gray-200" />
                                <div>
                                    <p className="text-3xl font-bold text-gray-800">4.9</p>
                                    <p className="text-sm text-gray-500 flex items-center gap-1">
                                        <Star size={14} className="text-amber-400 fill-amber-400" />
                                        評價
                                    </p>
                                </div>
                                <div className="w-px h-12 bg-gray-200" />
                                <div>
                                    <p className="text-3xl font-bold text-gray-800">8年</p>
                                    <p className="text-sm text-gray-500">專業經驗</p>
                                </div>
                            </motion.div>
                        </div>

                        {/* 右側圖片 */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="relative"
                        >
                            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800"
                                    alt="Nail Art"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* 裝飾元素 */}
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-rose-100 rounded-full blur-2xl" />
                            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-amber-100 rounded-full blur-2xl" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 手機版 Hero Banner */}
            <div className="lg:hidden">
                <HeroBanner />
                <QuickActions />
            </div>

            {/* 設計師團隊 */}
            <section className="py-8 lg:py-20">
                <div className="max-w-7xl mx-auto">
                    {/* 手機版 */}
                    <div className="lg:hidden">
                        <StylistCarousel />
                    </div>

                    {/* 電腦版 */}
                    <div className="hidden lg:block px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">專業設計師團隊</h2>
                            <p className="text-gray-600">由資深美甲師組成，為您提供最專業的服務</p>
                        </div>

                        <div className="grid grid-cols-4 gap-6">
                            {stylists.map((stylist, index) => (
                                <motion.div
                                    key={stylist.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer"
                                >
                                    <div className="relative w-24 h-24 mx-auto mb-4">
                                        <div className={`w-full h-full rounded-full flex items-center justify-center bg-gradient-to-br ${stylist.color} shadow-lg`}>
                                            <span className="text-3xl font-bold text-white">{stylist.initial}</span>
                                        </div>
                                        <div className="absolute -bottom-2 -right-2 bg-white rounded-full px-2 py-1 shadow-md flex items-center gap-1">
                                            <Star size={12} className="text-amber-400 fill-amber-400" />
                                            <span className="text-xs font-bold text-gray-700">{stylist.rating}</span>
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-lg text-gray-800">{stylist.name}</h3>
                                    <p className="text-rose-500 font-medium text-sm mt-1">{stylist.expertise}</p>
                                    <p className="text-gray-400 text-xs mt-1">{stylist.experience}經驗</p>
                                    <p className="text-gray-500 text-sm mt-3">{stylist.bio}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 熱門服務 */}
            <section className="py-8 lg:py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 lg:px-6">
                    <div className="flex items-center justify-between mb-6 lg:mb-12">
                        <div>
                            <h2 className="text-lg lg:text-3xl font-bold text-gray-800">熱門服務</h2>
                            <p className="hidden lg:block text-gray-600 mt-2">精選人氣美甲服務，滿足您的各種需求</p>
                        </div>
                        <Link
                            to="/booking"
                            className="text-sm text-rose-500 font-semibold flex items-center gap-0.5 hover:text-rose-600 transition-colors"
                        >
                            查看全部
                            <ChevronRight size={16} />
                        </Link>
                    </div>

                    {/* 手機版 - 列表 */}
                    <div className="lg:hidden space-y-3">
                        {services.slice(0, 3).map((service, index) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 + 0.3 }}
                                className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer active:scale-[0.98]"
                            >
                                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
                                    <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-gray-800 truncate">{service.title}</h4>
                                    <p className="text-xs text-gray-500 mt-0.5 truncate">{service.description}</p>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="text-rose-500 font-bold text-sm">NT$ {service.price.toLocaleString()}</span>
                                        <span className="text-xs text-gray-400">{service.duration} 分鐘</span>
                                    </div>
                                </div>
                                <ChevronRight size={18} className="text-gray-300 flex-shrink-0" />
                            </motion.div>
                        ))}
                    </div>

                    {/* 電腦版 - Grid */}
                    <div className="hidden lg:grid grid-cols-3 gap-6">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group"
                            >
                                <div className="h-48 overflow-hidden">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h4 className="font-bold text-lg text-gray-800">{service.title}</h4>
                                            <p className="text-gray-500 text-sm mt-1">{service.description}</p>
                                        </div>
                                        <span className="px-3 py-1 bg-rose-50 text-rose-600 text-xs font-medium rounded-full">
                                            {service.category}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                                        <span className="text-rose-500 font-bold text-xl">NT$ {service.price.toLocaleString()}</span>
                                        <span className="text-gray-400 text-sm flex items-center gap-1">
                                            <Clock size={14} />
                                            {service.duration} 分鐘
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 電腦版 Footer 聯絡資訊 */}
            <section className="hidden lg:block py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-3 gap-12">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-400 to-rose-500 flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">L</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">LUNA</h3>
                                    <p className="text-xs text-gray-400">Fashion Nail</p>
                                </div>
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                                專注於為每一位顧客打造獨一無二的指尖藝術，
                                讓美麗從指尖開始綻放。
                            </p>
                        </div>

                        <div>
                            <h4 className="font-bold text-gray-800 mb-4">營業資訊</h4>
                            <div className="space-y-3 text-gray-600">
                                <p className="flex items-center gap-2">
                                    <MapPin size={18} className="text-rose-400" />
                                    台北市大安區復興南路一段123號
                                </p>
                                <p className="flex items-center gap-2">
                                    <Phone size={18} className="text-rose-400" />
                                    0912-345-678
                                </p>
                                <p className="flex items-center gap-2">
                                    <Clock size={18} className="text-rose-400" />
                                    週一至週日 10:00 - 20:00
                                </p>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold text-gray-800 mb-4">快速連結</h4>
                            <div className="space-y-2">
                                <Link to="/booking" className="block text-gray-600 hover:text-rose-500 transition-colors">線上預約</Link>
                                <Link to="/gallery" className="block text-gray-600 hover:text-rose-500 transition-colors">作品集</Link>
                                <Link to="/member" className="block text-gray-600 hover:text-rose-500 transition-colors">會員專區</Link>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-gray-100 text-center text-gray-400 text-sm">
                        © 2024 LUNA Fashion Nail. All rights reserved.
                    </div>
                </div>
            </section>
        </motion.div>
    );
}
