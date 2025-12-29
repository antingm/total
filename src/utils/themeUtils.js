/**
 * themeUtils.js - 模組主題色彩映射工具
 * 
 * 將編輯器選擇的 theme ID 轉換為對應的 CSS 顏色值
 */

// 主題色彩映射表
export const THEME_CSS_MAP = {
    indigo: {
        accent: '#6366f1',
        accentHover: '#4f46e5',
        accentBg: 'rgba(99, 102, 241, 0.15)',
        accentLight: 'rgba(99, 102, 241, 0.1)'
    },
    emerald: {
        accent: '#10b981',
        accentHover: '#059669',
        accentBg: 'rgba(16, 185, 129, 0.15)',
        accentLight: 'rgba(16, 185, 129, 0.1)'
    },
    rose: {
        accent: '#f43f5e',
        accentHover: '#e11d48',
        accentBg: 'rgba(244, 63, 94, 0.15)',
        accentLight: 'rgba(244, 63, 94, 0.1)'
    },
    amber: {
        accent: '#f59e0b',
        accentHover: '#d97706',
        accentBg: 'rgba(245, 158, 11, 0.15)',
        accentLight: 'rgba(245, 158, 11, 0.1)'
    },
    sky: {
        accent: '#0ea5e9',
        accentHover: '#0284c7',
        accentBg: 'rgba(14, 165, 233, 0.15)',
        accentLight: 'rgba(14, 165, 233, 0.1)'
    },
    purple: {
        accent: '#a855f7',
        accentHover: '#9333ea',
        accentBg: 'rgba(168, 85, 247, 0.15)',
        accentLight: 'rgba(168, 85, 247, 0.1)'
    }
};

// 預設主題色
const DEFAULT_THEME = 'indigo';

/**
 * 根據主題 ID 取得對應的 CSS 顏色值
 * @param {string} theme - 主題 ID (indigo, emerald, rose, amber, sky, purple)
 * @returns {object} 包含 accent, accentHover, accentBg, accentLight 的物件
 */
export function getThemeVars(theme) {
    return THEME_CSS_MAP[theme] || THEME_CSS_MAP[DEFAULT_THEME];
}

/**
 * 建立模組容器的 inline style
 * 包含基本模組背景色和主題強調色
 * @param {string} theme - 主題 ID
 * @returns {object} React style 物件
 */
export function getModuleContainerStyle(theme) {
    const themeVars = getThemeVars(theme);
    return {
        '--theme-accent': themeVars.accent,
        '--theme-accent-hover': themeVars.accentHover,
        '--theme-accent-bg': themeVars.accentBg,
        '--theme-accent-light': themeVars.accentLight
    };
}

export default { getThemeVars, getModuleContainerStyle, THEME_CSS_MAP };
