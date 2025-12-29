import { useState } from 'react';
import { X } from 'lucide-react';
import { PORTFOLIO } from '../constants';

function Portfolio() {
    const [selectedImage, setSelectedImage] = useState(null);

    const openLightbox = (item) => {
        setSelectedImage(item);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setSelectedImage(null);
        document.body.style.overflow = '';
    };

    return (
        <section id="portfolio" className="section portfolio">
            <div className="container">
                <h2 className="section-title">{PORTFOLIO.title}</h2>
                <p className="section-subtitle">{PORTFOLIO.subtitle}</p>

                <div className="portfolio-grid">
                    {PORTFOLIO.items.map((item) => (
                        <div
                            key={item.id}
                            className="portfolio-item"
                            onClick={() => openLightbox(item)}
                        >
                            <img src={item.image} alt={item.title} loading="lazy" />
                            <div className="portfolio-overlay">
                                <div className="portfolio-info">
                                    <h3 className="portfolio-title">{item.title}</h3>
                                    <p className="portfolio-location">{item.location}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            {selectedImage && (
                <div className={`lightbox ${selectedImage ? 'active' : ''}`} onClick={closeLightbox}>
                    <button className="lightbox-close" onClick={closeLightbox}>
                        <X size={24} />
                    </button>
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <img src={selectedImage.image} alt={selectedImage.title} />
                    </div>
                </div>
            )}
        </section>
    );
}

export default Portfolio;
