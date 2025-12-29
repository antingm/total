import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getThemeVars } from '../../utils/themeUtils';

/**
 * GalleryModule - 圖片展示模組
 * 網格式圖片展示，支援 Lightbox 放大
 * 支援深淺主題（透過 CSS 變數自動適應）
 */
export default function GalleryModule({
    title = "作品集",
    subtitle = "瀏覽我們的精選作品",
    images = [],
    columns = 3,
    configStyle = {}
}) {
    const [lightboxIndex, setLightboxIndex] = useState(null);
    const themeVars = getThemeVars(configStyle?.theme);

    const defaultImages = [
        { src: 'https://picsum.photos/400/300?random=1', alt: '作品 1', caption: '專案一' },
        { src: 'https://picsum.photos/400/300?random=2', alt: '作品 2', caption: '專案二' },
        { src: 'https://picsum.photos/400/300?random=3', alt: '作品 3', caption: '專案三' },
        { src: 'https://picsum.photos/400/300?random=4', alt: '作品 4', caption: '專案四' },
        { src: 'https://picsum.photos/400/300?random=5', alt: '作品 5', caption: '專案五' },
        { src: 'https://picsum.photos/400/300?random=6', alt: '作品 6', caption: '專案六' }
    ];

    const galleryImages = images.length > 0 ? images : defaultImages;

    const openLightbox = (index) => setLightboxIndex(index);
    const closeLightbox = () => setLightboxIndex(null);
    const nextImage = () => setLightboxIndex((prev) => (prev + 1) % galleryImages.length);
    const prevImage = () => setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

    return (
        <div
            className="p-6 rounded-3xl shadow-sm"
            style={{
                backgroundColor: 'var(--module-bg)',
                border: '1px solid var(--module-border)',
                '--module-accent': themeVars.accent,
                '--module-accent-bg': themeVars.accentBg
            }}
        >
            <div className="text-center mb-8">
                <div
                    className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                    style={{
                        backgroundColor: 'var(--module-accent-bg)',
                        color: 'var(--module-accent)'
                    }}
                >
                    <ImageIcon className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--module-text)' }}>{title}</h2>
                <p style={{ color: 'var(--module-text-muted)' }}>{subtitle}</p>
            </div>

            {/* 網格展示 */}
            <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
                {galleryImages.map((image, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group"
                        onClick={() => openLightbox(index)}
                    >
                        <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-full object-cover transition-transform group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                            <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                {image.caption}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center"
                        onClick={closeLightbox}
                    >
                        <button
                            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
                            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <button
                            onClick={(e) => { e.stopPropagation(); prevImage(); }}
                            className="absolute left-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        <motion.img
                            key={lightboxIndex}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            src={galleryImages[lightboxIndex].src}
                            alt={galleryImages[lightboxIndex].alt}
                            className="max-w-[90vw] max-h-[80vh] object-contain rounded-lg"
                            onClick={(e) => e.stopPropagation()}
                        />

                        <button
                            onClick={(e) => { e.stopPropagation(); nextImage(); }}
                            className="absolute right-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-center">
                            <p className="font-medium">{galleryImages[lightboxIndex].caption}</p>
                            <p className="text-sm text-white/60">{lightboxIndex + 1} / {galleryImages.length}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
