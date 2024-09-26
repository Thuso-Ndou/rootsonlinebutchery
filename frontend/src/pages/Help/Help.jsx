import { useState } from 'react';
import './Help.css';

const data = [
    {
        question: 'question 1',
        answer: 'answer 1'
    },
    {
        question: 'FAQ',
        answer: 'answer 1'
    }
]

const Help = () => {
    const [selected, setSelected] = useState(null);

    const toggle = (i) => {
        if(selected === i) {
            return setSelected(null);
        }

        setSelected(i);
    }

    return (
        <div className='wrapper'>
            <div className="accordian">
                {data.map((item, i) => (
                    <div className="item">
                        <div className="title" onClick={() => toggle(i)}>
                            <h2>{item.question}</h2>
                            <span>{selected === i ? '-' : '+'}</span>
                        </div>
                        <div className={selected === i ? 'content show' : 'content'}>
                                {item.answer}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Help;