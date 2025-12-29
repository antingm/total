import { motion } from 'framer-motion';
import { Check, Clock, Sparkles } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { services } from '../../data/mock';

export default function ServiceSelect() {
    const { booking, toggleService } = useBooking();

    const categories = [...new Set(services.map(s => s.category))];

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">選擇服務</h3>
                <p className="text-sm text-gray-500">可多選，我們將為您安排最佳服務</p>
            </div>

            {categories.map(category => (
                <div key={category}>
                    <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2 uppercase tracking-wider">
                        <Sparkles size={14} className="text-rose-300" />
                        {category}
                    </h3>

                    <div className="space-y-3">
                        {services
                            .filter(s => s.category === category)
                            .map((service) => {
                                const isSelected = booking.services.some(s => s.id === service.id);

                                return (
                                    <div
                                        key={service.id}
                                        role="button"
                                        tabIndex={0}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            toggleService(service);
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault();
                                                toggleService(service);
                                            }
                                        }}
                                        className={`w-full rounded-2xl p-4 flex items-center gap-4 transition-all duration-300 cursor-pointer select-none ${isSelected
                                                ? 'bg-gradient-to-r from-rose-50 to-amber-50'
                                                : 'bg-white hover:bg-gray-50 border border-gray-100'
                                            }`}
                                        style={{
                                            boxShadow: isSelected
                                                ? '0 8px 30px -10px rgba(225, 173, 172, 0.4), inset 0 0 0 2px #E1ADAC'
                                                : '0 2px 8px rgba(0,0,0,0.04)'
                                        }}
                                    >
                                        {/* 圖片 */}
                                        <div className="relative w-[72px] h-[72px] rounded-xl overflow-hidden flex-shrink-0 pointer-events-none">
                                            <img
                                                src={service.image}
                                                alt={service.title}
                                                className="w-full h-full object-cover"
                                                draggable={false}
                                            />
                                            {isSelected && (
                                                <div className="absolute inset-0 bg-rose-400/20 flex items-center justify-center">
                                                    <div className="w-6 h-6 rounded-full bg-rose-500 flex items-center justify-center">
                                                        <Check size={14} className="text-white" strokeWidth={3} />
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* 資訊 */}
                                        <div className="flex-1 text-left pointer-events-none">
                                            <h4 className={`font-semibold ${isSelected ? 'text-rose-700' : 'text-gray-800'}`}>
                                                {service.title}
                                            </h4>
                                            <p className="text-xs text-gray-500 mt-0.5">{service.description}</p>
                                            <div className="flex items-center gap-3 mt-2">
                                                <span className={`font-bold ${isSelected ? 'text-rose-600' : 'text-rose-400'}`}>
                                                    NT$ {service.price.toLocaleString()}
                                                </span>
                                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                                    <Clock size={12} />
                                                    {service.duration} 分鐘
                                                </span>
                                            </div>
                                        </div>

                                        {/* Checkbox */}
                                        <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 pointer-events-none ${isSelected
                                                ? 'bg-gradient-to-br from-rose-400 to-rose-500 shadow-md'
                                                : 'border-2 border-gray-200 bg-white'
                                            }`}>
                                            {isSelected && (
                                                <Check size={16} className="text-white" strokeWidth={3} />
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            ))}
        </div>
    );
}
