// ==========================================
// 🏢 Anting Studio - 安庭網頁工作室 資料中心
// ==========================================
// 核心理念：專業技術、價格透明、長期夥伴
// ==========================================

// 導覽連結
export const navLinks = [
    { id: "why-us", title: "為何選我們" },
    { id: "workflow", title: "服務流程" },
    { id: "pricing", title: "方案報價" },
    { id: "portfolio", title: "精選案例" },
    { id: "faq", title: "常見問題" },
    { id: "contact", title: "聯絡我們" },
];

// 公司資訊
export const companyInfo = {
    name: "Anting Studio",
    nameChinese: "安庭網頁工作室",
    tagline: "專業技術 · 價格透明 · 長期夥伴",
    email: "anting13579@gmail.com",
    phone: "0930-693-088",
    address: "全台灣 (遠端為主)",
};

// 首屏內容 (Hero Section)
export const heroContent = {
    headline: "🚀 打造專屬您的專業網站",
    headlineHighlight: "從創意到上線，我們全程陪伴",
    subheadline: "專業網頁設計，會員價 $15,000 起。Google 頂級效能體驗、終身維護支援、專人即時服務。",
    ctaPrimary: "加入會員",
    ctaSecondary: "查看方案",
    stats: [
        { number: "50+", label: "滿意客戶" },
        { number: "頂級", label: "Google 優化" },
        { number: "終身", label: "維護服務" },
    ],
};

// 服務理念 (Why Us Section)
export const whyUsContent = {
    sectionTitle: "為什麼選擇我們？",
    sectionSubtitle: "我們不只是做網站，更是成為您事業成長的數位夥伴",
    features: [
        {
            icon: "Shield",
            title: "終身維護承諾",
            description: "網站交付後，我們提供終身基礎維護服務。小問題即時處理，讓您無後顧之憂。",
            highlight: "免費基礎維護",
        },
        {
            icon: "Zap",
            title: "極速與安全",
            description: "採用 Google Cloud 頂級架構，確保您的網站 24/7 穩定運行，載入速度極快。",
            highlight: "99.9% 正常運行",
        },
        {
            icon: "Wallet",
            title: "價格透明公開",
            description: "報價單清清楚楚，沒有隱藏費用。我們相信誠實是長期合作的基礎。",
            highlight: "無隱藏費用",
        },
        {
            icon: "Heart",
            title: "長期夥伴關係",
            description: "我們追求的是與您共同成長。您的成功就是我們的成功，這是雙贏的合作模式。",
            highlight: "共創雙贏",
        },
    ],
};

// 服務流程 (Workflow Section)
export const workflowContent = {
    sectionTitle: "服務流程",
    sectionSubtitle: "從溝通到上線，每一步都透明清晰",
    steps: [
        {
            step: "01",
            title: "需求訪談",
            description: "深入了解您的品牌、目標客群與核心訴求，制定最適合的網站策略。",
            duration: "1-2 天",
        },
        {
            step: "02",
            title: "設計提案",
            description: "提供視覺設計稿，包含色彩、版面配置與互動概念，確保方向正確。",
            duration: "3-5 天",
        },
        {
            step: "03",
            title: "開發製作",
            description: "使用最新前端技術進行開發，同步進行 SEO 優化與效能調校。",
            duration: "7-14 天",
        },
        {
            step: "04",
            title: "測試驗收",
            description: "完整測試各裝置瀏覽體驗，確保功能正常後，進行交付驗收。",
            duration: "2-3 天",
        },
        {
            step: "05",
            title: "上線維護",
            description: "正式上線並提供操作教學。後續持續提供技術支援與維護服務。",
            duration: "終身服務",
        },
    ],
};

// 方案報價 (Pricing Section) - 樂高式模組化定價
export const pricingContent = {
    sectionTitle: "方案報價",
    sectionSubtitle: "✨ 三種方案，簡單好選 · 專業化客製服務",
    plans: [
        {
            id: "basic",
            name: "套版官網",
            subtitle: "適合預算有限、內容單純的小型商戶",
            price: "8,800",
            priceNote: "起",
            badge: "⚡ 快速上線",
            description: "專注核心資訊展示，建立專業且具信任感的線上門面。",
            features: [
                "品牌形象首頁設計",
                "關於我們 / 品牌故事",
                "最新消息 / 產品服務展示",
                "LINE / 電話快速連結",
                "響應式網頁設計 (RWD)",
                "SSL 安全憑證 (HTTPS)",
                "終身免主機維護費",
            ],
            highlights: [
                "3～5 個工作天極速交付",
                "資料備齊即可啟動",
                "最經濟實惠的轉型方案",
            ],
            notIncluded: [
                "後台管理系統",
                "客製化視覺調整",
            ],
            popular: false,
            cta: "立即諮詢",
        },
        {
            id: "cms-standard",
            name: "套版官網 + 小型後台",
            subtitle: "適合時常更新內容或訊息動態之商戶",
            price: "15,000",
            priceNote: "起",
            badge: "🏆 推薦首選",
            description: "內建直覺後台，讓您隨時自主更新網站資訊。",
            features: [
                "包含「套版官網」所有項目",
                "簡易自定義管理中心 (CMS)",
                "自主更換首頁輪播圖 (Banner)",
                "自主發佈最新消息與活動",
                "全站圖片效能自動優化",
                "智慧媒體庫管理系統",
                "2 年專屬技術維護與支援",
            ],
            highlights: [
                "5～7 天精緻交付與測試",
                "內容隨手更新，資訊不掉隊",
                "中小企業主最愛的均衡配置",
            ],
            notIncluded: [
                "半客製化品牌視覺風格",
                "特殊功能擴充開發",
            ],
            popular: true,
            cta: "最受歡迎 🔥",
        },
        {
            id: "pro-cms",
            name: "專業形象官網 + 小型後台",
            subtitle: "適合希望擁有一套專屬風格官網的品牌",
            price: "25,000",
            priceNote: "起",
            badge: "✨ 質感推薦",
            description: "量身打造質感官網，將品牌調性延伸至數位空間。",
            features: [
                "包含「套版+後台」所有功能",
                "半客製化品牌視覺風格規劃",
                "企業識別色系深度應用",
                "精緻滾動動態效果設計",
                "智慧行銷聯絡表單整合",
                "Google 地圖 API 整合",
                "VIP 優先技術支援監控",
            ],
            highlights: [
                "7～14 個工作天製作打磨",
                "打造深度質感，提升形象",
                "可彈性擴充電商金流模組",
            ],
            notIncluded: [
                "大型複雜商務系統客製開發",
            ],
            popular: false,
            cta: "詳談需求",
        },
    ],
};

// 作品集 (Portfolio Section)
export const portfolioContent = {
    sectionTitle: "精選作品",
    sectionSubtitle: "為客戶打造的數位資產，每一個都是驕傲之作",
    projects: [
        {
            id: 1,
            title: "潔淨管家 Turbo Clean",
            category: "一頁式網站 · 基本款",
            description: "專業居家清潔、除蟎服務品牌網站，5000+ 滿意客戶，4.9 Google 評分，首購享 9 折優惠。",
            image: "/cleaning-service.jpg",
            technologies: ["React", "Vite", "Tailwind CSS"],
            link: "https://clean-mast-man.web.app/",
            featured: true,
        },
        {
            id: 2,
            title: "匠心設計｜輕裝修美學",
            category: "裝修官網 · 中階款",
            description: "輕裝修設計公司形象網站，透明報價、標準化工程，36萬起45天輕鬆入住。",
            image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80",
            technologies: ["React", "Vite", "Tailwind CSS"],
            link: "https://ingenious-designer.web.app/",
            featured: true,
        },
        {
            id: 3,
            title: "爆爆花桶",
            category: "電商網站 · 高階款",
            description: "精緻爆米花電商品牌網站，結合線上購物車與會員系統，打造高轉換率的購物體驗。",
            image: "https://images.unsplash.com/photo-1585647347483-22b66260dfff?w=600&q=80",
            technologies: ["React", "Firebase", "Tailwind CSS"],
            link: "https://popcorn-bucketer.web.app/",
            featured: true,
        },
        {
            id: 4,
            title: "清新冷氣｜專業冷氣清潔",
            category: "一頁式網站 · 基本款",
            description: "專業冷氣清潔與保養服務，提供快速預約、透明定價，讓您的冷氣煥然一新。",
            image: "/ac-cleaning.jpg",
            technologies: ["React", "Vite", "CSS"],
            link: "https://ultra-cleaned.web.app/",
            featured: true,
        },
        {
            id: 5,
            title: "美甲藝術工作室",
            category: "預約管理網站",
            description: "精緻美甲服務預約平台，結合線上預約系統與作品展示，打造專業美甲品牌形象。",
            image: "/nail-art.png",
            technologies: ["React", "Firebase", "預約系統"],
            link: "https://manicure-beauty.web.app/",
            featured: true,
        },
        {
            id: 6,
            title: "生醫科技｜健康管理平台",
            category: "導購網站 · 預約管理",
            description: "生醫健康管理一頁式導購網站，結合產品展示、諮詢預約與客戶管理功能。",
            image: "/biomedical.jpg",
            technologies: ["React", "Firebase", "CMS"],
            link: "https://green-biomedical.web.app/",
            featured: true,
        },
    ],
};

// 常見問題 (FAQ Section)
export const faqContent = {
    sectionTitle: "常見問題",
    sectionSubtitle: "關於合作模式、費用與保障的詳細說明",
    questions: [
        {
            question: "網站完成後，後續維護怎麼處理？",
            answer: "✅ 我們提供終身維護服務！\n\n📌 保固期內（1-2 年依方案）：功能問題、錯誤修復全部免費處理。\n\n📌 保固期後：小調整（換圖、改字）採單次收費（$500~$1,000），不綁月費。有後台的方案可以自己隨時修改。\n\n💡 我們的目標是成為您的長期技術夥伴，不是賣完就消失。",
        },
        {
            question: "網站做好後，以後每年還要付錢嗎？",
            answer: "只有一筆小費用：NT$ 3,000 / 年（選購）\n\n這不是給我們的「月租費」，這像是車子的「稅金與保養費」。費用包含：\n• 網址續約費（.com/.tw 網域）\n• 雲端系統監控（確保網站沒掛掉）\n• SSL 安全憑證更新（讓網址列有鎖頭符號）\n\n📌 備註：如果您懂技術，想自己去繳網域費和管理 Google Cloud，這筆錢可以省下來，我們完全不強迫。",
        },
        {
            question: "上線後，我想改字、換圖片要錢嗎？",
            answer: "📌 如果您選「專業形象型」：我們有提供後台，您可以自己免費隨便改。\n\n📌 如果您選「閃電名片」（或不想自己動手）：\n• 保固期內（30天）：程式有錯、字打錯，我們免費修到好\n• 保固期後：如果是「換一張圖、改一段字」，我們採單次收費（約 $500~$1,000/次），實報實銷，不綁月費",
        },
        {
            question: "製作一個網站需要多久時間？",
            answer: "• 閃電名片：資料備齊後 3 個工作天\n• 專業形象型：資料備齊後 7 個工作天\n• 加購功能：依功能複雜度另行評估\n\n我們會在專案開始前提供明確的時間表。",
        },
        {
            question: "網站會針對手機優化嗎？",
            answer: "絕對會！我們所有網站都採用響應式設計（RWD），確保在手機、平板、電腦上都能完美呈現。更棒的是，我們使用 SPA 技術，讓您的網站像手機 App 一樣流暢。",
        },
        {
            question: "流量很大會不會額外收費？",
            answer: "我們使用 Google 頂級雲端服務（Firebase），基本上能承受極高流量。\n\n但若您的生意太好（例如瞬間幾萬人湧入），Google 產生的額外流量費將由您實支實付。我們會提供帳單證明，絕不溢收。\n\n一般小型網站每月流量費幾乎是 $0。",
        },
    ],
    commitments: {
        title: "我們的承諾",
        items: [
            {
                icon: "CheckCircle",
                title: "無隱藏費用",
                description: "報價即最終價格",
            },
            {
                icon: "Clock",
                title: "準時交付",
                description: "依照約定時程完成",
            },
            {
                icon: "RefreshCw",
                title: "彈性調整",
                description: "保固期內免費修正",
            },
            {
                icon: "HeartHandshake",
                title: "終身夥伴",
                description: "長期技術支援",
            },
        ],
    },
};

// 聯絡資訊 (Contact Section)
export const contactContent = {
    sectionTitle: "開始您的專案",
    sectionSubtitle: "讓我們聊聊您的想法",
    description: "填寫以下表單，我們會在 24 小時內與您聯繫，討論如何為您打造最適合的網站。",
    form: {
        namePlaceholder: "您的姓名",
        emailPlaceholder: "電子郵件",
        phonePlaceholder: "聯絡電話",
        companyPlaceholder: "公司/品牌名稱 (選填)",
        servicePlaceholder: "您需要的服務類型",
        budgetPlaceholder: "預算範圍",
        messagePlaceholder: "請簡述您的專案需求，例如：想要一個展示公司服務的形象網站...",
        submitButton: "送出諮詢",
        serviceOptions: [
            "基礎形象網站",
            "專業品牌網站",
            "客製化開發",
            "網站改版優化",
            "其他需求",
        ],
        budgetOptions: [
            "NT$ 20,000 以下",
            "NT$ 20,000 - 50,000",
            "NT$ 50,000 - 100,000",
            "NT$ 100,000 以上",
            "尚未確定",
        ],
    },
    info: [
        {
            icon: "Mail",
            title: "電子郵件",
            value: "anting13579@gmail.com",
            link: "mailto:anting13579@gmail.com",
        },
        {
            icon: "Phone",
            title: "聯絡電話",
            value: "0930-693-088",
            link: "tel:0930693088",
        },
        {
            icon: "MapPin",
            title: "服務範圍",
            value: "全台灣 (遠端為主)",
            link: null,
        },
    ],
    social: [
        { platform: "Facebook", icon: "Facebook", link: "#" },
        { platform: "Instagram", icon: "Instagram", link: "#" },
        { platform: "LINE", icon: "MessageCircle", link: "#" },
    ],
};

// 頁尾資訊 (Footer Section)
export const footerContent = {
    copyright: `© ${new Date().getFullYear()} Anting Studio. All rights reserved.`,
    description: "致力於為台灣中小企業與個人品牌，打造專業且實用的網站。",
    quickLinks: [
        { title: "為何選擇我們", href: "/#why-us" },
        { title: "服務流程", href: "/#workflow" },
        { title: "方案報價", href: "/#pricing" },
        { title: "精選案例", href: "/portfolio" },
        { title: "常見問題", href: "/#faq" },
        { title: "聯絡我們", href: "/contact" },
    ],
    services: [
        { title: "形象官網設計", href: "/#pricing" },
        { title: "品牌網站製作", href: "/#pricing" },
        { title: "響應式網頁設計", href: "/#pricing" },
        { title: "SEO 搜尋優化", href: "/#pricing" },
        { title: "網站維護服務", href: "/shop" },
    ],
};

// ==========================================
// 🛒 商店商品資料 (Shop Products)
// ==========================================

// 商品分類
export const SHOP_CATEGORIES = [
    { id: 'all', name: '全部方案' },
    { id: 'website', name: '網站方案' },
    { id: 'addon', name: '功能加購' },
    { id: 'maintenance', name: '維護服務' },
];

// 商品列表
export const SHOP_PRODUCTS = [
    // 網站方案
    {
        id: 'basic-web',
        name: '套版官網',
        description: '專業品牌形象首頁，適合單純內容展示的小型商家。3-5 天快速上線。',
        price: 8800,
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
        category: 'website',
        badge: { type: 'sale', text: '⚡ 快速上線' },
        rating: 4.9,
        reviews: 42,
        features: [
            'RWD 響應式設計',
            'SSL 安全憑證',
            'Google 效能優化',
            'LINE / 電話連結',
            '終身免主機費',
        ],
    },
    {
        id: 'cms-standard',
        name: '套版官網 + 小型後台',
        description: '內建直覺後台系統，讓您隨時自主更新最新消息與內容。5-7 天交付。',
        price: 15000,
        image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=80',
        category: 'website',
        badge: { type: 'hot', text: '🏆 推薦首選' },
        rating: 4.9,
        reviews: 128,
        features: [
            '包含套版官網所有功能',
            '簡易管理後台 (CMS)',
            '自主更新 Banner/消息',
            '智慧媒體庫管理',
            '2 年技術維護支援',
        ],
    },
    {
        id: 'pro-cms',
        name: '專業形象官網 + 小型後台',
        description: '量身打造品牌質感設計，深色/極簡多種風格可調，展現專業辨識度生產力。',
        price: 25000,
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
        category: 'website',
        badge: { type: 'rank', text: '✨ 質感推薦' },
        rating: 5.0,
        reviews: 86,
        features: [
            '包含套版+後台所有功能',
            '品牌視覺風格深度規劃',
            '精緻滾動動態效果',
            '智慧行銷表單整合',
            'VIP 優先服務支援',
        ],
    },
    // 功能加購
    {
        id: 'addon-domain',
        name: '專屬網域綁定',
        description: '綁定您的專屬網域（.com / .tw），提升品牌專業度。含 1 年維護。',
        price: 3500,
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
        category: 'addon',
        badge: { type: 'new', text: '年費' },
        rating: 5.0,
        features: [
            '.com / .tw 網域代管',
            'DNS 專業設定',
            'SSL 憑證配置',
            '續約自動提醒',
        ],
    },
    {
        id: 'addon-ecommerce',
        name: '電商金流模組',
        description: '完整的購物車與金流整合，支援信用卡、超商付款。讓網站開始銷售。',
        price: 20000,
        image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80',
        category: 'addon',
        badge: { type: 'sale', text: '熱門' },
        rating: 4.8,
        features: [
            '購物車系統整合',
            '金流串接 (ECPay/藍新)',
            '訂單管理後台',
            '物流資訊同步',
        ],
    },
    {
        id: 'maintenance-year',
        name: '年度進階維護方案',
        description: '專業技術團隊守護您的網站。含每季內容更新、系統安全性更新、定期備份。',
        price: 12000,
        image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
        category: 'maintenance',
        badge: null,
        rating: 4.9,
        features: [
            '每季圖文內容更新',
            '系統安全性更新修補',
            '全站資料定期備份',
            '優先技術諮詢服務',
        ],
    },
];

