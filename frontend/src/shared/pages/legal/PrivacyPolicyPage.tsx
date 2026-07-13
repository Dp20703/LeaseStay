const PrivacyPolicyPage = () => {
  return (
    <section className="ls-section">
      <div className="ls-container max-w-4xl">
        <div className="mb-16">
          <span className="ls-badge-info mb-4 inline-flex">Privacy Policy</span>

          <h1 className="text-5xl font-bold mb-6">Your Privacy Matters</h1>

          <p className="text-lg text-text-muted dark:text-text-darkMuted">
            Learn how LeaseStay collects, uses, and protects your data.
          </p>
        </div>

        <div className="ls-card p-10 space-y-10 leading-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Information We Collect
            </h2>

            <p className="text-text-muted dark:text-text-darkMuted">
              We may collect personal information including your name, email
              address, phone number, property listings, uploaded documents, and
              usage activity on the platform.
            </p>
          </div>

          <div className="ls-divider" />

          <div>
            <h2 className="text-2xl font-semibold mb-4">
              How We Use Information
            </h2>

            <p className="text-text-muted dark:text-text-darkMuted">
              LeaseStay uses your information to provide rental services,
              improve platform experience, verify users, and ensure security and
              fraud prevention.
            </p>
          </div>

          <div className="ls-divider" />

          <div>
            <h2 className="text-2xl font-semibold mb-4">Data Protection</h2>

            <p className="text-text-muted dark:text-text-darkMuted">
              We implement industry-standard security measures to protect your
              personal information from unauthorized access or misuse.
            </p>
          </div>

          <div className="ls-divider" />

          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Third-Party Services
            </h2>

            <p className="text-text-muted dark:text-text-darkMuted">
              LeaseStay may integrate with third-party providers such as payment
              gateways, cloud storage services, and authentication providers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicyPage;
