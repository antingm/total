import { CheckCircle2, ArrowRight } from 'lucide-react';
import { BRAND, HERO } from '../constants';

function Hero() {
    const handleCtaClick = () => {
        const element = document.getElementById('calculator');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handlePortfolioClick = () => {
        const element = document.getElementById('portfolio');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="hero">
            <div className="hero-bg">
                <img
                    src={HERO.backgroundImage}
                    alt="現代簡約客廳"
                    loading="eager"
                />
            </div>

            <div className="container">
                <div className="hero-content">
                    <div className="hero-badge">
                        ✨ 限時優惠：裝修送驗屋服務
                    </div>

                    <h1 className="hero-title">
                        {BRAND.name} {HERO.title}<br />
                        <span className="highlight">{HERO.highlight}</span>，{HERO.subtitle}
                    </h1>

                    <p className="hero-subtitle">
                        {HERO.description}
                    </p>

                    <div className="hero-features">
                        {HERO.features.map((feature, index) => (
                            <div key={index} className="hero-feature">
                                <CheckCircle2 size={20} />
                                <span>{feature}</span>
                            </div>
                        ))}
                    </div>

                    <div className="hero-cta">
                        <button className="btn btn-primary btn-lg" onClick={handleCtaClick}>
                            {HERO.cta.primary}
                            <ArrowRight size={20} />
                        </button>
                        <button className="btn btn-outline btn-lg" onClick={handlePortfolioClick}>
                            {HERO.cta.secondary}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
