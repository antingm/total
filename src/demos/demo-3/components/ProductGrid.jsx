import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { PRODUCTS } from '../constants';
import './ProductGrid.css';

const CATEGORIES = [
    { id: 'all', label: '全部商品', hash: 'products' },
    { id: 'sweet', label: '甜口味', hash: 'sweet' },
    { id: 'savory', label: '鹹口味', hash: 'savory' },
];

export default function ProductGrid({ onAddToCart, onViewProduct, activeCategory: externalCategory }) {
    const [activeCategory, setActiveCategory] = useState('all');

    // 監聽 URL hash 變化來切換分類
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.replace('#', '');
            const category = CATEGORIES.find(c => c.hash === hash);
            if (category) {
                setActiveCategory(category.id);
            }
        };

        // 初始化檢查
        handleHashChange();

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    // 如果有外部傳入的分類，使用外部分類
    useEffect(() => {
        if (externalCategory) {
            setActiveCategory(externalCategory);
        }
    }, [externalCategory]);

    const filteredProducts =
        activeCategory === 'all'
            ? PRODUCTS
            : PRODUCTS.filter((p) => p.category === activeCategory);

    return (
        <section className="product-grid-section" id="products">
            <div className="container">
                {/* 區塊標題 */}
                <div className="section-header">
                    <h2 className="section-title">人氣商品</h2>
                    <p className="section-subtitle">嚴選頂級食材，獨家研發創意口味</p>
                </div>

                {/* 分類篩選（添加 ID 供導航使用） */}
                <div className="product-grid__tabs" id="sweet" data-section>
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            id={cat.hash === 'savory' ? 'savory' : undefined}
                            className={`product-grid__tab ${activeCategory === cat.id ? 'product-grid__tab--active' : ''}`}
                            onClick={() => {
                                setActiveCategory(cat.id);
                                // 更新 URL hash（不會重新載入頁面）
                                if (cat.id !== 'all') {
                                    window.history.pushState(null, '', `#${cat.hash}`);
                                } else {
                                    window.history.pushState(null, '', '#products');
                                }
                            }}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* 商品網格 */}
                <div className="product-grid">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={onAddToCart}
                            onViewProduct={onViewProduct}
                        />
                    ))}
                </div>

                {/* 查看更多 */}
                <div className="product-grid__more">
                    <button
                        className="btn btn-secondary btn-lg"
                        onClick={() => {
                            setActiveCategory('all');
                            window.history.pushState(null, '', '#products');
                        }}
                    >
                        查看全部商品
                    </button>
                </div>
            </div>
        </section>
    );
}
