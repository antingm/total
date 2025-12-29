import ProductCard from './ProductCard';
import { PRODUCTS } from '../constants';
import './BestSellers.css';

export default function BestSellers({ onAddToCart, onViewProduct }) {
    // 取得熱銷商品（有 TOP 標籤或評分最高的前 4 個）
    const bestSellers = PRODUCTS
        .filter(p => p.badge?.type === 'rank' || p.rating >= 4.8)
        .slice(0, 4);

    return (
        <section className="bestsellers-section" id="bestsellers">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">🔥 熱銷排行</h2>
                    <p className="section-subtitle">網友激推，銷量 No.1 的人氣口味</p>
                </div>

                <div className="bestsellers-grid">
                    {bestSellers.map((product, index) => (
                        <div key={product.id} className="bestseller-item">
                            <span className="bestseller-rank">#{index + 1}</span>
                            <ProductCard
                                product={product}
                                onAddToCart={onAddToCart}
                                onViewProduct={onViewProduct}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
