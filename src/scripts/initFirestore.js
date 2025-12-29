// Firestore Initialization Script
// Run this script to set up initial feature flags in Firestore
// Usage: Open browser console at your deployed site and paste this code

import { doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

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
            tags: ["Portfolio", "Design", "Framer Motion"]
        },
        "demo-2": {
            enabled: true,
            name: "裝修公司 Landing Page",
            description: "現代化室內設計公司形象網站",
            order: 2,
            route: "/demo-2",
            thumbnail: null,
            tags: ["Landing Page", "Business"]
        },
        "demo-3": {
            enabled: true,
            name: "電商購物平台",
            description: "完整購物車與結帳流程的電商網站",
            order: 3,
            route: "/demo-3",
            thumbnail: null,
            tags: ["E-commerce", "Shopping Cart", "Firebase"]
        },
        "demo-4": {
            enabled: true,
            name: "企業形象官網",
            description: "專業企業形象展示網站",
            order: 4,
            route: "/demo-4",
            thumbnail: null,
            tags: ["Corporate", "Business", "Tailwind"]
        },
        "demo-5": {
            enabled: true,
            name: "預約管理系統",
            description: "線上預約與行事曆管理平台",
            order: 5,
            route: "/demo-5",
            thumbnail: null,
            tags: ["Booking", "Calendar", "React Router"]
        },
        "demo-6": {
            enabled: true,
            name: "會員管理系統",
            description: "會員註冊、登入與權限管理",
            order: 6,
            route: "/demo-6",
            thumbnail: null,
            tags: ["Auth", "Members", "HeadlessUI"]
        },
        "antingm-auto": {
            enabled: true,
            name: "Antingm Auto",
            description: "汽車相關服務平台",
            order: 7,
            route: "/antingm-auto",
            thumbnail: null,
            tags: ["Automotive", "Service", "Framer Motion"]
        },
        "antingm-studio": {
            enabled: true,
            name: "Antingm Studio",
            description: "創意工作室官方網站",
            order: 8,
            route: "/antingm-studio",
            thumbnail: null,
            tags: ["Studio", "Creative", "Full Stack"]
        }
    }
};

export async function initializeFirestore() {
    try {
        await setDoc(doc(db, 'config', 'features'), initialFeatures);
        console.log('✅ Firestore 初始化成功！');
        return true;
    } catch (error) {
        console.error('❌ Firestore 初始化失敗:', error);
        return false;
    }
}

export default initialFeatures;
