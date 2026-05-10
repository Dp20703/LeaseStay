const sellerWelcomeTemplate = (
  name
) => {
  return `
  
  <div style="font-family:Arial;padding:20px;">

    <h2>
      Welcome Seller to LeaseStay 🏠
    </h2>

    <p>
      Hello ${name},
    </p>

    <p>
      Your seller account has been
      created successfully.
    </p>

    <p>
      You can now list properties,
      manage listings, and connect
      with tenants.
    </p>

    <br/>

    <p>
      Thanks,<br/>
      LeaseStay Team
    </p>

  </div>
  
  `;
};

export default sellerWelcomeTemplate;