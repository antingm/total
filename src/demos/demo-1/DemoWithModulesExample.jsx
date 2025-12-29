import React from 'react';
import ModuleLoader, { FloatingModules } from '../../components/Shell/ModuleLoader';
import { useFeatureFlags } from '../../hooks/useFeatureFlags';

/**
 * DemoWithModules - 示範如何在 Demo 中整合模組系統
 * 
 * 這個範本展示了如何：
 * 1. 從 Firestore 取得模組配置
 * 2. 在頁面的不同區域渲染對應的模組
 * 3. 傳遞各模組所需的 props
 */
export default function DemoWithModules() {
    const { getModuleConfig } = useFeatureFlags();

    // 取得此 Demo 的模組配置
    const moduleConfig = getModuleConfig('demo-1'); // 替換為實際的 demo ID

    // 給各模組的 props
    const moduleProps = {
        CartModule: {
            onToast: (msg) => console.log('Toast:', msg)
        },
        BookingModule: {
            title: "預約服務",
            services: [
                { id: 1, name: '基礎服務', price: 500, duration: 30 },
                { id: 2, name: '進階服務', price: 1500, duration: 60 }
            ],
            stylists: [
                { id: 1, name: '服務人員 A' },
                { id: 2, name: '服務人員 B' }
            ]
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Header 區域的模組 */}
            <header className="p-4 border-b border-white/10">
                <ModuleLoader
                    moduleConfig={moduleConfig}
                    position="header"
                    props={moduleProps}
                />
            </header>

            {/* Main 區域的模組 */}
            <main className="p-6">
                <h1 className="text-3xl font-bold mb-8">Demo 頁面</h1>

                {/* 原本的 Demo 內容 */}
                <div className="mb-8">
                    <p className="text-gray-400">這裡是 Demo 的原始內容...</p>
                </div>

                {/* 在主內容區渲染 main 位置的模組 */}
                <ModuleLoader
                    moduleConfig={moduleConfig}
                    position="main"
                    props={moduleProps}
                />
            </main>

            {/* Sidebar 區域的模組 */}
            <aside className="fixed right-0 top-20 w-80 p-4">
                <ModuleLoader
                    moduleConfig={moduleConfig}
                    position="sidebar"
                    props={moduleProps}
                />
            </aside>

            {/* 浮動模組（右下角按鈕等） */}
            <FloatingModules moduleConfig={moduleConfig} props={moduleProps} />
        </div>
    );
}
