/**
 * Navbar Component (Optimized for Multi-Page Architecture)
 * 支援新的多頁面結構，包含下拉選單和用戶菜單
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Menu, X, User, LogOut, Gift, ShoppingBag, Settings,
    ChevronDown, Home, Package, Briefcase, BookOpen, Users as UsersIcon, Mail
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import siteConfig from '../siteConfig';
import { useAuth } from '../context/AuthContext';
import { logout } from '../services/auth';

const Navbar = ({ cartCount = 0, onCartClick }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, isAdmin } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const userMenuRef = useRef(null);

    // 導航連結配置
    const navLinks = [
        { path: '/', label: '首頁', icon: Home },
        { path: '/services', label: '服務方案', icon: Package, badge: 'HOT' },
        ...(siteConfig.modules.enableEcommerce ? [{ path: '/shop', label: '線上商店', icon: ShoppingBag }] : []),
        { path: '/portfolio', label: '作品集', icon: Briefcase },
        {
            path: '/resources',
            label: '資訊中心',
            icon: BookOpen,
            subMenu: [
                { path: '/resources/news', label: '最新消息' }
            ]
        },
        { path: '/about', label: '關於我們', icon: UsersIcon },
        { path: '/contact', label: '聯絡我們', icon: Mail }
    ];

    // 用戶選單
    const userMenuItems = [
        { path: '/profile', label: '會員中心', icon: User },
        { path: '/profile?tab=referral', label: '推薦獎勵', icon: Gift },
        { action: 'logout', label: '登出', icon: LogOut }
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 點擊外部關閉用戶選單
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setUserMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            setUserMenuOpen(false);
            navigate('/');
        } catch (error) {
            console.error('登出失敗:', error);
        }
    };

    const handleUserMenuClick = (item) => {
        setUserMenuOpen(false);
        if (item.action === 'logout') {
            handleLogout();
        } else if (item.path) {
            navigate(item.path);
        }
    };

    const isActive = (path) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-bg-primary/95 backdrop-blur-lg shadow-lg shadow-black/20 border-b border-slate-800'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <motion.span
                            className="text-xl sm:text-2xl font-bold text-gradient"
                            whileHover={{ scale: 1.02 }}
                        >
                            Anting Studio
                        </motion.span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <div key={link.path} className="relative">
                                <Link
                                    to={link.path}
                                    className={`flex items-center gap-2 text-sm font-medium transition-colors duration-200 relative group ${isActive(link.path)
                                        ? 'text-primary'
                                        : 'text-slate-300 hover:text-primary'
                                        }`}
                                >
                                    {link.label}
                                    {link.badge && (
                                        <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full">
                                            {link.badge}
                                        </span>
                                    )}
                                    {link.subMenu && (
                                        <ChevronDown className="w-4 h-4" />
                                    )}
                                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                                        }`} />
                                </Link>
                            </div>
                        ))}

                        {/* User Menu or Login */}
                        {siteConfig.modules.enableAuth && (
                            <div className="relative" ref={userMenuRef}>
                                {user ? (
                                    <>
                                        <button
                                            onClick={() => setUserMenuOpen(!userMenuOpen)}
                                            className="flex items-center gap-2 text-slate-300 hover:text-primary transition-colors"
                                        >
                                            {user.photoURL ? (
                                                <img
                                                    src={user.photoURL}
                                                    alt="用戶頭像"
                                                    className="w-8 h-8 rounded-full border-2 border-primary"
                                                />
                                            ) : (
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                                                    {user.displayName?.[0] || user.email?.[0].toUpperCase()}
                                                </div>
                                            )}
                                            <span className="text-sm font-medium">
                                                {user.displayName || '會員'}
                                            </span>
                                            <ChevronDown className="w-4 h-4" />
                                        </button>

                                        {/* User Dropdown */}
                                        <AnimatePresence>
                                            {userMenuOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    className="absolute right-0 mt-2 w-48 bg-bg-secondary border border-slate-700 rounded-lg shadow-xl overflow-hidden"
                                                >
                                                    {userMenuItems.map((item, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => handleUserMenuClick(item)}
                                                            className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${item.action === 'logout'
                                                                ? 'text-red-400 hover:bg-red-500/10 border-t border-slate-700'
                                                                : 'text-slate-300 hover:bg-slate-700/50'
                                                                }`}
                                                        >
                                                            <item.icon className="w-4 h-4" />
                                                            {item.label}
                                                        </button>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </>
                                ) : (
                                    <Link
                                        to="/login"
                                        className="flex items-center gap-2 text-slate-300 hover:text-primary transition-colors text-sm font-medium"
                                    >
                                        <User className="w-4 h-4" />
                                        登入/註冊
                                    </Link>
                                )}
                            </div>
                        )}

                        {/* Admin Button */}
                        {isAdmin && (
                            <Link
                                to="/admin"
                                className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors text-sm font-medium"
                            >
                                <Settings className="w-4 h-4" />
                                後台
                            </Link>
                        )}

                        {/* Cart Button */}
                        {siteConfig.modules.enableEcommerce && (
                            <button
                                onClick={onCartClick}
                                className="relative p-2 text-slate-300 hover:text-primary transition-colors"
                                aria-label="購物車"
                            >
                                <ShoppingBag className="w-5 h-5" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-slate-900 text-xs font-bold rounded-full flex items-center justify-center">
                                        {cartCount > 9 ? '9+' : cartCount}
                                    </span>
                                )}
                            </button>
                        )}

                        {/* CTA Button */}
                        <Link
                            to="/contact"
                            className="btn-primary text-sm py-2.5 px-6"
                        >
                            免費諮詢
                        </Link>
                    </div>

                    {/* Mobile Menu & Cart Button */}
                    <div className="lg:hidden flex items-center gap-2">
                        {siteConfig.modules.enableEcommerce && (
                            <button
                                onClick={onCartClick}
                                className="relative p-2 text-slate-300 hover:text-primary transition-colors"
                                aria-label="購物車"
                            >
                                <ShoppingBag className="w-6 h-6" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-slate-900 text-xs font-bold rounded-full flex items-center justify-center">
                                        {cartCount > 9 ? '9+' : cartCount}
                                    </span>
                                )}
                            </button>
                        )}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-slate-300 hover:text-primary transition-colors"
                            aria-label="選單開關"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Sub-Nav (Horizontal Scroll Links) */}
            <div className="lg:hidden border-t border-slate-800/50 bg-bg-primary/60 backdrop-blur-md overflow-x-auto no-scrollbar">
                <div className="flex items-center px-4 py-3 gap-6 whitespace-nowrap min-w-max">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`text-sm font-medium transition-all duration-200 ${isActive(link.path)
                                ? 'text-primary'
                                : 'text-slate-400 hover:text-slate-200'
                                }`}
                        >
                            {link.label}
                            {isActive(link.path) && (
                                <motion.div
                                    layoutId="activeSubNav"
                                    className="h-0.5 bg-primary mt-0.5 rounded-full"
                                />
                            )}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-bg-secondary/90 backdrop-blur-xl border-t border-slate-700/50 max-h-[85vh] overflow-y-auto rounded-b-3xl shadow-2xl"
                    >
                        <div className="px-6 py-6 space-y-1">
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.path}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Link
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className={`flex items-center gap-4 py-4 px-4 rounded-xl transition-all ${isActive(link.path)
                                            ? 'text-primary bg-primary/5'
                                            : 'text-slate-300 hover:text-primary hover:bg-slate-800/50'
                                            }`}
                                    >
                                        <link.icon className="w-5 h-5" />
                                        <span className="text-lg font-medium">{link.label}</span>
                                        {link.badge && (
                                            <span className="px-2 py-0.5 bg-primary/20 text-primary text-[10px] rounded-full font-bold">
                                                {link.badge}
                                            </span>
                                        )}
                                    </Link>
                                </motion.div>
                            ))}

                            {/* Mobile User Section */}
                            {siteConfig.modules.enableAuth && (
                                <div className="pt-6 mt-6 border-t border-slate-800">
                                    {user ? (
                                        <div className="space-y-1 px-4">
                                            <div className="flex items-center gap-4 mb-6">
                                                {user.photoURL ? (
                                                    <img
                                                        src={user.photoURL}
                                                        alt="用戶頭像"
                                                        className="w-12 h-12 rounded-full border-2 border-primary"
                                                    />
                                                ) : (
                                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                                                        {user.displayName?.[0] || user.email?.[0].toUpperCase()}
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="text-white font-semibold text-lg">
                                                        {user.displayName || '會員'}
                                                    </div>
                                                    <div className="text-slate-500 text-sm">
                                                        {user.email}
                                                    </div>
                                                </div>
                                            </div>
                                            {userMenuItems.map((item, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => {
                                                        setIsOpen(false);
                                                        handleUserMenuClick(item);
                                                    }}
                                                    className={`w-full flex items-center gap-4 py-4 px-4 rounded-xl text-left transition-colors ${item.action === 'logout'
                                                        ? 'text-red-400 hover:bg-red-500/5'
                                                        : 'text-slate-300 hover:text-primary hover:bg-slate-800/50'
                                                        }`}
                                                >
                                                    <item.icon className="w-5 h-5" />
                                                    <span className="text-lg font-medium">{item.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <Link
                                            to="/login"
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center gap-4 py-4 px-8 text-slate-300 hover:text-primary transition-colors text-lg font-medium"
                                        >
                                            <User className="w-5 h-5" />
                                            登入/註冊
                                        </Link>
                                    )}
                                </div>
                            )}

                            {/* Mobile Admin Button */}
                            {isAdmin && (
                                <div className="px-4">
                                    <Link
                                        to="/admin"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-4 py-4 px-4 rounded-xl text-amber-400 hover:text-amber-300 hover:bg-amber-400/5 transition-colors text-lg font-medium"
                                    >
                                        <Settings className="w-5 h-5" />
                                        後台管理
                                    </Link>
                                </div>
                            )}

                            {/* Mobile Cart Button */}
                            {siteConfig.modules.enableEcommerce && (
                                <div className="px-4">
                                    <button
                                        onClick={() => {
                                            setIsOpen(false);
                                            onCartClick?.();
                                        }}
                                        className="w-full flex items-center justify-between gap-4 py-4 px-4 rounded-xl text-slate-300 hover:text-primary hover:bg-slate-800/50 transition-colors text-lg font-medium"
                                    >
                                        <div className="flex items-center gap-4">
                                            <ShoppingBag className="w-5 h-5" />
                                            <span>購物車</span>
                                        </div>
                                        {cartCount > 0 && (
                                            <span className="px-2.5 py-1 bg-primary text-slate-900 text-sm font-bold rounded-full">
                                                {cartCount}
                                            </span>
                                        )}
                                    </button>
                                </div>
                            )}

                            {/* Mobile CTA */}
                            <div className="px-4 pt-4">
                                <Link
                                    to="/contact"
                                    onClick={() => setIsOpen(false)}
                                    className="btn-primary w-full py-4 flex items-center justify-center"
                                >
                                    免費諮詢
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
