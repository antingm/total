// Feature Toggle Component
import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

export default function FeatureToggle({ demoId, config }) {
    const [enabled, setEnabled] = useState(config.enabled);
    const [saving, setSaving] = useState(false);

    const handleToggle = async () => {
        setSaving(true);
        try {
            await updateDoc(doc(db, 'config', 'features'), {
                [`demos.${demoId}.enabled`]: !enabled
            });
            setEnabled(!enabled);
        } catch (error) {
            console.error('Toggle failed:', error);
            alert('更新失敗，請稍後再試');
        }
        setSaving(false);
    };

    return (
        <div className="flex items-center justify-between p-4 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-colors">
            <div className="flex-1">
                <h3 className="font-semibold text-white">{config.name || demoId}</h3>
                <p className="text-sm text-[var(--color-text-muted)]">
                    路由: {config.route || `/${demoId}`}
                </p>
                {config.description && (
                    <p className="text-xs text-[var(--color-text-muted)] mt-1 line-clamp-1">
                        {config.description}
                    </p>
                )}
            </div>

            <button
                onClick={handleToggle}
                disabled={saving}
                className={`
          relative w-14 h-7 rounded-full transition-colors flex-shrink-0 ml-4
          ${enabled ? 'bg-[var(--color-secondary)]' : 'bg-gray-600'}
          ${saving ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
                title={enabled ? '點擊關閉' : '點擊開啟'}
            >
                <span className={`
          absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow
          transition-transform duration-200 ${enabled ? 'translate-x-7' : ''}
        `} />
            </button>
        </div>
    );
}
