import { useState } from 'react';
import { Send, MapPin, Phone, Mail, CheckCircle } from 'lucide-react';
import { getThemeVars } from '../../utils/themeUtils';

/**
 * ContactModule - 聯絡表單模組
 * 可配置的聯絡表單，支援多種樣式主題
 * 支援深淺主題（透過 CSS 變數自動適應）
 */
export default function ContactModule({
    title = "聯絡我們",
    subtitle = "有任何問題歡迎隨時與我們聯繫",
    address = "台北市信義區信義路五段7號",
    phone = "02-1234-5678",
    email = "contact@example.com",
    configStyle = {},
    onSubmit
}) {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const themeVars = getThemeVars(configStyle?.theme);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit?.(formData);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    if (submitted) {
        return (
            <div
                className="p-8 rounded-3xl text-center"
                style={{
                    background: 'var(--module-success-bg)',
                    border: '1px solid var(--module-success)'
                }}
            >
                <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--module-success)' }} />
                <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--module-success)' }}>訊息已送出！</h3>
                <p style={{ color: 'var(--module-text-muted)' }}>我們會盡快與您聯繫。</p>
            </div>
        );
    }

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

            <div className="grid md:grid-cols-2 gap-8">
                {/* 聯絡資訊 */}
                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: 'var(--module-accent)' }}
                        >
                            <MapPin className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h4 className="font-bold" style={{ color: 'var(--module-text)' }}>地址</h4>
                            <p style={{ color: 'var(--module-text-muted)' }}>{address}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: 'var(--module-accent)' }}
                        >
                            <Phone className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h4 className="font-bold" style={{ color: 'var(--module-text)' }}>電話</h4>
                            <p style={{ color: 'var(--module-text-muted)' }}>{phone}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: 'var(--module-accent)' }}
                        >
                            <Mail className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h4 className="font-bold" style={{ color: 'var(--module-text)' }}>Email</h4>
                            <p style={{ color: 'var(--module-text-muted)' }}>{email}</p>
                        </div>
                    </div>
                </div>

                {/* 表單 */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="您的姓名"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl outline-none transition-all"
                        style={{
                            backgroundColor: 'var(--module-bg-subtle)',
                            border: '1px solid var(--module-border)',
                            color: 'var(--module-text)'
                        }}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl outline-none transition-all"
                        style={{
                            backgroundColor: 'var(--module-bg-subtle)',
                            border: '1px solid var(--module-border)',
                            color: 'var(--module-text)'
                        }}
                        required
                    />
                    <input
                        type="tel"
                        placeholder="電話 (選填)"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl outline-none transition-all"
                        style={{
                            backgroundColor: 'var(--module-bg-subtle)',
                            border: '1px solid var(--module-border)',
                            color: 'var(--module-text)'
                        }}
                    />
                    <textarea
                        placeholder="請輸入您的訊息..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl outline-none transition-all resize-none"
                        style={{
                            backgroundColor: 'var(--module-bg-subtle)',
                            border: '1px solid var(--module-border)',
                            color: 'var(--module-text)'
                        }}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full py-4 rounded-xl text-white font-bold flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
                        style={{ backgroundColor: 'var(--module-accent)' }}
                    >
                        <Send className="w-5 h-5" />
                        送出訊息
                    </button>
                </form>
            </div>
        </div>
    );
}
