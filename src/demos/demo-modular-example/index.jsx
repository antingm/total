import React, { useState, useEffect } from 'react';
import ModuleLoader from '../../components/Shell/ModuleLoader';
import { useFeatureFlags } from '../../hooks/useFeatureFlags';
import { Rocket, Shield, Zap, Cloud, Settings, RefreshCw } from 'lucide-react';

// 範例服務資料（給 BookingModule 用）
const DEMO_SERVICES = [
    { id: 1, name: '基礎諮詢', price: 500, duration: 30 },
    { id: 2, name: '深度規劃', price: 1500, duration: 60 },
    { id: 3, name: '全方位方案', price: 3000, duration: 120 }
];

const DEMO_STYLISTS = [
    { id: 1, name: '小明', title: '資深顧問' },
    { id: 2, name: '小華', title: '專案經理' }
];

export default function ModularDemo() {
    const { getActiveModules, loading } = useFeatureFlags();
    const [mode, setMode] = useState('manual'); // 'manual' | 'firestore'
    const [manualModules, setManualModules] = useState([]);

    // 從 Firestore 取得的模組清單
    const firestoreModules = getActiveModules('demo-modular');

    // 根據模式決定要使用哪個模組清單
    const activeModules = mode === 'firestore' ? firestoreModules : manualModules;

    const toggleModule = (moduleName) => {
        setManualModules(prev =>
            prev.includes(moduleName)
                ? prev.filter(m => m !== moduleName)
                : [...prev, moduleName]
        );
    };

    const availableModules = [
        { name: 'ExampleModule', label: '範例模組', color: 'indigo' },
        { name: 'CartModule', label: '購物車', color: 'emerald' },
        { name: 'BookingModule', label: '預約系統', color: 'rose' }
    ];

    return (
        <div className="min-h-screen bg-[#0f1115] text-white pt-20 px-6 pb-12">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-4">模組化管理中心</h1>
                    <p className="text-gray-400">
                        此頁面展示如何透過<strong className="text-indigo-400">手動控制</strong>或<strong className="text-emerald-400">Firestore 雲端配置</strong>來管理功能模組。
                    </p>
                </div>

                {/* 模式切換 */}
                <div className="mb-8 p-6 rounded-2xl bg-white/5 border border-white/10">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <Settings className="w-5 h-5 text-gray-400" />
                        控制模式
                    </h3>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setMode('manual')}
                            className={`flex-1 p-4 rounded-xl border-2 transition-all ${mode === 'manual'
                                    ? 'border-indigo-500 bg-indigo-500/10'
                                    : 'border-white/10 hover:border-white/20'
                                }`}
                        >
                            <div className="font-bold mb-1">🎛️ 手動控制</div>
                            <p className="text-sm text-gray-400">在頁面上直接切換模組</p>
                        </button>
                        <button
                            onClick={() => setMode('firestore')}
                            className={`flex-1 p-4 rounded-xl border-2 transition-all ${mode === 'firestore'
                                    ? 'border-emerald-500 bg-emerald-500/10'
                                    : 'border-white/10 hover:border-white/20'
                                }`}
                        >
                            <div className="font-bold mb-1 flex items-center gap-2">
                                <Cloud className="w-4 h-4" /> Firestore 雲端
                            </div>
                            <p className="text-sm text-gray-400">從資料庫讀取 activeModules</p>
                        </button>
                    </div>
                </div>

                {/* 手動模式：模組開關 */}
                {mode === 'manual' && (
                    <div className="mb-8 p-6 rounded-2xl bg-white/5 border border-white/10">
                        <h3 className="font-bold text-lg mb-4">可用模組</h3>
                        <div className="grid grid-cols-3 gap-4">
                            {availableModules.map(({ name, label, color }) => (
                                <button
                                    key={name}
                                    onClick={() => toggleModule(name)}
                                    className={`p-4 rounded-xl border-2 transition-all ${manualModules.includes(name)
                                            ? `border-${color}-500 bg-${color}-500/10`
                                            : 'border-white/10 hover:border-white/20'
                                        }`}
                                >
                                    <div className="font-medium">{label}</div>
                                    <p className="text-xs text-gray-500 mt-1">{name}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Firestore 模式：顯示雲端配置 */}
                {mode === 'firestore' && (
                    <div className="mb-8 p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
                        <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                            <Cloud className="w-5 h-5 text-emerald-400" />
                            Firestore 配置
                        </h3>
                        <p className="text-sm text-gray-400 mb-4">
                            以下模組是從 <code className="bg-white/10 px-2 py-0.5 rounded">config/features</code> 文件中讀取的 <code className="bg-white/10 px-2 py-0.5 rounded">demos.demo-modular.activeModules</code> 欄位。
                        </p>
                        {loading ? (
                            <div className="flex items-center gap-2 text-gray-400">
                                <RefreshCw className="w-4 h-4 animate-spin" />
                                載入中...
                            </div>
                        ) : firestoreModules.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {firestoreModules.map(name => (
                                    <span key={name} className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium">
                                        {name}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className="text-yellow-400 text-sm">
                                ⚠️ 尚未設定 activeModules，請先執行 <code className="bg-white/10 px-2 py-0.5 rounded">/setup</code> 初始化資料庫。
                            </p>
                        )}
                    </div>
                )}

                {/* 當前啟用的模組狀態 */}
                <div className="mb-8 p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-sm text-gray-400 mb-2">當前啟用模組：</div>
                    {activeModules.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {activeModules.map(name => (
                                <span key={name} className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-sm font-medium">
                                    {name}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">尚未啟用任何模組</p>
                    )}
                </div>

                {/* 模組渲染區 */}
                <div className="space-y-6">
                    <ModuleLoader
                        activeModules={activeModules}
                        props={{
                            ExampleModule: {
                                title: "動態載入的範例模組",
                                description: "這是透過 ModuleLoader 自動渲染的內容。"
                            },
                            CartModule: {
                                onToast: (msg) => console.log('Toast:', msg)
                            },
                            BookingModule: {
                                title: "線上諮詢預約",
                                services: DEMO_SERVICES,
                                stylists: DEMO_STYLISTS,
                                onComplete: (data) => console.log('預約完成:', data)
                            }
                        }}
                    />
                </div>

                {/* 說明區 */}
                <div className="mt-12 p-6 rounded-2xl bg-blue-500/10 border border-blue-500/30">
                    <h3 className="font-bold text-blue-400 mb-3">💡 管理心法</h3>
                    <ul className="text-sm text-gray-300 space-y-2">
                        <li>• <strong>手動模式</strong>：適合開發測試，快速切換功能。</li>
                        <li>• <strong>Firestore 模式</strong>：適合生產環境，透過後台直接控制用戶權限。</li>
                        <li>• 您只需在 Firebase Console 修改 <code className="bg-white/10 px-1 rounded">activeModules</code> 陣列，頁面會即時反映變化。</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

function FeatureCard({ icon, title, desc }) {
    return (
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
            <div className="mb-4">{icon}</div>
            <h4 className="font-bold mb-2">{title}</h4>
            <p className="text-sm text-gray-400">{desc}</p>
        </div>
    );
}
