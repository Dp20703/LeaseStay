import React from "react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section>
      <div className="ls-container">
        <div className="ls-card p-14 text-center bg-primary text-white flex items-center justify-center flex-col">
          <h2 className="text-4xl font-bold">Ready To Find Your Next Home?</h2>

          <p className="mt-5 text-lg opacity-90">
            Browse hundreds of verified properties.
          </p>

          <Link
            to={"/properties"}
            className="mt-8 ls-btn-secondary dark:ls-btn-primary "
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
};
export default CTASection;
