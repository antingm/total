// 可用模組清單 - 集中管理所有可配置的模組
export const AVAILABLE_MODULES = [
    {
        id: 'ExampleModule',
        name: '範例模組',
        description: '展示模組系統如何運作',
        icon: 'Sparkles',
        category: 'demo',
        defaultStyle: {
            theme: 'indigo',
            size: 'default'
        },
        positions: ['header', 'main', 'sidebar', 'footer', 'floating', 'modal', 'canvas'],
        editableFields: [
            { key: 'title', label: '標題', type: 'text', default: '範例模組' },
            { key: 'description', label: '說明', type: 'textarea', default: '這是一個範例模組' }
        ]
    },
    {
        id: 'CartModule',
        name: '購物車',
        description: '完整的購物車功能，含側邊欄與結帳流程',
        icon: 'ShoppingCart',
        category: 'ecommerce',
        defaultStyle: {
            theme: 'emerald',
            size: 'default',
            variant: 'floating'
        },
        positions: ['header', 'main', 'sidebar', 'footer', 'floating', 'modal', 'canvas'],
        editableFields: [] // 購物車內容由商品決定，無需編輯
    },
    {
        id: 'BookingModule',
        name: '預約系統',
        description: '多步驟預約流程，支援服務與時段選擇',
        icon: 'Calendar',
        category: 'booking',
        defaultStyle: {
            theme: 'rose',
            size: 'default',
            compact: false
        },
        positions: ['header', 'main', 'sidebar', 'footer', 'floating', 'modal', 'canvas'],
        editableFields: [
            { key: 'title', label: '標題', type: 'text', default: '線上預約' },
            {
                key: 'services',
                label: '服務項目',
                type: 'serviceList',
                default: [
                    { id: 1, name: '基本服務', price: 500, duration: 60 }
                ]
            },
            {
                key: 'stylists',
                label: '服務人員',
                type: 'staffList',
                default: [
                    { id: 1, name: '服務人員 A' }
                ]
            }
        ]
    },
    {
        id: 'ContactModule',
        name: '聯絡表單',
        description: '含地址、電話、Email 的聯絡表單',
        icon: 'Mail',
        category: 'contact',
        defaultStyle: {
            theme: 'indigo',
            size: 'default'
        },
        positions: ['header', 'main', 'sidebar', 'footer', 'floating', 'modal', 'canvas'],
        editableFields: [
            { key: 'title', label: '標題', type: 'text', default: '聯絡我們' },
            { key: 'address', label: '地址', type: 'text', default: '' },
            { key: 'phone', label: '電話', type: 'text', default: '' },
            { key: 'email', label: 'Email', type: 'text', default: '' },
            { key: 'lineId', label: 'LINE ID', type: 'text', default: '' }
        ]
    },
    {
        id: 'FAQModule',
        name: '常見問答',
        description: '可折疊的 FAQ 問答列表',
        icon: 'HelpCircle',
        category: 'content',
        defaultStyle: {
            theme: 'sky',
            size: 'default'
        },
        positions: ['header', 'main', 'sidebar', 'footer', 'floating', 'modal', 'canvas'],
        editableFields: [
            { key: 'title', label: '標題', type: 'text', default: '常見問題' },
            {
                key: 'items',
                label: '問答項目',
                type: 'faqList',
                default: [
                    { question: '問題 1', answer: '答案 1' }
                ]
            }
        ]
    },
    {
        id: 'TestimonialModule',
        name: '客戶評價',
        description: '輪播式客戶好評展示',
        icon: 'Star',
        category: 'social',
        defaultStyle: {
            theme: 'amber',
            size: 'default'
        },
        positions: ['header', 'main', 'sidebar', 'footer', 'floating', 'modal', 'canvas'],
        editableFields: [
            { key: 'title', label: '標題', type: 'text', default: '客戶好評' }
        ]
    },
    {
        id: 'PricingModule',
        name: '價格方案',
        description: '多方案價格卡片展示',
        icon: 'CreditCard',
        category: 'ecommerce',
        defaultStyle: {
            theme: 'purple',
            size: 'default'
        },
        positions: ['header', 'main', 'sidebar', 'footer', 'floating', 'modal', 'canvas'],
        editableFields: [
            { key: 'title', label: '標題', type: 'text', default: '價格方案' }
        ]
    },
    {
        id: 'GalleryModule',
        name: '圖片展示',
        description: '網格式圖片展示，支援 Lightbox',
        icon: 'Image',
        category: 'content',
        defaultStyle: {
            theme: 'indigo',
            columns: 3
        },
        positions: ['header', 'main', 'sidebar', 'footer', 'floating', 'modal', 'canvas'],
        editableFields: [
            { key: 'title', label: '標題', type: 'text', default: '作品集' },
            { key: 'columns', label: '欄數', type: 'number', default: 3, min: 2, max: 5 }
        ]
    },
    {
        id: 'AuthModule',
        name: '會員登入',
        description: '登入、註冊、會員選單功能',
        icon: 'User',
        category: 'auth',
        defaultStyle: {
            theme: 'indigo',
            size: 'default'
        },
        positions: ['header', 'main', 'sidebar', 'footer', 'floating', 'modal', 'canvas'],
        editableFields: [] // 登入模組無需編輯內容
    },
    {
        id: 'AnalyticsModule',
        name: '統計分析',
        description: '訪客、訂單、營收等數據儀表板',
        icon: 'BarChart3',
        category: 'analytics',
        defaultStyle: {
            theme: 'indigo',
            size: 'default'
        },
        positions: ['header', 'main', 'sidebar', 'footer', 'floating', 'modal', 'canvas'],
        editableFields: [
            { key: 'title', label: '標題', type: 'text', default: '數據統計' }
        ]
    }
];


// 可用位置清單
export const AVAILABLE_POSITIONS = [
    { id: 'header', name: '頁首區', icon: 'ArrowUp' },
    { id: 'main', name: '主內容區', icon: 'Layout' },
    { id: 'sidebar', name: '側邊欄', icon: 'Sidebar' },
    { id: 'footer', name: '頁尾區', icon: 'ArrowDown' },
    { id: 'floating', name: '浮動按鈕', icon: 'Move' },
    { id: 'modal', name: '彈窗觸發', icon: 'Maximize2' },
    { id: 'canvas', name: '自由畫布', icon: 'Grid3X3' }
];

// 主題色選項
export const THEME_COLORS = [
    { id: 'indigo', name: '靛藍', color: '#6366f1' },
    { id: 'emerald', name: '翠綠', color: '#10b981' },
    { id: 'rose', name: '玫瑰', color: '#f43f5e' },
    { id: 'amber', name: '琥珀', color: '#f59e0b' },
    { id: 'sky', name: '天藍', color: '#0ea5e9' },
    { id: 'purple', name: '紫羅蘭', color: '#a855f7' }
];

// 尺寸選項
export const SIZE_OPTIONS = [
    { id: 'mini', name: '迷你' },
    { id: 'default', name: '標準' },
    { id: 'large', name: '大型' }
];

// 模組分類
export const MODULE_CATEGORIES = [
    { id: 'all', name: '全部' },
    { id: 'ecommerce', name: '電商' },
    { id: 'booking', name: '預約' },
    { id: 'auth', name: '會員' },
    { id: 'analytics', name: '統計' },
    { id: 'contact', name: '聯絡' },
    { id: 'content', name: '內容' },
    { id: 'social', name: '社群' },
    { id: 'demo', name: '示範' }
];

export default AVAILABLE_MODULES;
