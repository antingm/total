// 潔淨管家 (Turbo Clean) - 網站文案資料

export const HERO_CONTENT = {
  title: '讓家煥然一新，享受五星級的潔淨生活。',
  subtitle: '專業居家清潔、除蟎服務。立即預約，首購享 9 折。',
  ctaText: '立即預約',
  ctaPhone: 'tel:0800-888-999',
};

export const PAIN_POINTS = [
  {
    id: 1,
    icon: 'Clock',
    title: '沒時間打掃?',
    description: '工作忙碌、家務堆積？我們的專業團隊幫您省下寶貴時間，讓您專注於真正重要的事。',
  },
  {
    id: 2,
    icon: 'Wind',
    title: '過敏原困擾?',
    description: '塵蟎、灰塵讓您噴嚏不斷？我們使用專業除蟎設備，打造無過敏原的健康居家環境。',
  },
  {
    id: 3,
    icon: 'Home',
    title: '搬家清潔?',
    description: '新居入住前的深層清潔，或是退租時的恢復原貌，我們都能幫您處理得乾乾淨淨。',
  },
];

export const PRICING_PLANS = [
  {
    id: 1,
    name: '體驗方案',
    price: 'NT$ 1,500',
    priceNote: '單次',
    features: [
      '2 小時基礎清潔',
      '客廳 + 廚房 + 1 間衛浴',
      '專業清潔工具',
      '滿意保證',
    ],
    ctaText: '預約體驗',
    popular: false,
  },
  {
    id: 2,
    name: '定期清潔',
    price: 'NT$ 1,200',
    priceNote: '每次',
    features: [
      '3 小時深度清潔',
      '全屋清潔（含所有房間）',
      '固定清潔師傅',
      '專屬客服支援',
      '可彈性調整時間',
    ],
    ctaText: '立即訂閱',
    popular: true,
  },
  {
    id: 3,
    name: '大掃除專案',
    price: '客製報價',
    priceNote: '依坪數計算',
    features: [
      '年終/換季大掃除',
      '全屋深層清潔',
      '窗戶/紗窗清潔',
      '油煙機深度清潔',
      '免費到府估價',
    ],
    ctaText: '免費估價',
    popular: false,
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: '林小姐',
    location: '台北市大安區',
    rating: 5,
    comment: '清潔師傅非常專業又細心，連平常忽略的角落都打掃得很乾淨。以後清潔就靠潔淨管家了！',
  },
  {
    id: 2,
    name: '陳先生',
    location: '新北市板橋區',
    rating: 5,
    comment: '預約流程很方便，清潔品質超乎預期。家裡有小朋友更需要乾淨的環境，大力推薦！',
  },
  {
    id: 3,
    name: '王太太',
    location: '台中市西屯區',
    rating: 5,
    comment: '用了他們的除蟎服務後，老公的過敏症狀減輕了很多。價格合理，服務到位，五星好評！',
  },
];

export const FAQ_ITEMS = [
  {
    id: 1,
    question: '清潔服務包含哪些項目？',
    answer: '基礎清潔包含地板清潔、家具表面擦拭、廚房清潔、浴室清潔等。深度清潔則加入除蟎、窗戶清潔、油煙機清潔等項目。詳細項目可依您的需求客製化調整。',
  },
  {
    id: 2,
    question: '需要自己準備清潔用品嗎？',
    answer: '不需要！我們的清潔師傅會自備所有專業清潔工具與環保清潔劑。若您有特殊需求或偏好的清潔用品，也歡迎事先告知。',
  },
  {
    id: 3,
    question: '清潔過程中需要在家嗎？',
    answer: '不一定。許多客戶會在清潔期間外出，只需事先安排好進出方式即可。我們所有清潔師傅都經過嚴格背景審核，您可以放心。',
  },
  {
    id: 4,
    question: '如何支付費用？',
    answer: '我們接受現金、信用卡、LINE Pay、街口支付等多種付款方式。定期清潔客戶也可選擇月結方案。',
  },
  {
    id: 5,
    question: '如果對清潔結果不滿意怎麼辦？',
    answer: '我們提供「滿意保證」服務！若您對清潔結果不滿意，請在 24 小時內通知我們，我們將免費安排重新清潔。',
  },
];

export const CONTACT_INFO = {
  phone: '0800-888-999',
  phoneDisplay: '0800-888-999',
  lineId: '@turboclean',
  lineUrl: 'https://line.me/R/ti/p/@turboclean',
};

// 公司資訊
export const companyInfo = {
  name: '潔淨管家',
  tagline: '讓家煥然一新，享受五星級的潔淨生活。',
};

// 導航連結
export const navLinks = [
  { id: 'services', title: '服務項目' },
  { id: 'about', title: '關於我們' },
  { id: 'portfolio', title: '服務案例' },
  { id: 'pricing', title: '價格方案' },
  { id: 'faq', title: '常見問題' },
];

// 頁尾內容
export const footerContent = {
  description: '專業居家清潔、除蟎服務，讓您享受乾淨舒適的居家環境。',
  quickLinks: [
    { href: '#services', title: '服務項目' },
    { href: '#about', title: '關於我們' },
    { href: '#pricing', title: '價格方案' },
    { href: '#contact', title: '聯絡我們' },
  ],
};

// 聯絡資訊
export const contactInfo = {
  phone: '0800-888-999',
  email: 'service@turboclean.tw',
  address: '台北市大安區忠孝東路四段 100 號',
};

// 服務項目
export const services = [
  {
    id: 1,
    icon: 'Home',
    title: '居家清潔',
    description: '全屋基礎清潔、深度整理，讓您的家煥然一新。',
  },
  {
    id: 2,
    icon: 'Wind',
    title: '專業除蟎',
    description: '使用專業設備，有效去除塵蟎過敏原。',
  },
  {
    id: 3,
    icon: 'Sparkles',
    title: '大掃除服務',
    description: '年終換季大掃除，深層清潔每個角落。',
  },
  {
    id: 4,
    icon: 'Building',
    title: '搬家清潔',
    description: '新居入住前/退租清潔，恢復原貌。',
  },
];

// 作品集圖片
export const portfolioImages = [
  {
    id: 1,
    title: '客廳清潔',
    category: '居家清潔',
    image: '/images/portfolio-1.jpg',
  },
  {
    id: 2,
    title: '廚房深度清潔',
    category: '深度清潔',
    image: '/images/portfolio-2.jpg',
  },
  {
    id: 3,
    title: '衛浴清潔',
    category: '居家清潔',
    image: '/images/portfolio-3.jpg',
  },
];

// 關於我們內容
export const aboutContent = {
  title: '潔淨管家',
  subtitle: '您的居家清潔專家',
  description: '我們是專業的居家清潔團隊，致力於提供高品質的清潔服務。每位清潔師傅都經過嚴格訓練與背景審核，使用環保清潔用品，為您打造安心、舒適的居家環境。',
  highlights: [
    { id: 1, icon: 'Shield', title: '嚴格審核', description: '所有師傅皆通過背景審核' },
    { id: 2, icon: 'Leaf', title: '環保用品', description: '使用環保無毒清潔劑' },
    { id: 3, icon: 'Award', title: '品質保證', description: '滿意度 100% 保證' },
  ],
};
