// ============================================
// 零食電商網站 - 資料常數
// ============================================

// 網站資訊
export const SITE_INFO = {
  name: '爆爆花桶',
  tagline: '來自宇宙的美味驚喜',
  description: '頂級手工爆米花專賣店，嚴選頂級原料，獨家研發多種創意口味',
  logo: '🍿',
};

// 導航連結
export const NAV_LINKS = [
  { label: '所有商品', href: '#products' },
  { label: '熱銷排行', href: '#bestsellers' },
  { label: '甜口味', href: '#sweet' },
  { label: '鹹口味', href: '#savory' },
  { label: '禮盒專區', href: '#gift' },
  { label: '關於我們', href: '#about' },
];

// 頂部公告列
export const ANNOUNCEMENT = {
  text: '🎉 新會員首購享 85 折優惠！單筆滿 $599 免運費 🚚',
  link: '#',
};

// Hero 輪播圖
export const HERO_SLIDES = [
  {
    id: 1,
    title: '冬季限定\n草莓巧克力爆米花',
    subtitle: '酸甜草莓 × 濃郁巧克力的完美邂逅',
    cta: '立即搶購',
    image: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=1600&q=80',
    bgColor: '#FFE4E1',
  },
  {
    id: 2,
    title: '年節禮盒\n早鳥預購中',
    subtitle: '最佳伴手禮首選，限時 75 折起',
    cta: '查看禮盒',
    image: 'https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?w=1600&q=80',
    bgColor: '#FFF8DC',
  },
  {
    id: 3,
    title: '經典人氣\n焦糖海鹽爆米花',
    subtitle: '回購率 No.1，一吃就上癮',
    cta: '加入購物車',
    image: 'https://images.unsplash.com/photo-1585647347483-22b66260dfff?w=1600&q=80',
    bgColor: '#F5F5DC',
  },
];

// 促銷功能區
export const PROMO_FEATURES = [
  {
    icon: 'Gift',
    title: '新會員禮',
    description: '首購 85 折 + 免運',
    highlight: true,
  },
  {
    icon: 'Truck',
    title: '快速到貨',
    description: '全台 2-3 天配送',
    highlight: false,
  },
  {
    icon: 'MessageCircle',
    title: 'LINE 好友',
    description: '加入領 $50 折價券',
    highlight: true,
  },
  {
    icon: 'RefreshCw',
    title: '安心退換',
    description: '7 天鑑賞期',
    highlight: false,
  },
];

// 商品資料
export const PRODUCTS = [
  {
    id: 1,
    name: '經典焦糖海鹽爆米花',
    description: '法國海鹽 × 手工焦糖',
    originalPrice: 299,
    salePrice: 249,
    image: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=600&q=80',
    badge: { type: 'rank', text: 'TOP 1' },
    category: 'sweet',
    rating: 4.9,
    reviews: 2847,
  },
  {
    id: 2,
    name: '玫瑰草莓巧克力',
    description: '新鮮草莓 × 比利時巧克力',
    originalPrice: 359,
    salePrice: 299,
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&q=80',
    badge: { type: 'new', text: 'NEW' },
    category: 'sweet',
    rating: 4.8,
    reviews: 1256,
  },
  {
    id: 3,
    name: '松露帕瑪森起司',
    description: '義大利黑松露 × 起司風味',
    originalPrice: 399,
    salePrice: 339,
    image: 'https://images.unsplash.com/photo-1585647347483-22b66260dfff?w=600&q=80',
    badge: { type: 'hot', text: '熱賣' },
    category: 'savory',
    rating: 4.7,
    reviews: 986,
  },
  {
    id: 4,
    name: '日式抹茶拿鐵',
    description: '京都宇治抹茶 × 香醇牛奶',
    originalPrice: 329,
    salePrice: 279,
    image: 'https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?w=600&q=80',
    badge: { type: 'sale', text: '85折' },
    category: 'sweet',
    rating: 4.6,
    reviews: 753,
  },
  {
    id: 5,
    name: '蒜香奶油培根',
    description: '蒜香四溢 × 培根鹹香',
    originalPrice: 319,
    salePrice: 269,
    image: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=600&q=80',
    badge: { type: 'rank', text: 'TOP 2' },
    category: 'savory',
    rating: 4.8,
    reviews: 1432,
  },
  {
    id: 6,
    name: '蜂蜜奶油楓糖',
    description: '加拿大楓糖 × 香濃奶油',
    originalPrice: 349,
    salePrice: 299,
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&q=80',
    badge: null,
    category: 'sweet',
    rating: 4.5,
    reviews: 628,
  },
  {
    id: 7,
    name: '椒鹽四川麻辣',
    description: '青花椒 × 正宗麻辣風味',
    originalPrice: 299,
    salePrice: 249,
    image: 'https://images.unsplash.com/photo-1585647347483-22b66260dfff?w=600&q=80',
    badge: { type: 'hot', text: '人氣' },
    category: 'savory',
    rating: 4.7,
    reviews: 891,
  },
  {
    id: 8,
    name: '黑糖珍珠奶茶',
    description: '台灣黑糖 × 珍珠奶茶風味',
    originalPrice: 369,
    salePrice: 319,
    image: 'https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?w=600&q=80',
    badge: { type: 'new', text: '限定' },
    category: 'sweet',
    rating: 4.9,
    reviews: 567,
  },
];

// 禮盒專區
export const GIFT_SETS = [
  {
    id: 'gift-1',
    name: '經典四入禮盒',
    description: '最受歡迎的四種口味一次擁有',
    originalPrice: 1196,
    salePrice: 899,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&q=80',
    items: ['經典焦糖', '起司風味', '抹茶拿鐵', '草莓巧克力'],
  },
  {
    id: 'gift-2',
    name: '豪華六入禮盒',
    description: '頂級伴手禮首選',
    originalPrice: 1794,
    salePrice: 1299,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&q=80',
    items: ['全系列六款精選口味'],
  },
];

// 頁尾連結
export const FOOTER_LINKS = {
  about: {
    title: '關於我們',
    links: [
      { label: '品牌故事', href: '#' },
      { label: '門市資訊', href: '#' },
      { label: '企業合作', href: '#' },
      { label: '加入我們', href: '#' },
    ],
  },
  service: {
    title: '購物說明',
    links: [
      { label: '付款方式', href: '#' },
      { label: '運送說明', href: '#' },
      { label: '退換貨政策', href: '#' },
      { label: '常見問題', href: '#' },
    ],
  },
  contact: {
    title: '聯絡我們',
    items: [
      { icon: 'Phone', text: '客服專線：0800-123-456' },
      { icon: 'Mail', text: 'service@starsnack.com' },
      { icon: 'Clock', text: '週一至週五 09:00-18:00' },
    ],
  },
  social: {
    title: '關注我們',
    links: [
      { icon: 'Facebook', href: '#', label: 'Facebook' },
      { icon: 'Instagram', href: '#', label: 'Instagram' },
      { icon: 'MessageCircle', href: '#', label: 'LINE' },
    ],
  },
};

// 統計數據
export const STATS = [
  { value: '50+', label: '獨家口味' },
  { value: '100萬+', label: '滿意顧客' },
  { value: '4.9', label: '平均評分' },
  { value: '30+', label: '銷售國家' },
];
