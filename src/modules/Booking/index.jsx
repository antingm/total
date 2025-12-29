import { BookingProvider, useBooking } from './BookingProvider';
import BookingWidget from './BookingWidget';

/**
 * BookingModule - 完整的預約系統解決方案
 * 
 * 使用方式：
 * 1. 作為獨立模組引入：<BookingModule services={[...]} stylists={[...]} />
 * 2. 或分開使用：<BookingProvider> + <BookingWidget /> + useBooking()
 */
export function BookingModule({
    title = "線上預約",
    services = [],
    stylists = [],
    onComplete
}) {
    return (
        <BookingProvider>
            <BookingWidget
                title={title}
                services={services}
                stylists={stylists}
                onComplete={onComplete}
            />
        </BookingProvider>
    );
}

// 統一導出
export { BookingProvider, useBooking } from './BookingProvider';
export { default as BookingWidget } from './BookingWidget';
export default BookingModule;
