const stats = [
  {
    number: "500+",
    label: "Properties",
  },

  {
    number: "2K+",
    label: "Happy Clients",
  },

  {
    number: "120+",
    label: "Property Owners",
  },

  {
    number: "15+",
    label: "Cities",
  },
];

const StatsSection = () => {
  return (
    <section>
      <div className="ls-container">
        <div className="ls-card p-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <h3 className="text-4xl font-bold text-primary">
                  {stat.number}
                </h3>

                <p className="mt-3 text-text-muted dark:text-text-darkMuted">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
