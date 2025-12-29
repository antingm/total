import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Menu, X, Leaf } from 'lucide-react';

const navLinks = [
    { label: '產品介紹', href: '#solution' },
    { label: '好評推薦', href: '#social-proof' },
    { label: '購買方案', href: '#pricing' },
    { label: '常見問題', href: '#faq' },
];

export default function Header({ cartCount, onCartClick }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const scrollToSection = (e, href) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <a href="#" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                            <Leaf className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-text-main">綠研生醫</span>
                    </a>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => scrollToSection(e, link.href)}
                                className="text-text-muted hover:text-primary transition-colors font-medium"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4">
                        {/* 購物車按鈕 */}
                        <button
                            onClick={onCartClick}
                            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <ShoppingCart className="w-5 h-5 text-text-main" />
                            {cartCount > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center"
                                >
                                    {cartCount}
                                </motion.span>
                            )}
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-5 h-5" />
                            ) : (
                                <Menu className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <motion.div
                initial={false}
                animate={{ height: isMobileMenuOpen ? 'auto' : 0 }}
                className="md:hidden overflow-hidden bg-white border-t"
            >
                <nav className="px-4 py-4 space-y-2">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={(e) => scrollToSection(e, link.href)}
                            className="block py-2 text-text-main hover:text-primary transition-colors font-medium"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>
            </motion.div>
        </header>
    );
}
