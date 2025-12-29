import { Check, Star } from 'lucide-react';
import { getThemeVars } from '../../utils/themeUtils';

/**
 * PricingModule - 價格方案模組
 * 可配置的價格卡片展示
 * 支援深淺主題（透過 CSS 變數自動適應）
 */
export default function PricingModule({
    title = "選擇方案",
    subtitle = "找到最適合您的方案",
    plans = [],
    configStyle = {},
    onSelect
}) {
    const themeVars = getThemeVars(configStyle?.theme);
    const defaultPlans = [
        {
            name: '基礎版',
            price: 0,
            period: '永久免費',
            description: '適合個人使用',
            features: ['基本功能', '社群支援', '1GB 儲存空間'],
            popular: false
        },
        {
            name: '專業版',
            price: 299,
            period: '/月',
            description: '適合小型團隊',
            features: ['所有基礎功能', '優先客服', '10GB 儲存空間', 'API 存取'],
            popular: true
        },
        {
            name: '企業版',
            price: 999,
            period: '/月',
            description: '適合大型組織',
            features: ['所有專業功能', '專屬客戶經理', '無限儲存空間', '自定義整合', 'SLA 保證'],
            popular: false
        }
    ];

    const pricingPlans = plans.length > 0 ? plans : defaultPlans;

    return (
        <div
            className="p-6 rounded-3xl shadow-sm"
            style={{
                backgroundColor: 'var(--module-bg)',
                border: '1px solid var(--module-border)',
                '--module-accent': themeVars.accent,
                '--module-accent-bg': themeVars.accentBg
            }}
        >
            <div className="text-center mb-10">
                <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--module-text)' }}>{title}</h2>
                <p style={{ color: 'var(--module-text-muted)' }}>{subtitle}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {pricingPlans.map((plan, index) => (
                    <div
                        key={index}
                        className="relative p-6 rounded-2xl transition-all"
                        style={{
                            border: plan.popular
                                ? '2px solid var(--module-accent)'
                                : '2px solid var(--module-border)',
                            boxShadow: plan.popular
                                ? '0 0 0 2px var(--module-accent-bg)'
                                : 'none'
                        }}
                    >
                        {plan.popular && (
                            <div
                                className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-white text-sm font-bold rounded-full flex items-center gap-1"
                                style={{ backgroundColor: 'var(--module-accent)' }}
                            >
                                <Star className="w-4 h-4 fill-white" /> 最熱門
                            </div>
                        )}

                        <div className="text-center mb-6">
                            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--module-text)' }}>{plan.name}</h3>
                            <p className="text-sm mb-4" style={{ color: 'var(--module-text-muted)' }}>{plan.description}</p>
                            <div className="flex items-baseline justify-center gap-1">
                                <span className="text-4xl font-bold" style={{ color: 'var(--module-text)' }}>
                                    {plan.price === 0 ? '免費' : `NT$${plan.price.toLocaleString()}`}
                                </span>
                                {plan.price > 0 && <span style={{ color: 'var(--module-text-muted)' }}>{plan.period}</span>}
                            </div>
                        </div>

                        <ul className="space-y-3 mb-6">
                            {plan.features.map((feature, fIndex) => (
                                <li key={fIndex} className="flex items-center gap-3">
                                    <Check className="w-5 h-5" style={{ color: 'var(--module-accent)' }} />
                                    <span style={{ color: 'var(--module-text-muted)' }}>{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={() => onSelect?.(plan)}
                            className="w-full py-3 rounded-xl font-bold transition-all"
                            style={{
                                backgroundColor: plan.popular
                                    ? 'var(--module-accent)'
                                    : 'var(--module-bg-subtle)',
                                color: plan.popular
                                    ? 'white'
                                    : 'var(--module-text)'
                            }}
                        >
                            {plan.price === 0 ? '免費開始' : '立即訂閱'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
