import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { zhTW } from 'date-fns/locale';
import {
    Settings,
    Calendar,
    Clock,
    ChevronRight,
    ChevronLeft,
    Star,
    Gift,
    CreditCard,
    HelpCircle,
    X,
    Bell,
    Moon,
    Globe,
    Phone,
    Mail,
    MessageCircle,
    Percent,
    Check,
    Copy,
    Trash2,
    Plus,
    User,
    Lock,
    LogOut,
    ChevronDown,
    MapPin,
    ExternalLink
} from 'lucide-react';
import { memberInfo, upcomingBooking, bookingHistory } from '../data/mock';

export default function Member() {
    const [activeModal, setActiveModal] = useState(null);
    const [copied, setCopied] = useState(false);

    // 設定狀態
    const [settings, setSettings] = useState({
        notifications: true,
        darkMode: false,
        language: '繁體中文'
    });

    // 付款方式狀態
    const [paymentMethods, setPaymentMethods] = useState([
        { id: 1, type: 'visa', last4: '4242', expiry: '12/26', isDefault: true },
        { id: 2, type: 'mastercard', last4: '8888', expiry: '06/25', isDefault: false }
    ]);

    // 優惠券狀態
    const [coupons, setCoupons] = useState([
        { id: 1, title: '生日禮遇 9 折', code: 'BDAY2024', discount: '10%', expiry: '2025-06-30', used: false },
        { id: 2, title: '免費手部護理', code: 'GOLDCARE', discount: '免費', expiry: '2025-01-31', used: false },
        { id: 3, title: '新年優惠 85 折', code: 'NY2025', discount: '15%', expiry: '2025-02-28', used: false }
    ]);

    // 新增卡片表單
    const [showAddCard, setShowAddCard] = useState(false);
    const [newCard, setNewCard] = useState({ number: '', expiry: '', cvv: '', name: '' });

    // FAQ 展開狀態
    const [expandedFaq, setExpandedFaq] = useState(null);

    const menuItems = [
        { id: 'history', icon: Calendar, label: '預約紀錄', badge: `${bookingHistory.length} 筆` },
        { id: 'benefits', icon: Gift, label: '會員禮遇', badge: `${coupons.filter(c => !c.used).length} 項` },
        { id: 'payment', icon: CreditCard, label: '付款方式', badge: `${paymentMethods.length} 張` },
        { id: 'help', icon: HelpCircle, label: '幫助中心', badge: null },
        { id: 'settings', icon: Settings, label: '設定', badge: null }
    ];

    const faqs = [
        { id: 1, q: '如何取消預約？', a: '您可以在預約詳情頁面點擊「取消預約」，或致電客服協助處理。預約前 24 小時內取消將收取 50% 費用。' },
        { id: 2, q: '點數如何累積？', a: '每消費 NT$100 可累積 10 點，Gold 會員享 1.5 倍點數加成。點數可在下次消費時折抵，100 點 = NT$10。' },
        { id: 3, q: '如何升級會員等級？', a: '年度消費滿 NT$20,000 自動升級為 Gold 會員，滿 NT$50,000 升級為 Platinum 會員。' },
        { id: 4, q: '營業時間是什麼？', a: '週一至週日 10:00 - 20:00，國定假日照常營業。建議提前預約以確保時段。' }
    ];

    const closeModal = () => {
        setActiveModal(null);
        setShowAddCard(false);
    };

    const copyCode = (code) => {
        navigator.clipboard.writeText(code);
        setCopied(code);
        setTimeout(() => setCopied(false), 2000);
    };

    const useCoupon = (id) => {
        setCoupons(prev => prev.map(c => c.id === id ? { ...c, used: true } : c));
    };

    const deletePaymentMethod = (id) => {
        setPaymentMethods(prev => prev.filter(p => p.id !== id));
    };

    const setDefaultPayment = (id) => {
        setPaymentMethods(prev => prev.map(p => ({ ...p, isDefault: p.id === id })));
    };

    const addPaymentMethod = () => {
        if (newCard.number && newCard.expiry) {
            const last4 = newCard.number.slice(-4);
            setPaymentMethods(prev => [...prev, {
                id: Date.now(),
                type: 'visa',
                last4,
                expiry: newCard.expiry,
                isDefault: false
            }]);
            setNewCard({ number: '', expiry: '', cvv: '', name: '' });
            setShowAddCard(false);
        }
    };

    const toggleSetting = (key) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="pb-8 min-h-screen bg-gray-50"
            >
                {/* Header */}
                <header className="bg-white px-4 pt-6 pb-4 sticky top-0 z-30">
                    <h1 className="text-xl font-bold text-gray-800">會員中心</h1>
                </header>

                {/* Member Card */}
                <div className="px-4 py-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative overflow-hidden rounded-2xl p-5"
                        style={{
                            background: 'linear-gradient(135deg, #E8B4B3 0%, #D49C9B 30%, #C48F8E 60%, #B07B7A 100%)',
                            boxShadow: '0 20px 40px -15px rgba(196, 143, 142, 0.5)'
                        }}
                    >
                        {/* 光澤動畫 */}
                        <div
                            className="absolute inset-0 opacity-30"
                            style={{
                                background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
                                animation: 'shimmer 3s infinite'
                            }}
                        />

                        <div className="relative z-10">
                            <div className="flex items-start justify-between mb-6">
                                <div className="text-white">
                                    <p className="text-sm opacity-80">LUNA NAIL</p>
                                    <h2 className="text-2xl font-bold mt-1">{memberInfo.name}</h2>
                                </div>
                                <div className="flex items-center gap-1 bg-white/20 backdrop-blur rounded-full px-3 py-1.5">
                                    <Star size={14} className="text-yellow-300 fill-yellow-300" />
                                    <span className="text-sm font-semibold text-white">{memberInfo.level}</span>
                                </div>
                            </div>

                            <div className="flex items-end justify-between text-white">
                                <div>
                                    <p className="text-xs opacity-60">卡號</p>
                                    <p className="font-mono text-sm tracking-wider">{memberInfo.cardNumber}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs opacity-60">可用點數</p>
                                    <p className="text-3xl font-bold">{memberInfo.points.toLocaleString()} <span className="text-sm font-normal opacity-80">pt</span></p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Upcoming Booking */}
                {upcomingBooking && (
                    <div className="px-4 mb-4">
                        <h2 className="text-sm font-semibold text-gray-500 mb-3">待服務預約</h2>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl p-4 shadow-sm"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h3 className="font-semibold text-gray-800">{upcomingBooking.service}</h3>
                                    <p className="text-sm text-gray-500 mt-0.5">設計師：{upcomingBooking.stylist}</p>
                                </div>
                                <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full font-medium flex items-center gap-1">
                                    <Check size={12} /> 已確認
                                </span>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1.5">
                                    <Calendar size={14} />
                                    <span>{format(parseISO(upcomingBooking.date), 'MM/dd (EEE)', { locale: zhTW })}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Clock size={14} />
                                    <span>{upcomingBooking.time}</span>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                                <span className="text-lg font-bold text-rose-500">
                                    NT$ {upcomingBooking.price.toLocaleString()}
                                </span>
                                <button
                                    onClick={() => setActiveModal('booking-detail')}
                                    className="text-sm text-rose-500 font-medium flex items-center gap-1 active:scale-95 transition-transform"
                                >
                                    查看詳情
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* Quick Stats */}
                <div className="px-4 mb-4">
                    <div className="grid grid-cols-3 gap-3">
                        <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                            <p className="text-2xl font-bold text-gray-800">{memberInfo.totalVisits}</p>
                            <p className="text-xs text-gray-500 mt-1">累計消費</p>
                        </div>
                        <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                            <p className="text-2xl font-bold text-rose-500">{coupons.filter(c => !c.used).length}</p>
                            <p className="text-xs text-gray-500 mt-1">可用優惠</p>
                        </div>
                        <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                            <p className="text-2xl font-bold text-amber-500">4.9</p>
                            <p className="text-xs text-gray-500 mt-1">平均評分</p>
                        </div>
                    </div>
                </div>

                {/* Menu */}
                <div className="px-4">
                    <div className="bg-white rounded-2xl shadow-sm divide-y divide-gray-100 overflow-hidden">
                        {menuItems.map(({ id, icon: Icon, label, badge }, index) => (
                            <motion.button
                                key={id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => setActiveModal(id)}
                                className="w-full flex items-center justify-between p-4 active:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-50 to-amber-50 flex items-center justify-center">
                                        <Icon size={20} className="text-rose-500" />
                                    </div>
                                    <span className="font-medium text-gray-800">{label}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    {badge && (
                                        <span className="text-xs bg-rose-50 text-rose-500 px-2 py-0.5 rounded-full font-medium">
                                            {badge}
                                        </span>
                                    )}
                                    <ChevronRight size={18} className="text-gray-300" />
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Version */}
                <p className="text-center text-xs text-gray-400 mt-6">LUNA Nail v1.0.0</p>
            </motion.div>

            {/* Modal */}
            <AnimatePresence>
                {activeModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50"
                    >
                        <div className="absolute inset-0 bg-black/50" onClick={closeModal} />

                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[90vh] flex flex-col"
                        >
                            {/* Modal Header */}
                            <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-4 flex items-center justify-between rounded-t-3xl">
                                <div className="flex items-center gap-3">
                                    {activeModal !== 'booking-detail' && (
                                        <button onClick={closeModal}>
                                            <ChevronLeft size={24} className="text-gray-600" />
                                        </button>
                                    )}
                                    <h3 className="text-lg font-bold text-gray-800">
                                        {activeModal === 'history' && '預約紀錄'}
                                        {activeModal === 'benefits' && '會員禮遇'}
                                        {activeModal === 'payment' && '付款方式'}
                                        {activeModal === 'help' && '幫助中心'}
                                        {activeModal === 'settings' && '設定'}
                                        {activeModal === 'booking-detail' && '預約詳情'}
                                    </h3>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                                >
                                    <X size={18} className="text-gray-600" />
                                </button>
                            </div>

                            {/* Modal Content - Scrollable */}
                            <div className="flex-1 overflow-y-auto overscroll-contain p-4 pb-8">

                                {/* 預約紀錄 - 完整列表，可滑動 */}
                                {activeModal === 'history' && (
                                    <div className="space-y-4">
                                        <p className="text-sm text-gray-500">共 {bookingHistory.length} 筆消費紀錄</p>
                                        {[upcomingBooking, ...bookingHistory].map((item, index) => (
                                            <motion.div
                                                key={item.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                className="bg-gray-50 rounded-xl p-4"
                                            >
                                                <div className="flex justify-between items-start mb-3">
                                                    <div>
                                                        <h4 className="font-semibold text-gray-800">{item.service}</h4>
                                                        <p className="text-sm text-gray-500 mt-0.5">設計師：{item.stylist}</p>
                                                    </div>
                                                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${item.status === 'confirmed'
                                                            ? 'bg-blue-50 text-blue-600'
                                                            : 'bg-green-50 text-green-600'
                                                        }`}>
                                                        {item.status === 'confirmed' ? '待服務' : '已完成'}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3 text-sm text-gray-500">
                                                        <span className="flex items-center gap-1">
                                                            <Calendar size={14} />
                                                            {format(parseISO(item.date), 'yyyy/MM/dd')}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Clock size={14} />
                                                            {item.time}
                                                        </span>
                                                    </div>
                                                    <span className="font-bold text-gray-700">NT$ {item.price.toLocaleString()}</span>
                                                </div>
                                                {item.status === 'completed' && (
                                                    <button className="mt-3 text-sm text-rose-500 font-medium">
                                                        再次預約此服務 →
                                                    </button>
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>
                                )}

                                {/* 會員禮遇 - 可使用優惠券 */}
                                {activeModal === 'benefits' && (
                                    <div className="space-y-4">
                                        <p className="text-sm text-gray-500">共 {coupons.length} 張優惠券</p>
                                        {coupons.map((coupon, index) => (
                                            <motion.div
                                                key={coupon.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className={`relative rounded-xl overflow-hidden ${coupon.used ? 'opacity-50' : ''}`}
                                            >
                                                <div className="bg-gradient-to-r from-rose-500 to-amber-500 p-4 text-white">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <p className="text-2xl font-bold">{coupon.discount}</p>
                                                            <p className="text-sm opacity-90 mt-1">{coupon.title}</p>
                                                        </div>
                                                        <Percent size={40} className="opacity-20" />
                                                    </div>
                                                </div>
                                                <div className="bg-white p-4 border-x border-b border-gray-100 rounded-b-xl">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{coupon.code}</span>
                                                                <button
                                                                    onClick={() => copyCode(coupon.code)}
                                                                    className="text-gray-400 hover:text-gray-600"
                                                                >
                                                                    {copied === coupon.code ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                                                                </button>
                                                            </div>
                                                            <p className="text-xs text-gray-400 mt-2">有效期限：{coupon.expiry}</p>
                                                        </div>
                                                        {coupon.used ? (
                                                            <span className="text-gray-400 font-medium">已使用</span>
                                                        ) : (
                                                            <button
                                                                onClick={() => useCoupon(coupon.id)}
                                                                className="px-4 py-2 bg-rose-500 text-white rounded-lg font-medium text-sm active:scale-95 transition-transform"
                                                            >
                                                                立即使用
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                                {coupon.used && (
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <span className="text-4xl font-bold text-gray-300 rotate-[-15deg]">已使用</span>
                                                    </div>
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>
                                )}

                                {/* 付款方式 - 可新增/刪除/設為預設 */}
                                {activeModal === 'payment' && (
                                    <div className="space-y-4">
                                        {paymentMethods.map((method, index) => (
                                            <motion.div
                                                key={method.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className={`p-4 rounded-xl border-2 ${method.isDefault ? 'border-rose-300 bg-rose-50' : 'border-gray-100 bg-white'}`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-12 h-8 rounded flex items-center justify-center ${method.type === 'visa' ? 'bg-blue-600' : 'bg-orange-500'
                                                            }`}>
                                                            <span className="text-white text-xs font-bold uppercase">{method.type}</span>
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-gray-800">•••• •••• •••• {method.last4}</p>
                                                            <p className="text-xs text-gray-400">到期 {method.expiry}</p>
                                                        </div>
                                                    </div>
                                                    {method.isDefault && (
                                                        <span className="text-xs bg-rose-500 text-white px-2 py-1 rounded-full">預設</span>
                                                    )}
                                                </div>
                                                <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
                                                    {!method.isDefault && (
                                                        <button
                                                            onClick={() => setDefaultPayment(method.id)}
                                                            className="flex-1 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg font-medium"
                                                        >
                                                            設為預設
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => deletePaymentMethod(method.id)}
                                                        className="px-4 py-2 text-sm text-red-500 bg-red-50 rounded-lg font-medium flex items-center gap-1"
                                                    >
                                                        <Trash2 size={14} /> 刪除
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ))}

                                        {/* 新增卡片表單 */}
                                        {showAddCard ? (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                className="bg-gray-50 rounded-xl p-4 space-y-3"
                                            >
                                                <input
                                                    type="text"
                                                    placeholder="卡號"
                                                    value={newCard.number}
                                                    onChange={(e) => setNewCard({ ...newCard, number: e.target.value })}
                                                    className="w-full p-3 rounded-lg border border-gray-200 focus:border-rose-300 focus:outline-none"
                                                    maxLength={16}
                                                />
                                                <div className="grid grid-cols-2 gap-3">
                                                    <input
                                                        type="text"
                                                        placeholder="有效期限 MM/YY"
                                                        value={newCard.expiry}
                                                        onChange={(e) => setNewCard({ ...newCard, expiry: e.target.value })}
                                                        className="p-3 rounded-lg border border-gray-200 focus:border-rose-300 focus:outline-none"
                                                        maxLength={5}
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="CVV"
                                                        value={newCard.cvv}
                                                        onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })}
                                                        className="p-3 rounded-lg border border-gray-200 focus:border-rose-300 focus:outline-none"
                                                        maxLength={3}
                                                    />
                                                </div>
                                                <input
                                                    type="text"
                                                    placeholder="持卡人姓名"
                                                    value={newCard.name}
                                                    onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
                                                    className="w-full p-3 rounded-lg border border-gray-200 focus:border-rose-300 focus:outline-none"
                                                />
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => setShowAddCard(false)}
                                                        className="flex-1 py-3 bg-gray-200 text-gray-600 rounded-lg font-medium"
                                                    >
                                                        取消
                                                    </button>
                                                    <button
                                                        onClick={addPaymentMethod}
                                                        className="flex-1 py-3 bg-rose-500 text-white rounded-lg font-medium"
                                                    >
                                                        確認新增
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ) : (
                                            <button
                                                onClick={() => setShowAddCard(true)}
                                                className="w-full p-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 font-medium hover:border-rose-300 hover:text-rose-500 transition-colors flex items-center justify-center gap-2"
                                            >
                                                <Plus size={20} /> 新增付款方式
                                            </button>
                                        )}
                                    </div>
                                )}

                                {/* 幫助中心 - FAQ + 聯絡方式 */}
                                {activeModal === 'help' && (
                                    <div className="space-y-6">
                                        {/* 聯絡方式 */}
                                        <div className="space-y-3">
                                            <h4 className="font-semibold text-gray-800">聯絡我們</h4>
                                            <a href="tel:0912345678" className="flex items-center gap-3 p-4 bg-green-50 rounded-xl active:bg-green-100 transition-colors">
                                                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                                                    <Phone size={20} className="text-white" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-medium text-gray-800">撥打電話</p>
                                                    <p className="text-sm text-gray-500">0912-345-678</p>
                                                </div>
                                                <ExternalLink size={18} className="text-gray-400" />
                                            </a>
                                            <a href="mailto:hello@luna-nail.com" className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl active:bg-blue-100 transition-colors">
                                                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                                                    <Mail size={20} className="text-white" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-medium text-gray-800">發送郵件</p>
                                                    <p className="text-sm text-gray-500">hello@luna-nail.com</p>
                                                </div>
                                                <ExternalLink size={18} className="text-gray-400" />
                                            </a>
                                            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-rose-50 rounded-xl active:bg-rose-100 transition-colors">
                                                <div className="w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center">
                                                    <MapPin size={20} className="text-white" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-medium text-gray-800">查看地圖</p>
                                                    <p className="text-sm text-gray-500">台北市大安區復興南路一段123號</p>
                                                </div>
                                                <ExternalLink size={18} className="text-gray-400" />
                                            </a>
                                        </div>

                                        {/* FAQ */}
                                        <div className="space-y-3">
                                            <h4 className="font-semibold text-gray-800">常見問題</h4>
                                            {faqs.map((faq) => (
                                                <div key={faq.id} className="bg-gray-50 rounded-xl overflow-hidden">
                                                    <button
                                                        onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                                                        className="w-full p-4 flex items-center justify-between text-left"
                                                    >
                                                        <span className="font-medium text-gray-800">{faq.q}</span>
                                                        <motion.div
                                                            animate={{ rotate: expandedFaq === faq.id ? 180 : 0 }}
                                                        >
                                                            <ChevronDown size={18} className="text-gray-400" />
                                                        </motion.div>
                                                    </button>
                                                    <AnimatePresence>
                                                        {expandedFaq === faq.id && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: 'auto', opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                className="overflow-hidden"
                                                            >
                                                                <p className="px-4 pb-4 text-sm text-gray-600">{faq.a}</p>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* 設定 - 可切換開關 */}
                                {activeModal === 'settings' && (
                                    <div className="space-y-4">
                                        {/* 帳號資訊 */}
                                        <div className="bg-gray-50 rounded-xl p-4">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-400 to-rose-500 flex items-center justify-center">
                                                    <span className="text-2xl font-bold text-white">{memberInfo.name.charAt(0)}</span>
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-800">{memberInfo.name}</p>
                                                    <p className="text-sm text-gray-500">{memberInfo.cardNumber}</p>
                                                </div>
                                            </div>
                                            <button className="w-full py-2 text-sm text-rose-500 font-medium border border-rose-200 rounded-lg">
                                                編輯個人資料
                                            </button>
                                        </div>

                                        {/* 設定項目 */}
                                        <div className="space-y-1">
                                            <button
                                                onClick={() => toggleSetting('notifications')}
                                                className="w-full flex items-center justify-between p-4 bg-white rounded-xl"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <Bell size={20} className="text-gray-600" />
                                                    <span className="font-medium text-gray-800">推播通知</span>
                                                </div>
                                                <div className={`w-12 h-7 rounded-full p-1 transition-colors ${settings.notifications ? 'bg-rose-500' : 'bg-gray-300'}`}>
                                                    <motion.div
                                                        className="w-5 h-5 bg-white rounded-full shadow"
                                                        animate={{ x: settings.notifications ? 20 : 0 }}
                                                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                                    />
                                                </div>
                                            </button>

                                            <button
                                                onClick={() => toggleSetting('darkMode')}
                                                className="w-full flex items-center justify-between p-4 bg-white rounded-xl"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <Moon size={20} className="text-gray-600" />
                                                    <span className="font-medium text-gray-800">深色模式</span>
                                                </div>
                                                <div className={`w-12 h-7 rounded-full p-1 transition-colors ${settings.darkMode ? 'bg-rose-500' : 'bg-gray-300'}`}>
                                                    <motion.div
                                                        className="w-5 h-5 bg-white rounded-full shadow"
                                                        animate={{ x: settings.darkMode ? 20 : 0 }}
                                                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                                    />
                                                </div>
                                            </button>

                                            <div className="flex items-center justify-between p-4 bg-white rounded-xl">
                                                <div className="flex items-center gap-3">
                                                    <Globe size={20} className="text-gray-600" />
                                                    <span className="font-medium text-gray-800">語言</span>
                                                </div>
                                                <span className="text-gray-500">{settings.language}</span>
                                            </div>

                                            <button className="w-full flex items-center justify-between p-4 bg-white rounded-xl">
                                                <div className="flex items-center gap-3">
                                                    <Lock size={20} className="text-gray-600" />
                                                    <span className="font-medium text-gray-800">修改密碼</span>
                                                </div>
                                                <ChevronRight size={18} className="text-gray-400" />
                                            </button>
                                        </div>

                                        {/* 登出 */}
                                        <button className="w-full p-4 text-center text-red-500 font-medium bg-red-50 rounded-xl flex items-center justify-center gap-2">
                                            <LogOut size={18} />
                                            登出帳號
                                        </button>
                                    </div>
                                )}

                                {/* 預約詳情 */}
                                {activeModal === 'booking-detail' && (
                                    <div className="space-y-4">
                                        <div className="bg-gradient-to-r from-rose-50 to-amber-50 rounded-xl p-4 text-center">
                                            <p className="text-sm text-gray-500 mb-1">預約編號</p>
                                            <p className="font-mono font-bold text-xl text-gray-800">{upcomingBooking.id}</p>
                                        </div>
                                        <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100">
                                            <div className="flex justify-between p-4">
                                                <span className="text-gray-500">服務項目</span>
                                                <span className="font-medium text-gray-800">{upcomingBooking.service}</span>
                                            </div>
                                            <div className="flex justify-between p-4">
                                                <span className="text-gray-500">指定設計師</span>
                                                <span className="font-medium text-gray-800">{upcomingBooking.stylist}</span>
                                            </div>
                                            <div className="flex justify-between p-4">
                                                <span className="text-gray-500">預約日期</span>
                                                <span className="font-medium text-gray-800">{format(parseISO(upcomingBooking.date), 'yyyy/MM/dd (EEE)', { locale: zhTW })}</span>
                                            </div>
                                            <div className="flex justify-between p-4">
                                                <span className="text-gray-500">預約時間</span>
                                                <span className="font-medium text-gray-800">{upcomingBooking.time}</span>
                                            </div>
                                            <div className="flex justify-between p-4">
                                                <span className="text-gray-500">預估費用</span>
                                                <span className="font-bold text-rose-600 text-xl">NT$ {upcomingBooking.price.toLocaleString()}</span>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <button className="py-3 bg-gray-100 text-gray-600 font-medium rounded-xl">
                                                修改預約
                                            </button>
                                            <button className="py-3 bg-red-50 text-red-500 font-medium rounded-xl">
                                                取消預約
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
        </>
    );
}
