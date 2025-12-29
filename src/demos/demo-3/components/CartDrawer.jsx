import { X, Minus, Plus, Trash2, ShoppingBag, Loader2 } from 'lucide-react';
import './CartDrawer.css';

export default function CartDrawer({
    isOpen,
    onClose,
    cart,
    onUpdateQuantity,
    onRemoveItem,
    cartTotal,
    onCheckout,
    isCheckingOut
}) {
    if (!isOpen) return null;

    return (
        <>
            {/* 背景遮罩 */}
            <div className="cart-overlay" onClick={onClose} />

            {/* 購物車抽屜 */}
            <div className={`cart-drawer ${isOpen ? 'cart-drawer--open' : ''}`}>
                <div className="cart-drawer__header">
                    <h2 className="cart-drawer__title">
                        <ShoppingBag size={24} />
                        購物車
                    </h2>
                    <button className="cart-drawer__close" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <div className="cart-drawer__content">
                    {cart.length === 0 ? (
                        <div className="cart-drawer__empty">
                            <ShoppingBag size={64} strokeWidth={1} />
                            <p>購物車是空的</p>
                            <button className="btn btn-primary" onClick={onClose}>
                                去逛逛
                            </button>
                        </div>
                    ) : (
                        <>
                            <ul className="cart-drawer__items">
                                {cart.map((item) => (
                                    <li key={item.id} className="cart-item">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="cart-item__image"
                                        />
                                        <div className="cart-item__info">
                                            <h4 className="cart-item__name">{item.name}</h4>
                                            <p className="cart-item__price">
                                                NT$ {item.salePrice.toLocaleString()}
                                            </p>
                                            <div className="cart-item__quantity">
                                                <button
                                                    className="cart-item__qty-btn"
                                                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="cart-item__qty-value">{item.quantity}</span>
                                                <button
                                                    className="cart-item__qty-btn"
                                                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                        </div>
                                        <button
                                            className="cart-item__remove"
                                            onClick={() => onRemoveItem(item.id)}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            <div className="cart-drawer__footer">
                                <div className="cart-drawer__total">
                                    <span>小計</span>
                                    <span className="cart-drawer__total-amount">
                                        NT$ {cartTotal.toLocaleString()}
                                    </span>
                                </div>
                                <button
                                    className="btn btn-primary btn-full btn-lg"
                                    onClick={onCheckout}
                                    disabled={isCheckingOut}
                                >
                                    {isCheckingOut ? (
                                        <>
                                            <Loader2 size={20} className="spin" />
                                            處理中...
                                        </>
                                    ) : (
                                        '前往結帳'
                                    )}
                                </button>
                                <button className="btn btn-ghost btn-full" onClick={onClose}>
                                    繼續購物
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
