import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Comparison = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const comparisons = [
        {
            category: "費用模式",
            platform: "每月 $800~$2,000\n不繳 = 網站關閉",
            us: "一次性 $15,000 起\n終身持有",
            platformBad: true,
        },
        {
            category: "網站所有權",
            platform: "平台擁有\n您只是「租客」",
            us: "您完全擁有\n不受平台約束",
            platformBad: true,
        },
        {
            category: "速度體驗",
            platform: "載入慢、換頁卡頓",
            us: "Google 100 分極速\n留住每一位訪客",
            platformBad: true,
        },
        {
            category: "技術支援",
            platform: "等客服、看文件\n需要自己處理",
            us: "專人即時服務\n一通電話搞定",
            platformBad: true,
        },
        {
            category: "維護更新",
            platform: "自己運營維護\n出問題自己解決",
            us: "終身維護支援\n您專心做生意",
            platformBad: true,
        },
        {
            category: "5年總成本",
            platform: "$48,000 ~ $120,000\n（還是租的）",
            us: "$15,000 ~ $25,000\n（會員優惠價）",
            platformBad: true,
        },
    ];

    return (
        <section id="comparison" className="section-padding bg-bg-primary relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-grid opacity-10" />
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-red-500/5 rounded-full filter blur-3xl" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full filter blur-3xl" />

            <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="heading-lg text-white mb-4">
                        當「房客」還是當「屋主」？
                    </h2>
                    <p className="text-slate-400 text-lg max-w-3xl mx-auto">
                        您現在用的平台，是在幫您建網站，還是在收您「數位房租」？
                    </p>
                </motion.div>

                {/* Comparison Table */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="card p-0 overflow-hidden"
                >
                    <div className="overflow-x-auto scrollbar-hide">
                        <div className="min-w-[600px] md:min-w-0">
                            {/* Table Header */}
                            <div className="grid grid-cols-3 gap-4 p-6 bg-slate-800/50 border-b border-slate-700">
                                <div className="text-slate-500 font-medium">項目</div>
                                <div className="text-center">
                                    <div className="text-red-400 font-bold mb-1">🏚️ 月費平台</div>
                                    <div className="text-xs text-slate-500">(Wix/Shopline)</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-gradient font-bold mb-1">🏡 我們的服務</div>
                                    <div className="text-xs text-slate-500">(專業團隊服務)</div>
                                </div>
                            </div>

                            {/* Table Body */}
                            <div className="divide-y divide-slate-700/50">
                                {comparisons.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                                        className="grid grid-cols-3 gap-4 p-6 hover:bg-slate-800/30 transition-colors"
                                    >
                                        {/* Category */}
                                        <div className="font-semibold text-white flex items-center">
                                            {item.category}
                                        </div>

                                        {/* Platform */}
                                        <div className="flex items-start md:items-center gap-2 sm:gap-3">
                                            <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 mt-1 md:mt-0 flex-shrink-0" />
                                            <div className="text-slate-400 text-xs sm:text-sm whitespace-pre-line leading-relaxed">
                                                {item.platform}
                                            </div>
                                        </div>

                                        {/* Us */}
                                        <div className="flex items-start md:items-center gap-2 sm:gap-3">
                                            <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-1 md:mt-0 flex-shrink-0" />
                                            <div className="text-slate-300 text-xs sm:text-sm font-medium whitespace-pre-line leading-relaxed">
                                                {item.us}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Impact Statement */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20"
                >
                    <h3 className="text-2xl font-bold text-white mb-4 text-center">
                        💡 算一筆帳：
                    </h3>
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Left: Platform Cost */}
                        <div className="text-center">
                            <div className="text-red-400 font-bold text-lg mb-3">
                                用 Shopline 最便宜方案（月租 $800）
                            </div>
                            <div className="space-y-2 text-slate-400">
                                <div>• 第 1 年：<span className="text-white font-semibold">$9,600</span></div>
                                <div>• 第 3 年：<span className="text-white font-semibold">$28,800</span></div>
                                <div>• 第 5 年：<span className="text-red-400 font-bold text-xl">$48,000</span></div>
                            </div>
                            <div className="mt-4 text-red-300 font-bold">
                                花了快 5 萬，您擁有什麼？<br />
                                <span className="text-2xl">什麼都沒有。</span>
                            </div>
                            <div className="mt-2 text-slate-500 text-sm">
                                停止繳費的瞬間，網站消失、客戶資料全沒。
                            </div>
                        </div>

                        {/* Right: Our Service */}
                        <div className="text-center">
                            <div className="text-gradient font-bold text-lg mb-3">
                                選擇我們
                            </div>
                            <div className="space-y-2 text-slate-300">
                                <div>• 會員價 <span className="text-primary font-bold text-xl">$15,000 起</span></div>
                                <div>• ✅ <span className="font-semibold">網站永遠是您的</span></div>
                                <div>• ✅ 終身維護，專人即時服務</div>
                                <div>• 🎁 <span className="text-yellow-400 font-semibold">推薦 10 人 = 網站免費！</span></div>
                            </div>
                            <Link
                                to="/login"
                                className="block mt-4 p-4 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/40 hover:from-primary/30 hover:to-accent/30 hover:border-primary/60 transition-all duration-300 cursor-pointer"
                            >
                                <div className="text-primary font-bold text-lg">
                                    🚀 免費加入會員，開始推薦省錢
                                </div>
                                <div className="text-slate-400 text-sm mt-1">
                                    推薦 1 人 = 您省 $1,500 + 朋友省 $1,500
                                </div>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Comparison;
