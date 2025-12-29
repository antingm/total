import { Clock, Wind, Home } from 'lucide-react';
import { PAIN_POINTS } from '../constants';

const iconMap = {
    Clock: Clock,
    Wind: Wind,
    Home: Home,
};

function PainPoints() {
    return (
        <section className="section-padding bg-white">
            <div className="max-w-6xl mx-auto">
                {/* 區塊標題 */}
                <div className="text-center mb-10 md:mb-14">
                    <h2 className="heading-lg text-slate-900 mb-3">
                        您是否也有這些困擾？
                    </h2>
                    <p className="text-slate-600 text-lg">
                        讓我們幫您解決，享受真正的放鬆時光
                    </p>
                </div>

                {/* 痛點卡片 - Mobile 單欄，Tablet+ 三欄 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {PAIN_POINTS.map((item) => {
                        const IconComponent = iconMap[item.icon];
                        return (
                            <div
                                key={item.id}
                                className="bg-slate-50 rounded-2xl p-6 md:p-8 text-center"
                            >
                                {/* 圖標 */}
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5">
                                    <IconComponent className="w-8 h-8 text-primary" />
                                </div>

                                {/* 痛點標題 */}
                                <h3 className="heading-md text-slate-900 mb-3">
                                    {item.title}
                                </h3>

                                {/* 解決方案描述 */}
                                <p className="text-slate-600 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default PainPoints;
