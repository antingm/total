// Antingm Studio - 創意工作室官方網站
import './styles.css';
import DemoLayout from '../../components/Shell/DemoLayout';
import { useModuleEditor } from '../../hooks/useModuleEditor';
import InlineEditor from '../../components/Admin/InlineEditor';

export default function AntingmStudio() {
    const { liveModuleConfig, handleConfigChange } = useModuleEditor('antingm-studio');

    const moduleProps = {
        ContactModule: {
            title: "聯絡我們",
            email: "hello@anting-studio.com"
        },
        BookingModule: {
            title: "預約服務",
            services: [
                { id: 1, name: '品牌設計', price: 50000, duration: 120 },
                { id: 2, name: '網站開發', price: 80000, duration: 180 }
            ]
        }
    };

    return (
        <DemoLayout
            moduleConfig={liveModuleConfig}
            moduleProps={moduleProps}
            className="pt-20 bg-gradient-to-br from-violet-900 to-indigo-900"
        >
            {/* 頁面原有內容 */}
            <div className="px-6 py-12 flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="text-6xl mb-4">🎬</div>
                    <h1 className="text-3xl font-bold text-white mb-4">Antingm Studio</h1>
                    <p className="text-gray-300 mb-6">創意工作室官方網站</p>
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 max-w-md mx-auto">
                        <p className="text-white/80 text-sm">
                            ✨ 使用右下角的「模組編輯器」新增模組，並選擇顯示位置！
                        </p>
                    </div>
                    <a
                        href="https://anting-studio.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-6 px-6 py-3 bg-white text-indigo-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        訪問獨立網站 →
                    </a>
                </div>
            </div>

            {/* 模組編輯器 */}
            <InlineEditor
                demoId="antingm-studio"
                moduleConfig={liveModuleConfig}
                onConfigChange={handleConfigChange}
            />
        </DemoLayout>
    );
}
