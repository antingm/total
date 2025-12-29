import { PROCESS_STEPS } from '../constants';

export default function Process() {
    return (
        <section className="py-12 md:py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-center text-gray-900 mb-8 md:mb-12 tracking-tight">
                    看得見的專業，4 步驟還原新機
                    <span className="block w-16 h-1 bg-gradient-to-r from-[#1565C0] to-[#2E7D32] mx-auto mt-4 rounded-full" />
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                    {PROCESS_STEPS.map((item) => (
                        <div
                            key={item.step}
                            className="group flex flex-row sm:flex-col items-start sm:items-center gap-4 sm:gap-0 p-5 md:p-6 bg-gray-50 hover:bg-white rounded-xl border-l-4 sm:border-l-0 sm:border-t-4 border-[#1565C0] hover:border-[#2E7D32] shadow-sm hover:shadow-md transition-all duration-300 hover:translate-x-2 sm:hover:translate-x-0 sm:hover:-translate-y-2"
                        >
                            <div className="flex-shrink-0 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center bg-gradient-to-br from-[#1565C0] to-[#0D47A1] text-white text-lg md:text-xl font-bold rounded-lg shadow-md sm:mb-4">
                                {item.step}
                            </div>

                            <div className="sm:text-center">
                                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1 md:mb-2 tracking-wide">
                                    {item.title}
                                </h3>
                                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
