const welcomeEmailTemplate = (name) => {
  return `
    <div style="font-family: Arial; padding: 20px;">
      <h2>Welcome to LeaseStay 🏠</h2>

      <p>Hello ${name},</p>

      <p>
        Thank you for registering with LeaseStay.
        We're excited to help you find your perfect property.
      </p>


      <div style="margin:20px 0;">
        <a 
          href="https://yourfrontend.com"
          style="
            background:#2563eb;
            color:white;
            padding:12px 20px;
            text-decoration:none;
            border-radius:5px;
          "
        >
          Explore Properties
        </a>
      </div>



      <p>Thank you,<br/>LeaseStay Team</p>
    </div>
  `;
};

export default welcomeEmailTemplate;
