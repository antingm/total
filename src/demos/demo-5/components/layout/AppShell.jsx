import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';
import DesktopNav from './DesktopNav';

export default function AppShell() {
    return (
        <div className="min-h-screen bg-white">
            {/* 桌面版導航 - 只在 lg 以上顯示 */}
            <div className="hidden lg:block">
                <DesktopNav />
            </div>

            {/* 主內容區 */}
            <main className="lg:pt-20 pb-24 lg:pb-16">
                <Outlet />
            </main>

            {/* 手機版底部導航 - 只在 lg 以下顯示 */}
            <div className="lg:hidden">
                <BottomNav />
            </div>
        </div>
    );
}
