import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Calendar, Image, User, Phone, MapPin } from 'lucide-react';

const navItems = [
    { path: '/', icon: Home, label: '首頁' },
    { path: '/booking', icon: Calendar, label: '線上預約' },
    { path: '/gallery', icon: Image, label: '作品集' },
    { path: '/member', icon: User, label: '會員專區' }
];

export default function DesktopNav() {
    const location = useLocation();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <NavLink to="/" className="flex items-center gap-3 group">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-400 to-rose-500 flex items-center justify-center shadow-lg shadow-rose-200/50 group-hover:shadow-rose-300/60 transition-shadow">
                            <span className="text-white font-bold text-xl">L</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-800">LUNA</h1>
                            <p className="text-xs text-gray-400">Fashion Nail</p>
                        </div>
                    </NavLink>

                    {/* Navigation Links */}
                    <nav className="flex items-center gap-1">
                        {navItems.map(({ path, label }) => {
                            const isActive = location.pathname === path;

                            return (
                                <NavLink
                                    key={path}
                                    to={path}
                                    className={`relative px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${isActive
                                            ? 'text-rose-600 bg-rose-50'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                        }`}
                                >
                                    {label}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeNav"
                                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-rose-500 rounded-full"
                                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                </NavLink>
                            );
                        })}
                    </nav>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4">
                        <a
                            href="tel:0912345678"
                            className="flex items-center gap-2 text-sm text-gray-600 hover:text-rose-600 transition-colors"
                        >
                            <Phone size={18} />
                            <span>0912-345-678</span>
                        </a>
                        <a
                            href="#location"
                            className="flex items-center gap-2 text-sm text-gray-600 hover:text-rose-600 transition-colors"
                        >
                            <MapPin size={18} />
                            <span>台北市大安區</span>
                        </a>
                        <NavLink
                            to="/booking"
                            className="px-6 py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 shadow-lg shadow-rose-200/50 hover:shadow-rose-300/60 transition-all active:scale-[0.98]"
                        >
                            立即預約
                        </NavLink>
                    </div>
                </div>
            </div>
        </header>
    );
}
