import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Send } from "lucide-react";
import { companyInfo } from "../constants";
import { useState } from "react";

const Footer = ({ onNavigate }) => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isSending, setIsSending] = useState(false);

    const handleNavClick = (page) => {
        if (onNavigate) {
            onNavigate(page);
        }
    };

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        setIsSending(true);

        // 使用mailto打开邮件客户端
        const subject = encodeURIComponent("來自官網的訊息");
        const body = encodeURIComponent(message + "\n\n發件人: " + email);
        window.location.href = `mailto:${companyInfo.email}?subject=${subject}&body=${body}`;

        setTimeout(() => {
            setIsSending(false);
            setEmail("");
            setMessage("");
        }, 1000);
    };

    return (
        <footer className="py-12 sm:py-16 md:py-20 bg-business-900 border-t border-white/5">
            <div className="container-wide px-6 sm:px-8">
                {/* 主内容区 - 2列布局 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-10 sm:mb-12">
                    {/* 左侧：快速連結 */}
                    <div>
                        <h4 className="text-lg font-bold text-white/90 mb-6 uppercase tracking-wide">
                            快速連結
                        </h4>
                        <nav className="grid grid-cols-2 gap-x-6 gap-y-4">
                            <button
                                onClick={() => handleNavClick('hero')}
                                className="text-white/60 hover:text-accent-400 transition-colors text-lg text-left group"
                            >
                                <span className="inline-block group-hover:translate-x-1 transition-transform">
                                    產品介紹
                                </span>
                            </button>
                            <a
                                href="#portfolio"
                                className="text-white/60 hover:text-accent-400 transition-colors text-lg group"
                            >
                                <span className="inline-block group-hover:translate-x-1 transition-transform">
                                    作品實績
                                </span>
                            </a>
                            <button
                                onClick={() => handleNavClick('plans')}
                                className="text-white/60 hover:text-accent-400 transition-colors text-lg text-left group"
                            >
                                <span className="inline-block group-hover:translate-x-1 transition-transform">
                                    購買方案
                                </span>
                            </button>
                            <button
                                onClick={() => handleNavClick('faq')}
                                className="text-white/60 hover:text-accent-400 transition-colors text-lg text-left group"
                            >
                                <span className="inline-block group-hover:translate-x-1 transition-transform">
                                    常見問題
                                </span>
                            </button>
                        </nav>
                    </div>

                    {/* 右侧：聯絡我們 + Email表单 */}
                    <div>
                        <h4 className="text-lg font-bold text-white/90 mb-6 uppercase tracking-wide">
                            聯絡我們
                        </h4>

                        {/* 联络信息 */}
                        <div className="flex flex-col gap-4 mb-8">
                            <a
                                href={`tel:${companyInfo.phone.replace(/\s/g, "")}`}
                                className="flex items-center gap-3 text-white/60 hover:text-accent-400 transition-colors text-lg group"
                            >
                                <Phone className="w-5 h-5 flex-shrink-0" />
                                <span>{companyInfo.phone}</span>
                            </a>
                            <a
                                href={`mailto:${companyInfo.email}`}
                                className="flex items-center gap-3 text-white/60 hover:text-accent-400 transition-colors text-lg group"
                            >
                                <Mail className="w-5 h-5 flex-shrink-0" />
                                <span className="break-all">{companyInfo.email}</span>
                            </a>
                            <div className="flex items-center gap-3 text-white/60 text-lg">
                                <MapPin className="w-5 h-5 flex-shrink-0" />
                                <span>台灣 台北</span>
                            </div>
                        </div>

                        {/* Email发送表单 */}
                        <form onSubmit={handleEmailSubmit} className="space-y-4">
                            <div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="您的 Email"
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-accent-400 focus:bg-white/10 outline-none transition-all text-lg"
                                />
                            </div>
                            <div>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="想說的話..."
                                    required
                                    rows="3"
                                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-accent-400 focus:bg-white/10 outline-none transition-all resize-none text-lg"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isSending}
                                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-accent-400 to-accent-600 text-business-900 font-semibold hover:shadow-lg hover:shadow-accent-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                            >
                                <Send className="w-5 h-5" />
                                <span>{isSending ? "發送中..." : "發送郵件"}</span>
                            </button>
                        </form>
                    </div>
                </div>

                {/* 分隔線 - 更细致 */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-8 sm:my-10" />

                {/* 底部版權 - 简洁单行 */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
                    <p className="text-white/40">
                        {companyInfo.copyright}
                    </p>
                    <div className="flex items-center gap-5">
                        <a
                            href="#privacy"
                            className="text-white/40 hover:text-accent-400 transition-colors"
                        >
                            隱私權
                        </a>
                        <span className="text-white/20">•</span>
                        <a
                            href="#terms"
                            className="text-white/40 hover:text-accent-400 transition-colors"
                        >
                            條款
                        </a>
                        <span className="text-white/20">•</span>
                        <a
                            href="#refund"
                            className="text-white/40 hover:text-accent-400 transition-colors"
                        >
                            退款
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
