import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartModal() {
    const { cartItems, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();

    const handleCheckout = () => {
        alert('🎉 感謝您的訂購！\n\n這是 Demo 網站，實際購物功能尚未串接金流系統。\n\n您選購的商品總金額為 $' + totalPrice.toLocaleString());
        clearCart();
        setIsCartOpen(false);
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* 背景遮罩 */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black/50 z-50"
                    />

                    {/* 購物車側邊欄 */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
                    >
                        {/* 標題 */}
                        <div className="flex items-center justify-between p-4 border-b">
                            <div className="flex items-center gap-2">
                                <ShoppingBag className="w-5 h-5 text-primary" />
                                <h2 className="text-lg font-bold text-text-main">購物車</h2>
                            </div>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* 購物車內容 */}
                        <div className="flex-1 overflow-y-auto p-4">
                            {cartItems.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
                                    <p className="text-text-muted">購物車是空的</p>
                                    <button
                                        onClick={() => setIsCartOpen(false)}
                                        className="mt-4 text-primary hover:text-primary-dark font-medium"
                                    >
                                        繼續選購
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {cartItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center gap-4 bg-surface p-4 rounded-xl"
                                        >
                                            {/* 產品資訊 */}
                                            <div className="flex-1">
                                                <h3 className="font-medium text-text-main">{item.name}</h3>
                                                <p className="text-sm text-text-muted">{item.quantity} 盒裝</p>
                                                <p className="text-primary font-bold">${item.price.toLocaleString()}</p>
                                            </div>

                                            {/* 數量控制 */}
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="w-8 text-center font-medium">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>

                                            {/* 刪除按鈕 */}
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* 結帳區 */}
                        {cartItems.length > 0 && (
                            <div className="border-t p-4 space-y-4">
                                <div className="flex items-center justify-between text-lg">
                                    <span className="text-text-muted">總計</span>
                                    <span className="font-bold text-text-main">${totalPrice.toLocaleString()}</span>
                                </div>
                                <button
                                    onClick={handleCheckout}
                                    className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl transition-colors"
                                >
                                    前往結帳
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
