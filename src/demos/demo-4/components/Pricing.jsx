import { PRICING, DISCOUNT } from '../constants';

export default function Pricing() {
    const formatPrice = (price) => {
        return price.toLocaleString('zh-TW');
    };

    return (
        <section className="py-12 md:py-20 bg-gradient-to-b from-gray-50 to-gray-100">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-center text-gray-900 mb-8 md:mb-12 tracking-tight">
                    價格透明，絕無現場加價
                    <span className="block w-16 h-1 bg-gradient-to-r from-[#1565C0] to-[#2E7D32] mx-auto mt-4 rounded-full" />
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-2xl mx-auto mb-6 md:mb-8">
                    {PRICING.map((item, index) => (
                        <div
                            key={index}
                            className={`relative bg-white rounded-2xl p-6 md:p-8 text-center shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 ${item.featured
                                    ? 'border-[#1565C0] shadow-lg shadow-blue-100'
                                    : 'border-gray-100 hover:border-gray-200'
                                }`}
                        >
                            {/* Badge */}
                            {item.badge && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-[#1565C0] to-[#0D47A1] text-white text-xs font-bold rounded-full shadow-md tracking-wider">
                                    {item.badge}
                                </div>
                            )}

                            <div className="text-base md:text-lg font-semibold text-gray-600 mb-2 md:mb-3 tracking-wide">
                                {item.type}
                            </div>

                            <div className="flex items-baseline justify-center gap-1 mb-2 md:mb-3">
                                <span className="text-base md:text-lg font-semibold text-[#1565C0]">NT$</span>
                                <span className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1565C0] tracking-tight">
                                    {formatPrice(item.price)}
                                </span>
                                <span className="text-sm md:text-base text-gray-500 font-medium">/ 台</span>
                            </div>

                            <p className="text-sm text-gray-500 mt-1">
                                {item.note}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Discount Banner */}
                <div className="flex items-center justify-center gap-2 md:gap-3 px-5 md:px-6 py-4 md:py-5 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-400 rounded-xl max-w-md mx-auto">
                    <span className="text-2xl md:text-3xl">🎉</span>
                    <span className="text-base md:text-lg font-semibold text-amber-800 tracking-wide">
                        {DISCOUNT.text} <strong className="text-amber-600">{DISCOUNT.highlight}</strong> {DISCOUNT.suffix}
                    </span>
                </div>
            </div>
        </section>
    );
}
