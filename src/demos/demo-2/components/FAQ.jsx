import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ as FAQData } from '../constants';

function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleItem = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="section faq">
            <div className="container">
                <h2 className="section-title">{FAQData.title}</h2>
                <p className="section-subtitle">{FAQData.subtitle}</p>

                <div className="faq-list">
                    {FAQData.items.map((item, index) => (
                        <div
                            key={index}
                            className={`accordion-item ${openIndex === index ? 'active' : ''}`}
                        >
                            <button
                                className="accordion-header"
                                onClick={() => toggleItem(index)}
                            >
                                <span>{item.question}</span>
                                <ChevronDown size={20} className="accordion-icon" />
                            </button>
                            <div className="accordion-content">
                                <div className="accordion-body">
                                    {item.answer}
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
