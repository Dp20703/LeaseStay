const ownerWelcomeTemplate = (name) => {
  return `
  
  <div style="font-family:Arial;padding:20px;">

    <h2>
      Welcome Owner to LeaseStay 🏠
    </h2>

    <p>
      Hello ${name},
    </p>

    <p>
      Your owner account has been
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

export default ownerWelcomeTemplate;
