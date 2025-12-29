import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send, Mail, Phone, MapPin, Facebook, Instagram, MessageCircle } from 'lucide-react';
import { contactContent } from '../constants';
import emailjs from '@emailjs/browser';
import { createInquiry } from '../services/firestore';

const socialIcons = {
    Facebook,
    Instagram,
    MessageCircle,
};

const Contact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        budget: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // ========== 步驟 1: 儲存到 Firestore ==========
            console.log('=== 開始儲存諮詢記錄到 Firestore ===');
            try {
                const inquiryId = await createInquiry({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone || '',
                    company: formData.company || '',
                    service: formData.service,
                    budget: formData.budget || '',
                    message: formData.message
                });
                console.log('Firestore 儲存成功，ID:', inquiryId);
            } catch (firestoreError) {
                console.error('Firestore 儲存失敗:', firestoreError);
                // 繼續執行 EmailJS，不中斷流程
            }

            // ========== 步驟 2: 發送 EmailJS ==========
            console.log('=== EmailJS 提交開始 ===');
            const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
            const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
            const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

            console.log('Service ID:', serviceId);
            console.log('Template ID:', templateId);
            console.log('Public Key:', publicKey ? '已設置' : '未設置');
            console.log('表單資料:', formData);

            // 檢查環境變數是否設置
            if (!serviceId || !templateId || !publicKey) {
                console.warn('EmailJS 環境變數缺失，跳過郵件發送');
                // 即使 EmailJS 未設定，Firestore 已經儲存，仍視為成功
                alert('✅ 感謝您的諮詢！我們已收到您的訊息，會在 24 小時內與您聯繫。');

                // 清空表單
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    company: '',
                    service: '',
                    budget: '',
                    message: ''
                });
                return;
            }

            // 準備郵件參數
            const templateParams = {
                from_name: formData.name,
                reply_to: formData.email,
                phone: formData.phone || '未提供',
                company: formData.company || '未提供',
                service: formData.service,
                budget: formData.budget || '未提供',
                message: formData.message,
            };

            console.log('準備發送的郵件參數:', templateParams);

            // 發送郵件
            const response = await emailjs.send(
                serviceId,
                templateId,
                templateParams,
                publicKey
            );

            console.log('EmailJS 發送成功:', response);

            // 成功提示
            alert('✅ 感謝您的諮詢！我們已收到您的訊息，會在 24 小時內與您聯繫。');

            // 清空表單
            setFormData({
                name: '',
                email: '',
                phone: '',
                company: '',
                service: '',
                budget: '',
                message: ''
            });

        } catch (error) {
            console.error('=== 提交失敗 ===');
            console.error('錯誤訊息:', error.message);
            console.error('錯誤詳情:', error);

            // 錯誤提示
            alert(`❌ 發送失敗：${error.message}\n\n您的諮詢可能已儲存，請稍後再試或直接聯繫我們：\n📧 anting13579@gmail.com\n📱 0930-693-088`);
        } finally {
            setIsSubmitting(false);
            console.log('=== 提交結束 ===');
        }
    };

    const infoIcons = { Mail, Phone, MapPin };

    return (
        <section id="contact" className="section-padding bg-bg-secondary relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-grid opacity-20" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full filter blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full filter blur-3xl" />

            <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="heading-lg text-white mb-4">
                        {contactContent.sectionTitle}
                    </h2>
                    <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto px-4">
                        {contactContent.sectionSubtitle}
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-2"
                    >
                        <div className="card">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name & Email Row */}
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            姓名 *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder={contactContent.form.namePlaceholder}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            電子郵件 *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder={contactContent.form.emailPlaceholder}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Phone & Company Row */}
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            聯絡電話
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder={contactContent.form.phonePlaceholder}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            公司/品牌名稱
                                        </label>
                                        <input
                                            type="text"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            placeholder={contactContent.form.companyPlaceholder}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Service & Budget Row */}
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            服務類型 *
                                        </label>
                                        <select
                                            name="service"
                                            value={formData.service}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-white focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                                        >
                                            <option value="" className="bg-slate-800">請選擇服務類型</option>
                                            {contactContent.form.serviceOptions.map((option, idx) => (
                                                <option key={idx} value={option} className="bg-slate-800">
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            預算範圍
                                        </label>
                                        <select
                                            name="budget"
                                            value={formData.budget}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-white focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                                        >
                                            <option value="" className="bg-slate-800">請選擇預算範圍</option>
                                            {contactContent.form.budgetOptions.map((option, idx) => (
                                                <option key={idx} value={option} className="bg-slate-800">
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        專案需求說明 *
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        placeholder={contactContent.form.messagePlaceholder}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                                    />
                                </div>

                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
                                            送出中...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            {contactContent.form.submitButton}
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>

                    {/* Contact Info Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="space-y-6"
                    >
                        {/* Info Cards */}
                        {contactContent.info.map((item, index) => {
                            const IconComponent = infoIcons[item.icon];
                            return (
                                <div key={index} className="card">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                            {IconComponent && <IconComponent className="w-6 h-6 text-primary" />}
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-400 mb-1">{item.title}</p>
                                            {item.link ? (
                                                <a
                                                    href={item.link}
                                                    className="text-white font-medium hover:text-primary transition-colors"
                                                >
                                                    {item.value}
                                                </a>
                                            ) : (
                                                <p className="text-white font-medium">{item.value}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Social Links */}
                        <div className="card">
                            <p className="text-sm text-slate-400 mb-4">追蹤我們的社群</p>
                            <div className="flex gap-4">
                                {contactContent.social.map((item, index) => {
                                    const IconComponent = socialIcons[item.icon];
                                    return (
                                        <motion.a
                                            key={index}
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.1, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="w-10 h-10 rounded-xl bg-slate-700/50 flex items-center justify-center text-slate-400 hover:bg-primary/20 hover:text-primary transition-all"
                                        >
                                            {IconComponent && <IconComponent className="w-5 h-5" />}
                                        </motion.a>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-slate-500 text-sm leading-relaxed">
                            {contactContent.description}
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
