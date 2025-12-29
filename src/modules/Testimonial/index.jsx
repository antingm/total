import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getThemeVars } from '../../utils/themeUtils';

/**
 * TestimonialModule - 客戶評價模組
 * 輪播式評價展示
 * 支援深淺主題（透過 CSS 變數自動適應）
 */
export default function TestimonialModule({
    title = "客戶好評",
    subtitle = "聽聽他們怎麼說",
    items = [],
    configStyle = {}
}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const themeVars = getThemeVars(configStyle?.theme);

    const defaultItems = [
        {
            name: '王小明',
            role: '企業主',
            content: '非常專業的服務，大大提升了我們的工作效率！',
            rating: 5,
            avatar: null
        },
        {
            name: '李小華',
            role: '設計師',
            content: '介面設計精美，使用體驗非常流暢。',
            rating: 5,
            avatar: null
        },
        {
            name: '張大明',
            role: '行銷經理',
            content: '客服回應迅速，問題都能得到妥善解決。',
            rating: 4,
            avatar: null
        }
    ];

    const testimonials = items.length > 0 ? items : defaultItems;

    const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    return (
        <div
            className="p-6 rounded-3xl shadow-sm"
            style={{
                backgroundColor: 'var(--module-bg)',
                border: '1px solid var(--module-border)',
                '--module-accent': themeVars.accent,
                '--module-accent-bg': themeVars.accentBg
            }}
        >
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--module-text)' }}>{title}</h2>
                <p style={{ color: 'var(--module-text-muted)' }}>{subtitle}</p>
            </div>

            <div className="relative max-w-2xl mx-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="text-center px-8"
                    >
                        <div
                            className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: 'var(--module-accent)' }}
                        >
                            <Quote className="w-8 h-8 text-white" />
                        </div>

                        <p className="text-xl mb-6 leading-relaxed" style={{ color: 'var(--module-text)' }}>
                            "{testimonials[currentIndex].content}"
                        </p>

                        <div className="flex justify-center gap-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-5 h-5 ${i < testimonials[currentIndex].rating ? 'text-yellow-400 fill-yellow-400' : ''}`}
                                    style={{ color: i >= testimonials[currentIndex].rating ? 'var(--module-border)' : undefined }}
                                />
                            ))}
                        </div>

                        <div>
                            <div className="font-bold" style={{ color: 'var(--module-text)' }}>{testimonials[currentIndex].name}</div>
                            <div className="text-sm" style={{ color: 'var(--module-text-muted)' }}>{testimonials[currentIndex].role}</div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* 導航按鈕 */}
                {testimonials.length > 1 && (
                    <>
                        <button
                            onClick={prev}
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                            style={{ backgroundColor: 'var(--module-bg-subtle)' }}
                        >
                            <ChevronLeft className="w-5 h-5" style={{ color: 'var(--module-text-muted)' }} />
                        </button>
                        <button
                            onClick={next}
                            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                            style={{ backgroundColor: 'var(--module-bg-subtle)' }}
                        >
                            <ChevronRight className="w-5 h-5" style={{ color: 'var(--module-text-muted)' }} />
                        </button>
                    </>
                )}

                {/* 指示點 */}
                <div className="flex justify-center gap-2 mt-6">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            className="h-2 rounded-full transition-all"
                            style={{
                                width: i === currentIndex ? '24px' : '8px',
                                backgroundColor: i === currentIndex ? 'var(--module-accent)' : 'var(--module-border)'
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
