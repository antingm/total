import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { useState } from "react";

const FAQPage = ({ onBack }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            category: "關於服務",
            icon: "💼",
            questions: [
                {
                    q: "你們和傳統網頁公司有什麼不同？",
                    a: "我們運用 AI 和最新雲端技術，大幅降低開發成本和時間。傳統公司可能需要 3-6 個月完成的網站，我們最快 3 天就能交付。而且我們專注在「為您賺錢」，不是只做漂亮的花瓶網站。"
                },
                {
                    q: "我完全不懂技術，你們會教我嗎？",
                    a: "完全不用擔心！我們提供完整的教學和操作手冊，且有專人客服支援。網站上線後，基本的內容更新我們都會教到您會為止。如果您真的不想自己操作，也可以選擇我們的代管服務。"
                },
                {
                    q: "需要準備什麼資料？",
                    a: "基本上只需要：1) 公司 Logo（沒有的話我們可以協助設計）2) 服務或產品的文字介紹 3) 相關圖片素材（產品照、服務照等）。其他的我們都會協助您整理。"
                }
            ]
        },
        {
            category: "費用與付款",
            icon: "💰",
            questions: [
                {
                    q: "價格包含哪些項目？",
                    a: "報價包含：網站設計與開發、網域申請（第一年免費）、SSL 安全憑證、主機服務（第一年免費）、基本 SEO 優化、手機版響應式設計、後台操作教學。唯一的額外費用是第二年起的主機與網域續約費（約 $2,000-3,000/年）。"
                },
                {
                    q: "可以分期付款嗎？",
                    a: "可以！我們提供彈性的付款方案：方案 A/B 可分 2 期，方案 C/D 可分 3 期。頭款 50%，其餘款項可在網站驗收後分期支付。"
                },
                {
                    q: "有沒有隱藏費用？",
                    a: "絕對沒有！我們的報價完全透明，不會有任何隱藏費用。所有可能產生的成本（如第三方串接服務費用）都會在報價時明確告知。"
                }
            ]
        },
        {
            category: "製作流程",
            icon: "⚙️",
            questions: [
                {
                    q: "從下單到上線需要多久？",
                    a: "依方案而定：方案 A（一頁式網站）最快 3 天、方案 B（品牌官網）約 7-10 天、方案 C（預約系統）約 10-14 天、方案 D（電商網站）約 14-21 天。實際時間會依您提供資料的完整度而調整。"
                },
                {
                    q: "我可以要求修改嗎？",
                    a: "當然可以！我們提供 2 次免費的大修改機會（重新調整版面配色等），以及不限次數的小修改（文字、圖片替換等）。我們的目標是讓您 100% 滿意。"
                },
                {
                    q: "網站上線後還有技術支援嗎？",
                    a: "有的！我們提供終身的技術支援。網站上線後如果有任何技術問題，都可以隨時聯繫我們。小問題通常當天就能處理，大問題最慢 3 個工作天內解決。"
                }
            ]
        },
        {
            category: "功能與擴充",
            icon: "🔧",
            questions: [
                {
                    q: "之後可以升級方案嗎？",
                    a: "可以！隨著生意成長，您可以隨時升級。例如從方案 A 升級到方案 B，只需補差價即可。我們的系統設計都考慮到未來的擴充性。"
                },
                {
                    q: "可以串接金流、物流嗎？",
                    a: "可以！我們支援主流的金流（綠界、藍新等）和物流（7-11、全家等）串接。這些服務需要額外申請帳號，我們會協助您完成申請流程。"
                },
                {
                    q: "網站資料和程式碼是我的嗎？",
                    a: "是的！您購買的網站，所有資料和程式碼的所有權都是您的。我們不綁架您的網站，您隨時可以選擇自己管理或轉移到其他服務商。"
                }
            ]
        },
        {
            category: "其他問題",
            icon: "📋",
            questions: [
                {
                    q: "我已經有網站了，可以改版嗎？",
                    a: "可以！我們提供網站改版服務。請先讓我們評估您現有網站的狀況，再為您建議是「全新製作」還是「改版升級」比較划算。"
                },
                {
                    q: "你們有做 SEO 優化嗎？",
                    a: "有！我們的網站都內建基本的 SEO 優化（包括標題、描述、速度優化等）。如果您需要更深入的 SEO 服務（如關鍵字規劃、內容優化、外部連結等），我們也有相關的進階方案。"
                },
                {
                    q: "可以先看 Demo 嗎？",
                    a: "當然！我們有多個實際案例供您參考。您可以在首頁的「作品實績」區塊查看，或直接聯繫我們，我們會依您的產業提供最相關的案例。"
                }
            ]
        }
    ];

    const toggleQuestion = (categoryIndex, questionIndex) => {
        const key = `${categoryIndex}-${questionIndex}`;
        setOpenIndex(openIndex === key ? null : key);
    };

    return (
        <div className="min-h-screen bg-business-950">
            {/* 返回按钮 - 固定间距 */}
            <div className="container-wide py-8">
                <button
                    onClick={onBack}
                    className="inline-flex items-center gap-3 text-white/50 hover:text-accent-400 transition-all duration-300 text-lg group"
                >
                    <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                    <span>返回首頁</span>
                </button>
            </div>

            {/* 标题区 - 使用统一的垂直间距 */}
            <div className="container-wide py-16 md:py-20">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-500/20 to-primary-500/20 mb-8"
                    >
                        <HelpCircle className="w-10 h-10 text-accent-400" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                        style={{ lineHeight: 1.2 }}
                    >
                        常見問題
                        <span className="text-gradient"> FAQ</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg sm:text-xl md:text-2xl text-white/60 leading-relaxed"
                    >
                        找不到答案？歡迎直接
                        <a
                            href="tel:0930693088"
                            className="text-accent-400 hover:text-accent-300 underline underline-offset-4 mx-2 font-medium transition-colors"
                        >
                            聯繫我們
                        </a>
                        我們很樂意為您解答
                    </motion.p>
                </div>
            </div>

            {/* FAQ 内容 - 统一间距系统 */}
            <div className="container-wide pb-24 md:pb-32">
                <div className="max-w-4xl mx-auto space-y-12">
                    {faqs.map((category, catIndex) => (
                        <motion.section
                            key={catIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: catIndex * 0.1 }}
                        >
                            {/* 分类标题 - 增加视觉层级 */}
                            <div className="flex items-center gap-3 mb-6">
                                <span className="text-4xl">{category.icon}</span>
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent-400">
                                    {category.category}
                                </h2>
                            </div>

                            {/* 问题列表 - Grid gap统一 */}
                            <div className="space-y-4">
                                {category.questions.map((item, qIndex) => {
                                    const key = `${catIndex}-${qIndex}`;
                                    const isOpen = openIndex === key;

                                    return (
                                        <motion.div
                                            key={qIndex}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: (catIndex * 0.1) + (qIndex * 0.05) }}
                                            className={`card transition-all duration-300 ${isOpen
                                                    ? 'border-accent-500/40 shadow-lg shadow-accent-500/10'
                                                    : 'hover:border-accent-500/20'
                                                }`}
                                        >
                                            <button
                                                onClick={() => toggleQuestion(catIndex, qIndex)}
                                                className="w-full flex items-start justify-between gap-6 text-left group"
                                            >
                                                <h3 className="text-xl sm:text-2xl font-semibold text-white flex-1 group-hover:text-accent-400 transition-colors" style={{ lineHeight: 1.4 }}>
                                                    {item.q}
                                                </h3>
                                                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-accent-500/20 transition-colors">
                                                    {isOpen ? (
                                                        <ChevronUp className="w-6 h-6 text-accent-400" />
                                                    ) : (
                                                        <ChevronDown className="w-6 h-6 text-white/40 group-hover:text-accent-400 transition-colors" />
                                                    )}
                                                </div>
                                            </button>

                                            <AnimatePresence>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="mt-6 pt-6 border-t border-white/10">
                                                            <p className="text-lg sm:text-xl text-white/75 leading-relaxed">
                                                                {item.a}
                                                            </p>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.section>
                    ))}
                </div>

                {/* 底部CTA - 充足padding和间距 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="max-w-4xl mx-auto mt-16 md:mt-20 text-center card bg-gradient-to-br from-primary-500/10 to-accent-500/10 border-accent-500/20"
                >
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
                        還有其他疑問？
                    </h3>
                    <p className="text-lg sm:text-xl text-white/70 mb-8 leading-relaxed">
                        立即開始免費診斷，我們會根據您的需求提供專業建議
                    </p>
                    <button
                        onClick={onBack}
                        className="btn-primary text-xl py-5 px-10 inline-block hover:shadow-2xl hover:shadow-accent-500/20 transition-shadow"
                    >
                        開始免費診斷
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default FAQPage;
