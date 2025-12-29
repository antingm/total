// Demo 1 - 潔淨管家 清潔服務 Landing Page
import './styles.css';
import Hero from './components/Hero';
import PainPoints from './components/PainPoints';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import StickyMobileFooter from './components/StickyMobileFooter';
import ModuleLoader, { FloatingModules } from '../../components/Shell/ModuleLoader';
import { useModuleEditor } from '../../hooks/useModuleEditor';
import InlineEditor from '../../components/Admin/InlineEditor';

export default function Demo1() {
    const { liveModuleConfig, handleConfigChange } = useModuleEditor('demo-1');

    // 給各模組的 props
    const moduleProps = {
        CartModule: {
            onToast: (msg) => {
                // 簡單的 toast 實作
                const toast = document.createElement('div');
                toast.className = 'fixed bottom-20 left-1/2 -translate-x-1/2 bg-black/80 text-white px-6 py-3 rounded-full z-50';
                toast.textContent = msg;
                document.body.appendChild(toast);
                setTimeout(() => toast.remove(), 2000);
            }
        },
        BookingModule: {
            title: "預約清潔服務",
            services: [
                { id: 1, name: '居家清潔', price: 1500, duration: 120 },
                { id: 2, name: '辦公室清潔', price: 2500, duration: 180 },
                { id: 3, name: '大掃除服務', price: 4500, duration: 360 }
            ],
            stylists: [
                { id: 1, name: '清潔專員 A' },
                { id: 2, name: '清潔專員 B' }
            ]
        }
    };

    return (
        <div className="demo-1-container">
            {/* 頂部導航列 */}
            <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <a href="#" className="text-xl font-bold text-orange-500">
                            潔淨管家
                        </a>
                        {/* Header 區域模組 */}
                        <ModuleLoader moduleConfig={liveModuleConfig} position="header" props={moduleProps} />
                    </div>
                </div>
            </header>

            {/* 主要內容 */}
            <main className="pt-16">
                <Hero />
                <PainPoints />
                <Pricing />
                <Testimonials />
                <FAQ />

                {/* Main 區域模組 */}
                <div className="max-w-4xl mx-auto px-4 py-12">
                    <ModuleLoader moduleConfig={liveModuleConfig} position="main" props={moduleProps} />
                </div>
            </main>

            <StickyMobileFooter />

            {/* 浮動模組 (右下角按鈕等) */}
            <FloatingModules moduleConfig={liveModuleConfig} props={moduleProps} />

            {/* 模組編輯器 */}
            <InlineEditor
                demoId="demo-1"
                moduleConfig={liveModuleConfig}
                onConfigChange={handleConfigChange}
            />
        </div>
    );
}


