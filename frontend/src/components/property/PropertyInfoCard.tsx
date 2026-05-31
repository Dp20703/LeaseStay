const PropertyInfoCard = ({ icon, title, value }: any) => {
  return (
    <div className=" ls-card p-5 flex items-center gap-5 hover:-translate-y-1 transition">
      <div className="text-3xl text-primary ">{icon}</div>

      <div>
        <p className="text-muted-foreground text-sm">{title}</p>
        <h3 className="font-bold">{value}</h3>
      </div>
    </div>
  );
};
