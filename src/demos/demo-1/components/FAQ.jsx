import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../constants';

function FAQ() {
    const [openId, setOpenId] = useState(null);

    const toggleFaq = (id) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <section className="section-padding bg-slate-50">
            <div className="max-w-3xl mx-auto">
                {/* 區塊標題 */}
                <div className="text-center mb-10 md:mb-14">
                    <h2 className="heading-lg text-slate-900 mb-3">
                        常見問題
                    </h2>
                    <p className="text-slate-600 text-lg">
                        有任何疑問？我們為您解答
                    </p>
                </div>

                {/* 手風琴式 FAQ */}
                <div className="space-y-4">
                    {FAQ_ITEMS.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-xl overflow-hidden shadow-sm"
                        >
                            {/* 問題標題 - 可點擊 */}
                            <button
                                onClick={() => toggleFaq(item.id)}
                                className="w-full flex items-center justify-between p-5 md:p-6 text-left"
                            >
                                <span className="font-semibold text-slate-900 pr-4">
                                    {item.question}
                                </span>
                                <ChevronDown
                                    className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-200 ${openId === item.id ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>

                            {/* 答案內容 - 展開/收合 */}
                            <div
                                className={`overflow-hidden transition-all duration-200 ${openId === item.id ? 'max-h-96' : 'max-h-0'
                                    }`}
                            >
                                <div className="px-5 pb-5 md:px-6 md:pb-6">
                                    <p className="text-slate-600 leading-relaxed">
                                        {item.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FAQ;
