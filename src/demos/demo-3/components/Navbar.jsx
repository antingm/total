import { useState, useEffect } from 'react';
import { Menu, X, Search, ShoppingCart, User, ChevronDown, LogOut } from 'lucide-react';
import { SITE_INFO, NAV_LINKS, ANNOUNCEMENT, PRODUCTS } from '../constants';
import './Navbar.css';

export default function Navbar({
    cartCount = 0,
    onCartClick,
    onLoginClick,
    user,
    onLogout
}) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 搜尋功能
    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query.trim()) {
            const results = PRODUCTS.filter(product =>
                product.name.toLowerCase().includes(query.toLowerCase()) ||
                product.description.toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    };

    // 平滑滾動到指定區塊
    const scrollToSection = (href) => {
        const targetId = href.replace('#', '');
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <header className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
            {/* 頂部公告列 */}
            <div className="navbar__announcement">
                <div className="navbar__announcement-content">
                    <span className="marquee-text">
                        {ANNOUNCEMENT.text} &nbsp;&nbsp;&nbsp; {ANNOUNCEMENT.text}
                    </span>
                </div>
            </div>

            {/* 主導航區 */}
            <div className="navbar__main">
                <div className="container navbar__container">
                    {/* 手機版漢堡選單 */}
                    <button
                        className="navbar__mobile-toggle hide-desktop"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="選單"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    {/* Logo */}
                    <a href="/" className="navbar__logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                        <span className="navbar__logo-icon">{SITE_INFO.logo}</span>
                        <span className="navbar__logo-text">{SITE_INFO.name}</span>
                    </a>

                    {/* 桌面版導航連結 */}
                    <nav className="navbar__nav hide-mobile">
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="navbar__nav-link"
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection(link.href);
                                }}
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    {/* 右側功能區 */}
                    <div className="navbar__actions">
                        {/* 搜尋 */}
                        <button
                            className="navbar__action-btn"
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            aria-label="搜尋"
                        >
                            <Search size={22} />
                        </button>

                        {/* 會員 */}
                        {user ? (
                            <div className="navbar__user-menu hide-mobile">
                                <button className="navbar__action-btn navbar__user-btn">
                                    <User size={22} />
                                    <span className="navbar__user-name">{user.name}</span>
                                </button>
                                <div className="navbar__user-dropdown">
                                    <button onClick={onLogout} className="navbar__dropdown-item">
                                        <LogOut size={16} />
                                        登出
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button
                                className="navbar__action-btn hide-mobile"
                                aria-label="會員"
                                onClick={onLoginClick}
                            >
                                <User size={22} />
                            </button>
                        )}

                        {/* 購物車 */}
                        <button
                            className="navbar__action-btn navbar__cart-btn"
                            aria-label="購物車"
                            onClick={onCartClick}
                        >
                            <ShoppingCart size={22} />
                            {cartCount > 0 && (
                                <span className="navbar__cart-badge">{cartCount}</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* 搜尋列 (展開時顯示) */}
            {isSearchOpen && (
                <div className="navbar__search animate-slide-down">
                    <div className="container">
                        <div className="navbar__search-wrapper">
                            <Search size={20} className="navbar__search-icon" />
                            <input
                                type="text"
                                placeholder="搜尋商品..."
                                className="navbar__search-input"
                                autoFocus
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                            <button
                                className="navbar__search-close"
                                onClick={() => {
                                    setIsSearchOpen(false);
                                    setSearchQuery('');
                                    setSearchResults([]);
                                }}
                            >
                                <X size={20} />
                            </button>
                        </div>
                        {/* 搜尋結果 */}
                        {searchResults.length > 0 && (
                            <div className="navbar__search-results">
                                {searchResults.map(product => (
                                    <a
                                        key={product.id}
                                        href="#"
                                        className="navbar__search-result"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setIsSearchOpen(false);
                                            setSearchQuery('');
                                            scrollToSection('#products');
                                        }}
                                    >
                                        <img src={product.image} alt={product.name} />
                                        <div>
                                            <h4>{product.name}</h4>
                                            <p>NT$ {product.salePrice.toLocaleString()}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        )}
                        {searchQuery && searchResults.length === 0 && (
                            <div className="navbar__search-empty">
                                找不到符合「{searchQuery}」的商品
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* 手機版選單 */}
            {isMobileMenuOpen && (
                <div className="navbar__mobile-menu animate-slide-down">
                    <nav className="navbar__mobile-nav">
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="navbar__mobile-link"
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection(link.href);
                                }}
                            >
                                {link.label}
                                <ChevronDown size={18} />
                            </a>
                        ))}
                    </nav>
                    <div className="navbar__mobile-actions">
                        {user ? (
                            <button className="btn btn-secondary btn-full" onClick={onLogout}>
                                <LogOut size={18} />
                                登出 ({user.name})
                            </button>
                        ) : (
                            <button className="btn btn-primary btn-full" onClick={onLoginClick}>
                                <User size={18} />
                                登入 / 註冊
                            </button>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}

