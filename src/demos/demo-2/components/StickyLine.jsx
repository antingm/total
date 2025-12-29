import { MessageCircle } from 'lucide-react';
import { BRAND } from '../constants';

function StickyLine() {
    return (
        <div className="sticky-line">
            <a
                href={BRAND.lineUrl}
                className="sticky-line-btn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LINE 線上諮詢"
            >
                <MessageCircle size={28} />
            </a>
        </div>
    );
}

export default StickyLine;
