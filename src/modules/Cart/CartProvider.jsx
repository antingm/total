import { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext();

/**
 * CartProvider - 獨立的購物車狀態管理
 * 可被任何 Demo 引用，無需重新實作邏輯
 */
export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    // 加入購物車
    const addToCart = useCallback((product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    }, []);

    // 更新數量
    const updateQuantity = useCallback((productId, quantity) => {
        if (quantity <= 0) {
            setCart((prev) => prev.filter((item) => item.id !== productId));
        } else {
            setCart((prev) =>
                prev.map((item) =>
                    item.id === productId ? { ...item, quantity } : item
                )
            );
        }
    }, []);

    // 移除商品
    const removeFromCart = useCallback((productId) => {
        setCart((prev) => prev.filter((item) => item.id !== productId));
    }, []);

    // 清空購物車
    const clearCart = useCallback(() => {
        setCart([]);
    }, []);

    // 結帳（模擬）
    const checkout = useCallback(async (onSuccess, onError) => {
        if (cart.length === 0) {
            onError?.('購物車是空的');
            return;
        }

        setIsCheckingOut(true);

        try {
            // 模擬 API 請求
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // 先顯示成功訊息，再關閉購物車和清空
            onSuccess?.('🎉 感謝您的訂購！這是 Demo 模式，不會實際扣款。');

            // 稍微延遲關閉購物車，讓用戶能看到成功訊息
            setTimeout(() => {
                setCart([]);
                setIsCartOpen(false);
            }, 100);
        } catch (error) {
            onError?.(error.message);
        } finally {
            setIsCheckingOut(false);
        }
    }, [cart]);

    // 計算總數與總價
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotal = cart.reduce((sum, item) => sum + (item.salePrice || item.price) * item.quantity, 0);

    const value = {
        cart,
        isCartOpen,
        isCheckingOut,
        cartCount,
        cartTotal,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        checkout
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}

export default CartProvider;
