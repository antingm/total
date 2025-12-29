// Demo Grid Component
import { AnimatePresence } from 'framer-motion';
import DemoCard from './DemoCard';

export default function DemoGrid({ demos }) {
    if (!demos || demos.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="text-6xl mb-4">🔒</div>
                <h3 className="text-xl font-semibold text-white mb-2">目前沒有可用的 Demo</h3>
                <p className="text-[var(--color-text-muted)]">所有專案目前皆已關閉或尚未設定</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
                {demos.map((demo) => (
                    <DemoCard key={demo.id} demo={demo} />
                ))}
            </AnimatePresence>
        </div>
    );
}
