// Demo 6 - 益生菌銷售頁面
// 重構版：使用共享 CartModule
import './styles.css';
import { CartProvider, useCart, CartDrawer } from '../../modules/Cart';
import Header from './components/Header';
import Hero from './components/Hero';
import MediaMentions from './components/MediaMentions';
import Stats from './components/Stats';
import PainPoints from './components/PainPoints';
import Solution from './components/Solution';
import Certifications from './components/Certifications';
import SocialProof from './components/SocialProof';
import Pricing from './components/Pricing';
import Guarantees from './components/Guarantees';
import FinalCTA from './components/FinalCTA';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import StickyFooter from './components/StickyFooter';
import ModuleLoader, { FloatingModules } from '../../components/Shell/ModuleLoader';
import { useModuleEditor } from '../../hooks/useModuleEditor';
import InlineEditor from '../../components/Admin/InlineEditor';

function Demo6Content() {
    const { liveModuleConfig, handleConfigChange } = useModuleEditor('demo-6');

    const { cartCount, setIsCartOpen } = useCart();

    const showToast = (message) => {
        const toast = document.createElement('div');
        toast.className = 'fixed bottom-20 left-1/2 -translate-x-1/2 bg-black/80 text-white px-6 py-3 rounded-full z-50';
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
    };

    const moduleProps = {
        BookingModule: {
            title: "預約諮詢",
            services: [
                { id: 1, name: '免費健康諮詢', price: 0, duration: 30 },
                { id: 2, name: '營養師一對一', price: 500, duration: 60 }
            ],
            stylists: [
                { id: 1, name: '營養師 A' },
                { id: 2, name: '營養師 B' }
            ]
        },
        TestimonialModule: {
            title: "消費者見證"
        },
        FAQModule: {
            title: "常見問題",
            items: [
                { question: '益生菌什麼時候吃最好？', answer: '建議空腹或飯前 30 分鐘食用，效果最佳。' },
                { question: '可以和藥物一起吃嗎？', answer: '建議與藥物間隔 2 小時以上。' },
                { question: '孕婦可以食用嗎？', answer: '本產品成分天然，但建議諮詢醫師後再食用。' }
            ]
        }
    };

    return (
        <div className="demo-6-container min-h-screen bg-surface">
            {/* 固定導覽列 - 傳遞購物車開啟函數 */}
            <Header
                cartCount={cartCount}
                onCartClick={() => setIsCartOpen(true)}
            />

            {/* Hero 首屏 */}
            <Hero />

            {/* 媒體報導 */}
            <MediaMentions />

            {/* 數據統計 */}
            <Stats />

            {/* 痛點喚醒 */}
            <PainPoints />

            {/* 專利科學解決方案 */}
            <Solution />

            {/* 認證展示 */}
            <Certifications />

            {/* 社會認證 - 好評見證 */}
            <SocialProof />

            {/* 價格方案 */}
            <Pricing />

            {/* 購物保障 */}
            <Guarantees />

            {/* 最終 CTA */}
            <FinalCTA />

            {/* 常見問答 */}
            <FAQ />

            {/* Main 區域動態模組 */}
            <div className="max-w-4xl mx-auto px-4 py-12">
                <ModuleLoader moduleConfig={liveModuleConfig} position="main" props={moduleProps} />
            </div>

            {/* 頁尾 */}
            <Footer />

            {/* 手機版固定購買按鈕 */}
            <StickyFooter />

            {/* 使用共享購物車抽屜 */}
            <CartDrawer onToast={showToast} />

            {/* 浮動模組 */}
            <FloatingModules moduleConfig={liveModuleConfig} props={moduleProps} />

            {/* 模組編輯器 */}
            <InlineEditor
                demoId="demo-6"
                moduleConfig={liveModuleConfig}
                onConfigChange={handleConfigChange}
                builtInFeatures={['CartModule', 'FAQModule']}
            />
        </div>
    );
}

export default function Demo6() {
    return (
        <CartProvider>
            <Demo6Content />
        </CartProvider>
    );
}

