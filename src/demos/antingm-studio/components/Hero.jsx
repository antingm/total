import { motion } from 'framer-motion';
import { heroContent } from '../constants';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

// 未登入的預設內容
const defaultContent = {
    headline: "🚀 打造專屬您的專業網站",
    headlineHighlight: "從創意到上線，我們全程陪伴",
    subheadline: "專業網頁設計，會員價 $15,000 起。Google 頂級效能體驗、終身維護支援、專人即時服務。",
    ctaPrimary: "加入會員",
    ctaSecondary: "查看方案",
    stats: [
        { number: "50+", label: "滿意客戶" },
        { number: "頂級", label: "Google 優化" },
        { number: "終身", label: "維護服務" },
    ],
};

// 已登入會員的推薦內容
const memberContent = {
    headline: "🎉 推薦 10 人，網站免費拿！",
    headlineHighlight: "真的有人做到了，下一個可以是您",
    subheadline: "您的專屬推薦碼已激活！推薦 1 位朋友，您省 $1,500、朋友也省 $1,500。推薦無上限，推薦越多省越多！",
    ctaPrimary: "查看我的推薦碼",
    ctaSecondary: "查看方案",
    stats: [
        { number: "$1,500", label: "推薦1人省" },
        { number: "10人", label: "網站免費" },
        { number: "無上限", label: "推薦獎勵" },
    ],
};

const Hero = () => {
    const { isAuthenticated } = useAuth();

    // 根據登入狀態選擇內容
    const content = isAuthenticated ? memberContent : defaultContent;

    const handleScrollTo = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-primary">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-grid opacity-50" />

            {/* Static Glow Effects - 改為靜態提升效能 */}
            <div className="hero-glow top-1/4 -left-40" />
            <div className="hero-glow bottom-1/4 -right-40" />

            {/* Floating Shapes - 保留裝飾但減少動畫 */}
            <div className="absolute top-20 right-[20%] w-64 h-64 border border-primary/10 rounded-full opacity-20" />
            <div className="absolute bottom-40 left-[10%] w-48 h-48 border border-accent/10 rounded-full opacity-20" />

            {/* Content Container - 手機版優化邊界與間距 */}
            <div className="relative z-10 max-w-5xl mx-auto px-8 sm:px-10 lg:px-12 text-center pt-32 pb-16 md:pt-20 md:pb-0">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 mb-8"
                >
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-primary text-sm font-semibold tracking-wide">專業技術 · 價格透明 · 長期夥伴</span>
                </motion.div>

                {/* Main Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="heading-xl text-white mb-6"
                >
                    <span className="inline-block">{content.headline.split(' ')[0]}</span>{' '}
                    <span className="inline-block">{content.headline.split(' ').slice(1).join(' ')}</span>
                    <br className="hidden md:block" />
                    <span className="text-gradient inline-block mt-2">{content.headlineHighlight}</span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
                >
                    {content.subheadline}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
                >
                    {isAuthenticated ? (
                        <Link to="/profile" className="w-full sm:w-auto">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn-primary w-full inline-flex items-center justify-center"
                            >
                                {content.ctaPrimary}
                            </motion.button>
                        </Link>
                    ) : (
                        <Link to="/login" className="w-full sm:w-auto">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn-primary w-full inline-flex items-center justify-center"
                            >
                                {content.ctaPrimary}
                            </motion.button>
                        </Link>
                    )}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleScrollTo('pricing')}
                        className="btn-secondary w-full sm:w-auto inline-flex items-center justify-center gap-2"
                    >
                        {content.ctaSecondary}
                    </motion.button>
                </motion.div>

            </div>
        </section>
    );
};

export default Hero;
