/**
 * Breadcrumb Component
 * 麵包屑導航
 */

import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { Fragment } from 'react';

// 路由名稱映射
const routeNameMap = {
    'services': '服務方案',
    'portfolio': '作品集',
    'resources': '資訊中心',
    'news': '最新消息',
    'blog': '部落格',
    'cases': '案例研究',
    'about': '關於我們',
    'contact': '聯絡我們',
    'profile': '會員中心',
    'login': '登入',
    'register': '註冊',
    'admin': '後台管理'
};

const formatRouteName = (name) => {
    return routeNameMap[name] || name.charAt(0).toUpperCase() + name.slice(1);
};

export const Breadcrumb = ({ className = '' }) => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);

    // 首頁不顯示麵包屑
    if (pathnames.length === 0) {
        return null;
    }

    return (
        <nav className={`py-4 px-6 md:px-12 bg-bg-secondary/50 ${className}`}>
            <div className="max-w-7xl mx-auto">
                <ol className="flex items-center gap-2 text-sm">
                    {/* 首頁 */}
                    <li>
                        <Link
                            to="/"
                            className="flex items-center gap-1 text-slate-400 hover:text-primary transition-colors"
                        >
                            <Home className="w-4 h-4" />
                            <span>首頁</span>
                        </Link>
                    </li>

                    {/* 路徑 */}
                    {pathnames.map((name, index) => {
                        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                        const isLast = index === pathnames.length - 1;
                        const displayName = formatRouteName(name);

                        return (
                            <Fragment key={name}>
                                <ChevronRight className="w-4 h-4 text-slate-600" />
                                <li>
                                    {isLast ? (
                                        <span className="text-white font-medium">
                                            {displayName}
                                        </span>
                                    ) : (
                                        <Link
                                            to={routeTo}
                                            className="text-slate-400 hover:text-primary transition-colors"
                                        >
                                            {displayName}
                                        </Link>
                                    )}
                                </li>
                            </Fragment>
                        );
                    })}
                </ol>
            </div>
        </nav>
    );
};

export default Breadcrumb;
