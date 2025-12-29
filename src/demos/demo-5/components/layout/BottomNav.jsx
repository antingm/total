import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Calendar, Image, User } from 'lucide-react';

const navItems = [
    { path: '/', icon: Home, label: '首頁' },
    { path: '/booking', icon: Calendar, label: '預約' },
    { path: '/gallery', icon: Image, label: '作品' },
    { path: '/member', icon: User, label: '會員' }
];

export default function BottomNav() {
    const location = useLocation();

    // 在預約頁面隱藏底部導航（預約頁面有自己的操作按鈕）
    if (location.pathname === '/booking') {
        return null;
    }

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50">
            <div className="bg-white/98 backdrop-blur-xl border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
                <div className="flex items-center justify-around py-2 px-2">
                    {navItems.map(({ path, icon: Icon, label }) => {
                        const isActive = location.pathname === path;

                        return (
                            <NavLink
                                key={path}
                                to={path}
                                className="relative flex-1"
                            >
                                <motion.div
                                    className="flex flex-col items-center gap-1 py-2"
                                    whileTap={{ scale: 0.85 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                                >
                                    <motion.div
                                        animate={{
                                            scale: isActive ? 1.1 : 1,
                                            y: isActive ? -2 : 0
                                        }}
                                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                        className={`p-2.5 rounded-2xl transition-all duration-300 ${isActive
                                                ? 'bg-gradient-to-br from-rose-400 to-rose-500 shadow-lg shadow-rose-200/60'
                                                : ''
                                            }`}
                                    >
                                        <Icon
                                            size={22}
                                            strokeWidth={isActive ? 2 : 1.5}
                                            className={`transition-colors duration-200 ${isActive ? 'text-white' : 'text-gray-400'
                                                }`}
                                        />
                                    </motion.div>

                                    <span className={`text-[11px] font-semibold transition-all duration-200 ${isActive ? 'text-rose-500' : 'text-gray-400'
                                        }`}>
                                        {label}
                                    </span>
                                </motion.div>
                            </NavLink>
                        );
                    })}
                </div>

                {/* Safe Area 底部間距 */}
                <div className="h-[env(safe-area-inset-bottom)]" />
            </div>
        </nav>
    );
}
