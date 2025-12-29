import { useMemo, useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameDay, isSameMonth, isBefore } from 'date-fns';
import { CalendarDays, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { timeSlots, bookedSlots } from '../../data/mock';

const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

export default function TimeSelect() {
    const { booking, selectDate, selectTime } = useBooking();
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const today = new Date();

    // 生成月曆日期
    const calendarDays = useMemo(() => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const days = [];
        let day = startDate;
        while (day <= endDate) {
            days.push(day);
            day = addDays(day, 1);
        }
        return days;
    }, [currentMonth]);

    // 獲取當前選擇日期的已預約時段
    const bookedForDate = useMemo(() => {
        if (!booking.date) return [];
        const dateStr = format(booking.date, 'yyyy-MM-dd');
        return bookedSlots[dateStr] || [];
    }, [booking.date]);

    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

    // 判斷日期是否可選（今天及之後的 60 天）
    const isDateSelectable = (date) => {
        const maxDate = addDays(today, 60);
        return !isBefore(date, today) && isBefore(date, maxDate);
    };

    return (
        <div className="space-y-6">
            {/* 標題 */}
            <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">選擇時間</h3>
                <p className="text-sm text-gray-500">選擇您方便的日期與時段</p>
            </div>

            {/* 月曆 */}
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                {/* 月份標題 */}
                <div className="flex items-center justify-between mb-4">
                    <button
                        onClick={prevMonth}
                        className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                        <ChevronLeft size={20} className="text-gray-600" />
                    </button>
                    <h4 className="text-lg font-bold text-gray-800">
                        {currentMonth.getFullYear()}年 {currentMonth.getMonth() + 1}月
                    </h4>
                    <button
                        onClick={nextMonth}
                        className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                        <ChevronRight size={20} className="text-gray-600" />
                    </button>
                </div>

                {/* 星期標題 */}
                <div className="grid grid-cols-7 mb-2">
                    {weekDays.map((day, i) => (
                        <div
                            key={day}
                            className={`text-center text-xs font-medium py-2 ${i === 0 ? 'text-rose-400' : i === 6 ? 'text-rose-400' : 'text-gray-400'
                                }`}
                        >
                            {day}
                        </div>
                    ))}
                </div>

                {/* 日期格子 */}
                <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((date) => {
                        const isSelected = booking.date && isSameDay(booking.date, date);
                        const isToday = isSameDay(date, today);
                        const isCurrentMonth = isSameMonth(date, currentMonth);
                        const selectable = isDateSelectable(date);
                        const dayOfWeek = date.getDay();
                        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

                        return (
                            <button
                                key={date.toISOString()}
                                type="button"
                                onClick={() => selectable && selectDate(date)}
                                disabled={!selectable}
                                className={`relative aspect-square flex items-center justify-center rounded-xl text-sm font-medium transition-all ${!isCurrentMonth
                                        ? 'text-gray-200'
                                        : !selectable
                                            ? 'text-gray-300 cursor-not-allowed'
                                            : isSelected
                                                ? 'bg-gradient-to-br from-rose-400 to-rose-500 text-white shadow-md'
                                                : isToday
                                                    ? 'bg-rose-50 text-rose-600 font-bold'
                                                    : isWeekend
                                                        ? 'text-rose-400 hover:bg-rose-50'
                                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                {date.getDate()}
                                {isToday && !isSelected && (
                                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-rose-400" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* 時段選擇 */}
            {booking.date && (
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <Clock size={16} className="text-rose-400" />
                        <span className="text-sm font-medium text-gray-600">選擇時段</span>
                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                            {booking.date.getMonth() + 1}月{booking.date.getDate()}日
                        </span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        {timeSlots.map(time => {
                            const isBooked = bookedForDate.includes(time);
                            const isSelected = booking.time === time;

                            return (
                                <button
                                    key={time}
                                    type="button"
                                    onClick={() => !isBooked && selectTime(time)}
                                    disabled={isBooked}
                                    className={`py-3 rounded-xl text-sm font-medium transition-all ${isBooked
                                            ? 'bg-gray-100 text-gray-300 cursor-not-allowed line-through'
                                            : isSelected
                                                ? 'bg-gradient-to-br from-rose-400 to-rose-500 text-white shadow-md'
                                                : 'bg-white text-gray-700 border border-gray-100 hover:border-rose-200'
                                        }`}
                                >
                                    {time}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {!booking.date && (
                <div className="text-center py-6">
                    <p className="text-gray-400 text-sm">👆 請在日曆上選擇日期</p>
                </div>
            )}

            {/* 已選時間提示 */}
            {booking.date && booking.time && (
                <div className="bg-gradient-to-r from-rose-50 to-amber-50 rounded-xl p-3 border border-rose-100">
                    <p className="text-sm text-gray-600 text-center">
                        預約時間：
                        <span className="font-bold text-rose-600 ml-1">
                            {booking.date.getMonth() + 1}月{booking.date.getDate()}日 {booking.time}
                        </span>
                    </p>
                </div>
            )}
        </div>
    );
}
