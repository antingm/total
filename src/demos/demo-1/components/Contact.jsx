import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { contactInfo } from '../constants';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        service: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // 模擬表單提交
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
            setFormData({ name: '', phone: '', email: '', service: '', message: '' });

            // 3秒後重置
            setTimeout(() => setSubmitted(false), 3000);
        }, 1500);
    };

    // 動態取得圖示元件
    const getIcon = (iconName) => {
        const IconComponent = LucideIcons[iconName];
        return IconComponent ? <IconComponent className="w-5 h-5" /> : null;
    };

    const contactItems = [
        { icon: <Phone className="w-5 h-5" />, label: '電話', value: contactInfo.phone },
        { icon: <Phone className="w-5 h-5" />, label: '手機', value: contactInfo.mobile },
        { icon: <Mail className="w-5 h-5" />, label: '信箱', value: contactInfo.email },
        { icon: <MapPin className="w-5 h-5" />, label: '地址', value: contactInfo.address },
        { icon: <Clock className="w-5 h-5" />, label: '營業時間', value: contactInfo.businessHours },
    ];

    return (
        <section id="contact" className="section-padding bg-slate-800/50">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="heading-lg mb-4">
                        <span className="text-gradient">聯絡我們</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        無論您有任何設計需求或疑問，歡迎隨時與我們聯繫，我們將竭誠為您服務
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3 className="text-2xl font-bold text-white mb-8">聯絡資訊</h3>

                        <div className="space-y-6 mb-10">
                            {contactItems.map((item, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center text-gold flex-shrink-0">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <div className="text-slate-400 text-sm mb-1">{item.label}</div>
                                        <div className="text-white">{item.value}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-4">
                            {contactInfo.socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 bg-slate-700 hover:bg-gold text-slate-300 hover:text-slate-900 rounded-xl flex items-center justify-center transition-all duration-300"
                                    aria-label={social.platform}
                                >
                                    {getIcon(social.icon)}
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
                            <h3 className="text-2xl font-bold text-white mb-6">免費諮詢</h3>

                            {submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-12"
                                >
                                    <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Send className="w-8 h-8 text-gold" />
                                    </div>
                                    <h4 className="text-xl font-bold text-white mb-2">感謝您的訊息！</h4>
                                    <p className="text-slate-400">我們將盡快與您聯繫</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-slate-300 text-sm mb-2">姓名 *</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
                                                placeholder="請輸入姓名"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-slate-300 text-sm mb-2">電話 *</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
                                                placeholder="請輸入電話"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-slate-300 text-sm mb-2">電子信箱</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
                                            placeholder="請輸入電子信箱"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-slate-300 text-sm mb-2">諮詢項目</label>
                                        <select
                                            name="service"
                                            value={formData.service}
                                            onChange={handleChange}
                                            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
                                        >
                                            <option value="">請選擇諮詢項目</option>
                                            <option value="residential">住宅設計</option>
                                            <option value="commercial">商業空間</option>
                                            <option value="renovation">裝潢工程</option>
                                            <option value="other">其他</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-slate-300 text-sm mb-2">需求說明</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={4}
                                            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors resize-none"
                                            placeholder="請簡述您的需求..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
                                                傳送中...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" />
                                                送出諮詢
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
