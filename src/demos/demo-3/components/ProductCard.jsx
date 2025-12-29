import { ShoppingCart, Eye, Star } from 'lucide-react';
import './ProductCard.css';

export default function ProductCard({ product, onAddToCart, onViewProduct }) {
    const {
        id,
        name,
        description,
        originalPrice,
        salePrice,
        image,
        badge,
        rating,
        reviews,
    } = product;

    const discount = Math.round((1 - salePrice / originalPrice) * 100);

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
        <article className="product-card card card-elevated">
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
                    <span className={`product-card__badge badge ${getBadgeClass(badge.type)}`}>
                        {badge.text}
                    </span>
                )}

                {/* 折扣標籤 */}
                {discount > 0 && (
                    <span className="product-card__discount">
                        -{discount}%
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
                        <Star size={14} fill="#FFD93D" color="#FFD93D" />
                        <span className="product-card__rating-value">{rating}</span>
                        <span className="product-card__reviews">({reviews.toLocaleString()})</span>
                    </div>
                )}

                {/* 價格 */}
                <div className="product-card__price">
                    <span className="price-original">NT$ {originalPrice.toLocaleString()}</span>
                    <span className="price-sale">NT$ {salePrice.toLocaleString()}</span>
                </div>

                {/* 按鈕組 */}
                <div className="product-card__actions">
                    <button
                        className="btn btn-secondary product-card__btn-view"
                        onClick={handleViewProduct}
                    >
                        查看商品
                    </button>
                    <button
                        className="btn btn-primary product-card__btn-cart"
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

