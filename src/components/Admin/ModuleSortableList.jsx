import { useState } from 'react';
import { GripVertical, ArrowUp, ArrowDown } from 'lucide-react';

/**
 * ModuleSortableList - 模組拖曳排序組件
 * 用於調整模組在同一區域內的顯示順序
 */
export default function ModuleSortableList({
    modules = [],
    onChange,
    themeColor = 'indigo'
}) {
    const [draggedIndex, setDraggedIndex] = useState(null);

    const colorClasses = {
        indigo: 'border-indigo-500 bg-indigo-50',
        emerald: 'border-emerald-500 bg-emerald-50',
        rose: 'border-rose-500 bg-rose-50'
    };

    const handleDragStart = (index) => {
        setDraggedIndex(index);
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === index) return;

        const newModules = [...modules];
        const [draggedItem] = newModules.splice(draggedIndex, 1);
        newModules.splice(index, 0, draggedItem);

        // 更新 order
        const updatedModules = newModules.map((m, i) => ({
            ...m,
            order: i + 1
        }));

        setDraggedIndex(index);
        onChange?.(updatedModules);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
    };

    const moveUp = (index) => {
        if (index === 0) return;
        const newModules = [...modules];
        [newModules[index - 1], newModules[index]] = [newModules[index], newModules[index - 1]];
        const updatedModules = newModules.map((m, i) => ({ ...m, order: i + 1 }));
        onChange?.(updatedModules);
    };

    const moveDown = (index) => {
        if (index === modules.length - 1) return;
        const newModules = [...modules];
        [newModules[index], newModules[index + 1]] = [newModules[index + 1], newModules[index]];
        const updatedModules = newModules.map((m, i) => ({ ...m, order: i + 1 }));
        onChange?.(updatedModules);
    };

    if (modules.length === 0) {
        return (
            <div className="text-center py-6 text-gray-400 text-sm">
                尚無已啟用的模組
            </div>
        );
    }

    return (
        <div className="space-y-2">
            {modules.map((module, index) => (
                <div
                    key={module.id}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={handleDragEnd}
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-grab active:cursor-grabbing transition-all ${draggedIndex === index
                            ? colorClasses[themeColor]
                            : 'border-white/10 bg-white/5 hover:bg-white/10'
                        }`}
                >
                    <GripVertical className="w-5 h-5 text-gray-400" />
                    <span className="flex-1 text-white font-medium">{module.name || module.id}</span>
                    <div className="flex gap-1">
                        <button
                            onClick={() => moveUp(index)}
                            disabled={index === 0}
                            className="p-1 rounded hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <ArrowUp className="w-4 h-4 text-gray-400" />
                        </button>
                        <button
                            onClick={() => moveDown(index)}
                            disabled={index === modules.length - 1}
                            className="p-1 rounded hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <ArrowDown className="w-4 h-4 text-gray-400" />
                        </button>
                    </div>
                    <span className="text-xs text-gray-500 w-6 text-center">{index + 1}</span>
                </div>
            ))}
        </div>
    );
}
