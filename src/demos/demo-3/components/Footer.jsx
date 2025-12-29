import { useState } from 'react';
import { Phone, Mail, Clock, Facebook, Instagram, MessageCircle } from 'lucide-react';
import { SITE_INFO, FOOTER_LINKS } from '../constants';
import './Footer.css';

const iconMap = {
    Phone,
    Mail,
    Clock,
    Facebook,
    Instagram,
    MessageCircle,
};

export default function Footer({ onSubscribe, onOpenInfo }) {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email.trim()) return;

        setIsSubmitting(true);
        // 模擬處理
        setTimeout(() => {
            onSubscribe?.(email);
            setEmail('');
            setIsSubmitting(false);
        }, 500);
    };

    const handleLinkClick = (e, label) => {
        e.preventDefault();
        onOpenInfo?.(label);
    };

    return (
        <footer className="footer">
            {/* 電子報訂閱 */}
            <div className="footer__newsletter">
                <div className="container">
                    <div className="footer__newsletter-content">
                        <div className="footer__newsletter-text">
                            <h3 className="footer__newsletter-title">訂閱電子報</h3>
                            <p className="footer__newsletter-desc">
                                搶先獲得新品資訊與專屬優惠
                            </p>
                        </div>
                        <form className="footer__newsletter-form" onSubmit={handleSubmit}>
                            <input
                                type="email"
                                placeholder="輸入您的 Email"
                                className="footer__newsletter-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? '處理中...' : '立即訂閱'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* 主要頁尾內容 */}
            <div className="footer__main">
                <div className="container">
                    <div className="footer__grid">
                        {/* 品牌區 */}
                        <div className="footer__brand">
                            <div className="footer__logo">
                                <span className="footer__logo-icon">{SITE_INFO.logo}</span>
                                <span className="footer__logo-text">{SITE_INFO.name}</span>
                            </div>
                            <p className="footer__tagline">{SITE_INFO.tagline}</p>
                            <p className="footer__desc">{SITE_INFO.description}</p>
                        </div>

                        {/* 關於我們 */}
                        <div className="footer__column">
                            <h4 className="footer__column-title">{FOOTER_LINKS.about.title}</h4>
                            <ul className="footer__links">
                                {FOOTER_LINKS.about.links.map((link) => (
                                    <li key={link.label}>
                                        <a
                                            href={link.href}
                                            className="footer__link"
                                            onClick={(e) => handleLinkClick(e, link.label)}
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 購物說明 */}
                        <div className="footer__column">
                            <h4 className="footer__column-title">{FOOTER_LINKS.service.title}</h4>
                            <ul className="footer__links">
                                {FOOTER_LINKS.service.links.map((link) => (
                                    <li key={link.label}>
                                        <a
                                            href={link.href}
                                            className="footer__link"
                                            onClick={(e) => handleLinkClick(e, link.label)}
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 聯絡資訊 */}
                        <div className="footer__column">
                            <h4 className="footer__column-title">{FOOTER_LINKS.contact.title}</h4>
                            <ul className="footer__contact">
                                {FOOTER_LINKS.contact.items.map((item, index) => {
                                    const IconComponent = iconMap[item.icon];
                                    return (
                                        <li key={index} className="footer__contact-item">
                                            <IconComponent size={18} />
                                            <span>{item.text}</span>
                                        </li>
                                    );
                                })}
                            </ul>

                            {/* 社群連結 */}
                            <div className="footer__social">
                                <h5 className="footer__social-title">{FOOTER_LINKS.social.title}</h5>
                                <div className="footer__social-links">
                                    {FOOTER_LINKS.social.links.map((link) => {
                                        const IconComponent = iconMap[link.icon];
                                        return (
                                            <a
                                                key={link.label}
                                                href={link.href}
                                                className="footer__social-link"
                                                aria-label={link.label}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <IconComponent size={20} />
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 底部版權 */}
            <div className="footer__bottom">
                <div className="container">
                    <div className="footer__bottom-content">
                        <p className="footer__copyright">
                            © 2024 {SITE_INFO.name}. All rights reserved.
                        </p>
                        <div className="footer__legal">
                            <a
                                href="#"
                                onClick={(e) => handleLinkClick(e, '隱私政策')}
                            >
                                隱私政策
                            </a>
                            <span>|</span>
                            <a
                                href="#"
                                onClick={(e) => handleLinkClick(e, '使用條款')}
                            >
                                使用條款
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
