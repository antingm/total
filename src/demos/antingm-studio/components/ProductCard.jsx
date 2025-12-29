import { ShoppingCart, Eye, Star } from 'lucide-react';
import './ProductCard.css';

/**
 * 商品卡片元件
 * 
 * @param {object} product - 商品資料
 * @param {function} onAddToCart - 加入購物車回調
 * @param {function} onViewProduct - 查看商品詳情回調
 * @param {boolean} isAuthenticated - 是否已登入（從父層傳入以優化效能）
 */
export default function ProductCard({ product, onAddToCart, onViewProduct, isAuthenticated = false, viewMode = 'grid' }) {
    const {
        id,
        name,
        description,
        price,
        image,
        badge,
        rating,
        reviews,
    } = product;

    const getBadgeClass = (type) => {
        switch (type) {
            case 'rank': return 'badge-rank';
            case 'hot': return 'badge-hot';
            case 'new': return 'badge-new';
            case 'sale': return 'badge-sale';
            default: return '';
        }
    };

    const handleViewProduct = () => {
        onViewProduct?.(product);
    };

    return (
        <article className={`product-card ${viewMode === 'list' ? 'product-card--list' : ''}`}>
            {/* 商品圖片區 */}
            <div className="product-card__image-wrapper" onClick={handleViewProduct}>
                <img
                    src={image}
                    alt={name}
                    className="product-card__image"
                    loading="lazy"
                />

                {/* 促銷標籤 */}
                {badge && (
                    <span className={`product-card__badge ${getBadgeClass(badge.type)}`}>
                        {badge.text}
                    </span>
                )}

                {/* 懸浮操作 */}
                <div className="product-card__overlay">
                    <button
                        className="product-card__quick-view"
                        aria-label="快速查看"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleViewProduct();
                        }}
                    >
                        <Eye size={20} />
                    </button>
                </div>
            </div>

            {/* 商品資訊區 */}
            <div className="product-card__content">
                <h3 className="product-card__name">{name}</h3>
                <p className="product-card__desc">{description}</p>

                {/* 評分 */}
                {rating && (
                    <div className="product-card__rating">
                        <Star size={14} fill="#fbbf24" color="#fbbf24" />
                        <span className="product-card__rating-value">{rating}</span>
                        {reviews && (
                            <span className="product-card__reviews">({reviews.toLocaleString()})</span>
                        )}
                    </div>
                )}

                {/* 價格 */}
                <div className="product-card__price">
                    <span className="price-sale">NT$ {price?.toLocaleString()}</span>
                </div>

                {/* 按鈕組 */}
                <div className="product-card__actions">
                    <button
                        className="product-card__btn-view"
                        onClick={handleViewProduct}
                    >
                        查看詳情
                    </button>
                    <button
                        className="product-card__btn-cart"
                        onClick={() => onAddToCart?.(product)}
                    >
                        <ShoppingCart size={18} />
                        加入購物車
                    </button>
                </div>
            </div>
        </article>
    );
}
