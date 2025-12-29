import { Check, Star } from 'lucide-react';
import { PRICING_PLANS, CONTACT_INFO } from '../constants';

function Pricing() {
    return (
        <section className="section-padding bg-slate-50">
            <div className="max-w-6xl mx-auto">
                {/* 區塊標題 */}
                <div className="text-center mb-10 md:mb-14">
                    <h2 className="heading-lg text-slate-900 mb-3">
                        透明價格，安心選擇
                    </h2>
                    <p className="text-slate-600 text-lg">
                        無隱藏費用，服務內容清楚明瞭
                    </p>
                </div>

                {/* 價格卡片 - Mobile 單欄，Tablet+ 三欄 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {PRICING_PLANS.map((plan) => (
                        <div
                            key={plan.id}
                            className={`relative bg-white rounded-2xl p-6 md:p-8 ${plan.popular
                                    ? 'ring-2 ring-cta shadow-xl scale-[1.02]'
                                    : 'shadow-lg'
                                }`}
                        >
                            {/* 最熱銷徽章 */}
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <span className="bg-cta text-white text-sm font-bold px-4 py-1.5 rounded-full flex items-center gap-1">
                                        <Star className="w-4 h-4 fill-current" />
                                        最熱銷
                                    </span>
                                </div>
                            )}

                            {/* 方案名稱 */}
                            <h3 className="heading-md text-slate-900 mb-2 text-center">
                                {plan.name}
                            </h3>

                            {/* 價格 */}
                            <div className="text-center mb-6">
                                <span className="text-3xl md:text-4xl font-bold text-primary">
                                    {plan.price}
                                </span>
                                <span className="text-slate-500 ml-2">
                                    / {plan.priceNote}
                                </span>
                            </div>

                            {/* 功能列表 */}
                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feature, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                        <span className="text-slate-700">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA 按鈕 */}
                            <a
                                href={`tel:${CONTACT_INFO.phone}`}
                                className={`block text-center py-3 px-6 rounded-xl font-semibold transition-colors duration-200 ${plan.popular
                                        ? 'bg-cta hover:bg-cta-dark text-white'
                                        : 'bg-primary hover:bg-primary-dark text-white'
                                    }`}
                            >
                                {plan.ctaText}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Pricing;
