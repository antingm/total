import { Facebook, Instagram, MessageCircle } from 'lucide-react';
import { BRAND, FOOTER, LOCATIONS } from '../constants';

const socialIcons = {
    line: MessageCircle,
    facebook: Facebook,
    instagram: Instagram,
};

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    {/* Brand */}
                    <div>
                        <div className="footer-brand">
                            {BRAND.name}<span>.</span>
                        </div>
                        <p className="footer-desc">
                            {BRAND.description}，讓您輕鬆擁有理想的居住空間。
                        </p>
                        <div className="footer-social">
                            {FOOTER.social.map((item) => {
                                const Icon = socialIcons[item.platform];
                                return (
                                    <a
                                        key={item.platform}
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={item.platform}
                                    >
                                        {Icon && <Icon size={20} />}
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* About */}
                    <div>
                        <h4 className="footer-title">{FOOTER.about.title}</h4>
                        <div className="footer-links">
                            {FOOTER.about.links.map((link) => (
                                <a key={link.label} href={link.href} className="footer-link">
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Service */}
                    <div>
                        <h4 className="footer-title">{FOOTER.service.title}</h4>
                        <div className="footer-links">
                            {FOOTER.service.links.map((link) => (
                                <a key={link.label} href={link.href} className="footer-link">
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="footer-title">{FOOTER.support.title}</h4>
                        <div className="footer-links">
                            {FOOTER.support.links.map((link) => (
                                <a key={link.label} href={link.href} className="footer-link">
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Locations */}
                <div className="footer-locations" style={{ marginBottom: 'var(--space-lg)' }}>
                    <h4 className="footer-title" style={{ textAlign: 'center', marginBottom: 'var(--space-md)' }}>
                        全台服務據點
                    </h4>
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: 'var(--space-lg)',
                        color: 'rgba(255,255,255,0.7)',
                        fontSize: 'var(--font-size-sm)'
                    }}>
                        {LOCATIONS.map((loc) => (
                            <div key={loc.city} style={{ textAlign: 'center' }}>
                                <strong style={{ color: 'white' }}>{loc.city}門市</strong>
                                <br />
                                {loc.phone}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom */}
                <div className="footer-bottom">
                    <p className="footer-copyright">
                        © {currentYear} {BRAND.name}. All rights reserved.
                    </p>
                    <div style={{ display: 'flex', gap: 'var(--space-md)', color: 'rgba(255,255,255,0.5)', fontSize: 'var(--font-size-sm)' }}>
                        <a href="#" style={{ color: 'inherit' }}>隱私權政策</a>
                        <a href="#" style={{ color: 'inherit' }}>服務條款</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
