import { motion } from 'framer-motion';
import { ArrowUp, Mail, Phone, MapPin } from 'lucide-react';
import { companyInfo, footerContent } from '../constants';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleNavClick = (href) => {
        const id = href.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer className="bg-bg-primary border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <motion.a
                            href="#"
                            onClick={scrollToTop}
                            className="inline-block mb-4"
                            whileHover={{ scale: 1.02 }}
                        >
                            <span className="text-2xl font-bold text-gradient">{companyInfo.name}</span>
                        </motion.a>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            {footerContent.description}
                        </p>
                        <div className="space-y-2">
                            <a
                                href={`mailto:${companyInfo.email}`}
                                className="flex items-center gap-2 text-sm text-slate-400 hover:text-primary transition-colors"
                            >
                                <Mail className="w-4 h-4" />
                                {companyInfo.email}
                            </a>
                            <a
                                href={`tel:${companyInfo.phone}`}
                                className="flex items-center gap-2 text-sm text-slate-400 hover:text-primary transition-colors"
                            >
                                <Phone className="w-4 h-4" />
                                {companyInfo.phone}
                            </a>
                            <div className="flex items-center gap-2 text-sm text-slate-400">
                                <MapPin className="w-4 h-4" />
                                {companyInfo.address}
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">快速連結</h4>
                        <ul className="space-y-2">
                            {footerContent.quickLinks.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-slate-400 hover:text-primary transition-colors text-sm"
                                    >
                                        {link.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Back to Top */}
                    <div className="flex lg:justify-end items-start">
                        <motion.button
                            onClick={scrollToTop}
                            whileHover={{ scale: 1.1, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-12 h-12 rounded-xl bg-slate-800 hover:bg-primary/20 flex items-center justify-center transition-colors group border border-slate-700"
                        >
                            <ArrowUp className="w-5 h-5 text-slate-400 group-hover:text-primary" />
                        </motion.button>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-slate-500 text-sm text-center md:text-left">
                        {footerContent.copyright}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span>隱私權政策</span>
                        <span>|</span>
                        <span>服務條款</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
