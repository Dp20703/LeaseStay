import { Link } from "react-router-dom";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
      {/* ───────────────── Top Footer ──────────────── */}

      <div className="ls-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* ───────────────── Brand ──────────────── */}

          <div>
            <Link to="/" className="inline-block">
              <h2 className="text-2xl font-bold">
                <span className="text-primary">Lease</span>

                <span>Stay</span>
              </h2>
            </Link>

            <p className="mt-5 text-sm leading-7 text-text-muted dark:text-text-darkMuted">
              Discover premium rental properties with ease. LeaseStay helps
              tenants and property owners connect through a modern and seamless
              platform.
            </p>

            {/* Social Icons */}

            <div className="flex items-center gap-3 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-border-light dark:border-border-dark flex items-center justify-center hover:bg-primary hover:text-white transition-all"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full border border-border-light dark:border-border-dark flex items-center justify-center hover:bg-primary hover:text-white transition-all"
              >
                <FaTwitter />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full border border-border-light dark:border-border-dark flex items-center justify-center hover:bg-primary hover:text-white transition-all"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full border border-border-light dark:border-border-dark flex items-center justify-center hover:bg-primary hover:text-white transition-all"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* ───────────────── Quick Links ──────────────── */}

          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>

            <ul className="mt-5 space-y-4">
              <li>
                <Link to="/" className="ls-nav-link">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/properties" className="ls-nav-link">
                  Properties
                </Link>
              </li>

              <li>
                <Link to="/about" className="ls-nav-link">
                  About
                </Link>
              </li>

              <li>
                <Link to="/contact" className="ls-nav-link">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* ───────────────── Support ──────────────── */}

          <div>
            <h3 className="text-lg font-semibold">Support</h3>

            <ul className="mt-5 space-y-4">
              <li>
                <Link to="/faq" className="ls-nav-link">
                  FAQs
                </Link>
              </li>

              <li>
                <Link to="/privacy-policy" className="ls-nav-link">
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link to="/terms" className="ls-nav-link">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* ───────────────── Contact ──────────────── */}

          <div>
            <h3 className="text-lg font-semibold">Contact</h3>

            <ul className="mt-5 space-y-5 text-sm">
              <li className="flex items-start gap-3">
                <FaEnvelope className="mt-1 text-primary" />

                <a
                  href="mailto:support@leasestay.com"
                  className="text-text-muted dark:text-text-darkMuted hover:text-primary transition-colors"
                >
                  support@leasestay.com
                </a>
              </li>

              <li className="flex items-start gap-3">
                <FaPhoneAlt className="mt-1 text-primary" />

                <a
                  href="tel:+919054800900"
                  className="text-text-muted dark:text-text-darkMuted hover:text-primary transition-colors"
                >
                  +91 90548 00900
                </a>
              </li>

              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 text-primary" />

                <span className="text-text-muted dark:text-text-darkMuted">
                  Ahmedabad, Gujarat, India
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ───────────────── Bottom Footer ──────────────── */}

      <div className="border-t border-border-light dark:border-border-dark">
        <div className="ls-container py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-muted dark:text-text-darkMuted text-center md:text-left">
            © 2026 LeaseStay. All rights reserved.
          </p>

          <div className="flex items-center gap-5 text-sm">
            <Link to="/privacy-policy" className="ls-nav-link">
              Privacy
            </Link>

            <Link to="/terms" className="ls-nav-link">
              Terms
            </Link>

            <Link to="/cookies" className="ls-nav-link">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
