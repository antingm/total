import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getThemeVars } from '../../utils/themeUtils';

/**
 * FAQModule - 常見問答模組
 * 可折疊的 FAQ 列表，支援自定義問題
 * 支援深淺主題（透過 CSS 變數自動適應）
 */
export default function FAQModule({
    title = "常見問題",
    subtitle = "快速找到您需要的答案",
    items = [],
    configStyle = {}
}) {
    const [openIndex, setOpenIndex] = useState(null);
    const themeVars = getThemeVars(configStyle?.theme);

    const defaultItems = [
        { question: '如何開始使用？', answer: '只需點擊「立即開始」按鈕，按照步驟完成註冊即可。' },
        { question: '有提供退款保證嗎？', answer: '是的，我們提供 14 天無條件退款保證。' },
        { question: '可以隨時取消訂閱嗎？', answer: '當然可以，您可以隨時在帳戶設定中取消訂閱。' }
    ];

    const faqItems = items.length > 0 ? items : defaultItems;

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
                <div
                    className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                    style={{
                        backgroundColor: 'var(--module-accent-bg)',
                        color: 'var(--module-accent)'
                    }}
                >
                    <HelpCircle className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--module-text)' }}>{title}</h2>
                <p style={{ color: 'var(--module-text-muted)' }}>{subtitle}</p>
            </div>

            <div className="space-y-3 max-w-2xl mx-auto">
                {faqItems.map((item, index) => (
                    <div
                        key={index}
                        className="rounded-xl overflow-hidden"
                        style={{ border: '1px solid var(--module-border)' }}
                    >
                        <button
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            className="w-full px-5 py-4 flex items-center justify-between text-left transition-colors"
                            style={{
                                backgroundColor: openIndex === index ? 'var(--module-bg-subtle)' : 'transparent'
                            }}
                        >
                            <span className="font-medium" style={{ color: 'var(--module-text)' }}>{item.question}</span>
                            <ChevronDown
                                className={`w-5 h-5 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                                style={{ color: 'var(--module-text-muted)' }}
                            />
                        </button>
                        <AnimatePresence>
                            {openIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="px-5 pb-4" style={{ color: 'var(--module-text-muted)' }}>
                                        {item.answer}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
}
