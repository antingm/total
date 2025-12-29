import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, MessageCircle, ArrowRight, Gift, Clock, Sparkles } from "lucide-react";
import { leadCaptureContent } from "../constants";

const LeadCaptureModal = ({ isOpen, onClose, onSubmit, onSkip }) => {
    const [email, setEmail] = useState("");
    const [lineId, setLineId] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 专属优惠倒计时（3天）
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        if (!isOpen) return;

        // 获取或创建优惠到期时间
        const getOfferExpiry = () => {
            const saved = localStorage.getItem("exclusiveOfferExpiry");
            if (saved) return parseInt(saved);

            const expiry = Date.now() + (3 * 24 * 60 * 60 * 1000); // 3天
            localStorage.setItem("exclusiveOfferExpiry", expiry.toString());
            return expiry;
        };

        const expiry = getOfferExpiry();

        const timer = setInterval(() => {
            const diff = expiry - Date.now();
            if (diff <= 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                clearInterval(timer);
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(timer);
    }, [isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email && !lineId) return;

        setIsSubmitting(true);

        // 儲存到 localStorage（可擴展為 API 呼叫）
        const leadData = {
            email,
            lineId,
            timestamp: new Date().toISOString(),
            hasExclusiveOffer: true, // 标记为享有专属优惠
        };

        const existingLeads = JSON.parse(localStorage.getItem("leads") || "[]");
        existingLeads.push(leadData);
        localStorage.setItem("leads", JSON.stringify(existingLeads));

        // 模擬延遲
        await new Promise((resolve) => setTimeout(resolve, 800));

        setIsSubmitting(false);
        onSubmit(leadData);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="w-full max-w-md bg-gradient-to-br from-business-800 to-business-900 rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* 專屬優惠頂部 */}
                    <div className="relative bg-gradient-to-r from-red-600 via-red-500 to-orange-500 px-6 py-5">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.1%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />

                        <div className="relative flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center animate-pulse">
                                    <Sparkles className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg">🎁 專屬優惠</h3>
                                    <p className="text-white/90 text-sm">只有您有的限時折扣</p>
                                </div>
                            </div>

                            {/* 關閉按鈕 */}
                            <button
                                onClick={onClose}
                                className="w-9 h-9 rounded-full bg-black/20 flex items-center justify-center text-white/80 hover:bg-black/30 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* 倒计时 */}
                        <div className="mt-4 flex items-center justify-center gap-2 bg-black/20 backdrop-blur-sm rounded-lg px-3 py-2">
                            <Clock className="w-4 h-4 text-white" />
                            <span className="text-white text-sm font-medium">優惠倒數：</span>
                            <div className="flex items-center gap-1 text-white font-bold">
                                <span className="min-w-[24px] text-center">{timeLeft.days}</span>
                                <span className="text-white/60 text-xs">天</span>
                                <span className="min-w-[24px] text-center">{String(timeLeft.hours).padStart(2, '0')}</span>
                                <span className="text-white/60">:</span>
                                <span className="min-w-[24px] text-center">{String(timeLeft.minutes).padStart(2, '0')}</span>
                                <span className="text-white/60">:</span>
                                <span className="min-w-[24px] text-center">{String(timeLeft.seconds).padStart(2, '0')}</span>
                            </div>
                        </div>
                    </div>

                    {/* 優惠金額 */}
                    <div className="bg-gradient-to-b from-accent-500/20 to-transparent px-8 py-6 border-b border-white/5">
                        <div className="text-center">
                            <p className="text-white/60 text-sm mb-2">恭喜！您獲得專屬折扣</p>
                            <div className="flex items-center justify-center gap-2">
                                <span className="text-white/40 text-lg line-through">原價</span>
                                <span className="text-5xl font-bold bg-gradient-to-r from-accent-400 to-orange-400 bg-clip-text text-transparent">
                                    -$3,000
                                </span>
                            </div>
                            <p className="text-white/50 text-xs mt-2">立即填寫，鎖定優惠</p>
                        </div>
                    </div>

                    {/* 內容區 */}
                    <div className="p-8">
                        <h3 className="text-xl sm:text-2xl font-bold text-center mb-4">
                            {leadCaptureContent.title}
                        </h3>
                        <p className="text-white/60 text-center mb-10 text-sm sm:text-base" style={{ lineHeight: 1.8 }}>
                            {leadCaptureContent.subtitle}
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email 輸入 */}
                            <div className="relative">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={leadCaptureContent.emailPlaceholder}
                                    className="input-field !pl-14"
                                />
                            </div>

                            {/* 分隔線 */}
                            <div className="flex items-center gap-4">
                                <div className="flex-1 h-px bg-white/10" />
                                <span className="text-white/40 text-sm">或</span>
                                <div className="flex-1 h-px bg-white/10" />
                            </div>

                            {/* LINE ID 輸入 */}
                            <div className="relative">
                                <MessageCircle className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                <input
                                    type="text"
                                    value={lineId}
                                    onChange={(e) => setLineId(e.target.value)}
                                    placeholder={leadCaptureContent.linePlaceholder}
                                    className="input-field !pl-14"
                                />
                            </div>

                            {/* 提交按鈕 */}
                            <button
                                type="submit"
                                disabled={(!email && !lineId) || isSubmitting}
                                className="btn btn-primary w-full group disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-business-900/30 border-t-business-900 rounded-full animate-spin" />
                                        <span>處理中...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>{leadCaptureContent.ctaText}</span>
                                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* 跳過連結 */}
                        <button
                            onClick={onSkip}
                            className="w-full text-center text-white/40 hover:text-white/60 text-sm mt-5 py-2 transition-colors"
                        >
                            {leadCaptureContent.skipText}
                        </button>

                        {/* 隱私說明 */}
                        <p className="text-white/30 text-xs text-center mt-5">
                            {leadCaptureContent.privacyNote}
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default LeadCaptureModal;
