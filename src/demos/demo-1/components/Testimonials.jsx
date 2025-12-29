import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../constants';

function Testimonials() {
    return (
        <section className="section-padding bg-white">
            <div className="max-w-6xl mx-auto">
                {/* 區塊標題 */}
                <div className="text-center mb-10 md:mb-14">
                    <h2 className="heading-lg text-slate-900 mb-3">
                        客戶真實好評
                    </h2>
                    <p className="text-slate-600 text-lg">
                        超過 5,000 位滿意客戶的肯定
                    </p>
                </div>

                {/* 見證卡片網格 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {TESTIMONIALS.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="bg-slate-50 rounded-2xl p-6 md:p-8"
                        >
                            {/* 星星評分 */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="w-5 h-5 text-yellow-400 fill-current"
                                    />
                                ))}
                            </div>

                            {/* 評語 */}
                            <p className="text-slate-700 leading-relaxed mb-6">
                                「{testimonial.comment}」
                            </p>

                            {/* 客戶資訊 */}
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                                    <span className="text-primary font-bold">
                                        {testimonial.name.charAt(0)}
                                    </span>
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-900">
                                        {testimonial.name}
                                    </p>
                                    <p className="text-sm text-slate-500">
                                        {testimonial.location}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Testimonials;
