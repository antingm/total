import { Gift, Package, Sparkles } from 'lucide-react';
import { GIFT_SETS } from '../constants';
import './GiftSection.css';

export default function GiftSection({ onAddToCart }) {
    const handleAddToCart = (giftSet) => {
        onAddToCart?.({
            id: giftSet.id,
            name: giftSet.name,
            description: giftSet.description,
            salePrice: giftSet.salePrice,
            originalPrice: giftSet.originalPrice,
            image: giftSet.image,
        });
    };

    return (
        <section className="gift-section" id="gift">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">🎁 禮盒專區</h2>
                    <p className="section-subtitle">精緻包裝，送禮自用兩相宜</p>
                </div>

                <div className="gift-grid">
                    {GIFT_SETS.map((gift) => (
                        <div key={gift.id} className="gift-card">
                            <div className="gift-card__image-wrapper">
                                <img
                                    src={gift.image}
                                    alt={gift.name}
                                    className="gift-card__image"
                                />
                                <div className="gift-card__badge">
                                    <Sparkles size={16} />
                                    限時優惠
                                </div>
                            </div>
                            <div className="gift-card__content">
                                <h3 className="gift-card__name">{gift.name}</h3>
                                <p className="gift-card__desc">{gift.description}</p>
                                <div className="gift-card__items">
                                    <Gift size={16} />
                                    <span>內含：{gift.items.join('、')}</span>
                                </div>
                                <div className="gift-card__price">
                                    <span className="gift-card__price-original">
                                        NT$ {gift.originalPrice.toLocaleString()}
                                    </span>
                                    <span className="gift-card__price-sale">
                                        NT$ {gift.salePrice.toLocaleString()}
                                    </span>
                                </div>
                                <button
                                    className="btn btn-primary btn-full btn-lg"
                                    onClick={() => handleAddToCart(gift)}
                                >
                                    <Package size={18} />
                                    加入購物車
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
