import { FEATURES } from '../constants';

export default function WhyUs() {
    return (
        <section className="py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-center text-gray-900 mb-8 md:mb-12 tracking-tight">
                    為什麼您的冷氣不冷又有異味？
                    <span className="block w-16 h-1 bg-gradient-to-r from-[#1565C0] to-[#2E7D32] mx-auto mt-4 rounded-full" />
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    {FEATURES.map((feature, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-2xl p-6 md:p-8 text-center shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
                        >
                            {/* Top accent bar on hover */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1565C0] to-[#2E7D32] opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="text-5xl md:text-6xl mb-4 md:mb-5 drop-shadow-sm">
                                {feature.icon}
                            </div>

                            <h3 className="text-lg md:text-xl font-bold text-[#1565C0] mb-2 md:mb-3 tracking-wide">
                                {feature.title}
                            </h3>

                            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                                {feature.description}
                                <strong className="text-gray-900 font-semibold">{feature.highlight}</strong>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
