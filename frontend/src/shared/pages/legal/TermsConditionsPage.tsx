const TermsConditionsPage = () => {
  return (
    <section className="ls-section">
      <div className="ls-container max-w-4xl">
        <div className="mb-16">
          <span className="ls-badge-warning mb-4 inline-flex">
            Terms & Conditions
          </span>

          <h1 className="text-5xl font-bold mb-6">Terms Of Service</h1>

          <p className="text-lg text-text-muted dark:text-text-darkMuted">
            Please read these terms carefully before using LeaseStay.
          </p>
        </div>

        <div className="ls-card p-10 space-y-10 leading-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Acceptance Of Terms</h2>

            <p className="text-text-muted dark:text-text-darkMuted">
              By accessing LeaseStay, you agree to comply with these terms and
              all applicable laws and regulations.
            </p>
          </div>

          <div className="ls-divider" />

          <div>
            <h2 className="text-2xl font-semibold mb-4">
              User Responsibilities
            </h2>

            <p className="text-text-muted dark:text-text-darkMuted">
              Users are responsible for maintaining accurate information and
              ensuring that property listings comply with applicable
              regulations.
            </p>
          </div>

          <div className="ls-divider" />

          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Prohibited Activities
            </h2>

            <p className="text-text-muted dark:text-text-darkMuted">
              Fraudulent listings, misuse of platform services, unauthorized
              access attempts, and abusive behavior are strictly prohibited.
            </p>
          </div>

          <div className="ls-divider" />

          <div>
            <h2 className="text-2xl font-semibold mb-4">Account Suspension</h2>

            <p className="text-text-muted dark:text-text-darkMuted">
              LeaseStay reserves the right to suspend or terminate accounts
              violating platform policies or engaging in suspicious activities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsConditionsPage;
