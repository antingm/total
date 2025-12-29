import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Gift, Users, TrendingUp, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import siteConfig from '../siteConfig';

const ReferralProgram = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const examples = [
        {
            name: "林老闆",
            business: "美甲工作室",
            paid: "$22,000",
            referred: 5,
            earned: "$7,500",
            final: "$14,500",
            saved: true,
        },
        {
            name: "陳小姐",
            business: "團購主",
            paid: "$9,800",
            referred: 10,
            earned: "$15,000",
            final: "免費還倒賺 $5,200",
            saved: false,
        },
    ];

    const handleContactClick = () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleGetReferralCode = () => {
        // 檢查是否啟用會員功能
        if (!siteConfig.modules.enableAuth) {
            handleContactClick();
            return;
        }

        // 根據登入狀態決定行為
        if (isAuthenticated) {
            navigate('/profile');
        } else {
            navigate('/login');
        }
    };

    return (
        <section id="referral" className="section-padding bg-bg-secondary relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-grid opacity-20" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-full filter blur-3xl" />

            <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-slate-700 to-slate-800 border border-slate-600 mb-4">
                        <span className="text-slate-300 font-semibold text-sm">🔒 會員專屬</span>
                    </div>
                    <h2 className="heading-lg text-white mb-4">
                        會員合作計畫
                    </h2>
                    <p className="text-slate-400 text-lg max-w-3xl mx-auto">
                        成為會員後，即可獲得專屬合作機會<br />
                        <span className="text-slate-300">推薦好友雙方各享 $1,500 優惠</span>
                    </p>
                </motion.div>

                {/* How it Works */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-16"
                >
                    <div className="card">
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold text-white mb-2">
                                🤝 會員雙向優惠機制
                            </h3>
                            <p className="text-slate-400">簡單 3 步驟，推薦好友雙方都受惠</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {/* Step 1 */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.4, delay: 0.3 }}
                                className="text-center p-6 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-primary/50 transition-colors"
                            >
                                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                                    <Users className="w-8 h-8 text-white" />
                                </div>
                                <div className="text-3xl font-bold text-gradient mb-2">1</div>
                                <h4 className="text-white font-semibold mb-2">推薦朋友</h4>
                                <p className="text-slate-400 text-sm">
                                    告訴朋友我們的服務<br />
                                    給他您的專屬推薦碼
                                </p>
                            </motion.div>

                            {/* Step 2 */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.4, delay: 0.4 }}
                                className="text-center p-6 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-primary/50 transition-colors"
                            >
                                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center">
                                    <Gift className="w-8 h-8 text-white" />
                                </div>
                                <div className="text-3xl font-bold text-gradient mb-2">2</div>
                                <h4 className="text-white font-semibold mb-2">朋友下單享優惠</h4>
                                <p className="text-slate-400 text-sm">
                                    朋友使用推薦碼下單<br />
                                    <span className="text-primary">立即獲得 $1,500 折扣</span>
                                </p>
                            </motion.div>

                            {/* Step 3 */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.4, delay: 0.5 }}
                                className="text-center p-6 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-primary/50 transition-colors"
                            >
                                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                                    <TrendingUp className="w-8 h-8 text-white" />
                                </div>
                                <div className="text-3xl font-bold text-gradient mb-2">3</div>
                                <h4 className="text-white font-semibold mb-2">您獲得會員獎勵</h4>
                                <p className="text-slate-400 text-sm">
                                    您的會員帳戶累積 $1,500<br />
                                    可折抵後續服務或升級
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Calculation Example */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mb-12"
                >
                    <div className="card bg-gradient-to-br from-primary/5 to-accent/5">
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold text-white mb-2">
                                📊 推薦多少人可以免費？
                            </h3>
                        </div>

                        <div className="max-w-2xl mx-auto">
                            <div className="space-y-4">
                                {/* Calculation Rows */}
                                <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50">
                                    <span className="text-slate-300">推薦 1 位朋友</span>
                                    <span className="text-primary font-bold">省 $1,500</span>
                                </div>
                                <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50">
                                    <span className="text-slate-300">推薦 3 位朋友</span>
                                    <span className="text-primary font-bold">省 $4,500</span>
                                </div>
                                <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50">
                                    <span className="text-slate-300">推薦 5 位朋友</span>
                                    <span className="text-primary font-bold">省 $7,500</span>
                                </div>
                                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 border-2 border-primary">
                                    <span className="text-white font-semibold">推薦 7 位朋友</span>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-gradient">免費！</div>
                                        <div className="text-xs text-slate-400">7 × $1,500 = $10,500 &gt; $9,800</div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
                                <div className="flex items-start gap-3">
                                    <Award className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5" />
                                    <div className="text-sm text-slate-300">
                                        <strong className="text-yellow-400">推薦超過 7 位？</strong><br />
                                        多出來的金額可以用來折抵加購功能（會員系統、多語言等），或是留到下次需要服務時使用！
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Real Examples */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mb-12"
                >
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-white mb-2">
                            🎉 真實案例
                        </h3>
                        <p className="text-slate-400">看看其他老闆怎麼做的</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {examples.map((example, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                                className="card hover:shadow-xl hover:shadow-primary/10 transition-all"
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl">
                                        {example.name[0]}
                                    </div>
                                    <div>
                                        <div className="text-white font-bold">{example.name}</div>
                                        <div className="text-slate-400 text-sm">{example.business}</div>
                                    </div>
                                </div>

                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">原本支付：</span>
                                        <span className="text-white font-semibold">{example.paid}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">推薦人數：</span>
                                        <span className="text-primary font-bold">{example.referred} 位</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">累積獎勵：</span>
                                        <span className="text-primary font-bold">{example.earned}</span>
                                    </div>
                                    <div className="pt-3 border-t border-slate-700">
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-300 font-semibold">實際成本：</span>
                                            <span className="text-2xl font-bold text-gradient">{example.final}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 1.1 }}
                    className="text-center"
                >
                    <div className="inline-block p-8 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-primary/30">
                        <h3 className="text-xl font-bold text-white mb-3">
                            準備好開始推薦了嗎？
                        </h3>
                        <p className="text-slate-400 mb-6">
                            {isAuthenticated
                                ? '前往會員中心查看您的專屬推薦碼'
                                : '立即登入或註冊，獲得您的專屬推薦碼'}
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleGetReferralCode}
                            className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-accent text-slate-900 font-bold text-lg shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
                        >
                            {isAuthenticated ? '🎁 查看我的推薦碼' : '🎁 立即索取推薦碼'}
                        </motion.button>
                        <div className="mt-4 text-slate-500 text-sm">
                            💡 條件：您的朋友必須成功下單並付款
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ReferralProgram;
