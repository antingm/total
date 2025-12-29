import { Phone, MessageCircle, Clock } from 'lucide-react';
import { SITE_INFO, MAP_EMBED_URL } from '../constants';

export default function Contact() {
    const contactItems = [
        {
            icon: Phone,
            label: '免費客服專線',
            value: SITE_INFO.phone,
            href: `tel:${SITE_INFO.phone.replace(/-/g, '')}`,
        },
        {
            icon: MessageCircle,
            label: 'LINE 官方帳號',
            value: SITE_INFO.lineId,
            href: SITE_INFO.lineUrl,
        },
        {
            icon: Clock,
            label: '服務時間',
            value: SITE_INFO.serviceHours,
        },
    ];

    return (
        <section id="contact" className="py-12 md:py-20 bg-gradient-to-b from-gray-50 to-gray-100">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-center text-gray-900 mb-8 md:mb-12 tracking-tight">
                    服務範圍：{SITE_INFO.serviceArea}
                    <span className="block w-16 h-1 bg-gradient-to-r from-[#1565C0] to-[#2E7D32] mx-auto mt-4 rounded-full" />
                </h2>

                <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
                    {/* Contact Info */}
                    <div className="flex-1 flex flex-col gap-3 md:gap-4">
                        {contactItems.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-4 md:gap-5 p-4 md:p-5 bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-blue-100 transition-all duration-200 hover:translate-x-1"
                            >
                                <item.icon
                                    size={28}
                                    className="text-[#1565C0] flex-shrink-0"
                                />
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-sm text-gray-500 font-medium tracking-wide">
                                        {item.label}
                                    </span>
                                    {item.href ? (
                                        <a
                                            href={item.href}
                                            target={item.href.startsWith('http') ? '_blank' : undefined}
                                            rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                            className="text-lg md:text-xl font-bold text-[#1565C0] hover:text-[#0D47A1] hover:underline underline-offset-4 tracking-wide"
                                        >
                                            {item.value}
                                        </a>
                                    ) : (
                                        <span className="text-base md:text-lg font-bold text-[#1565C0] tracking-wide">
                                            {item.value}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Map */}
                    <div className="flex-1 rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                        <iframe
                            src={MAP_EMBED_URL}
                            width="100%"
                            height="280"
                            className="block md:h-[320px]"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="服務範圍地圖"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
