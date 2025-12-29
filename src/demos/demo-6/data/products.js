// 產品數據
export const products = [
    {
        id: 1,
        name: '專利植萃膠囊',
        subtitle: '喚醒原生保護力',
        description: '中西醫博士聯手研發，專利複方配方',
        price: 1280,
        originalPrice: 1580,
        image: '/product-main.png',
        badges: ['SGS檢驗合格', '無農藥殘留', 'HACCP認證', '專利配方'],
    }
];

// 價格方案
export const pricingPlans = [
    {
        id: 'trial',
        name: '體驗組',
        quantity: 1,
        price: 1280,
        originalPrice: 1580,
        perUnit: 1280,
        savings: 300,
        isPopular: false,
        badge: null,
    },
    {
        id: 'value',
        name: '超值組',
        quantity: 3,
        price: 3340,
        originalPrice: 4740,
        perUnit: 1113,
        savings: 1400,
        isPopular: true,
        badge: '熱銷 No.1',
    },
    {
        id: 'family',
        name: '囤貨組',
        quantity: 6,
        price: 5980,
        originalPrice: 9480,
        perUnit: 997,
        savings: 3500,
        isPopular: false,
        badge: '最划算',
    },
];

// 痛點列表
export const painPoints = [
    {
        id: 1,
        text: '換季時總是感覺不適，身體無法快速調節',
        icon: 'thermometer',
    },
    {
        id: 2,
        text: '日常作息不規律，導致精神不濟、容易疲勞',
        icon: 'moon',
    },
    {
        id: 3,
        text: '外食頻繁，擔心營養攝取不均衡',
        icon: 'utensils',
    },
    {
        id: 4,
        text: '年紀漸長，保護力下滑，小毛病不斷',
        icon: 'shield',
    },
];

// 核心成分
export const ingredients = [
    {
        id: 1,
        name: '專利葉黃素',
        description: '美國 FloraGLO® 專利，生物利用率高達 90%',
        icon: 'eye',
        color: 'green',
    },
    {
        id: 2,
        name: '複合益生菌',
        description: '8 種專利菌株，每份含 500 億活菌',
        icon: 'sparkles',
        color: 'blue',
    },
    {
        id: 3,
        name: '紐西蘭蜂膠',
        description: '純淨無污染產地，富含類黃酮',
        icon: 'shield',
        color: 'amber',
    },
    {
        id: 4,
        name: '有機薑黃素',
        description: '95% 高濃度萃取，搭配黑胡椒增強吸收',
        icon: 'flame',
        color: 'orange',
    },
];

// 醫師推薦
export const doctorEndorsement = {
    name: '李明哲 博士',
    title: '中西醫結合專家',
    qualification: '台大醫學院免疫學博士',
    image: '/doctor.png',
    quote: '「這款產品結合了傳統草本智慧與現代科學驗證，是我會推薦給家人的保健選擇。」',
    signature: '李明哲',
};

// FAQ 問答
export const faqs = [
    {
        id: 1,
        question: '素食者可以食用嗎？',
        answer: '是的，本產品採用植物性膠囊，不含任何動物成分，純素者可安心食用。我們的產品已通過素食認證。',
    },
    {
        id: 2,
        question: '孕婦或哺乳期可以使用嗎？',
        answer: '建議孕婦或哺乳期婦女在食用前先諮詢專業醫師或營養師的意見，以確保符合個人健康需求。',
    },
    {
        id: 3,
        question: '每天要吃多少？什麼時候吃最好？',
        answer: '建議每日 2 粒，餐後食用吸收效果最佳。可搭配早餐或晚餐後服用，讓營養素隨餐點一起消化吸收。',
    },
    {
        id: 4,
        question: '有通過什麼檢驗認證嗎？',
        answer: '本產品通過 SGS 食品安全檢驗、HACCP 認證、無農藥殘留檢驗，並在 GMP 認證工廠製造，品質有保障。',
    },
    {
        id: 5,
        question: '吃多久會有感覺？',
        answer: '每個人體質不同，一般建議持續食用 4-8 週可感受到明顯變化。長期保養效果更佳，建議養成每日補充的習慣。',
    },
];

// 品牌資訊
export const brandInfo = {
    name: '綠研生醫',
    englishName: 'Nature Lab',
    slogan: '專利植萃，喚醒原生保護力',
    founded: 2018,
    certifications: ['SGS', 'HACCP', 'GMP', 'ISO22000'],
};
