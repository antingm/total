import { motion } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, BadgeCheck, TrendingUp, Heart } from 'lucide-react';
import { useState } from 'react';

const testimonials = [
    {
        id: 1,
        name: '陳小美',
        avatar: 'M',
        role: '科技業 PM',
        rating: 5,
        content: '吃了兩個月，換季時明顯感覺身體狀況比以前好很多，不再動不動就覺得不舒服。推薦給每天都很忙碌的上班族！',
        date: '2024/10/15',
        verified: true,
        helpful: 128,
    },
    {
        id: 2,
        name: '林大維',
        avatar: 'D',
        role: '健身教練',
        rating: 5,
        content: '成分天然又有專利認證，是我會推薦給學員的保健品。自己也持續在吃，精神狀態確實有提升。',
        date: '2024/10/08',
        verified: true,
        helpful: 96,
    },
    {
        id: 3,
        name: '張媽媽',
        avatar: 'J',
        role: '家庭主婦',
        rating: 5,
        content: '給全家人都買了一組，孩子們換季時的困擾少了很多。品質有保障，價格又實惠，會繼續回購！',
        date: '2024/09/28',
        verified: true,
        helpful: 234,
    },
    {
        id: 4,
        name: '王先生',
        avatar: 'W',
        role: '軟體工程師',
        rating: 5,
        content: '長期熬夜寫程式，身體常常亮紅燈。朋友推薦後開始吃，現在體力明顯改善，工作效率也提高了。',
        date: '2024/09/20',
        verified: true,
        helpful: 87,
    },
];

const influencers = [
    {
        id: 1,
        name: '營養師 Amber',
        followers: '15.2萬',
        platform: 'Instagram',
        quote: '成分標示透明，是我會放心推薦給粉絲的保健品牌。',
        avatar: 'A',
    },
    {
        id: 2,
        name: '健康生活 Sarah',
        followers: '8.7萬',
        platform: 'YouTube',
        quote: '連續吃了三個月，真的有感！現在全家都在吃。',
        avatar: 'S',
    },
    {
        id: 3,
        name: '中醫師小林',
        followers: '22.3萬',
        platform: 'Facebook',
        quote: '結合東西方醫學的配方思路，很有專業度。',
        avatar: 'L',
    },
];

export default function SocialProof() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section id="social-proof" className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* 標題區 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="inline-block bg-accent/10 text-accent px-4 py-1 rounded-full text-sm font-medium mb-4">
                        真實好評
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-text-main mb-4">
                        超過 150,000+ 顧客見證
                    </h2>
                    <p className="text-text-muted text-lg">
                        聽聽他們怎麼說
                    </p>

                    {/* 評分統計 */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                        <div className="flex items-center gap-2">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-6 h-6 text-accent fill-accent" />
                                ))}
                            </div>
                            <span className="text-2xl font-bold text-text-main">4.9</span>
                        </div>
                        <div className="hidden sm:block w-px h-6 bg-gray-300" />
                        <div className="flex items-center gap-4 text-sm text-text-muted">
                            <span className="flex items-center gap-1">
                                <BadgeCheck className="w-4 h-4 text-primary" />
                                2,847 則驗證評價
                            </span>
                            <span className="flex items-center gap-1">
                                <TrendingUp className="w-4 h-4 text-primary" />
                                98% 回購率
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* 網紅推薦區 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h3 className="text-center text-lg font-bold text-text-main mb-6">
                        🌟 網紅達人推薦
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        {influencers.map((influencer, index) => (
                            <motion.div
                                key={influencer.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl p-5 shadow-md border border-gray-100"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                                        {influencer.avatar}
                                    </div>
                                    <div>
                                        <p className="font-bold text-text-main">{influencer.name}</p>
                                        <p className="text-xs text-text-muted">
                                            {influencer.platform} · {influencer.followers} 追蹤
                                        </p>
                                    </div>
                                </div>
                                <p className="text-text-muted text-sm italic">
                                    "{influencer.quote}"
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* 評價卡片 - 桌面版 Grid */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow relative"
                        >
                            {/* 驗證徽章 */}
                            {testimonial.verified && (
                                <div className="absolute top-4 right-4">
                                    <BadgeCheck className="w-5 h-5 text-primary" />
                                </div>
                            )}

                            {/* 引號 */}
                            <Quote className="w-8 h-8 text-primary/20 mb-4" />

                            {/* 內容 */}
                            <p className="text-text-main leading-relaxed mb-4 line-clamp-4">
                                {testimonial.content}
                            </p>

                            {/* 評分 */}
                            <div className="flex mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                                ))}
                            </div>

                            {/* 用戶資訊 */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white font-bold">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <p className="font-medium text-text-main">{testimonial.name}</p>
                                        <p className="text-xs text-text-muted">{testimonial.role}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-text-muted">
                                    <Heart className="w-3 h-3" />
                                    {testimonial.helpful}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* 評價卡片 - 手機版 Carousel */}
                <div className="md:hidden relative">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="bg-white rounded-2xl p-6 shadow-lg"
                    >
                        {testimonials[currentIndex].verified && (
                            <div className="absolute top-4 right-4">
                                <BadgeCheck className="w-5 h-5 text-primary" />
                            </div>
                        )}

                        <Quote className="w-8 h-8 text-primary/20 mb-4" />

                        <p className="text-text-main leading-relaxed mb-4">
                            {testimonials[currentIndex].content}
                        </p>

                        <div className="flex mb-4">
                            {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                            ))}
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white font-bold">
                                {testimonials[currentIndex].avatar}
                            </div>
                            <div>
                                <p className="font-medium text-text-main">{testimonials[currentIndex].name}</p>
                                <p className="text-xs text-text-muted">{testimonials[currentIndex].role}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* 導航按鈕 */}
                    <div className="flex justify-center gap-4 mt-6">
                        <button
                            onClick={prevSlide}
                            className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5 text-text-main" />
                        </button>

                        {/* 指示點 */}
                        <div className="flex items-center gap-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? 'bg-primary' : 'bg-gray-300'
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={nextSlide}
                            className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                            <ChevronRight className="w-5 h-5 text-text-main" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
