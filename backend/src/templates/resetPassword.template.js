const resetWelcomeTemplate = (resetUrl) => {
  return `

    <div
      style="
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: auto;
        padding: 20px;
      "
    >

      <h2>
        Reset Your Password
      </h2>

      <p>
        We received a request to reset your LeaseStay password.
      </p>

      <p>
        Click the button below to reset your password:
      </p>

      <a
        href="${resetUrl}"

        style="
          display: inline-block;
          padding: 12px 24px;
          background-color: #2563eb;
          color: white;
          text-decoration: none;
          border-radius: 8px;
          margin-top: 12px;
        "
      >
        Reset Password
      </a>

      <p style="margin-top: 24px;">
        This link will expire in
        <strong>15 minutes</strong>.
      </p>

      <p>
        If you did not request this,
        you can safely ignore this email.
      </p>

      <hr style="margin: 32px 0;" />

      <p
        style="
          font-size: 14px;
          color: #666;
        "
      >
        LeaseStay Security Team
      </p>

    </div>
  `;
};

export default resetWelcomeTemplate;
