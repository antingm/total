import { companyInfo, footerContent, contactInfo } from '../constants';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    // 平滑捲動處理
    const handleNavClick = (e, href) => {
        e.preventDefault();
        const id = href.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer className="bg-slate-900 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
                <div className="grid md:grid-cols-3 gap-10 mb-10">
                    {/* Brand */}
                    <div>
                        <h3 className="text-2xl font-bold text-gradient mb-4">
                            {companyInfo.name}
                        </h3>
                        <p className="text-slate-400 mb-4">
                            {footerContent.description}
                        </p>
                        <p className="text-gold text-sm">
                            {companyInfo.tagline}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-4">快速連結</h4>
                        <nav className="space-y-3">
                            {footerContent.quickLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className="block text-slate-400 hover:text-gold transition-colors duration-300 cursor-pointer"
                                >
                                    {link.title}
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-4">聯絡資訊</h4>
                        <div className="space-y-3 text-slate-400">
                            <a href={`tel:${contactInfo.phone.replace(/-/g, '')}`} className="block hover:text-gold transition-colors">
                                {contactInfo.phone}
                            </a>
                            <a href={`mailto:${contactInfo.email}`} className="block hover:text-gold transition-colors">
                                {contactInfo.email}
                            </a>
                            <p className="text-sm">{contactInfo.address}</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-800 pt-8 text-center">
                    <p className="text-slate-500 text-sm">
                        © {currentYear} {companyInfo.name}. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

