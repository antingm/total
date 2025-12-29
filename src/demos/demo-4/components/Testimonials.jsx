import { TESTIMONIALS } from '../constants';

export default function Testimonials() {
    return (
        <section className="py-12 md:py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-center text-gray-900 mb-8 md:mb-12 tracking-tight">
                    客戶真實好評
                    <span className="block w-16 h-1 bg-gradient-to-r from-[#1565C0] to-[#2E7D32] mx-auto mt-4 rounded-full" />
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                    {TESTIMONIALS.map((item, index) => (
                        <div
                            key={index}
                            className="group relative bg-gray-50 hover:bg-white rounded-2xl p-5 md:p-7 shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 hover:-translate-y-1"
                        >
                            {/* Quote decoration */}
                            <span className="absolute top-3 right-5 text-6xl md:text-7xl text-blue-100 font-serif leading-none select-none">
                                "
                            </span>

                            {/* Stars */}
                            <div className="text-base md:text-lg mb-3 md:mb-4 tracking-widest">
                                {'⭐'.repeat(item.stars)}
                            </div>

                            {/* Quote text */}
                            <p className="relative z-10 text-sm md:text-base text-gray-700 leading-relaxed mb-4 md:mb-5 italic">
                                「{item.text}」
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-2 pt-3 md:pt-4 border-t border-gray-200 text-sm">
                                <span className="text-gray-500 font-medium">{item.location}</span>
                                <span className="font-bold text-[#1565C0]">{item.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
