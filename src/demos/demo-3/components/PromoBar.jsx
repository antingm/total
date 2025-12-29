import { Gift, Truck, MessageCircle, RefreshCw } from 'lucide-react';
import { PROMO_FEATURES } from '../constants';
import './PromoBar.css';

const iconMap = {
    Gift,
    Truck,
    MessageCircle,
    RefreshCw,
};

export default function PromoBar() {
    return (
        <section className="promo-bar">
            <div className="container">
                <div className="promo-bar__grid">
                    {PROMO_FEATURES.map((feature, index) => {
                        const IconComponent = iconMap[feature.icon];
                        return (
                            <div
                                key={index}
                                className={`promo-bar__item ${feature.highlight ? 'promo-bar__item--highlight' : ''}`}
                            >
                                <div className="promo-bar__icon">
                                    <IconComponent size={24} />
                                </div>
                                <div className="promo-bar__content">
                                    <h3 className="promo-bar__title">{feature.title}</h3>
                                    <p className="promo-bar__desc">{feature.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
