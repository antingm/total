import { Star, Check } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { stylists } from '../../data/mock';

export default function StylistSelect() {
    const { booking, selectStylist } = useBooking();

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">選擇設計師</h3>
                <p className="text-sm text-gray-500">選擇您喜愛的專業設計師</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stylists.map((stylist) => {
                    const isSelected = booking.stylist?.id === stylist.id;

                    return (
                        <div
                            key={stylist.id}
                            role="button"
                            tabIndex={0}
                            onClick={() => selectStylist(stylist)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    selectStylist(stylist);
                                }
                            }}
                            className={`relative cursor-pointer overflow-hidden rounded-2xl p-5 text-center transition-all duration-300 select-none ${isSelected
                                    ? 'bg-gradient-to-br from-rose-50 to-rose-100 shadow-lg'
                                    : 'bg-white hover:bg-gray-50 border border-gray-100 shadow-sm'
                                }`}
                            style={{
                                boxShadow: isSelected
                                    ? '0 10px 40px -10px rgba(225, 173, 172, 0.5), inset 0 0 0 2px #E1ADAC'
                                    : undefined
                            }}
                        >
                            {/* 選中標記 */}
                            {isSelected && (
                                <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-gradient-to-br from-rose-400 to-rose-500 flex items-center justify-center shadow-md z-10">
                                    <Check size={16} className="text-white" strokeWidth={3} />
                                </div>
                            )}

                            {/* 首字母頭像 */}
                            <div className="relative w-20 h-20 mx-auto mb-4">
                                <div
                                    className={`w-full h-full rounded-full flex items-center justify-center bg-gradient-to-br ${stylist.color} shadow-lg`}
                                    style={{
                                        boxShadow: isSelected
                                            ? '0 8px 30px -5px rgba(225, 173, 172, 0.6)'
                                            : '0 4px 15px -3px rgba(0, 0, 0, 0.15)'
                                    }}
                                >
                                    <span className="text-2xl font-bold text-white">{stylist.initial}</span>
                                </div>

                                {/* 評分徽章 */}
                                <div className="absolute -bottom-1 -right-1 bg-white rounded-full px-2 py-1 shadow-md flex items-center gap-1">
                                    <Star size={12} className="text-amber-400 fill-amber-400" />
                                    <span className="text-xs font-bold text-gray-700">{stylist.rating}</span>
                                </div>
                            </div>

                            {/* 資訊 */}
                            <h3 className={`font-semibold text-base ${isSelected ? 'text-rose-700' : 'text-gray-800'}`}>
                                {stylist.name}
                            </h3>
                            <div className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${isSelected ? 'bg-rose-200/50 text-rose-700' : 'bg-gray-100 text-gray-600'
                                }`}>
                                {stylist.expertise}
                            </div>
                            <p className="text-xs text-gray-400 mt-2">{stylist.bio}</p>
                        </div>
                    );
                })}
            </div>

            {/* 選擇提示 */}
            {booking.stylist && (
                <div className="bg-gradient-to-r from-rose-50 to-amber-50 rounded-2xl p-4 flex items-center gap-4 border border-rose-100">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br ${booking.stylist.color} shadow-md`}>
                        <span className="text-xl font-bold text-white">{booking.stylist.initial}</span>
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-800">
                            已選擇 <span className="text-rose-600">{booking.stylist.name}</span>
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">{booking.stylist.expertise} · {booking.stylist.experience}經驗</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                        <Check size={18} className="text-white" strokeWidth={3} />
                    </div>
                </div>
            )}
        </div>
    );
}
