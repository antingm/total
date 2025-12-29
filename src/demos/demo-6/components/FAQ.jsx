import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { faqs } from '../data/products';

export default function FAQ() {
    const [openId, setOpenId] = useState(null);

    const toggleFaq = (id) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <section id="faq" className="py-20 bg-white">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* 標題區 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
                        <HelpCircle className="w-4 h-4" />
                        <span>常見問題</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-text-main mb-4">
                        您可能想知道的事
                    </h2>
                    <p className="text-text-muted text-lg">
                        還有其他問題？歡迎聯繫我們的專業客服團隊
                    </p>
                </motion.div>

                {/* FAQ 列表 */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={faq.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className="bg-surface rounded-xl border border-gray-100 overflow-hidden"
                        >
                            {/* 問題標題 */}
                            <button
                                onClick={() => toggleFaq(faq.id)}
                                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                            >
                                <span className="font-medium text-text-main pr-4">
                                    {faq.question}
                                </span>
                                <motion.div
                                    animate={{ rotate: openId === faq.id ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex-shrink-0"
                                >
                                    <ChevronDown className="w-5 h-5 text-text-muted" />
                                </motion.div>
                            </button>

                            {/* 答案內容 */}
                            <AnimatePresence>
                                {openId === faq.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-5 pb-5 pt-0">
                                            <div className="border-t border-gray-100 pt-4">
                                                <p className="text-text-muted leading-relaxed">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* 聯繫客服 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-12 text-center"
                >
                    <p className="text-text-muted mb-4">
                        找不到您要的答案嗎？
                    </p>
                    <button className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary-dark transition-colors">
                        <span>聯繫客服團隊</span>
                        <span>→</span>
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
