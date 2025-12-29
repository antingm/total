import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { BRAND, NAV_LINKS } from '../constants';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const handleNavClick = (id) => {
        setIsOpen(false);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <a href="#" className="navbar-logo">
                    {BRAND.name}<span>.</span>
                </a>

                <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
                    {NAV_LINKS.map((link) => (
                        <button
                            key={link.id}
                            className="navbar-link"
                            onClick={() => handleNavClick(link.id)}
                        >
                            {link.label}
                        </button>
                    ))}
                    <a href={BRAND.lineUrl} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                        免費諮詢
                    </a>
                </div>

                <button
                    className="navbar-toggle"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
