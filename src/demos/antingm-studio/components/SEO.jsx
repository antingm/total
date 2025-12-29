/**
 * SEO Component - 動態 Meta 標籤管理
 * 使用 react-helmet-async 為每個頁面設定獨立的 SEO 資訊
 */

import { Helmet } from 'react-helmet-async';

// 網站基本設定
const SITE_CONFIG = {
    siteName: 'Anting Studio 安庭網頁工作室',
    siteUrl: 'https://anting-studio.com',
    defaultDescription: '專業網頁設計與網站架設服務。會員價 $15,000 起。Google 100 分極速體驗、終身維護支援、專人即時服務。',
    defaultKeywords: '網頁設計, 網站架設, RWD響應式網頁, SEO優化, 台灣網頁設計, 形象官網, 電商網站, 一頁式網站, 網站製作',
    defaultImage: '/og-image.jpg', // 需要建立此圖片
    locale: 'zh_TW',
    twitterHandle: '@antingstudio',
};

/**
 * LocalBusiness 結構化資料
 */
const getLocalBusinessSchema = () => ({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Anting Studio 安庭網頁工作室",
    "description": "專業網頁設計與網站架設服務",
    "url": SITE_CONFIG.siteUrl,
    "telephone": "0930-693-088",
    "email": "anting13579@gmail.com",
    "address": {
        "@type": "PostalAddress",
        "addressLocality": "台北市",
        "addressRegion": "信義區",
        "addressCountry": "TW"
    },
    "priceRange": "NT$ 5,000 - NT$ 25,000",
    "serviceType": ["網頁設計", "網站架設", "RWD 響應式網頁", "SEO 優化"],
    "areaServed": {
        "@type": "Country",
        "name": "Taiwan"
    }
});

/**
 * CreativeWork 結構化資料 (用於作品頁面)
 */
export const getCreativeWorkSchema = (project) => ({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": project.description,
    "image": project.image,
    "dateCreated": project.createdAt,
    "creator": {
        "@type": "Organization",
        "name": "Anting Studio 安庭網頁工作室",
        "url": SITE_CONFIG.siteUrl
    }
});

/**
 * Article 結構化資料 (用於新聞/部落格)
 */
export const getArticleSchema = (article) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description || article.content?.substring(0, 150),
    "image": article.image,
    "datePublished": article.publishDate,
    "author": {
        "@type": "Organization",
        "name": "Anting Studio 安庭網頁工作室"
    },
    "publisher": {
        "@type": "Organization",
        "name": "Anting Studio 安庭網頁工作室",
        "url": SITE_CONFIG.siteUrl
    }
});

/**
 * SEO 元件
 * @param {Object} props
 * @param {string} props.title - 頁面標題
 * @param {string} props.description - 頁面描述
 * @param {string} props.keywords - 關鍵字（可選）
 * @param {string} props.image - OG 圖片 URL（可選）
 * @param {string} props.url - 頁面 URL（可選）
 * @param {string} props.type - OG 類型 (website, article 等)
 * @param {Object} props.schema - 額外的結構化資料（可選）
 * @param {boolean} props.noIndex - 是否禁止索引（可選）
 */
const SEO = ({
    title,
    description,
    keywords,
    image,
    url,
    type = 'website',
    schema,
    noIndex = false,
    includeLocalBusiness = false
}) => {
    // 處理標題格式
    const fullTitle = title
        ? `${title} | ${SITE_CONFIG.siteName}`
        : SITE_CONFIG.siteName;

    // 使用預設值
    const metaDescription = description || SITE_CONFIG.defaultDescription;
    const metaKeywords = keywords || SITE_CONFIG.defaultKeywords;
    const metaImage = image?.startsWith('http')
        ? image
        : `${SITE_CONFIG.siteUrl}${image || SITE_CONFIG.defaultImage}`;
    const canonicalUrl = url
        ? `${SITE_CONFIG.siteUrl}${url}`
        : SITE_CONFIG.siteUrl;

    return (
        <Helmet>
            {/* 基本 Meta 標籤 */}
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={metaKeywords} />
            <link rel="canonical" href={canonicalUrl} />

            {/* 禁止索引（如果需要） */}
            {noIndex && <meta name="robots" content="noindex, nofollow" />}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={metaImage} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:locale" content={SITE_CONFIG.locale} />
            <meta property="og:site_name" content={SITE_CONFIG.siteName} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={metaImage} />

            {/* 結構化資料 - LocalBusiness */}
            {includeLocalBusiness && (
                <script type="application/ld+json">
                    {JSON.stringify(getLocalBusinessSchema())}
                </script>
            )}

            {/* 額外的結構化資料 */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
