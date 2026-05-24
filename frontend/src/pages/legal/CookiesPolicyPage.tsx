const CookiesPolicyPage = () => {
  return (
    <section className="ls-section">
      <div className="ls-container max-w-4xl">
        {/* HERO */}

        <div className="mb-16">
          <span className="ls-badge-orange mb-4 inline-flex">
            Cookies Policy
          </span>

          <h1 className="text-5xl font-bold mb-6">
            Cookies & Tracking Technologies
          </h1>

          <p className="text-lg text-text-muted dark:text-text-darkMuted leading-8">
            Learn how LeaseStay uses cookies and similar technologies to improve
            your browsing experience.
          </p>
        </div>

        {/* CONTENT */}

        <div className="ls-card p-10 space-y-10 leading-8">
          {/* SECTION */}

          <div>
            <h2 className="text-2xl font-semibold mb-4">What Are Cookies?</h2>

            <p className="text-text-muted dark:text-text-darkMuted">
              Cookies are small text files stored on your device when you visit
              websites. They help improve functionality, remember preferences,
              and enhance user experience.
            </p>
          </div>

          {/* SECTION */}

          <div className="ls-divider" />

          <div>
            <h2 className="text-2xl font-semibold mb-4">
              How LeaseStay Uses Cookies
            </h2>

            <p className="text-text-muted dark:text-text-darkMuted">
              LeaseStay uses cookies to keep users logged in, improve security,
              personalize content, analyze traffic, and enhance platform
              performance.
            </p>
          </div>

          {/* SECTION */}

          <div className="ls-divider" />

          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Types Of Cookies We Use
            </h2>

            <div className="space-y-5">
              <div>
                <h3 className="font-semibold mb-2">Essential Cookies</h3>

                <p className="text-text-muted dark:text-text-darkMuted">
                  Required for authentication, security, and core platform
                  functionality.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Analytics Cookies</h3>

                <p className="text-text-muted dark:text-text-darkMuted">
                  Help us understand how users interact with LeaseStay so we can
                  improve the platform.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Preference Cookies</h3>

                <p className="text-text-muted dark:text-text-darkMuted">
                  Store user settings such as theme preferences and saved
                  choices.
                </p>
              </div>
            </div>
          </div>

          {/* SECTION */}

          <div className="ls-divider" />

          <div>
            <h2 className="text-2xl font-semibold mb-4">Managing Cookies</h2>

            <p className="text-text-muted dark:text-text-darkMuted">
              Most browsers allow you to control or disable cookies through
              browser settings. However, disabling cookies may impact certain
              platform features.
            </p>
          </div>

          {/* SECTION */}

          <div className="ls-divider" />

          <div>
            <h2 className="text-2xl font-semibold mb-4">Third-Party Cookies</h2>

            <p className="text-text-muted dark:text-text-darkMuted">
              LeaseStay may use trusted third-party services such as analytics
              providers, authentication providers, and embedded content that may
              place cookies on your device.
            </p>
          </div>

          {/* FOOTER */}

          <div className="pt-8 border-t border-border-light dark:border-border-dark">
            <p className="text-sm text-text-muted dark:text-text-darkMuted">
              Last updated: May 2026
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CookiesPolicyPage;
