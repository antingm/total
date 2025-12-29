import { FileSearch, ShieldCheck, Receipt } from 'lucide-react';
import { TRUST } from '../constants';

const iconMap = {
    FileSearch,
    ShieldCheck,
    Receipt,
};

function Trust() {
    return (
        <section id="trust" className="section trust">
            <div className="container">
                <h2 className="section-title">
                    {TRUST.title}，<span style={{ color: 'var(--color-accent-forest)' }}>{TRUST.highlight}</span>
                </h2>
                <p className="section-subtitle">{TRUST.subtitle}</p>

                <div className="trust-grid">
                    {TRUST.items.map((item, index) => {
                        const Icon = iconMap[item.icon];
                        return (
                            <div key={index} className="trust-item">
                                <div className="trust-icon">
                                    {Icon && <Icon size={36} />}
                                </div>
                                <h3 className="trust-title">{item.title}</h3>
                                <p className="trust-desc">{item.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default Trust;
