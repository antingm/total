import { Phone, MessageCircle } from 'lucide-react';
import { SITE_INFO } from '../constants';

export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 py-3 md:py-4 transition-shadow hover:shadow-sm">
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2 md:gap-3">
                    <span className="text-2xl md:text-3xl drop-shadow-sm">❄️</span>
                    <span className="text-base md:text-lg font-bold text-[#1565C0] tracking-wide">
                        {SITE_INFO.name}
                    </span>
                </div>

                {/* Phone Button */}
                <a
                    href={`tel:${SITE_INFO.phone.replace(/-/g, '')}`}
                    className="flex items-center gap-2 min-h-[44px] px-4 md:px-5 py-2 bg-blue-50 hover:bg-[#1565C0] rounded-full font-semibold text-sm md:text-base text-[#1565C0] hover:text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
                >
                    <Phone size={18} />
                    <span className="hidden sm:inline">{SITE_INFO.phone}</span>
                </a>
            </div>
        </header>
    );
}
