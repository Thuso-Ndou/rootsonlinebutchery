import { useState } from 'react';
import './Help.css';

const data = [
    {
        question: 'How do I create an account?',
        answer: 'To create an account, click on "Sign Up" in the login form. Fill in your username, email, and password, then click "Create Account." You will be automatically logged in after account creation.'
    },
    {
        question: 'What are the password requirements?',
        answer: 'Your password should be at least 8 characters long and contain a mix of letters, numbers, and symbols for security.'
    },
    {
        question: 'I forgot my password. How can I reset it?',
        answer: 'Currently, our system does not support password reset. If you are unable to access your account, please contact customer support for further assistance.'
    },
    {
        question: 'How can I delete my account?',
        answer: 'To delete your account, please send an email to our customer support team with your account details. We will process the deletion on your behalf. Note that this action is permanent and cannot be undone.'
    },
    {
        question: 'How do I contact customer support?',
        answer: 'You can contact customer support by clicking on the "Contact Us" link at the bottom of the page and our support team will get back to you as soon as possible.'
    },
    {
        question: 'How do I track my order?',
        answer: 'You can track your order by going to the "View Orders" section from the navigation bar. Click the "Track Order" button next to your order to see its current status, which may show stages like "Food Packaging," "Out for Delivery," or "Delivered" depending on the progress of your delivery.',
        id: 'delivery'
    },
    {
        question: 'Can I change the delivery address after placing an order?',
        answer: 'Once an order is placed, the delivery address cannot be changed. Please ensure the correct address is entered during checkout. If the address is incorrect, you may need to cancel the order and place a new one with the correct details.'
    },
    {
        question: 'What payment methods are accepted?',
        answer: 'We accept various payment methods, including credit/debit cards and mobile payments. You can choose your preferred payment method during checkout.'
    },
    {
        question: 'Can I cancel my order after payment?',
        answer: 'You can cancel your order before making a payment but once payment is made successfully you can not cancel. If the order has already been dispatched, please refer to our return and refund policy.'
    },
    {
        question: 'Do you provide refunds for orders?',
        answer: 'We do not provide refunds as most of the products sold are fresh meat. If there is an issue with your order, please contact customer support, and we will do our best to assist you.',
        id: 'policy-refund'
    },
    {
        question: 'About Us',
        answer: 'We are dedicated to providing high-quality fresh meat products to our customers. Our goal is to deliver your orders efficiently while ensuring you enjoy the best quality available. Customer satisfaction is our top priority, and we are here to assist you with any inquiries or concerns.',
        id: 'about-us'
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
                    <div className="item" key={i} id={item.id}>
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