// Demo 4 - 企業形象官網
import './styles.css';
import Header from './components/Header';
import Hero from './components/Hero';
import WhyUs from './components/WhyUs';
import Process from './components/Process';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import StickyFooter from './components/StickyFooter';
import ModuleLoader, { FloatingModules } from '../../components/Shell/ModuleLoader';
import { useModuleEditor } from '../../hooks/useModuleEditor';
import InlineEditor from '../../components/Admin/InlineEditor';

export default function Demo4() {
    const { liveModuleConfig, handleConfigChange } = useModuleEditor('demo-4');

    const moduleProps = {
        CartModule: {
            onToast: (msg) => {
                const toast = document.createElement('div');
                toast.className = 'fixed bottom-20 left-1/2 -translate-x-1/2 bg-black/80 text-white px-6 py-3 rounded-full z-50';
                toast.textContent = msg;
                document.body.appendChild(toast);
                setTimeout(() => toast.remove(), 2000);
            }
        },
        BookingModule: {
            title: "預約企業諮詢",
            services: [
                { id: 1, name: '線上諮詢', price: 0, duration: 30 },
                { id: 2, name: '到府服務', price: 1000, duration: 60 },
                { id: 3, name: '專案規劃', price: 5000, duration: 120 }
            ],
            stylists: [
                { id: 1, name: '業務經理 A' },
                { id: 2, name: '業務經理 B' }
            ]
        }
    };

    return (
        <div className="demo-4-container min-h-screen bg-white pb-20 lg:pb-0">
            <Header />
            <main>
                <Hero />
                <WhyUs />
                <Process />
                <Pricing />
                <Testimonials />
                <Contact />

                {/* Main 區域模組 */}
                <div className="max-w-4xl mx-auto px-4 py-12">
                    <ModuleLoader moduleConfig={liveModuleConfig} position="main" props={moduleProps} />
                </div>
            </main>
            <StickyFooter />

            {/* 浮動模組 */}
            <FloatingModules moduleConfig={liveModuleConfig} props={moduleProps} />

            {/* 模組編輯器 */}
            <InlineEditor
                demoId="demo-4"
                moduleConfig={liveModuleConfig}
                onConfigChange={handleConfigChange}
            />
        </div>
    );
}

