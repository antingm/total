// 使用者選單元件
import { useState, useRef, useEffect } from 'react';
import { User, LogOut, Calendar, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const UserMenu = () => {
    const { currentUser, userProfile, signOut } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    // 點擊外部關閉選單
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSignOut = async () => {
        setIsOpen(false);
        await signOut();
    };

    const displayName = userProfile?.displayName || currentUser?.displayName || '使用者';
    const photoURL = userProfile?.photoURL || currentUser?.photoURL;
    const email = currentUser?.email;

    return (
        <div className="relative" ref={menuRef}>
            {/* 頭像按鈕 */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
                {photoURL ? (
                    <img
                        src={photoURL}
                        alt={displayName}
                        className="w-8 h-8 rounded-full object-cover"
                    />
                ) : (
                    <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-medium">
                        {displayName.charAt(0).toUpperCase()}
                    </div>
                )}
            </button>

            {/* 下拉選單 */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50"
                    >
                        {/* 使用者資訊 */}
                        <div className="p-4 bg-gray-50 border-b border-gray-100">
                            <p className="font-semibold text-gray-800">{displayName}</p>
                            <p className="text-sm text-gray-500 truncate">{email}</p>
                        </div>

                        {/* 選單項目 */}
                        <div className="py-2">
                            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors">
                                <Calendar size={18} />
                                <span>我的預約</span>
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors">
                                <Settings size={18} />
                                <span>帳號設定</span>
                            </button>
                        </div>

                        {/* 登出 */}
                        <div className="border-t border-gray-100 py-2">
                            <button
                                onClick={handleSignOut}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors"
                            >
                                <LogOut size={18} />
                                <span>登出</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default UserMenu;
