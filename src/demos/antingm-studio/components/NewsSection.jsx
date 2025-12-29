/**
 * 最新消息首頁組件
 * 顯示最近 3 則消息
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { app } from '../firebase';

const db = getFirestore(app);

const NewsSection = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadNews();
    }, []);

    const loadNews = async () => {
        try {
            // 只使用 orderBy，避免複合索引需求
            const q = query(
                collection(db, 'news'),
                orderBy('publishDate', 'desc'),
                limit(50) // 先載入足夠數量
            );
            const snapshot = await getDocs(q);

            // 在客戶端過濾可見的文章，取前 3 篇
            const visibleNews = snapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .filter(item => item.isVisible === true)
                .slice(0, 3);

            setNews(visibleNews);
        } catch (error) {
            console.error('載入最新消息失敗:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <section className="py-20 bg-bg-secondary">
                <div className="container-custom">
                    <div className="text-center">
                        <div className="inline-block w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                    </div>
                </div>
            </section>
        );
    }

    if (news.length === 0) {
        return null; // 沒有消息就不顯示這個區塊
    }

    return (
        <section className="py-20 bg-bg-secondary">
            <div className="container-custom">
                {/* 標題 */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
                        📰 最新消息
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        掌握最新資訊，了解我們的最新動態與優惠
                    </p>
                </div>

                {/* 消息卡片 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {news.map((item) => (
                        <Link
                            key={item.id}
                            to={`/news/${item.id}`}
                            className="group bg-bg-primary border border-slate-700 rounded-2xl overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                        >
                            {/* 封面圖 */}
                            {item.coverImage && (
                                <div className="aspect-video overflow-hidden bg-slate-800">
                                    <img
                                        src={item.coverImage}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                            )}

                            {/* 內容 */}
                            <div className="p-6">
                                <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span>
                                        {item.publishDate?.toDate?.()
                                            ? new Date(item.publishDate.toDate()).toLocaleDateString('zh-TW')
                                            : ''}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                    {item.title}
                                </h3>

                                <p className="text-slate-400 text-sm line-clamp-3 mb-4">
                                    {item.content?.substring(0, 100)}...
                                </p>

                                <div className="flex items-center text-primary font-medium text-sm">
                                    閱讀更多
                                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* 查看更多按鈕 */}
                <div className="text-center">
                    <Link
                        to="/news"
                        className="btn-secondary inline-flex items-center gap-2"
                    >
                        查看所有消息
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default NewsSection;
