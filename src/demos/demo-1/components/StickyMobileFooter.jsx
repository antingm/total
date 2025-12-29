import { Phone, MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

function StickyMobileFooter() {
    return (
        <div className="block md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-50">
            <div className="flex">
                {/* 撥打電話按鈕 */}
                <a
                    href={`tel:${CONTACT_INFO.phone}`}
                    className="flex-1 flex items-center justify-center gap-2 py-4 bg-primary text-white font-bold"
                >
                    <Phone className="w-5 h-5" />
                    <span>撥打電話</span>
                </a>

                {/* Line 預約按鈕 */}
                <a
                    href={CONTACT_INFO.lineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#06C755] text-white font-bold"
                >
                    <MessageCircle className="w-5 h-5" />
                    <span>加 Line 預約</span>
                </a>
            </div>
        </div>
    );
}

export default StickyMobileFooter;
