import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "How do I list my property on LeaseStay?",

    answer:
      "You can register as a seller, verify your account, and create property listings from your dashboard.",
  },

  {
    question: "Are properties verified?",

    answer:
      "Yes. LeaseStay verifies seller information and property documents for improved trust and security.",
  },

  {
    question: "Can I contact property owners directly?",

    answer:
      "Yes. Once logged in, you can connect with property owners through the platform.",
  },

  {
    question: "Is LeaseStay free to use?",

    answer: "Yes. Browsing properties is completely free for users.",
  },
];

const FaqPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="ls-section">
      <div className="ls-container max-w-4xl">
        {/* HERO */}

        <div className="text-center mb-16">
          <span className="ls-badge-primary mb-4 inline-flex">FAQs</span>

          <h1 className="text-5xl font-bold mb-6">
            Frequently Asked Questions
          </h1>

          <p className="text-lg text-text-muted dark:text-text-darkMuted">
            Everything you need to know about LeaseStay.
          </p>
        </div>

        {/* FAQS */}

        <div className="space-y-5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={index} className="ls-card overflow-hidden">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <h3 className="text-lg font-semibold">{faq.question}</h3>

                  {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-text-muted dark:text-text-darkMuted leading-7">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqPage;
