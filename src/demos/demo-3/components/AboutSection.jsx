import { Award, Leaf, Heart, Star } from 'lucide-react';
import { SITE_INFO, STATS } from '../constants';
import './AboutSection.css';

const features = [
    {
        icon: Award,
        title: '頂級原料',
        description: '嚴選進口玉米與天然食材，確保每一口都是最佳品質'
    },
    {
        icon: Leaf,
        title: '天然無添加',
        description: '不含人工香料與防腐劑，給您最純粹的美味體驗'
    },
    {
        icon: Heart,
        title: '用心手作',
        description: '每批爆米花都由專業師傅手工製作，確保風味一致'
    },
];

export default function AboutSection() {
    return (
        <section className="about-section" id="about">
            <div className="container">
                <div className="about-content">
                    <div className="about-text">
                        <span className="about-label">ABOUT US</span>
                        <h2 className="about-title">關於 {SITE_INFO.name}</h2>
                        <p className="about-desc">
                            我們相信，一份好的爆米花不只是零食，更是分享歡樂的媒介。
                            從 2018 年創立至今，我們堅持使用頂級原料，結合創意與匠心，
                            研發出超過 50 種獨特口味，讓每一口都是驚喜。
                        </p>
                        <p className="about-desc">
                            從台灣出發，我們的商品已經銷售至全球 30 多個國家，
                            獲得超過百萬顧客的喜愛與信賴。
                        </p>

                        <div className="about-features">
                            {features.map((feature, index) => (
                                <div key={index} className="about-feature">
                                    <div className="about-feature-icon">
                                        <feature.icon size={24} />
                                    </div>
                                    <div>
                                        <h4 className="about-feature-title">{feature.title}</h4>
                                        <p className="about-feature-desc">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="about-stats">
                        <div className="about-image">
                            <img
                                src="https://images.unsplash.com/photo-1585647347483-22b66260dfff?w=600&q=80"
                                alt="爆米花製作"
                            />
                        </div>
                        <div className="about-stats-grid">
                            {STATS.map((stat, index) => (
                                <div key={index} className="about-stat">
                                    <span className="about-stat-value">{stat.value}</span>
                                    <span className="about-stat-label">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
