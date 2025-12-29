// Demo 3 - 爆爆花桶 電商購物平台
// 重構版：使用共享 CartModule + 即時視覺化編輯器
import { useState, useEffect, useCallback, useRef } from 'react';
import './styles.css';
import './App.css';
import Navbar from './components/Navbar';
import HeroCarousel from './components/HeroCarousel';
import PromoBar from './components/PromoBar';
import BestSellers from './components/BestSellers';
import ProductGrid from './components/ProductGrid';
import GiftSection from './components/GiftSection';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';
import LoginModal from './components/LoginModal';
import InfoModal from './components/InfoModal';
import { CartProvider, useCart, CartDrawer } from '../../modules/Cart';
import ModuleLoader, { FloatingModules } from '../../components/Shell/ModuleLoader';
import { useFeatureFlags } from '../../hooks/useFeatureFlags';
import InlineEditor from '../../components/Admin/InlineEditor';

// 將購物車邏輯抽離到 Provider 內部
function Demo3Content() {
    const { getModuleConfig } = useFeatureFlags();
    const remoteConfig = getModuleConfig('demo-3');

    // 本地模組配置狀態（用於即時編輯）
    // 使用 lazy init 避免每次渲染都重新創建
    const [liveModuleConfig, setLiveModuleConfig] = useState(() => remoteConfig || {});

    // 追蹤是否已初始化（避免重複同步）
    const isInitialized = useRef(false);
    const prevRemoteConfigStr = useRef(JSON.stringify(remoteConfig));

    // 只在遠端配置真正變更時同步（首次或遠端更新）
    useEffect(() => {
        const currentStr = JSON.stringify(remoteConfig);

        // 只在遠端配置真正不同時更新
        if (currentStr !== prevRemoteConfigStr.current) {
            prevRemoteConfigStr.current = currentStr;
            setLiveModuleConfig(remoteConfig || {});
        }
    }, [remoteConfig]);

    // 穩定的配置變更回調 - 不會導致無限循環
    const handleConfigChange = useCallback((newConfig) => {
        setLiveModuleConfig(newConfig);
    }, []);

    // 使用共享購物車 Hook
    const {
        cart,
        cartCount,
        cartTotal,
        isCartOpen,
        isCheckingOut,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        checkout
    } = useCart();

    // 商品詳情狀態
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);

    // 登入狀態
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [user, setUser] = useState(null);

    // 資訊彈窗狀態
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const [infoModalContent, setInfoModalContent] = useState('');

    // 顯示提示訊息
    const showToast = (message) => {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = message;
        document.body.appendChild(toast);

        setTimeout(() => toast.classList.add('toast--show'), 10);
        setTimeout(() => {
            toast.classList.remove('toast--show');
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    };

    // 結帳功能
    const handleCheckout = () => {
        checkout(
            (msg) => showToast(msg),
            (err) => showToast(err)
        );
    };

    // 加入購物車
    const handleAddToCart = (product) => {
        addToCart(product);
        showToast(`✓ 已將「${product.name}」加入購物車`);
    };

    // 更新購物車數量
    const handleUpdateQuantity = (productId, quantity) => {
        updateQuantity(productId, quantity);
    };

    // 移除購物車商品
    const handleRemoveFromCart = (productId) => {
        removeFromCart(productId);
        showToast('已移除商品');
    };

    // 查看商品詳情
    const handleViewProduct = (product) => {
        setSelectedProduct(product);
        setIsProductModalOpen(true);
    };

    // 登入功能
    const handleLogin = (email, password) => {
        setUser({ email, name: email.split('@')[0] });
        setIsLoginModalOpen(false);
        showToast(`歡迎回來，${email.split('@')[0]}！`);
    };

    // 登出功能
    const handleLogout = () => {
        setUser(null);
        showToast('已成功登出');
    };

    // 電子報訂閱
    const handleSubscribe = (email) => {
        showToast(`感謝訂閱！我們將發送最新資訊到 ${email}`);
    };

    // 打開資訊彈窗
    const handleOpenInfo = (contentKey) => {
        setInfoModalContent(contentKey);
        setIsInfoModalOpen(true);
    };

    // 給其他模組的 props
    const moduleProps = {
        BookingModule: {
            title: "預約花藝課程",
            services: [
                { id: 1, name: '基礎花藝', price: 1200, duration: 120 },
                { id: 2, name: '進階設計', price: 2500, duration: 180 }
            ],
            stylists: [
                { id: 1, name: '花藝師 A' },
                { id: 2, name: '花藝師 B' }
            ]
        }
    };

    return (
        <div className="app demo-3-container">
            <Navbar
                cartCount={cartCount}
                onCartClick={() => setIsCartOpen(true)}
                onLoginClick={() => setIsLoginModalOpen(true)}
                user={user}
                onLogout={handleLogout}
            />

            <main className="main">
                <HeroCarousel onAddToCart={handleAddToCart} />
                <PromoBar />
                <BestSellers
                    onAddToCart={handleAddToCart}
                    onViewProduct={handleViewProduct}
                />
                <ProductGrid
                    onAddToCart={handleAddToCart}
                    onViewProduct={handleViewProduct}
                />
                <GiftSection onAddToCart={handleAddToCart} />
                <AboutSection />

                {/* Main 區域動態模組 */}
                <div className="max-w-6xl mx-auto px-4 py-12">
                    <ModuleLoader moduleConfig={liveModuleConfig} position="main" props={moduleProps} />
                </div>
            </main>

            <Footer onSubscribe={handleSubscribe} onOpenInfo={handleOpenInfo} />

            {/* 使用共享購物車抽屜 */}
            <CartDrawer onToast={showToast} />

            {/* 商品詳情彈窗 */}
            <ProductModal
                isOpen={isProductModalOpen}
                onClose={() => setIsProductModalOpen(false)}
                product={selectedProduct}
                onAddToCart={handleAddToCart}
            />

            {/* 登入彈窗 */}
            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
                onLogin={handleLogin}
            />

            {/* 資訊彈窗 */}
            <InfoModal
                isOpen={isInfoModalOpen}
                onClose={() => setIsInfoModalOpen(false)}
                contentKey={infoModalContent}
            />

            {/* 浮動模組 */}
            <FloatingModules moduleConfig={liveModuleConfig} props={moduleProps} />

            {/* 即時視覺化編輯器 */}
            <InlineEditor
                demoId="demo-3"
                moduleConfig={liveModuleConfig}
                onConfigChange={handleConfigChange}
                builtInFeatures={['CartModule']}
            />
        </div>
    );
}

// 主組件：用 CartProvider 包裹
export default function Demo3() {
    return (
        <CartProvider>
            <Demo3Content />
        </CartProvider>
    );
}
