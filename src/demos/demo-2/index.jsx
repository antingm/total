// Demo 2 - 裝修公司 Landing Page
import './styles.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Calculator from './components/Calculator';
import Package from './components/Package';
import Portfolio from './components/Portfolio';
import Trust from './components/Trust';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import StickyLine from './components/StickyLine';
import ModuleLoader, { FloatingModules } from '../../components/Shell/ModuleLoader';
import { useModuleEditor } from '../../hooks/useModuleEditor';
import InlineEditor from '../../components/Admin/InlineEditor';

export default function Demo2() {
    const { liveModuleConfig, handleConfigChange } = useModuleEditor('demo-2');

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
            title: "預約裝修諮詢",
            services: [
                { id: 1, name: '免費諮詢', price: 0, duration: 60 },
                { id: 2, name: '現場丈量', price: 500, duration: 90 },
                { id: 3, name: '設計規劃', price: 3000, duration: 120 }
            ],
            stylists: [
                { id: 1, name: '設計師 A' },
                { id: 2, name: '設計師 B' }
            ]
        }
    };

    return (
        <div className="demo-2-container">
            <Navbar />
            <main>
                <Hero />
                <Calculator />
                <Package />
                <Portfolio />
                <Trust />
                <FAQ />

                {/* Main 區域模組 */}
                <div className="max-w-4xl mx-auto px-4 py-12">
                    <ModuleLoader moduleConfig={liveModuleConfig} position="main" props={moduleProps} />
                </div>
            </main>
            <Footer />
            <StickyLine />

            {/* 浮動模組 */}
            <FloatingModules moduleConfig={liveModuleConfig} props={moduleProps} />

            {/* 模組編輯器 */}
            <InlineEditor
                demoId="demo-2"
                moduleConfig={liveModuleConfig}
                onConfigChange={handleConfigChange}
            />
        </div>
    );
}

