// Demo 5 - 美甲沙龍預約系統
// 重構版：整合 ModuleLoader，並改用相對路由以支援主導航
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './styles.css';
import { BookingProvider } from './context/BookingContext';
import AppShell from './components/layout/AppShell';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Gallery from './pages/Gallery';
import Member from './pages/Member';
import ModuleLoader, { FloatingModules } from '../../components/Shell/ModuleLoader';
import { useModuleEditor } from '../../hooks/useModuleEditor';
import InlineEditor from '../../components/Admin/InlineEditor';

// 內部路由組件
function Demo5Content() {
    const { liveModuleConfig, handleConfigChange } = useModuleEditor('demo-5');

    const moduleProps = {
        CartModule: {
            onToast: (msg) => {
                const toast = document.createElement('div');
                toast.className = 'fixed bottom-20 left-1/2 -translate-x-1/2 bg-black/80 text-white px-6 py-3 rounded-full z-50 transition-all';
                toast.textContent = msg;
                document.body.appendChild(toast);
                setTimeout(() => toast.remove(), 2000);
            }
        },
        ContactModule: {
            title: "聯絡我們",
            address: "台北市大安區忠孝東路四段100號",
            phone: "02-2771-1234",
            email: "hello@nailsalon.com"
        },
        FAQModule: {
            title: "常見問題",
            items: [
                { question: '預約後可以取消嗎？', answer: '可以在預約時間前 24 小時取消，不收取任何費用。' },
                { question: '第一次做美甲需要注意什麼？', answer: '建議提前 10 分鐘到達，讓美甲師了解您的需求。' },
                { question: '美甲可以維持多久？', answer: '一般凝膠美甲可維持 3-4 週。' }
            ]
        },
        GalleryModule: {
            title: "作品集",
            columns: 3
        }
    };

    return (
        <div className="demo-5-container min-h-screen bg-white">
            <Routes>
                <Route element={<AppShell />}>
                    <Route index element={<Home />} />
                    <Route path="booking" element={<Booking />} />
                    <Route path="gallery" element={<Gallery />} />
                    <Route path="member" element={<Member />} />
                </Route>
            </Routes>

            {/* 額外模組區域 */}
            <div className="max-w-4xl mx-auto px-4 py-12">
                <ModuleLoader moduleConfig={liveModuleConfig} position="main" props={moduleProps} />
            </div>

            <FloatingModules moduleConfig={liveModuleConfig} props={moduleProps} />

            {/* 模組編輯器 */}
            <InlineEditor
                demoId="demo-5"
                moduleConfig={liveModuleConfig}
                onConfigChange={handleConfigChange}
            />
        </div>
    );
}

// 移除 MemoryRouter，讓它使用父級的 BrowserRouter
export default function Demo5() {
    return (
        <BookingProvider>
            <Demo5Content />
        </BookingProvider>
    );
}

