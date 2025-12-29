import { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

/**
 * BookingProvider - 獨立的預約系統狀態管理
 * 可被任何 Demo 引用，無需重新實作邏輯
 * 
 * @param {Object} config - 配置選項
 * @param {Array} config.services - 可選服務列表
 * @param {Array} config.stylists - 設計師/服務人員列表
 */
export function BookingProvider({ children, config = {} }) {
    const [booking, setBooking] = useState({
        services: [],      // 已選服務 ID 列表
        stylist: null,     // 選擇的設計師
        date: null,        // 選擇的日期
        time: null,        // 選擇的時段
        step: 1,           // 當前步驟 (1-4)
        totalPrice: 0,     // 總價格
        totalDuration: 0   // 總時長
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // 切換服務選擇
    const toggleService = (service) => {
        setBooking(prev => {
            const isSelected = prev.services.some(s => s.id === service.id);
            let newServices;

            if (isSelected) {
                newServices = prev.services.filter(s => s.id !== service.id);
            } else {
                newServices = [...prev.services, service];
            }

            const totalPrice = newServices.reduce((sum, s) => sum + s.price, 0);
            const totalDuration = newServices.reduce((sum, s) => sum + (s.duration || 0), 0);

            return {
                ...prev,
                services: newServices,
                totalPrice,
                totalDuration
            };
        });
    };

    // 選擇設計師
    const selectStylist = (stylist) => {
        setBooking(prev => ({ ...prev, stylist }));
    };

    // 選擇日期
    const selectDate = (date) => {
        setBooking(prev => ({ ...prev, date, time: null }));
    };

    // 選擇時間
    const selectTime = (time) => {
        setBooking(prev => ({ ...prev, time }));
    };

    // 設置步驟
    const setStep = (step) => {
        setBooking(prev => ({ ...prev, step }));
    };

    // 下一步
    const nextStep = () => {
        setBooking(prev => ({ ...prev, step: Math.min(prev.step + 1, 4) }));
    };

    // 上一步
    const prevStep = () => {
        setBooking(prev => ({ ...prev, step: Math.max(prev.step - 1, 1) }));
    };

    // 提交預約
    const submitBooking = async (onSuccess, onError) => {
        setIsSubmitting(true);

        try {
            // 模擬 API 請求
            await new Promise(resolve => setTimeout(resolve, 2000));
            setIsSubmitting(false);
            setIsSuccess(true);
            onSuccess?.({
                services: booking.services,
                stylist: booking.stylist,
                date: booking.date,
                time: booking.time,
                totalPrice: booking.totalPrice
            });
        } catch (error) {
            setIsSubmitting(false);
            onError?.(error.message);
        }
    };

    // 重置預約
    const resetBooking = () => {
        setBooking({
            services: [],
            stylist: null,
            date: null,
            time: null,
            step: 1,
            totalPrice: 0,
            totalDuration: 0
        });
        setIsSubmitting(false);
        setIsSuccess(false);
    };

    // 檢查是否可以進入下一步
    const canProceed = () => {
        switch (booking.step) {
            case 1:
                return booking.services.length > 0;
            case 2:
                return booking.stylist !== null;
            case 3:
                return booking.date !== null && booking.time !== null;
            case 4:
                return true;
            default:
                return false;
        }
    };

    const value = {
        booking,
        config,
        isSubmitting,
        isSuccess,
        toggleService,
        selectStylist,
        selectDate,
        selectTime,
        setStep,
        nextStep,
        prevStep,
        submitBooking,
        resetBooking,
        canProceed
    };

    return (
        <BookingContext.Provider value={value}>
            {children}
        </BookingContext.Provider>
    );
}

export function useBooking() {
    const context = useContext(BookingContext);
    if (!context) {
        throw new Error('useBooking must be used within a BookingProvider');
    }
    return context;
}

export default BookingProvider;
