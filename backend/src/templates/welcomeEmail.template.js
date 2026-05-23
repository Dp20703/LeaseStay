const welcomeEmailTemplate = (name) => {
  return `

    <div
      style="
        max-width: 600px;
        margin: auto;
        padding: 40px 24px;
        font-family: Arial, sans-serif;
        background: #ffffff;
        color: #111827;
      "
    >

      <div
        style="
          text-align: center;
          margin-bottom: 32px;
        "
      >

        <h1
          style="
            margin: 0;
            font-size: 32px;
            color: #2563eb;
          "
        >
          LeaseStay 🏠
        </h1>

      </div>

      <h2
        style="
          margin-bottom: 16px;
          font-size: 24px;
        "
      >
        Welcome to LeaseStay
      </h2>

      <p
        style="
          font-size: 16px;
          line-height: 1.7;
        "
      >
        Hello ${name},
      </p>

      <p
        style="
          font-size: 16px;
          line-height: 1.7;
        "
      >
        Thank you for joining LeaseStay.
        We’re excited to help you discover
        your next perfect property with a
        seamless rental experience.
      </p>

      <div
        style="
          margin: 36px 0;
          text-align: center;
        "
      >

        <a
          href="${process.env.CLIENT_URL}/properties"

          style="
            display: inline-block;
            background: #2563eb;
            color: #ffffff;
            padding: 14px 28px;
            text-decoration: none;
            border-radius: 10px;
            font-weight: 600;
            font-size: 15px;
          "
        >
          Explore Properties
        </a>

      </div>

      <p
        style="
          font-size: 16px;
          line-height: 1.7;
        "
      >
        If you have any questions,
        feel free to contact our support team.
      </p>

      <div
        style="
          margin-top: 40px;
          padding-top: 24px;
          border-top: 1px solid #e5e7eb;
          color: #6b7280;
          font-size: 14px;
        "
      >

        <p
          style="
            margin: 0 0 8px 0;
          "
        >
          Thank you,
        </p>

        <p
          style="
            margin: 0;
            font-weight: 600;
          "
        >
          LeaseStay Team
        </p>

      </div>

    </div>
  `;
};

export default welcomeEmailTemplate;
