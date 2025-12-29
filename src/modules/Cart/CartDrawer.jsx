import { X, Minus, Plus, Trash2, ShoppingBag, Loader2 } from 'lucide-react';
import { useCart } from './CartProvider';

/**
 * CartDrawer - 可共用的購物車側邊欄組件
 * 
 * Props:
 * - onToast: (message) => void - 可選的 Toast 回調
 * - className: 額外樣式類別
 */
export default function CartDrawer({ onToast, className = '' }) {
    const {
        cart,
        isCartOpen,
        isCheckingOut,
        cartTotal,
        setIsCartOpen,
        updateQuantity,
        removeFromCart,
        checkout
    } = useCart();

    const handleCheckout = () => {
        checkout(
            (msg) => onToast?.(msg),
            (err) => onToast?.(err)
        );
    };

    const handleRemove = (productId) => {
        removeFromCart(productId);
        onToast?.('已移除商品');
    };

    // 使用內聯樣式確保不會被其他 CSS 覆蓋
    const styles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 2000,
            opacity: isCartOpen ? 1 : 0,
            transition: 'opacity 0.3s ease',
            pointerEvents: isCartOpen ? 'auto' : 'none',
        },
        drawer: {
            position: 'fixed',
            top: 0,
            right: 0,
            height: '100%',
            width: '100%',
            maxWidth: '400px',
            backgroundColor: '#ffffff',
            zIndex: 2100,
            boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.15)',
            transform: isCartOpen ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.3s ease-in-out',
            display: 'flex',
            flexDirection: 'column',
        },
        header: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px',
            borderBottom: '1px solid #e5e7eb',
            backgroundColor: '#ffffff',
        },
        title: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '20px',
            fontWeight: 700,
            color: '#1f2937',
            margin: 0,
        },
        closeBtn: {
            padding: '8px',
            borderRadius: '50%',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        content: {
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            backgroundColor: '#ffffff',
        },
        emptyState: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: '#9ca3af',
        },
        itemList: {
            listStyle: 'none',
            margin: 0,
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
        },
        item: {
            display: 'flex',
            gap: '12px',
            padding: '12px',
            backgroundColor: '#f9fafb',
            borderRadius: '12px',
        },
        itemImage: {
            width: '80px',
            height: '80px',
            objectFit: 'cover',
            borderRadius: '8px',
        },
        itemInfo: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
        },
        itemName: {
            fontSize: '14px',
            fontWeight: 600,
            color: '#1f2937',
            margin: 0,
        },
        itemPrice: {
            fontSize: '14px',
            fontWeight: 700,
            color: '#6366f1',
            margin: '4px 0',
        },
        quantityControls: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '8px',
        },
        quantityBtn: {
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#e5e7eb',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        quantity: {
            width: '32px',
            textAlign: 'center',
            fontWeight: 500,
        },
        removeBtn: {
            alignSelf: 'flex-start',
            padding: '8px',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: '#f87171',
        },
        footer: {
            borderTop: '1px solid #e5e7eb',
            padding: '16px',
            backgroundColor: '#ffffff',
        },
        subtotalRow: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px',
        },
        subtotalLabel: {
            fontSize: '14px',
            color: '#6b7280',
        },
        subtotalValue: {
            fontSize: '24px',
            fontWeight: 700,
            color: '#1f2937',
        },
        checkoutBtn: {
            width: '100%',
            padding: '16px',
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '8px',
        },
        continueBtn: {
            width: '100%',
            padding: '12px',
            backgroundColor: 'transparent',
            color: '#6b7280',
            border: 'none',
            fontSize: '14px',
            cursor: 'pointer',
        },
        browseBtn: {
            marginTop: '16px',
            padding: '12px 24px',
            backgroundColor: '#6366f1',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 500,
        },
    };

    return (
        <>
            {/* 背景遮罩 */}
            <div
                style={styles.overlay}
                onClick={() => setIsCartOpen(false)}
            />

            {/* 購物車抽屜 */}
            <div style={styles.drawer} className={className}>
                {/* 標題 */}
                <div style={styles.header}>
                    <h2 style={styles.title}>
                        <ShoppingBag size={24} />
                        購物車
                    </h2>
                    <button
                        style={styles.closeBtn}
                        onClick={() => setIsCartOpen(false)}
                    >
                        <X size={24} color="#6b7280" />
                    </button>
                </div>

                {/* 內容區 */}
                <div style={styles.content}>
                    {cart.length === 0 ? (
                        <div style={styles.emptyState}>
                            <ShoppingBag size={64} strokeWidth={1} />
                            <p style={{ marginTop: '16px', fontSize: '16px' }}>購物車是空的</p>
                            <button
                                style={styles.browseBtn}
                                onClick={() => setIsCartOpen(false)}
                            >
                                去逛逛
                            </button>
                        </div>
                    ) : (
                        <ul style={styles.itemList}>
                            {cart.map((item) => (
                                <li key={item.id} style={styles.item}>
                                    {item.image && (
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            style={styles.itemImage}
                                        />
                                    )}
                                    <div style={styles.itemInfo}>
                                        <h4 style={styles.itemName}>{item.name}</h4>
                                        <p style={styles.itemPrice}>
                                            NT$ {(item.salePrice || item.price)?.toLocaleString()}
                                        </p>
                                        <div style={styles.quantityControls}>
                                            <button
                                                style={styles.quantityBtn}
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span style={styles.quantity}>{item.quantity}</span>
                                            <button
                                                style={styles.quantityBtn}
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        style={styles.removeBtn}
                                        onClick={() => handleRemove(item.id)}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* 底部結帳區 - 永遠顯示當有商品時 */}
                {cart.length > 0 && (
                    <div style={styles.footer}>
                        <div style={styles.subtotalRow}>
                            <span style={styles.subtotalLabel}>小計</span>
                            <span style={styles.subtotalValue}>
                                NT$ {cartTotal.toLocaleString()}
                            </span>
                        </div>
                        <button
                            style={{
                                ...styles.checkoutBtn,
                                opacity: isCheckingOut ? 0.6 : 1,
                                cursor: isCheckingOut ? 'not-allowed' : 'pointer',
                            }}
                            onClick={handleCheckout}
                            disabled={isCheckingOut}
                        >
                            {isCheckingOut ? (
                                <>
                                    <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
                                    處理中...
                                </>
                            ) : (
                                '前往結帳'
                            )}
                        </button>
                        <button
                            style={styles.continueBtn}
                            onClick={() => setIsCartOpen(false)}
                        >
                            繼續購物
                        </button>
                    </div>
                )}
            </div>

            {/* 動畫 keyframes */}
            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </>
    );
}
