import { HERO } from '../constants';

export default function Hero() {
    return (
        <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-[#1565C0] to-[#0D47A1] px-4 py-16 md:py-20">
            {/* Background Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/hero-bg.jpg')",
                    opacity: 0.15
                }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#1565C0]/90 via-[#0D47A1]/92 to-[#082F5A]/95" />

            {/* Content */}
            <div className="relative z-10 text-center text-white max-w-2xl px-4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-5 md:mb-6 drop-shadow-lg tracking-tight whitespace-pre-line">
                    {HERO.title}
                </h1>

                <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-8 md:mb-10 opacity-95 tracking-wide whitespace-pre-line">
                    {HERO.subtitle}
                </p>

                <a
                    href="#contact"
                    className="inline-flex flex-col items-center justify-center min-h-[52px] px-8 md:px-12 py-4 md:py-5 bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] hover:from-[#1B5E20] hover:to-[#145214] text-white text-lg md:text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:-translate-y-0.5 group relative overflow-hidden"
                >
                    <span className="relative z-10">{HERO.cta}</span>
                    <span className="relative z-10 text-xs font-medium opacity-90 mt-1 tracking-wider">
                        {HERO.ctaBadge}
                    </span>

                    {/* Shine effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </a>
            </div>
        </section>
    );
}
