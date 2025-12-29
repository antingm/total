// Setup Page - Admin can initialize Firestore from here
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, CheckCircle, XCircle, Loader, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuth } from '../../hooks/useAuth';

// Initial demo configuration
const initialFeatures = {
    admin_uids: ["yavTIoeQQ1Sk9I5DKJRVzGUwXhy2"],
    demos: {
        "demo-1": {
            enabled: true,
            name: "作品集展示",
            description: "個人作品集網站，展示精選設計作品",
            order: 1,
            route: "/demo-1",
            thumbnail: null,
            tags: ["Portfolio", "Design", "Framer Motion"],
            activeModules: []
        },
        "demo-2": {
            enabled: true,
            name: "裝修公司 Landing Page",
            description: "現代化室內設計公司形象網站",
            order: 2,
            route: "/demo-2",
            thumbnail: null,
            tags: ["Landing Page", "Business"],
            activeModules: []
        },
        "demo-3": {
            enabled: true,
            name: "電商購物平台",
            description: "完整購物車與結帳流程的電商網站",
            order: 3,
            route: "/demo-3",
            thumbnail: null,
            tags: ["E-commerce", "Shopping Cart", "Firebase"],
            activeModules: ["CartModule"]
        },
        "demo-4": {
            enabled: true,
            name: "企業形象官網",
            description: "專業企業形象展示網站",
            order: 4,
            route: "/demo-4",
            thumbnail: null,
            tags: ["Corporate", "Business", "Tailwind"],
            activeModules: []
        },
        "demo-5": {
            enabled: true,
            name: "預約管理系統",
            description: "線上預約與行事曆管理平台",
            order: 5,
            route: "/demo-5",
            thumbnail: null,
            tags: ["Booking", "Calendar", "React Router"],
            activeModules: ["BookingModule"]
        },
        "demo-6": {
            enabled: true,
            name: "會員管理系統",
            description: "會員註冊、登入與權限管理",
            order: 6,
            route: "/demo-6",
            thumbnail: null,
            tags: ["Auth", "Members", "HeadlessUI"],
            activeModules: []
        },
        "antingm-auto": {
            enabled: true,
            name: "Antingm Auto",
            description: "汽車相關服務平台",
            order: 7,
            route: "/antingm-auto",
            thumbnail: null,
            tags: ["Automotive", "Service", "Framer Motion"],
            activeModules: []
        },
        "antingm-studio": {
            enabled: true,
            name: "Antingm Studio",
            description: "創意工作室官方網站",
            order: 8,
            route: "/antingm-studio",
            thumbnail: null,
            tags: ["Studio", "Creative", "Full Stack"],
            activeModules: ["BookingModule"]
        },
        "demo-modular": {
            enabled: true,
            name: "模組化管理示範",
            description: "展示如何透過共享模組實現快速升等與功能引用",
            order: 9,
            route: "/demo-modular",
            thumbnail: null,
            tags: ["Modular", "Pro", "Management"],
            activeModules: ["ExampleModule", "CartModule", "BookingModule"]
        }
    }
};


export default function SetupPage() {
    const { user, loading: authLoading } = useAuth();
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [message, setMessage] = useState('');
    const [existingData, setExistingData] = useState(null);

    const checkExisting = async () => {
        try {
            const docRef = doc(db, 'config', 'features');
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setExistingData(docSnap.data());
                return true;
            }
            return false;
        } catch (error) {
            console.error('Check error:', error);
            return false;
        }
    };

    const handleInitialize = async (force = false) => {
        setStatus('loading');
        setMessage('正在初始化...');

        try {
            // Check if data already exists
            if (!force) {
                const exists = await checkExisting();
                if (exists) {
                    setStatus('error');
                    setMessage('資料已存在！如需重新初始化，請點擊「強制重新初始化」');
                    return;
                }
            }

            // Add current user to admin_uids if logged in
            const config = { ...initialFeatures };
            if (user && !config.admin_uids.includes(user.uid)) {
                config.admin_uids.push(user.uid);
            }

            await setDoc(doc(db, 'config', 'features'), config);
            setStatus('success');
            setMessage('初始化成功！系統已準備就緒。');
        } catch (error) {
            console.error('Initialize error:', error);
            setStatus('error');
            setMessage(`初始化失敗: ${error.message}`);
        }
    };

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader className="w-8 h-8 animate-spin text-[var(--color-primary)]" />
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 px-6">
            <div className="max-w-2xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {/* Back Link */}
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-[var(--color-text-muted)] hover:text-white mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        返回首頁
                    </Link>

                    {/* Header */}
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-purple-600 flex items-center justify-center">
                            <Database className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white">系統初始化</h1>
                            <p className="text-[var(--color-text-muted)]">設定 Firestore 初始資料</p>
                        </div>
                    </div>

                    {/* User Info */}
                    {user && (
                        <div className="card mb-6">
                            <p className="text-sm text-[var(--color-text-muted)]">目前登入帳號</p>
                            <p className="text-white font-medium">{user.email}</p>
                            <p className="text-xs text-[var(--color-text-muted)] mt-1">UID: {user.uid}</p>
                        </div>
                    )}

                    {/* Status Card */}
                    <div className="card mb-6">
                        <h2 className="text-lg font-semibold text-white mb-4">初始化狀態</h2>

                        {status === 'idle' && (
                            <p className="text-[var(--color-text-muted)]">
                                點擊下方按鈕初始化 Firestore 資料庫，這將建立 8 個 Demo 專案的配置資料。
                            </p>
                        )}

                        {status === 'loading' && (
                            <div className="flex items-center gap-3 text-yellow-400">
                                <Loader className="w-5 h-5 animate-spin" />
                                <span>{message}</span>
                            </div>
                        )}

                        {status === 'success' && (
                            <div className="flex items-center gap-3 text-green-400">
                                <CheckCircle className="w-5 h-5" />
                                <span>{message}</span>
                            </div>
                        )}

                        {status === 'error' && (
                            <div className="flex items-center gap-3 text-red-400">
                                <XCircle className="w-5 h-5" />
                                <span>{message}</span>
                            </div>
                        )}
                    </div>

                    {/* Existing Data Preview */}
                    {existingData && (
                        <div className="card mb-6">
                            <h2 className="text-lg font-semibold text-white mb-4">現有資料預覽</h2>
                            <div className="bg-[var(--color-background)] rounded-lg p-4 overflow-auto max-h-64">
                                <pre className="text-xs text-[var(--color-text-muted)]">
                                    {JSON.stringify(existingData, null, 2)}
                                </pre>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4">
                        <button
                            onClick={() => handleInitialize(false)}
                            disabled={status === 'loading'}
                            className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {status === 'loading' ? (
                                <>
                                    <Loader className="w-4 h-4 animate-spin mr-2" />
                                    處理中...
                                </>
                            ) : (
                                '初始化資料庫'
                            )}
                        </button>

                        {status === 'error' && (
                            <button
                                onClick={() => handleInitialize(true)}
                                disabled={status === 'loading'}
                                className="btn bg-red-600 text-white hover:bg-red-700"
                            >
                                強制重新初始化
                            </button>
                        )}

                        <button
                            onClick={checkExisting}
                            disabled={status === 'loading'}
                            className="btn bg-[var(--color-surface)] text-white hover:bg-[var(--color-surface-hover)]"
                        >
                            檢查現有資料
                        </button>
                    </div>

                    {/* Info */}
                    <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        <h3 className="font-semibold text-blue-400 mb-2">ℹ️ 說明</h3>
                        <ul className="text-sm text-[var(--color-text-muted)] space-y-1">
                            <li>• 此操作將在 Firestore 建立 <code className="text-white bg-[var(--color-surface)] px-1 rounded">config/features</code> 文件</li>
                            <li>• 包含 8 個 Demo 專案的初始配置</li>
                            <li>• 您的帳號將自動加入管理員清單</li>
                            <li>• 初始化後可在管理後台開關各專案</li>
                        </ul>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
