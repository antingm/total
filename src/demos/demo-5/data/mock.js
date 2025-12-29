// LUNA Fashion Nail - Mock Data

// 使用 Pexels 穩定的美甲圖片來源
const nailImages = {
    classic: 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=400',
    french: 'https://images.pexels.com/photos/704815/pexels-photo-704815.jpeg?auto=compress&cs=tinysrgb&w=400',
    art: 'https://images.pexels.com/photos/939836/pexels-photo-939836.jpeg?auto=compress&cs=tinysrgb&w=400',
    extension: 'https://images.pexels.com/photos/3997391/pexels-photo-3997391.jpeg?auto=compress&cs=tinysrgb&w=400',
    care: 'https://images.pexels.com/photos/3997386/pexels-photo-3997386.jpeg?auto=compress&cs=tinysrgb&w=400',
    japanese: 'https://images.pexels.com/photos/1303082/pexels-photo-1303082.jpeg?auto=compress&cs=tinysrgb&w=400',
};

const bannerImages = {
    promo1: 'https://images.pexels.com/photos/939835/pexels-photo-939835.jpeg?auto=compress&cs=tinysrgb&w=800',
    promo2: 'https://images.pexels.com/photos/3997383/pexels-photo-3997383.jpeg?auto=compress&cs=tinysrgb&w=800',
    promo3: 'https://images.pexels.com/photos/704815/pexels-photo-704815.jpeg?auto=compress&cs=tinysrgb&w=800',
};

const galleryImages = {
    img1: 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=600',
    img2: 'https://images.pexels.com/photos/704815/pexels-photo-704815.jpeg?auto=compress&cs=tinysrgb&w=600',
    img3: 'https://images.pexels.com/photos/939836/pexels-photo-939836.jpeg?auto=compress&cs=tinysrgb&w=600',
    img4: 'https://images.pexels.com/photos/3997391/pexels-photo-3997391.jpeg?auto=compress&cs=tinysrgb&w=600',
    img5: 'https://images.pexels.com/photos/1303082/pexels-photo-1303082.jpeg?auto=compress&cs=tinysrgb&w=600',
    img6: 'https://images.pexels.com/photos/3997386/pexels-photo-3997386.jpeg?auto=compress&cs=tinysrgb&w=600',
};

// 服務項目
export const services = [
    {
        id: 1,
        title: '經典單色',
        description: '純色凝膠，簡約時尚',
        price: 800,
        duration: 60,
        image: nailImages.classic,
        category: '基礎款'
    },
    {
        id: 2,
        title: '法式漸層',
        description: '經典法式搭配漸層設計',
        price: 1200,
        duration: 90,
        image: nailImages.french,
        category: '進階款'
    },
    {
        id: 3,
        title: '手繪藝術款',
        description: '專業手繪圖案設計',
        price: 1800,
        duration: 120,
        image: nailImages.art,
        category: '藝術款'
    },
    {
        id: 4,
        title: '光療延甲',
        description: '自然延長，持久亮麗',
        price: 2200,
        duration: 150,
        image: nailImages.extension,
        category: '延甲服務'
    },
    {
        id: 5,
        title: '卸甲保養',
        description: '溫和卸除，深層滋養',
        price: 500,
        duration: 45,
        image: nailImages.care,
        category: '基礎款'
    },
    {
        id: 6,
        title: '日式凝膠彩繪',
        description: '精緻日系風格設計',
        price: 2500,
        duration: 150,
        image: nailImages.japanese,
        category: '藝術款'
    }
];

// 設計師團隊 - 使用首字母代替頭像
export const stylists = [
    {
        id: 1,
        name: '小雅',
        avatar: null,
        initial: '雅',
        color: 'from-pink-400 to-rose-500',
        rating: 4.9,
        expertise: '日式凝膠',
        experience: '5年',
        bio: '專精日系精緻風格，細膩手法'
    },
    {
        id: 2,
        name: '妍妍',
        avatar: null,
        initial: '妍',
        color: 'from-violet-400 to-purple-500',
        rating: 4.8,
        expertise: '手繪藝術',
        experience: '7年',
        bio: '擅長創意手繪設計，獨特風格'
    },
    {
        id: 3,
        name: '小薰',
        avatar: null,
        initial: '薰',
        color: 'from-amber-400 to-orange-500',
        rating: 4.9,
        expertise: '法式經典',
        experience: '6年',
        bio: '法式優雅風格專家，氣質首選'
    },
    {
        id: 4,
        name: '品萱',
        avatar: null,
        initial: '萱',
        color: 'from-emerald-400 to-teal-500',
        rating: 5.0,
        expertise: '時尚造型',
        experience: '8年',
        bio: '品牌創始人・首席設計師'
    }
];

// 時間槽位
export const timeSlots = [
    '10:00', '10:30', '11:00', '11:30',
    '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00', '18:30'
];

// 模擬已被預約的時段
export const bookedSlots = {
    '2025-12-12': ['10:00', '14:00', '15:30'],
    '2025-12-13': ['11:00', '13:00', '16:00', '17:30'],
    '2025-12-14': ['10:30', '14:30'],
    '2025-12-15': ['13:00', '15:00', '18:00']
};

// 會員資訊
export const memberInfo = {
    name: '小珊',
    cardNumber: 'LUNA-2024-8888',
    level: 'Gold',
    points: 1280,
    joinDate: '2023-06-15',
    totalVisits: 24
};

// 預約歷史
export const bookingHistory = [
    {
        id: 'BK20241210',
        date: '2024-12-10',
        time: '14:00',
        service: '日式凝膠彩繪',
        stylist: '小雅',
        price: 2500,
        status: 'completed'
    },
    {
        id: 'BK20241125',
        date: '2024-11-25',
        time: '15:30',
        service: '法式漸層',
        stylist: '小薰',
        price: 1200,
        status: 'completed'
    },
    {
        id: 'BK20241108',
        date: '2024-11-08',
        time: '11:00',
        service: '經典單色',
        stylist: '妍妍',
        price: 800,
        status: 'completed'
    }
];

// 即將進行的預約
export const upcomingBooking = {
    id: 'BK20241215',
    date: '2024-12-15',
    time: '14:00',
    service: '手繪藝術款',
    stylist: '品萱',
    price: 1800,
    status: 'confirmed'
};

// 作品集
export const galleryItems = [
    { id: 1, image: galleryImages.img1, category: '日式', likes: 128 },
    { id: 2, image: galleryImages.img2, category: '法式', likes: 95 },
    { id: 3, image: galleryImages.img3, category: '藝術', likes: 156 },
    { id: 4, image: galleryImages.img4, category: '延甲', likes: 87 },
    { id: 5, image: galleryImages.img5, category: '日式', likes: 203 },
    { id: 6, image: galleryImages.img6, category: '簡約', likes: 142 }
];

// 促銷活動
export const promotions = [
    { id: 1, title: '新客體驗 85 折', subtitle: '首次預約享專屬優惠', image: bannerImages.promo1, code: 'NEWLUNA' },
    { id: 2, title: '聖誕限定款式', subtitle: '節日專屬設計・限量預約中', image: bannerImages.promo2, code: null },
    { id: 3, title: '閨蜜同行優惠', subtitle: '兩人同行・第二位享 7 折', image: bannerImages.promo3, code: 'BESTIE' }
];
