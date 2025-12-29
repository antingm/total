import { useState } from 'react';
import { X, Star, ShoppingCart, Minus, Plus, Heart } from 'lucide-react';
import './ProductModal.css';

export default function ProductModal({ isOpen, onClose, product, onAddToCart }) {
    const [quantity, setQuantity] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false);

    if (!isOpen || !product) return null;

    const {
        name,
        description,
        originalPrice,
        salePrice,
        image,
        rating,
        reviews,
    } = product;

    const discount = Math.round((1 - salePrice / originalPrice) * 100);

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            onAddToCart(product);
        }
        onClose();
    };

    return (
        <>
            {/* 背景遮罩 */}
            <div className="modal-overlay" onClick={onClose} />

            {/* 商品詳情彈窗 */}
            <div className="product-modal">
                <button className="product-modal__close" onClick={onClose}>
                    <X size={24} />
                </button>

                <div className="product-modal__content">
                    {/* 商品圖片 */}
                    <div className="product-modal__image-section">
                        <img src={image} alt={name} className="product-modal__image" />
                        {discount > 0 && (
                            <span className="product-modal__discount">-{discount}%</span>
                        )}
                    </div>

                    {/* 商品資訊 */}
                    <div className="product-modal__info">
                        <h2 className="product-modal__name">{name}</h2>
                        <p className="product-modal__desc">{description}</p>

                        {/* 評分 */}
                        {rating && (
                            <div className="product-modal__rating">
                                <Star size={18} fill="#FFD93D" color="#FFD93D" />
                                <span className="product-modal__rating-value">{rating}</span>
                                <span className="product-modal__reviews">
                                    ({reviews.toLocaleString()} 則評價)
                                </span>
                            </div>
                        )}

                        {/* 價格 */}
                        <div className="product-modal__price">
                            <span className="product-modal__price-original">
                                NT$ {originalPrice.toLocaleString()}
                            </span>
                            <span className="product-modal__price-sale">
                                NT$ {salePrice.toLocaleString()}
                            </span>
                        </div>

                        {/* 數量選擇 */}
                        <div className="product-modal__quantity-section">
                            <span className="product-modal__quantity-label">數量</span>
                            <div className="product-modal__quantity">
                                <button
                                    className="product-modal__qty-btn"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                >
                                    <Minus size={18} />
                                </button>
                                <span className="product-modal__qty-value">{quantity}</span>
                                <button
                                    className="product-modal__qty-btn"
                                    onClick={() => setQuantity(quantity + 1)}
                                >
                                    <Plus size={18} />
                                </button>
                            </div>
                        </div>

                        {/* 操作按鈕 */}
                        <div className="product-modal__actions">
                            <button
                                className={`product-modal__favorite ${isFavorite ? 'product-modal__favorite--active' : ''}`}
                                onClick={() => setIsFavorite(!isFavorite)}
                            >
                                <Heart size={22} fill={isFavorite ? '#ef4444' : 'none'} />
                            </button>
                            <button
                                className="btn btn-primary btn-lg product-modal__add-cart"
                                onClick={handleAddToCart}
                            >
                                <ShoppingCart size={20} />
                                加入購物車
                            </button>
                        </div>

                        {/* 商品特色 */}
                        <div className="product-modal__features">
                            <div className="product-modal__feature">
                                <span>✓</span> 新鮮製作，品質保證
                            </div>
                            <div className="product-modal__feature">
                                <span>✓</span> 滿 $599 免運費
                            </div>
                            <div className="product-modal__feature">
                                <span>✓</span> 7 天鑑賞期
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
