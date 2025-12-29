import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, Sparkles, Calendar, User, Clock, CheckCircle } from 'lucide-react';
import { useBooking } from './BookingProvider';
import { getThemeVars } from '../../utils/themeUtils';

/**
 * BookingWidget - 精簡版預約入口組件
 * 提供基本的預約流程 UI，可在任何 Demo 中使用
 * 支援深淺主題（透過 CSS 變數自動適應）
 * 支援動態主題色彩（透過 configStyle.theme）
 */
export default function BookingWidget({
    title = "線上預約",
    services = [],
    stylists = [],
    primaryColor = 'rose',
    configStyle = {},
    onComplete
}) {
    // 根據 configStyle.theme 取得對應的主題色
    const themeVars = getThemeVars(configStyle?.theme || primaryColor);

    const {
        booking,
        isSubmitting,
        isSuccess,
        toggleService,
        selectStylist,
        selectDate,
        selectTime,
        nextStep,
        prevStep,
        submitBooking,
        canProceed,
        resetBooking
    } = useBooking();

    const steps = [
        { id: 1, title: '服務', icon: Sparkles },
        { id: 2, title: '人員', icon: User },
        { id: 3, title: '時間', icon: Clock },
        { id: 4, title: '確認', icon: CheckCircle }
    ];

    const handleNext = () => {
        if (booking.step === 4) {
            submitBooking(
                (data) => {
                    onComplete?.(data);
                },
                (error) => console.error(error)
            );
        } else {
            nextStep();
        }
    };

    const handleReset = () => {
        resetBooking();
    };

    // 生成未來 7 天的日期選項
    const generateDateOptions = () => {
        const dates = [];
        const today = new Date();
        for (let i = 1; i <= 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            dates.push({
                value: date.toISOString().split('T')[0],
                label: `${date.getMonth() + 1}/${date.getDate()} (${['日', '一', '二', '三', '四', '五', '六'][date.getDay()]})`
            });
        }
        return dates;
    };

    // 生成時段選項
    const timeSlots = [
        '10:00', '10:30', '11:00', '11:30',
        '14:00', '14:30', '15:00', '15:30',
        '16:00', '16:30', '17:00'
    ];

    if (isSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-3xl text-center"
                style={{
                    background: 'var(--module-success-bg)',
                    border: '1px solid var(--module-success)'
                }}
            >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'var(--module-success)' }}>
                    <Check className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--module-success)' }}>預約成功！</h3>
                <p className="mb-6" style={{ color: 'var(--module-text-muted)' }}>我們已收到您的預約請求，將盡快與您確認。</p>
                <button
                    onClick={handleReset}
                    className="px-6 py-3 text-white rounded-xl font-bold transition-colors"
                    style={{ backgroundColor: 'var(--module-success)' }}
                >
                    重新預約
                </button>
            </motion.div>
        );
    }

    return (
        <div className="p-6 rounded-3xl"
            style={{
                backgroundColor: 'var(--module-bg)',
                border: '1px solid var(--module-border)',
                // 動態覆蓋主題強調色 CSS 變數
                '--module-accent': themeVars.accent,
                '--module-accent-bg': themeVars.accentBg
            }}>
            {/* 標題 */}
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold" style={{ color: 'var(--module-text)' }}>{title}</h2>
                <p className="text-sm mt-1" style={{ color: 'var(--module-text-muted)' }}>輕鬆四步驟，完成您的預約</p>
            </div>

            {/* 步驟指示器 */}
            <div className="flex justify-between mb-8 px-4">
                {steps.map((step) => {
                    const Icon = step.icon;
                    const isCompleted = booking.step > step.id;
                    const isCurrent = booking.step === step.id;

                    return (
                        <div key={step.id} className="flex flex-col items-center">
                            <div
                                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all"
                                style={{
                                    backgroundColor: isCompleted
                                        ? 'var(--module-success)'
                                        : isCurrent
                                            ? 'var(--module-accent)'
                                            : 'var(--module-bg-subtle)',
                                    color: isCompleted || isCurrent
                                        ? 'white'
                                        : 'var(--module-text-muted)'
                                }}
                            >
                                {isCompleted ? <Check size={18} /> : <Icon size={18} />}
                            </div>
                            <span
                                className="text-xs mt-2 font-medium"
                                style={{
                                    color: isCompleted
                                        ? 'var(--module-success)'
                                        : isCurrent
                                            ? 'var(--module-accent)'
                                            : 'var(--module-text-muted)'
                                }}
                            >
                                {step.title}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* 內容區 */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={booking.step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="min-h-[200px]"
                >
                    {/* 步驟 1：選擇服務 */}
                    {booking.step === 1 && (
                        <div className="space-y-3">
                            <h3 className="font-bold mb-4" style={{ color: 'var(--module-text)' }}>請選擇服務項目</h3>
                            {services.length > 0 ? services.map((service) => (
                                <button
                                    key={service.id}
                                    onClick={() => toggleService(service)}
                                    className="w-full p-4 rounded-xl border-2 text-left transition-all"
                                    style={{
                                        borderColor: booking.services.some(s => s.id === service.id)
                                            ? 'var(--module-accent)'
                                            : 'var(--module-border)',
                                        backgroundColor: booking.services.some(s => s.id === service.id)
                                            ? 'var(--module-accent-bg)'
                                            : 'transparent'
                                    }}
                                >
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium" style={{ color: 'var(--module-text)' }}>{service.name}</span>
                                        <span className="font-bold" style={{ color: 'var(--module-accent)' }}>NT$ {service.price}</span>
                                    </div>
                                    {service.duration && (
                                        <span className="text-sm" style={{ color: 'var(--module-text-muted)' }}>約 {service.duration} 分鐘</span>
                                    )}
                                </button>
                            )) : (
                                <p className="text-center py-8" style={{ color: 'var(--module-text-muted)' }}>請設定服務項目</p>
                            )}
                        </div>
                    )}

                    {/* 步驟 2：選擇人員 */}
                    {booking.step === 2 && (
                        <div className="space-y-3">
                            <h3 className="font-bold mb-4" style={{ color: 'var(--module-text)' }}>請選擇服務人員</h3>
                            {stylists.length > 0 ? stylists.map((stylist) => (
                                <button
                                    key={stylist.id}
                                    onClick={() => selectStylist(stylist)}
                                    className="w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-4"
                                    style={{
                                        borderColor: booking.stylist?.id === stylist.id
                                            ? 'var(--module-accent)'
                                            : 'var(--module-border)',
                                        backgroundColor: booking.stylist?.id === stylist.id
                                            ? 'var(--module-accent-bg)'
                                            : 'transparent'
                                    }}
                                >
                                    {stylist.avatar && (
                                        <img src={stylist.avatar} alt={stylist.name} className="w-12 h-12 rounded-full object-cover" />
                                    )}
                                    <div>
                                        <span className="font-medium" style={{ color: 'var(--module-text)' }}>{stylist.name}</span>
                                        {stylist.title && <p className="text-sm" style={{ color: 'var(--module-text-muted)' }}>{stylist.title}</p>}
                                    </div>
                                </button>
                            )) : (
                                <p className="text-center py-8" style={{ color: 'var(--module-text-muted)' }}>請設定服務人員</p>
                            )}
                        </div>
                    )}

                    {/* 步驟 3：選擇時間 */}
                    {booking.step === 3 && (
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-bold mb-3" style={{ color: 'var(--module-text)' }}>選擇日期</h3>
                                <div className="grid grid-cols-4 gap-2">
                                    {generateDateOptions().map((date) => (
                                        <button
                                            key={date.value}
                                            onClick={() => selectDate(date.value)}
                                            className="p-3 rounded-xl text-sm font-medium transition-all"
                                            style={{
                                                backgroundColor: booking.date === date.value
                                                    ? 'var(--module-accent)'
                                                    : 'var(--module-bg-subtle)',
                                                color: booking.date === date.value
                                                    ? 'white'
                                                    : 'var(--module-text)'
                                            }}
                                        >
                                            {date.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            {booking.date && (
                                <div>
                                    <h3 className="font-bold mb-3" style={{ color: 'var(--module-text)' }}>選擇時段</h3>
                                    <div className="grid grid-cols-4 gap-2">
                                        {timeSlots.map((time) => (
                                            <button
                                                key={time}
                                                onClick={() => selectTime(time)}
                                                className="p-3 rounded-xl text-sm font-medium transition-all"
                                                style={{
                                                    backgroundColor: booking.time === time
                                                        ? 'var(--module-accent)'
                                                        : 'var(--module-bg-subtle)',
                                                    color: booking.time === time
                                                        ? 'white'
                                                        : 'var(--module-text)'
                                                }}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* 步驟 4：確認 */}
                    {booking.step === 4 && (
                        <div className="space-y-4">
                            <h3 className="font-bold mb-4" style={{ color: 'var(--module-text)' }}>確認預約資訊</h3>
                            <div className="rounded-xl p-4 space-y-3" style={{ backgroundColor: 'var(--module-bg-subtle)' }}>
                                <div className="flex justify-between">
                                    <span style={{ color: 'var(--module-text-muted)' }}>服務項目</span>
                                    <span className="font-medium" style={{ color: 'var(--module-text)' }}>{booking.services.map(s => s.name).join(', ')}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span style={{ color: 'var(--module-text-muted)' }}>服務人員</span>
                                    <span className="font-medium" style={{ color: 'var(--module-text)' }}>{booking.stylist?.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span style={{ color: 'var(--module-text-muted)' }}>預約時間</span>
                                    <span className="font-medium" style={{ color: 'var(--module-text)' }}>{booking.date} {booking.time}</span>
                                </div>
                                <div className="border-t pt-3 flex justify-between" style={{ borderColor: 'var(--module-border)' }}>
                                    <span className="font-bold" style={{ color: 'var(--module-text)' }}>總金額</span>
                                    <span className="font-bold text-xl" style={{ color: 'var(--module-accent)' }}>NT$ {booking.totalPrice.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* 底部操作區 */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t" style={{ borderColor: 'var(--module-border)' }}>
                <div>
                    {booking.step > 1 && (
                        <button
                            onClick={prevStep}
                            className="flex items-center gap-1 px-4 py-2 rounded-lg transition-colors"
                            style={{ color: 'var(--module-text-muted)' }}
                        >
                            <ChevronLeft size={18} /> 上一步
                        </button>
                    )}
                </div>
                <div className="flex items-center gap-4">
                    {booking.step === 1 && booking.services.length > 0 && (
                        <div className="text-right">
                            <p className="text-sm" style={{ color: 'var(--module-text-muted)' }}>已選 {booking.services.length} 項</p>
                            <p className="font-bold" style={{ color: 'var(--module-accent)' }}>NT$ {booking.totalPrice.toLocaleString()}</p>
                        </div>
                    )}
                    <button
                        onClick={handleNext}
                        disabled={!canProceed() || isSubmitting}
                        className="px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all"
                        style={{
                            background: canProceed() && !isSubmitting
                                ? 'linear-gradient(to right, var(--module-accent), var(--module-accent))'
                                : 'var(--module-bg-subtle)',
                            color: canProceed() && !isSubmitting
                                ? 'white'
                                : 'var(--module-text-muted)',
                            cursor: canProceed() && !isSubmitting ? 'pointer' : 'not-allowed',
                            boxShadow: canProceed() && !isSubmitting ? '0 4px 14px 0 rgba(0,0,0,0.2)' : 'none'
                        }}
                    >
                        {isSubmitting ? (
                            <span className="animate-pulse">處理中...</span>
                        ) : booking.step === 4 ? (
                            <><Sparkles size={18} /> 確認預約</>
                        ) : (
                            <>下一步 <ChevronRight size={18} /></>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
