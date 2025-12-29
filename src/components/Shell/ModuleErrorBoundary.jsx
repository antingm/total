import React, { Component } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

/**
 * ModuleErrorBoundary - 模組錯誤邊界
 * 捕獲單一模組的渲染錯誤，防止整頁崩潰
 */
export default class ModuleErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error(`模組 "${this.props.moduleName}" 發生錯誤:`, error, errorInfo);
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-6 rounded-2xl bg-red-50 border-2 border-red-200 text-center">
                    <AlertTriangle className="w-10 h-10 mx-auto text-red-400 mb-3" />
                    <h3 className="font-bold text-red-700 mb-2">模組載入失敗</h3>
                    <p className="text-sm text-red-600 mb-4">
                        「{this.props.moduleName || '未知模組'}」發生錯誤
                    </p>
                    <button
                        onClick={this.handleRetry}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
                    >
                        <RefreshCw className="w-4 h-4" />
                        重試
                    </button>
                    {process.env.NODE_ENV === 'development' && (
                        <details className="mt-4 text-left">
                            <summary className="text-xs text-red-400 cursor-pointer">
                                開發者資訊
                            </summary>
                            <pre className="mt-2 p-3 bg-red-100 rounded-lg text-xs text-red-700 overflow-auto max-h-32">
                                {this.state.error?.toString()}
                            </pre>
                        </details>
                    )}
                </div>
            );
        }

        return this.props.children;
    }
}
