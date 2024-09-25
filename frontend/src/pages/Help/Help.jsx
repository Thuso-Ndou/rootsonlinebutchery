import './Help.css';
import { useState } from 'react';

// Accordion Component
const Accordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b">
      <button
        className="w-full text-left p-4 focus:outline-none focus:ring"
        onClick={toggleAccordion}
      >
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">{title}</span>
          <span>{isOpen ? '-' : '+'}</span>
        </div>
      </button>
      <div
        className={`transition-all overflow-hidden ${isOpen ? 'max-h-screen' : 'max-h-0'}`}
        style={{ transitionDuration: '500ms' }}
      >
        <div className="p-4">{content}</div>
      </div>
    </div>
  );
};

// Help Component
const Help = () => {
  return (
    <div className="Help max-w-lg mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center mb-5">Help Section</h1>
      <Accordion
        title="How to Use the App"
        content="This section explains how to use the app effectively, covering the basic operations and navigation."
      />
      <Accordion
        title="Frequently Asked Questions"
        content="Here you will find answers to the most common questions asked by users."
      />
      <Accordion
        title="Contact Support"
        content="If you need further assistance, you can reach out to our support team through this section."
      />
    </div>
  );
};

export default Help;