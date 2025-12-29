import { Phone, MessageCircle } from 'lucide-react';
import { SITE_INFO } from '../constants';

export default function StickyFooter() {
    return (
        <footer className="fixed bottom-0 left-0 right-0 z-[1000] flex bg-white shadow-[0_-4px_24px_rgba(0,0,0,0.12)] border-t border-gray-100 lg:bottom-6 lg:left-1/2 lg:-translate-x-1/2 lg:right-auto lg:max-w-[420px] lg:rounded-full lg:border-0 lg:shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
            {/* LINE Button */}
            <a
                href={SITE_INFO.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 md:gap-3 min-h-[68px] md:min-h-[72px] lg:min-h-[60px] bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] hover:from-[#1B5E20] hover:to-[#145214] text-white text-base md:text-lg font-bold tracking-wide transition-all duration-200 relative overflow-hidden group"
            >
                <MessageCircle size={22} className="md:w-6 md:h-6" />
                <span>加 LINE 預約</span>

                {/* Ripple effect */}
                <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-0 h-0 bg-white/20 rounded-full group-active:w-[300px] group-active:h-[300px] transition-all duration-300" />
                </span>
            </a>

            {/* Phone Button */}
            <a
                href={`tel:${SITE_INFO.phone.replace(/-/g, '')}`}
                className="flex-1 flex items-center justify-center gap-2 md:gap-3 min-h-[68px] md:min-h-[72px] lg:min-h-[60px] bg-gradient-to-br from-[#1565C0] to-[#0D47A1] hover:from-[#0D47A1] hover:to-[#082F5A] text-white text-base md:text-lg font-bold tracking-wide transition-all duration-200 relative overflow-hidden group"
            >
                <Phone size={22} className="md:w-6 md:h-6" />
                <span>一鍵撥號</span>

                {/* Ripple effect */}
                <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-0 h-0 bg-white/20 rounded-full group-active:w-[300px] group-active:h-[300px] transition-all duration-300" />
                </span>
            </a>
        </footer>
    );
}
