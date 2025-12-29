import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { diagnosisQuestions } from "../constants";

const DiagnosisSystem = ({ onComplete, onBack }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [scores, setScores] = useState({ A: 0, B: 0, C: 0, D: 0 });

    const currentQuestion = diagnosisQuestions[currentStep];
    const totalSteps = diagnosisQuestions.length;
    const progress = ((currentStep + 1) / totalSteps) * 100;

    const handleOptionSelect = (option) => {
        const newAnswers = [...answers, option.id];
        setAnswers(newAnswers);

        const newScores = {
            A: scores.A + option.scores.A,
            B: scores.B + option.scores.B,
            C: scores.C + option.scores.C,
            D: scores.D + option.scores.D,
        };
        setScores(newScores);

        if (currentStep + 1 >= totalSteps) {
            const result = calculateResult(newScores);
            onComplete(result, newAnswers, newScores);
        } else {
            setCurrentStep(currentStep + 1);
        }
    };

    const calculateResult = (finalScores) => {
        const { A, B, C, D } = finalScores;
        const max = Math.max(A, B, C, D);
        if (A === max) return "A";
        if (B === max) return "B";
        if (C === max) return "C";
        return "D";
    };

    const handleBack = () => {
        if (currentStep > 0) {
            const lastAnswer = answers[answers.length - 1];
            const lastQuestion = diagnosisQuestions[currentStep - 1];
            const lastOption = lastQuestion.options.find((o) => o.id === lastAnswer);

            setScores({
                A: scores.A - lastOption.scores.A,
                B: scores.B - lastOption.scores.B,
                C: scores.C - lastOption.scores.C,
                D: scores.D - lastOption.scores.D,
            });
            setAnswers(answers.slice(0, -1));
            setCurrentStep(currentStep - 1);
        } else {
            onBack();
        }
    };

    const getIcon = (iconName) => {
        const IconComponent = LucideIcons[iconName];
        return IconComponent ? <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" /> : null;
    };

    return (
        <section className="min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-24 bg-mesh">
            <div className="w-full max-w-2xl mx-auto px-6 sm:px-12 md:px-16">
                {/* 心理安全感提示 */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-6 sm:mb-8"
                >
                    <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-accent-500/10 border border-accent-500/30">
                        <LucideIcons.Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent-400" />
                        <span className="text-accent-400 text-xs sm:text-sm font-medium">
                            只需 30 秒 · 不必登入 · 隨時可以重新測
                        </span>
                    </div>
                </motion.div>

                {/* 返回按鈕 */}
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={handleBack}
                    className="flex items-center gap-2 text-white/60 hover:text-white mb-6 sm:mb-10 transition-colors text-lg sm:text-base"
                >
                    <LucideIcons.ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>{currentStep > 0 ? "上一題" : "返回首頁"}</span>
                </motion.button>

                {/* 進度條 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 sm:mb-12"
                >
                    <div className="flex justify-between items-center mb-3 sm:mb-4">
                        <span className="text-white/60 text-lg sm:text-base">
                            問題 {currentStep + 1} / {totalSteps}
                        </span>
                        <span className="text-accent-400 text-lg sm:text-base font-medium">
                            {Math.round(progress)}% 完成
                        </span>
                    </div>
                    <div className="h-2 sm:h-2.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-accent-400 to-accent-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                    </div>
                </motion.div>

                {/* 問題區塊 */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.4 }}
                    >
                        {/* 問題標題 */}
                        <div className="text-center mb-8 sm:mb-12">
                            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 px-2" style={{ lineHeight: 1.5 }}>
                                {currentQuestion.question}
                            </h2>
                            <p className="text-white/60 text-lg sm:text-base md:text-lg">
                                {currentQuestion.subtext}
                            </p>
                        </div>

                        {/* 選項列表 */}
                        <div className="space-y-4 sm:space-y-5">
                            {currentQuestion.options.map((option, index) => (
                                <motion.button
                                    key={option.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => handleOptionSelect(option)}
                                    className="card-option w-full text-left group p-5 sm:p-6"
                                >
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 rounded-lg sm:rounded-xl bg-gradient-to-br from-accent-400/20 to-accent-600/20 flex items-center justify-center text-accent-400 group-hover:from-accent-400/30 group-hover:to-accent-600/30 transition-all">
                                            {getIcon(option.icon)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-1 sm:mb-1.5 group-hover:text-accent-400 transition-colors">
                                                {option.text}
                                            </h3>
                                            <p className="text-white/60 text-lg sm:text-lg leading-relaxed line-clamp-2">
                                                {option.description}
                                            </p>
                                        </div>
                                        <div className="w-7 h-7 sm:w-9 sm:h-9 flex-shrink-0 rounded-full border-2 border-white/20 flex items-center justify-center group-hover:border-accent-400 group-hover:bg-accent-400/10 transition-all">
                                            <LucideIcons.ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-white/40 group-hover:text-accent-400 transition-colors" />
                                        </div>
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* 步驟指示器 */}
                <div className="flex justify-center gap-2 sm:gap-3 mt-10 sm:mt-14">
                    {diagnosisQuestions.map((_, index) => (
                        <div
                            key={index}
                            className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${index === currentStep
                                ? "bg-accent-400 w-6 sm:w-8"
                                : index < currentStep
                                    ? "bg-accent-500 w-2 sm:w-2.5"
                                    : "bg-white/20 w-2 sm:w-2.5"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DiagnosisSystem;
