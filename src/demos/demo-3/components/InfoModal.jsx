import { X } from 'lucide-react';
import './InfoModal.css';

// 品牌故事內容
const BRAND_STORY = {
    title: '品牌故事',
    content: `
        <h3>🍿 從一個小攤位開始的夢想</h3>
        <p>
            2018年，創辦人在台北的一個小夜市攤位開始了爆爆花桶的故事。
            當時只有三種口味：經典焦糖、海鹽原味和起司玉米。
            憑藉著對品質的堅持和獨特的口味，很快就在當地打響了名號。
        </p>

        <h3>🌟 突破與成長</h3>
        <p>
            2020年，我們在台北開設了第一家實體門市，並開始研發更多創意口味。
            「日式抹茶白巧克力」、「韓式辣起司」、「泰式酸辣」等異國風味陸續推出，
            讓爆米花不再只是看電影的零食，而是一種美食體驗。
        </p>

        <h3>🎯 品質承諾</h3>
        <p>
            我們堅持使用頂級原料：選用美國進口的蝴蝶型玉米粒，搭配法國進口奶油，
            不添加任何人工香料和防腐劑。每一批爆米花都由經驗豐富的師傅手工製作，
            確保每一口都是最佳品質。
        </p>

        <h3>🌍 放眼國際</h3>
        <p>
            如今，爆爆花桶的商品已經銷售至全球30多個國家，
            在日本、韓國、新加坡、香港等地都有忠實的粉絲。
            我們相信，美味的爆米花能跨越文化和語言的障礙，將歡樂帶給每一個人。
        </p>
    `
};

// 門市資訊
const STORE_INFO = {
    title: '門市資訊',
    content: `
        <h3>📍 台北旗艦店</h3>
        <p><strong>地址：</strong>台北市信義區松仁路100號1樓</p>
        <p><strong>電話：</strong>02-2345-6789</p>
        <p><strong>營業時間：</strong>週一至週日 11:00 - 21:30</p>

        <h3>📍 台中門市</h3>
        <p><strong>地址：</strong>台中市西屯區台灣大道三段251號B1</p>
        <p><strong>電話：</strong>04-2345-6789</p>
        <p><strong>營業時間：</strong>週一至週日 11:00 - 22:00</p>

        <h3>📍 高雄門市</h3>
        <p><strong>地址：</strong>高雄市前鎮區中華五路789號2樓</p>
        <p><strong>電話：</strong>07-2345-6789</p>
        <p><strong>營業時間：</strong>週一至週日 11:00 - 21:30</p>

        <h3>📍 新竹快閃店</h3>
        <p><strong>地址：</strong>新竹市東區中華路二段360號</p>
        <p><strong>電話：</strong>03-2345-6789</p>
        <p><strong>營業時間：</strong>週五至週日 12:00 - 20:00</p>
        <p><em>※ 快閃店營業至 2025 年 3 月底</em></p>
    `
};

// 企業合作
const BUSINESS_COOPERATION = {
    title: '企業合作',
    content: `
        <h3>🤝 合作方案</h3>
        <p>爆爆花桶提供多樣化的企業合作方案，讓您的品牌與美味結合：</p>

        <h4>🎁 企業禮贈品</h4>
        <p>
            提供客製化包裝服務，可印製企業Logo、祝福語等。
            適合年節送禮、員工福利、客戶回饋等場合。
            <br><strong>最低訂購量：</strong>100份起
        </p>

        <h4>🏢 辦公室零食</h4>
        <p>
            每週/每月定期配送新鮮爆米花到您的辦公室。
            提升員工幸福感，增加團隊凝聚力。
            <br><strong>優惠：</strong>首月 85 折體驗價
        </p>

        <h4>🎬 活動贊助</h4>
        <p>
            我們樂於支持各類活動，包括：企業活動、展覽會場、
            電影首映、產品發表會等。提供現場製作服務或大量批發。
        </p>

        <h4>📩 聯繫我們</h4>
        <p>
            <strong>企業合作專線：</strong>02-8765-4321<br>
            <strong>Email：</strong>business@popbucket.com<br>
            <strong>服務時間：</strong>週一至週五 09:00 - 18:00
        </p>
    `
};

// 加入我們
const JOIN_US = {
    title: '加入我們',
    content: `
        <h3>🌟 成為爆爆花桶的一份子</h3>
        <p>我們正在尋找熱愛美食、充滿熱情的夥伴加入我們的團隊！</p>

        <h4>📌 目前開放職缺</h4>

        <h5>門市銷售專員（台北/台中/高雄）</h5>
        <ul>
            <li>負責門市銷售及客戶服務</li>
            <li>協助商品陳列及環境維護</li>
            <li>時薪 $200-250，含績效獎金</li>
        </ul>

        <h5>電商營運專員（台北）</h5>
        <ul>
            <li>負責線上商店營運、訂單處理</li>
            <li>客服諮詢及售後服務</li>
            <li>月薪 $35,000-45,000</li>
        </ul>

        <h5>行銷企劃（台北）</h5>
        <ul>
            <li>規劃品牌行銷策略</li>
            <li>社群媒體經營及內容創作</li>
            <li>月薪 $40,000-55,000</li>
        </ul>

        <h4>📩 應徵方式</h4>
        <p>
            請將履歷寄至：<strong>hr@popbucket.com</strong><br>
            主旨請註明：應徵職位-姓名
        </p>

        <h4>💝 員工福利</h4>
        <ul>
            <li>員工購買享 7 折優惠</li>
            <li>每月生日禮物</li>
            <li>完善培訓計畫</li>
            <li>勞健保及勞退提撥</li>
        </ul>
    `
};

// 付款方式
const PAYMENT_METHODS = {
    title: '付款方式',
    content: `
        <h3>💳 線上付款</h3>
        
        <h4>信用卡付款</h4>
        <p>支援 VISA、MasterCard、JCB、American Express</p>
        <p>支援分期付款：3期、6期、12期零利率（滿$1,000適用）</p>

        <h4>行動支付</h4>
        <ul>
            <li>LINE Pay</li>
            <li>Apple Pay</li>
            <li>Google Pay</li>
            <li>街口支付</li>
        </ul>

        <h4>ATM 轉帳</h4>
        <p>完成訂單後，系統將提供虛擬帳號</p>
        <p>請於訂單成立後 3 天內完成付款，逾期訂單將自動取消</p>

        <h3>🏪 超商付款</h3>
        
        <h4>超商代碼繳費</h4>
        <p>訂單金額限 $20,000 以下</p>
        <p>請於訂單成立後 7 天內至 7-11、全家、萊爾富、OK便利商店繳費</p>

        <h4>貨到付款</h4>
        <p>限「宅配」訂單，加收手續費 $30</p>
        <p>訂單金額限 $30,000 以下</p>

        <h3>⚠️ 注意事項</h3>
        <ul>
            <li>所有價格均為新台幣（NTD）</li>
            <li>付款完成後將收到確認郵件</li>
            <li>如有付款問題，請聯繫客服</li>
        </ul>
    `
};

// 運送說明
const SHIPPING_INFO = {
    title: '運送說明',
    content: `
        <h3>📦 宅配運送</h3>
        
        <h4>運費說明</h4>
        <ul>
            <li>台灣本島：滿 $999 免運，未滿加收 $100</li>
            <li>離島地區：滿 $1,499 免運，未滿加收 $200</li>
            <li>國際運送：依地區另計，請聯繫客服</li>
        </ul>

        <h4>配送時間</h4>
        <ul>
            <li>一般訂單：付款完成後 1-3 個工作天出貨</li>
            <li>預購商品：依商品頁面公告時間出貨</li>
            <li>急件處理：加收 $100，當日 14:00 前下單可當日出貨</li>
        </ul>

        <h3>🏪 超商取貨</h3>
        
        <h4>支援門市</h4>
        <p>7-11、全家、萊爾富、OK便利商店</p>

        <h4>取貨說明</h4>
        <ul>
            <li>運費：滿 $699 免運，未滿加收 $60</li>
            <li>到店通知後 7 天內需取貨</li>
            <li>單筆訂單限重 5 公斤</li>
        </ul>

        <h3>🚗 門市自取</h3>
        <p>可至台北、台中、高雄門市免費自取</p>
        <p>請於下單時選擇「門市自取」並指定取貨門市</p>
        <p>商品備妥後將以簡訊通知，請於 7 天內取貨</p>

        <h3>⚠️ 注意事項</h3>
        <ul>
            <li>爆米花請存放於陰涼乾燥處</li>
            <li>開封後建議 3 天內食用完畢</li>
            <li>配送過程如有商品損壞，請拍照並聯繫客服</li>
        </ul>
    `
};

// 退換貨政策
const RETURN_POLICY = {
    title: '退換貨政策',
    content: `
        <h3>📋 退換貨原則</h3>
        <p>
            依據消費者保護法規定，您享有商品到貨 7 日內的鑑賞期權益。
            但因食品安全衛生考量，<strong>已拆封之商品恕不接受退換貨</strong>。
        </p>

        <h3>✅ 可申請退換貨的情況</h3>
        <ul>
            <li>商品未拆封且包裝完整</li>
            <li>收到商品與訂購內容不符</li>
            <li>商品於配送過程中損壞</li>
            <li>商品有明顯瑕疵或品質問題</li>
        </ul>

        <h3>❌ 不接受退換貨的情況</h3>
        <ul>
            <li>已拆封食用之商品</li>
            <li>非本公司售出之商品</li>
            <li>超過鑑賞期之商品</li>
            <li>因個人因素造成商品損壞</li>
        </ul>

        <h3>📝 申請流程</h3>
        <ol>
            <li>來電或來信客服說明退換貨原因</li>
            <li>客服確認後，將提供退貨單</li>
            <li>請將商品完整包裝好，連同退貨單一起寄回</li>
            <li>收到退貨商品並確認無誤後，3-5個工作天內退款</li>
        </ol>

        <h3>💰 退款方式</h3>
        <ul>
            <li>信用卡付款：退回原信用卡（依各銀行作業時間）</li>
            <li>ATM/超商付款：退至您指定的銀行帳戶</li>
        </ul>

        <h3>📞 聯繫客服</h3>
        <p>
            <strong>電話：</strong>02-2345-6789（週一至週五 09:00-18:00）<br>
            <strong>Email：</strong>service@popbucket.com
        </p>
    `
};

// 常見問題
const FAQ = {
    title: '常見問題',
    content: `
        <h3>🛒 訂購相關</h3>

        <h4>Q：如何查詢訂單狀態？</h4>
        <p>A：登入會員後，至「我的訂單」即可查詢訂單狀態及物流追蹤。</p>

        <h4>Q：可以修改或取消訂單嗎？</h4>
        <p>A：訂單成立後 30 分鐘內可自行取消。超過時間或已出貨之訂單，請聯繫客服處理。</p>

        <h4>Q：可以指定送達時間嗎？</h4>
        <p>A：可以！結帳時可選擇希望的配送時段。但實際時間仍以物流公司配送為準。</p>

        <h3>📦 商品相關</h3>

        <h4>Q：爆米花可以保存多久？</h4>
        <p>A：未開封商品可保存 60 天，開封後建議 3 天內食用完畢以確保最佳風味。</p>

        <h4>Q：商品可以常溫保存嗎？</h4>
        <p>A：可以。請存放於陰涼乾燥處，避免陽光直射及潮濕環境。</p>

        <h4>Q：商品含有哪些過敏原？</h4>
        <p>A：部分商品含有牛奶、大豆、堅果等過敏原，詳情請參考各商品頁面標示。</p>

        <h3>👤 會員相關</h3>

        <h4>Q：如何成為會員？</h4>
        <p>A：點擊網站右上角「登入」按鈕，即可免費註冊成為會員。</p>

        <h4>Q：會員有什麼優惠？</h4>
        <p>A：新會員首購 95 折、生日當月 9 折優惠、消費累積點數可折抵現金。</p>

        <h4>Q：忘記密碼怎麼辦？</h4>
        <p>A：點擊「忘記密碼」，輸入註冊Email，系統將發送重設密碼連結。</p>

        <h3>📞 還有其他問題？</h3>
        <p>
            歡迎透過以下方式聯繫我們：<br>
            <strong>客服專線：</strong>02-2345-6789<br>
            <strong>LINE 官方帳號：</strong>@popbucket<br>
            <strong>Email：</strong>service@popbucket.com
        </p>
    `
};

// 內容映射
const CONTENT_MAP = {
    '品牌故事': BRAND_STORY,
    '門市資訊': STORE_INFO,
    '企業合作': BUSINESS_COOPERATION,
    '加入我們': JOIN_US,
    '付款方式': PAYMENT_METHODS,
    '運送說明': SHIPPING_INFO,
    '退換貨政策': RETURN_POLICY,
    '常見問題': FAQ,
};

export default function InfoModal({ isOpen, onClose, contentKey }) {
    if (!isOpen) return null;

    const content = CONTENT_MAP[contentKey] || { title: contentKey, content: '<p>內容準備中...</p>' };

    return (
        <div className="info-modal-overlay" onClick={onClose}>
            <div className="info-modal" onClick={(e) => e.stopPropagation()}>
                <button className="info-modal__close" onClick={onClose}>
                    <X size={24} />
                </button>
                <h2 className="info-modal__title">{content.title}</h2>
                <div
                    className="info-modal__content"
                    dangerouslySetInnerHTML={{ __html: content.content }}
                />
            </div>
        </div>
    );
}
