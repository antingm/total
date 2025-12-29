import { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, Sparkles } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import ServiceSelect from '../components/booking/ServiceSelect';
import StylistSelect from '../components/booking/StylistSelect';
import TimeSelect from '../components/booking/TimeSelect';
import Confirmation from '../components/booking/Confirmation';
import LoadingScreen from '../components/ui/LoadingScreen';

const steps = [
    { id: 1, title: '服務' },
    { id: 2, title: '設計師' },
    { id: 3, title: '時間' },
    { id: 4, title: '確認' }
];

export default function Booking() {
    const {
        booking,
        isSubmitting,
        isSuccess,
        nextStep,
        prevStep,
        submitBooking,
        canProceed,
        resetBooking
    } = useBooking();

    const renderStep = useCallback(() => {
        switch (booking.step) {
            case 1: return <ServiceSelect />;
            case 2: return <StylistSelect />;
            case 3: return <TimeSelect />;
            case 4: return <Confirmation />;
            default: return null;
        }
    }, [booking.step]);

    const handleNext = () => {
        if (booking.step === 4) {
            submitBooking();
        } else {
            nextStep();
        }
    };

    const handleComplete = useCallback(() => {
        resetBooking();
    }, [resetBooking]);

    const isNextDisabled = !canProceed();

    return (
        <>
            <LoadingScreen
                isLoading={isSubmitting}
                isSuccess={isSuccess}
                onComplete={handleComplete}
            />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-screen bg-white"
            >
                {/* 電腦版佈局 */}
                <div className="hidden lg:block max-w-4xl mx-auto px-6 py-12">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">線上預約</h1>
                        <p className="text-gray-500">輕鬆四步驟，完成您的美甲預約</p>
                    </div>

                    <div className="relative mb-12">
                        <div className="absolute top-5 left-16 right-16 h-1 bg-gray-200 rounded-full" />
                        <motion.div
                            className="absolute top-5 left-16 h-1 bg-gradient-to-r from-rose-400 to-rose-500 rounded-full"
                            animate={{ width: `${Math.max(0, (booking.step - 1) / 3 * 100)}%` }}
                            style={{ maxWidth: 'calc(100% - 128px)' }}
                        />
                        <div className="relative flex justify-between">
                            {steps.map((step) => (
                                <div key={step.id} className="flex flex-col items-center">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold z-10 ${booking.step > step.id ? 'bg-green-500 text-white' :
                                            booking.step === step.id ? 'bg-rose-500 text-white shadow-lg' :
                                                'bg-white border-2 border-gray-200 text-gray-400'
                                        }`}>
                                        {booking.step > step.id ? <Check size={18} /> : step.id}
                                    </div>
                                    <span className={`text-sm mt-3 font-medium ${booking.step === step.id ? 'text-rose-600' :
                                            booking.step > step.id ? 'text-green-600' : 'text-gray-400'
                                        }`}>{step.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-3xl p-8 mb-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={booking.step}
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                            >
                                {renderStep()}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            {booking.step > 1 && (
                                <button onClick={prevStep} className="flex items-center gap-2 px-6 py-3 rounded-xl text-gray-600 hover:bg-gray-100">
                                    <ChevronLeft size={20} /> 上一步
                                </button>
                            )}
                        </div>
                        <div className="flex items-center gap-4">
                            {booking.step === 1 && booking.services.length > 0 && (
                                <div className="text-right">
                                    <p className="text-sm text-gray-500">已選 {booking.services.length} 項</p>
                                    <p className="text-xl font-bold text-rose-600">NT$ {booking.totalPrice.toLocaleString()}</p>
                                </div>
                            )}
                            <button
                                onClick={handleNext}
                                disabled={isNextDisabled}
                                className={`px-8 py-3 rounded-xl flex items-center gap-2 font-bold text-white ${!isNextDisabled ? 'bg-gradient-to-r from-rose-400 to-rose-500 shadow-lg' : 'bg-gray-200 text-gray-400'
                                    }`}
                            >
                                {booking.step === 4 ? <><Sparkles size={18} /> 確認預約</> : <>下一步 <ChevronRight size={18} /></>}
                            </button>
                        </div>
                    </div>
                </div>

                {/* 手機版佈局 */}
                <div className="lg:hidden">
                    <header className="sticky top-0 bg-white z-40 px-4 pt-6 pb-4 border-b border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h1 className="text-xl font-bold text-gray-800">預約服務</h1>
                                <p className="text-xs text-gray-400">LUNA Fashion Nail</p>
                            </div>
                            <div className="bg-rose-50 px-3 py-1.5 rounded-full">
                                <span className="text-sm font-bold text-rose-600">{booking.step}/4</span>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute top-4 left-6 right-6 h-0.5 bg-gray-200" />
                            <motion.div
                                className="absolute top-4 left-6 h-0.5 bg-rose-500"
                                animate={{ width: `${(booking.step - 1) / 3 * 100}%` }}
                                style={{ maxWidth: 'calc(100% - 48px)' }}
                            />
                            <div className="relative flex justify-between">
                                {steps.map((step) => (
                                    <div key={step.id} className="flex flex-col items-center">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${booking.step > step.id ? 'bg-green-500 text-white' :
                                                booking.step === step.id ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-400'
                                            }`}>
                                            {booking.step > step.id ? <Check size={14} /> : step.id}
                                        </div>
                                        <span className={`text-[10px] mt-1.5 font-medium ${booking.step === step.id ? 'text-rose-600' :
                                                booking.step > step.id ? 'text-green-600' : 'text-gray-400'
                                            }`}>{step.title}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </header>

                    <div className="px-4 py-6 pb-48">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={booking.step}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                {renderStep()}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
                        {booking.step === 1 && booking.services.length > 0 && (
                            <div className="flex items-center justify-between mb-3 px-2 py-2 bg-rose-50 rounded-xl">
                                <span className="text-sm text-gray-600">已選 <b className="text-rose-600">{booking.services.length}</b> 項</span>
                                <span className="text-lg font-bold text-rose-600">NT$ {booking.totalPrice.toLocaleString()}</span>
                            </div>
                        )}

                        <div className="flex gap-3">
                            {booking.step > 1 && (
                                <button
                                    onClick={prevStep}
                                    className="px-5 py-4 rounded-xl text-gray-600 bg-gray-100 font-semibold flex items-center gap-1"
                                >
                                    <ChevronLeft size={18} /> 返回
                                </button>
                            )}

                            <button
                                onClick={handleNext}
                                disabled={isNextDisabled}
                                className={`flex-1 py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 ${!isNextDisabled
                                        ? 'bg-gradient-to-r from-rose-400 to-rose-500 shadow-lg'
                                        : 'bg-gray-300 text-gray-500'
                                    }`}
                            >
                                {booking.step === 4 ? (
                                    <><Sparkles size={18} /> 確認預約</>
                                ) : (
                                    <>下一步 <ChevronRight size={18} /></>
                                )}
                            </button>
                        </div>

                        <div className="h-[env(safe-area-inset-bottom)]" />
                    </div>
                </div>
            </motion.div>
        </>
    );
}
