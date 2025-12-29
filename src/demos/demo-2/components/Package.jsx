import {
    Shield,
    Plug,
    Paintbrush,
    LayoutGrid,
    Grid3X3,
    Sparkles,
    Sofa,
    Palette,
} from 'lucide-react';
import { PACKAGE } from '../constants';

const iconMap = {
    Shield,
    Plug,
    Paintbrush,
    LayoutGrid,
    Grid3X3,
    Sparkles,
    Sofa,
    Palette,
};

function Package() {
    return (
        <section id="package" className="section package">
            <div className="container">
                <h2 className="section-title">
                    {PACKAGE.title}<span style={{ color: 'var(--color-accent-terracotta)' }}>{PACKAGE.highlight}</span>
                </h2>
                <p className="section-subtitle">{PACKAGE.subtitle}</p>

                <div className="package-grid">
                    {PACKAGE.items.map((item, index) => {
                        const Icon = iconMap[item.icon];
                        return (
                            <div key={index} className="package-item">
                                <div className="package-icon">
                                    {Icon && <Icon size={32} />}
                                </div>
                                <h3 className="package-name">{item.name}</h3>
                                <p className="package-desc">{item.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default Package;
