import { ShoppingCart } from 'lucide-react';
import { CartProvider, useCart } from './CartProvider';
import CartDrawer from './CartDrawer';

/**
 * CartModule - 完整的購物車解決方案
 * 
 * 使用方式：
 * 1. 作為獨立模組引入：<CartModule />
 * 2. 或分開使用：<CartProvider> + <CartDrawer /> + useCart()
 */
export function CartModule({ onToast }) {
    return (
        <CartProvider>
            <CartModuleContent onToast={onToast} />
        </CartProvider>
    );
}

function CartModuleContent({ onToast }) {
    const { cartCount, setIsCartOpen } = useCart();

    return (
        <>
            {/* 購物車觸發按鈕 */}
            <button
                onClick={() => setIsCartOpen(true)}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full shadow-lg flex items-center justify-center text-white hover:scale-110 transition-transform"
            >
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full text-xs font-bold flex items-center justify-center">
                        {cartCount > 99 ? '99+' : cartCount}
                    </span>
                )}
            </button>

            {/* 購物車側邊欄 */}
            <CartDrawer onToast={onToast} />
        </>
    );
}

// 統一導出
export { CartProvider, useCart } from './CartProvider';
export { default as CartDrawer } from './CartDrawer';
export default CartModule;
