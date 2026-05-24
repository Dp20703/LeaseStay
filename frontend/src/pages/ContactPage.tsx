import { useState } from "react";

import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

import { toast } from "react-toastify";

const ContactPage = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      // API CALL HERE

      toast.success("Message sent successfully");

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch {
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="ls-section">
      <div className="ls-container">
        {/* HERO */}

        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="ls-badge-primary mb-4 inline-flex">Contact Us</span>

          <h1 className="text-5xl font-bold mb-6">
            We’d Love To Hear From You
          </h1>

          <p className="text-lg text-text-muted dark:text-text-darkMuted leading-8">
            Have questions, feedback, or need assistance? Our team is here to
            help you anytime.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* CONTACT INFO */}

          <div className="space-y-8">
            <div className="ls-card p-8 flex gap-5">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-2xl shrink-0">
                <FaEnvelope />
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Email</h3>

                <p className="text-text-muted dark:text-text-darkMuted">
                  support@leasestay.com
                </p>
              </div>
            </div>

            <div className="ls-card p-8 flex gap-5">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-2xl shrink-0">
                <FaPhoneAlt />
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Phone</h3>

                <p className="text-text-muted dark:text-text-darkMuted">
                  +91 9054800900
                </p>
              </div>
            </div>

            <div className="ls-card p-8 flex gap-5">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-2xl shrink-0">
                <FaMapMarkerAlt />
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Location</h3>

                <p className="text-text-muted dark:text-text-darkMuted">
                  Ahmedabad, Gujarat, India
                </p>
              </div>
            </div>
          </div>

          {/* CONTACT FORM */}

          <div className="ls-card p-8">
            <h2 className="text-3xl font-bold mb-8">Send Message</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="ls-label">Full Name</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="ls-input mt-2"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="ls-label">Email</label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="ls-input mt-2"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="ls-label">Message</label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="ls-textarea mt-2 resize-none"
                  placeholder="Enter your message..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="ls-btn-primary w-full"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
