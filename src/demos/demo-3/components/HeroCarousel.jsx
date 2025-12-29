import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_SLIDES } from '../constants';
import './HeroCarousel.css';

export default function HeroCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, []);

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
        setIsAutoPlaying(false);
        // 3秒後恢復自動播放
        setTimeout(() => setIsAutoPlaying(true), 3000);
    };

    useEffect(() => {
        if (!isAutoPlaying) return;

        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [isAutoPlaying, nextSlide]);

    return (
        <section className="hero">
            <div className="hero__carousel">
                {HERO_SLIDES.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`hero__slide ${index === currentSlide ? 'hero__slide--active' : ''}`}
                        style={{ backgroundColor: slide.bgColor }}
                    >
                        <div className="container hero__content">
                            <div className="hero__text animate-slide-up">
                                <h1 className="hero__title">
                                    {slide.title.split('\n').map((line, i) => (
                                        <span key={i}>
                                            {line}
                                            {i < slide.title.split('\n').length - 1 && <br />}
                                        </span>
                                    ))}
                                </h1>
                                <p className="hero__subtitle">{slide.subtitle}</p>
                                <button className="btn btn-primary btn-lg hero__cta">
                                    {slide.cta}
                                </button>
                            </div>
                            <div className="hero__image-wrapper">
                                <img
                                    src={slide.image}
                                    alt={slide.title.replace('\n', ' ')}
                                    className="hero__image"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 導航箭頭 */}
            <button
                className="hero__nav hero__nav--prev hide-mobile"
                onClick={prevSlide}
                aria-label="上一張"
            >
                <ChevronLeft size={32} />
            </button>
            <button
                className="hero__nav hero__nav--next hide-mobile"
                onClick={nextSlide}
                aria-label="下一張"
            >
                <ChevronRight size={32} />
            </button>

            {/* 指示點 */}
            <div className="hero__dots">
                {HERO_SLIDES.map((_, index) => (
                    <button
                        key={index}
                        className={`hero__dot ${index === currentSlide ? 'hero__dot--active' : ''}`}
                        onClick={() => goToSlide(index)}
                        aria-label={`前往第 ${index + 1} 張`}
                    />
                ))}
            </div>
        </section>
    );
}
