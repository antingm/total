import { useState, useMemo } from 'react';
import { Layers, Paintbrush, LayoutGrid, Grid3X3 } from 'lucide-react';
import { CALCULATOR } from '../constants';

const iconMap = {
    Layers: Layers,
    Paintbrush: Paintbrush,
    LayoutGrid: LayoutGrid,
    Grid3X3: Grid3X3,
};

function Calculator() {
    const [roomType, setRoomType] = useState(CALCULATOR.roomTypes[0].id);
    const [ping, setPing] = useState(25);
    const [activeAddons, setActiveAddons] = useState([]);

    const toggleAddon = (addonId) => {
        setActiveAddons((prev) =>
            prev.includes(addonId)
                ? prev.filter((id) => id !== addonId)
                : [...prev, addonId]
        );
    };

    const totalPrice = useMemo(() => {
        const selectedRoom = CALCULATOR.roomTypes.find((r) => r.id === roomType);
        const basePrice = selectedRoom?.basePrice || 0;

        // 坪數加價（超過20坪的部分）
        const extraPing = Math.max(0, ping - 20);
        const pingPrice = extraPing * CALCULATOR.pricePerPing;

        // 加購項目
        const addonPrice = activeAddons.reduce((sum, addonId) => {
            const addon = CALCULATOR.addons.find((a) => a.id === addonId);
            return sum + (addon?.price || 0);
        }, 0);

        return basePrice + pingPrice + addonPrice;
    }, [roomType, ping, activeAddons]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('zh-TW').format(price);
    };

    return (
        <section id="calculator" className="section calculator">
            <div className="container">
                <h2 className="section-title">{CALCULATOR.title}</h2>
                <p className="section-subtitle">{CALCULATOR.subtitle}</p>

                <div className="calculator-card">
                    <div className="calculator-row">
                        <div className="calculator-group">
                            <label className="calculator-label">房型選擇</label>
                            <select
                                className="calculator-select"
                                value={roomType}
                                onChange={(e) => setRoomType(e.target.value)}
                            >
                                {CALCULATOR.roomTypes.map((room) => (
                                    <option key={room.id} value={room.id}>
                                        {room.label} - 基本 NT$ {formatPrice(room.basePrice)} 起
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="calculator-group">
                            <label className="calculator-label">坪數</label>
                            <input
                                type="number"
                                className="calculator-number"
                                value={ping}
                                onChange={(e) => setPing(Math.max(10, Math.min(100, parseInt(e.target.value) || 10)))}
                                min="10"
                                max="100"
                            />
                        </div>
                    </div>

                    <label className="calculator-label">加購項目（可多選）</label>
                    <div className="calculator-addons">
                        {CALCULATOR.addons.map((addon) => {
                            const Icon = iconMap[addon.icon];
                            const isActive = activeAddons.includes(addon.id);

                            return (
                                <div
                                    key={addon.id}
                                    className={`addon-item ${isActive ? 'active' : ''}`}
                                    onClick={() => toggleAddon(addon.id)}
                                >
                                    <div className="addon-info">
                                        <div className="addon-icon">
                                            {Icon && <Icon size={20} />}
                                        </div>
                                        <div>
                                            <div className="addon-text">{addon.label}</div>
                                            <div className="addon-price">+NT$ {formatPrice(addon.price)}</div>
                                        </div>
                                    </div>
                                    <div className={`toggle-switch ${isActive ? 'active' : ''}`} />
                                </div>
                            );
                        })}
                    </div>

                    <div className="calculator-result">
                        <div className="result-label">您的參考預算</div>
                        <div className="result-price">NT$ {formatPrice(totalPrice)}</div>
                        <div className="result-note">{CALCULATOR.note}</div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Calculator;
