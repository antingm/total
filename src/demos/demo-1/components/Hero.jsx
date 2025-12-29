import { Phone } from 'lucide-react';
import { HERO_CONTENT, CONTACT_INFO } from '../constants';

function Hero() {
    return (
        <section className="min-h-[100dvh] flex flex-col justify-center bg-gradient-to-b from-primary/5 to-white section-padding">
            <div className="max-w-4xl mx-auto text-center">
                {/* 品牌標誌 */}
                <div className="mb-6 md:mb-8">
                    <span className="text-primary font-bold text-lg md:text-xl">潔淨管家</span>
                    <span className="text-slate-500 text-sm md:text-base ml-2">Turbo Clean</span>
                </div>

                {/* 主標題 */}
                <h1 className="heading-xl text-slate-900 mb-4 md:mb-6">
                    {HERO_CONTENT.title}
                </h1>

                {/* 副標題 */}
                <p className="text-lg md:text-xl text-slate-600 mb-8 md:mb-10 max-w-2xl mx-auto">
                    {HERO_CONTENT.subtitle}
                </p>

                {/* CTA 按鈕 */}
                <a
                    href={HERO_CONTENT.ctaPhone}
                    className="btn-cta inline-flex items-center gap-3 text-lg md:text-xl"
                >
                    <Phone className="w-6 h-6" />
                    {HERO_CONTENT.ctaText}
                </a>

                {/* 信任指標 */}
                <div className="mt-10 md:mt-12 flex flex-wrap justify-center gap-6 md:gap-10 text-slate-500 text-sm md:text-base">
                    <div className="flex items-center gap-2">
                        <span className="text-primary font-bold text-xl md:text-2xl">5,000+</span>
                        <span>滿意客戶</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-primary font-bold text-xl md:text-2xl">4.9</span>
                        <span>Google 評分</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-primary font-bold text-xl md:text-2xl">100%</span>
                        <span>滿意保證</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
