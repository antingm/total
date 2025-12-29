// 匠心設計 - 輕裝修官網常數與文案配置

// 品牌資訊
export const BRAND = {
    name: '匠心設計',
    tagline: '輕裝修美學',
    description: '透明報價、標準化工程、高效率服務',
    phone: '02-2345-6789',
    email: 'service@craftdesign.tw',
    lineId: '@craftdesign',
    lineUrl: 'https://line.me/R/ti/p/@craftdesign',
};

// 導航連結
export const NAV_LINKS = [
    { id: 'calculator', label: '預算試算' },
    { id: 'package', label: '服務內容' },
    { id: 'portfolio', label: '精選案例' },
    { id: 'trust', label: '品質保證' },
    { id: 'faq', label: '常見問題' },
];

// Hero 區塊
export const HERO = {
    title: '輕裝修美學',
    highlight: '36萬起',
    subtitle: '45天輕鬆入住',
    description: '透明報價 ╳ 全屋家具 ╳ 專業驗屋服務',
    features: [
        '一價全包，無隱藏費用',
        '標準化工程，品質可控',
        '免費贈送專業驗屋',
    ],
    cta: {
        primary: '立即預約諮詢',
        secondary: '瀏覽案例',
    },
    backgroundImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80',
};

// 計算器配置
export const CALCULATOR = {
    title: '即時預算試算',
    subtitle: '選擇您的需求，獲得透明報價',
    roomTypes: [
        { id: 'one', label: '一房一廳', basePrice: 360000 },
        { id: 'two', label: '二房一廳', basePrice: 480000 },
        { id: 'three', label: '三房二廳', basePrice: 620000 },
    ],
    pricePerPing: 8000, // 每坪加價
    addons: [
        { id: 'ceiling', label: '天花板', price: 35000, icon: 'Layers' },
        { id: 'paint', label: '全屋油漆', price: 28000, icon: 'Paintbrush' },
        { id: 'cabinet', label: '系統櫃', price: 65000, icon: 'LayoutGrid' },
        { id: 'floor', label: '耐磨木地板', price: 45000, icon: 'Grid3X3' },
    ],
    note: '以上為參考價格，實際報價依現場丈量為準',
};

// 套餐內容
export const PACKAGE = {
    title: '一價全包！',
    highlight: '7大工程 ＋ 全屋家具',
    subtitle: '省時、省心、省錢的一站式裝修服務',
    items: [
        {
            icon: 'Shield',
            name: '室內保護',
            desc: '專業保護工程，守護您的家',
        },
        {
            icon: 'Plug',
            name: '水電配置',
            desc: '符合法規的安全配電',
        },
        {
            icon: 'Paintbrush',
            name: '天花油漆',
            desc: '無毒環保漆料，健康居住',
        },
        {
            icon: 'LayoutGrid',
            name: '系統櫃體',
            desc: '客製化收納，空間最大化',
        },
        {
            icon: 'Grid3X3',
            name: '耐磨地板',
            desc: '德國品質，15年保固',
        },
        {
            icon: 'Sparkles',
            name: '細部清潔',
            desc: '完工清潔，即刻入住',
        },
        {
            icon: 'Sofa',
            name: '風格家具',
            desc: '全屋家具一次配齊',
        },
        {
            icon: 'Palette',
            name: '專業設計',
            desc: '免費 3D 效果圖設計',
        },
    ],
};

// 作品集
export const PORTFOLIO = {
    title: '精選案例',
    subtitle: '超過 500 戶家庭的信任選擇',
    items: [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
            title: '北歐簡約風',
            location: '台北市信義區 28坪',
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
            title: '日式無印風',
            location: '新北市板橋區 32坪',
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
            title: '現代輕奢風',
            location: '台中市西屯區 45坪',
        },
        {
            id: 4,
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
            title: '溫馨鄉村風',
            location: '高雄市左營區 35坪',
        },
        {
            id: 5,
            image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80',
            title: '工業混搭風',
            location: '新竹市東區 26坪',
        },
        {
            id: 6,
            image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
            title: '奶油法式風',
            location: '台北市大安區 38坪',
        },
    ],
};

// 信任區塊
export const TRUST = {
    title: '不只裝潢',
    highlight: '更為您把關屋況',
    subtitle: '我們提供業界最完整的品質保障',
    items: [
        {
            icon: 'FileSearch',
            title: '免費專業驗屋',
            desc: '購買裝修服務即贈送價值 $15,000 的專業驗屋服務，使用專業儀器檢測漏水、結構、電路等 35 項屋況。',
        },
        {
            icon: 'ShieldCheck',
            title: '10年品質保固',
            desc: '工程完工後提供結構5年、水電10年的超長保固期，讓您住得安心、無後顧之憂。',
        },
        {
            icon: 'Receipt',
            title: '分階段驗收付款',
            desc: '採用 30-40-30 分階段付款制度，每階段驗收通過後才付款，資金有保障。',
        },
    ],
};

// FAQ 常見問題
export const FAQ = {
    title: '常見問題',
    subtitle: '您想了解的，我們都為您解答',
    items: [
        {
            question: '預算可以客製化調整嗎？',
            answer: '當然可以！我們的標準套餐是讓您快速了解費用的參考，實際服務可依您的需求增減項目。設計師會在丈量後提供完整的客製化報價，每一項費用都清楚透明。',
        },
        {
            question: '工期真的只要45天嗎？',
            answer: '是的！我們採用標準化施工流程與專屬工班制度，一般 20-35 坪的空間可在 45 個工作天內完工。若遇特殊屋況（如老屋翻新）可能需要額外時間，設計師會在評估後告知確切工期。',
        },
        {
            question: '是否有隱藏費用？',
            answer: '絕對沒有！我們堅持「報價即決價」的原則。簽約前會提供逐項明細的報價單，施工期間除非您主動要求追加項目，否則不會有任何額外費用。我們的透明化報價是客戶最信賴的服務特色。',
        },
        {
            question: '家具可以自行選購嗎？',
            answer: '可以的！套餐內的家具是我們精選的質感傢俱，但如果您有特別喜愛的品牌或款式，可以選擇不含家具的純工程方案，或與我們討論替換方案。',
        },
        {
            question: '可以只做局部裝修嗎？',
            answer: '當然可以！除了全屋輕裝修，我們也提供廚房翻新、浴室翻新、系統櫃訂製等單項服務。歡迎預約諮詢，設計師會依您的需求提供最適合的方案。',
        },
    ],
};

// 服務據點
export const LOCATIONS = [
    { city: '台北', address: '台北市大安區敦化南路二段88號', phone: '02-2345-6789' },
    { city: '台中', address: '台中市西屯區台灣大道三段168號', phone: '04-2345-6789' },
    { city: '高雄', address: '高雄市左營區博愛二路168號', phone: '07-345-6789' },
];

// Footer 連結
export const FOOTER = {
    about: {
        title: '關於我們',
        links: [
            { label: '品牌故事', href: '#' },
            { label: '設計團隊', href: '#' },
            { label: '服務流程', href: '#' },
        ],
    },
    service: {
        title: '服務項目',
        links: [
            { label: '全屋輕裝修', href: '#' },
            { label: '廚房翻新', href: '#' },
            { label: '浴室翻新', href: '#' },
        ],
    },
    support: {
        title: '客戶支援',
        links: [
            { label: '常見問題', href: '#faq' },
            { label: '保固服務', href: '#' },
            { label: '聯絡我們', href: '#' },
        ],
    },
    social: [
        { platform: 'line', url: 'https://line.me/R/ti/p/@craftdesign' },
        { platform: 'facebook', url: 'https://facebook.com/craftdesign' },
        { platform: 'instagram', url: 'https://instagram.com/craftdesign' },
    ],
};
