import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { CheckCircle2, FileText, Code, TestTube, Rocket } from 'lucide-react';

const Process = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const steps = [
        {
            icon: CheckCircle2,
            title: "諮詢與下訂",
            description: "確認您需要的版型與功能，支付 50% 訂金開始專案",
            color: "from-blue-500 to-cyan-500",
        },
        {
            icon: FileText,
            title: "資料提供",
            description: "提供 Logo、照片、文案（我們有簡單表格協助您整理）",
            color: "from-cyan-500 to-teal-500",
        },
        {
            icon: Code,
            title: "快速建置",
            description: "使用高效能架構開發，3~7 天完成初稿",
            color: "from-teal-500 to-green-500",
        },
        {
            icon: TestTube,
            title: "校對與驗收",
            description: "確認網頁內容無誤，支付 50% 尾款",
            color: "from-green-500 to-lime-500",
        },
        {
            icon: Rocket,
            title: "正式上線",
            description: "綁定專屬網址，網站正式對外公開！",
            color: "from-lime-500 to-yellow-500",
        },
    ];

    return (
        <section id="process" className="section-padding bg-bg-primary relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-grid opacity-10" />
            <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full filter blur-3xl" />

            <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="heading-lg text-white mb-4">
                        合作流程
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        5 個簡單步驟，讓您的網站快速上線
                    </p>
                </motion.div>

                {/* Process Steps */}
                <div className="grid md:grid-cols-5 gap-6">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="relative"
                            >
                                {/* Connector Line (except last item) */}
                                {index < steps.length - 1 && (
                                    <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-slate-700 to-transparent" />
                                )}

                                {/* Step Card */}
                                <div className="card text-center relative">
                                    {/* Step Number */}
                                    <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-slate-900 font-bold text-sm shadow-lg`}>
                                        {index + 1}
                                    </div>

                                    {/* Icon */}
                                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${step.color} p-0.5`}>
                                        <div className="w-full h-full rounded-2xl bg-slate-800 flex items-center justify-center">
                                            <Icon className="w-8 h-8 text-white" />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-lg font-bold text-white mb-2">
                                        {step.title}
                                    </h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom Note */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-12 p-6 rounded-2xl bg-primary/5 border border-primary/20"
                >
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                            <CheckCircle2 className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-2">💡 設計師的小提醒</h4>
                            <div className="text-slate-400 text-sm space-y-2">
                                <p>
                                    <strong className="text-slate-300">關於流量：</strong> 我們使用 Google 頂級雲端服務（Firebase），基本上能承受極高流量。但若您的生意太好（例如瞬間幾萬人湧入），Google 產生的額外流量費將由您實支實付（我們會提供帳單證明，絕不溢收）。
                                </p>
                                <p>
                                    <strong className="text-slate-300">關於修改：</strong> 專案開始後，若要大幅度更改設計結構（例如：原本說要紅色系，做到一半改成黑色系），可能會產生額外的修改費用。
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Process;
