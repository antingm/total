// Antingm Auto - 網站診斷系統
import { useState } from "react";
import './styles.css';
import Hero from "./components/Hero";
import DiagnosisSystem from "./components/DiagnosisSystem";
import DiagnosisResult from "./components/DiagnosisResult";
import LoadingAnalysis from "./components/LoadingAnalysis";
import TrustSignals from "./components/TrustSignals";
import PortfolioShowcase from "./components/PortfolioShowcase";
import PlanDetailPage from "./components/PlanDetailPage";
import PlansPage from "./components/PlansPage";
import FAQPage from "./components/FAQPage";
import LeadCaptureModal from "./components/LeadCaptureModal";
import Footer from "./components/Footer";
import ModuleLoader, { FloatingModules } from '../../components/Shell/ModuleLoader';
import { useModuleEditor } from '../../hooks/useModuleEditor';
import InlineEditor from '../../components/Admin/InlineEditor';

export default function AntingmAuto() {
    const [currentView, setCurrentView] = useState("hero");
    const [diagnosisResult, setDiagnosisResult] = useState(null);
    const [showLeadCapture, setShowLeadCapture] = useState(false);
    const [pendingResult, setPendingResult] = useState(null);
    const [selectedPlanId, setSelectedPlanId] = useState(null);

    // 模組編輯器
    const { liveModuleConfig, handleConfigChange } = useModuleEditor('antingm-auto');

    const moduleProps = {
        BookingModule: {
            title: "預約網站諮詢",
            services: [
                { id: 1, name: '免費諮詢', price: 0, duration: 30 },
                { id: 2, name: '網站規劃', price: 1500, duration: 60 }
            ],
            stylists: [
                { id: 1, name: '顧問 A' },
                { id: 2, name: '顧問 B' }
            ]
        },
        ContactModule: {
            title: "聯絡我們",
            phone: "0912-345-678",
            email: "hello@antingm.com"
        }
    };

    const handleStartDiagnosis = () => {
        setCurrentView("diagnosis");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDiagnosisComplete = (result, answers, scores) => {
        setPendingResult({ result, answers, scores });
        setCurrentView("loading");
        window.scrollTo({ top: 0, behavior: "smooth" });
        setTimeout(() => {
            setShowLeadCapture(true);
        }, 1800);
    };

    const handleLeadSubmit = () => {
        setShowLeadCapture(false);
        showResult();
    };

    const handleLeadSkip = () => {
        setShowLeadCapture(false);
        showResult();
    };

    const showResult = () => {
        if (pendingResult) {
            setDiagnosisResult(pendingResult.result);
            setCurrentView("result");
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handleBackToHero = () => {
        setCurrentView("hero");
        setDiagnosisResult(null);
        setPendingResult(null);
        setSelectedPlanId(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleRestart = () => {
        setDiagnosisResult(null);
        setPendingResult(null);
        setCurrentView("diagnosis");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleViewDemo = (plan) => {
        if (plan.demoUrl && plan.demoUrl !== "#") {
            window.open(plan.demoUrl, "_blank", "noopener,noreferrer");
        } else {
            alert("此 Demo 連結即將上線，敬請期待！");
        }
    };

    const handleViewPlanDetail = (planId) => {
        setSelectedPlanId(planId);
        setCurrentView("planDetail");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleNavigate = (page) => {
        setCurrentView(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // 共用的模組區域
    const ModuleSection = () => (
        <>
            {/* 浮動模組 */}
            <FloatingModules moduleConfig={liveModuleConfig} props={moduleProps} />

            {/* 模組編輯器 */}
            <InlineEditor
                demoId="antingm-auto"
                moduleConfig={liveModuleConfig}
                onConfigChange={handleConfigChange}
            />
        </>
    );

    if (currentView === "hero") {
        return (
            <div className="min-h-screen bg-business-900">
                <Hero onStartDiagnosis={handleStartDiagnosis} />
                <PortfolioShowcase onViewPlanDetail={handleViewPlanDetail} />
                <TrustSignals />
                <Footer onNavigate={handleNavigate} />
                <ModuleSection />
            </div>
        );
    }

    if (currentView === "plans") {
        return (
            <div className="min-h-screen bg-business-900">
                <PlansPage onBack={handleBackToHero} />
                <Footer onNavigate={handleNavigate} />
                <ModuleSection />
            </div>
        );
    }

    if (currentView === "faq") {
        return (
            <div className="min-h-screen bg-business-900">
                <FAQPage onBack={handleBackToHero} />
                <Footer onNavigate={handleNavigate} />
                <ModuleSection />
            </div>
        );
    }

    if (currentView === "loading") {
        return (
            <div className="min-h-screen bg-business-900">
                <LoadingAnalysis />
                <LeadCaptureModal
                    isOpen={showLeadCapture}
                    onClose={() => setShowLeadCapture(false)}
                    onSubmit={handleLeadSubmit}
                    onSkip={handleLeadSkip}
                />
                <ModuleSection />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-business-900">
            {currentView === "diagnosis" && (
                <DiagnosisSystem
                    onComplete={handleDiagnosisComplete}
                    onBack={handleBackToHero}
                />
            )}

            {currentView === "result" && diagnosisResult && (
                <>
                    <DiagnosisResult
                        result={diagnosisResult}
                        onViewDemo={handleViewDemo}
                        onRestart={handleRestart}
                    />
                    <TrustSignals />
                    <Footer onNavigate={handleNavigate} />
                </>
            )}

            {currentView === "planDetail" && selectedPlanId && (
                <>
                    <PlanDetailPage
                        planId={selectedPlanId}
                        onBack={handleBackToHero}
                        onStartDiagnosis={handleStartDiagnosis}
                    />
                    <TrustSignals />
                    <Footer onNavigate={handleNavigate} />
                </>
            )}

            <LeadCaptureModal
                isOpen={showLeadCapture}
                onClose={() => setShowLeadCapture(false)}
                onSubmit={handleLeadSubmit}
                onSkip={handleLeadSkip}
            />

            <ModuleSection />
        </div>
    );
}

