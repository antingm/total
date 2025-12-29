import { motion } from 'framer-motion';
import { Leaf, Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-text-main text-white py-16 pb-32 md:pb-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8 mb-12">
                    {/* 品牌資訊 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="md:col-span-1"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                                <Leaf className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">綠研生醫</h3>
                                <p className="text-sm text-gray-400">Nature Lab</p>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            專注於天然植萃保健食品研發，結合中西醫學專業，為您的健康把關。
                        </p>
                    </motion.div>

                    {/* 快速連結 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <h4 className="font-bold mb-4">快速連結</h4>
                        <ul className="space-y-2">
                            <li><a href="#solution" className="text-gray-400 hover:text-white transition-colors">產品介紹</a></li>
                            <li><a href="#solution" className="text-gray-400 hover:text-white transition-colors">成分說明</a></li>
                            <li><a href="#pricing" className="text-gray-400 hover:text-white transition-colors">購買方案</a></li>
                            <li><a href="#faq" className="text-gray-400 hover:text-white transition-colors">常見問題</a></li>
                        </ul>
                    </motion.div>

                    {/* 聯絡資訊 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <h4 className="font-bold mb-4">聯絡我們</h4>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2 text-gray-400">
                                <Phone className="w-4 h-4" />
                                <span>0800-888-888</span>
                            </li>
                            <li className="flex items-center gap-2 text-gray-400">
                                <Mail className="w-4 h-4" />
                                <span>service@naturelab.com.tw</span>
                            </li>
                            <li className="flex items-start gap-2 text-gray-400">
                                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                                <span>台北市信義區信義路五段7號</span>
                            </li>
                        </ul>
                    </motion.div>

                    {/* 社群媒體 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <h4 className="font-bold mb-4">追蹤我們</h4>
                        <div className="flex gap-3">
                            <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-primary rounded-full flex items-center justify-center transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-primary rounded-full flex items-center justify-center transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-primary rounded-full flex items-center justify-center transition-colors">
                                <Youtube className="w-5 h-5" />
                            </a>
                        </div>
                        <p className="text-gray-400 text-sm mt-4">
                            訂閱電子報，獲取最新優惠資訊
                        </p>
                    </motion.div>
                </div>

                {/* 底部版權 */}
                <div className="border-t border-gray-700 pt-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-gray-400 text-sm text-center md:text-left">
                            © 2024 綠研生醫 Nature Lab. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">隱私權政策</a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">服務條款</a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">退換貨政策</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
