const PropertyDescription = ({ description }: { description: string }) => {
  return (
    <div className="ls-card p-7">
      <h2 className="text-3xl font-bold mb-4">Description</h2>

      <p className="text-muted-foreground leading-8">{description}</p>
    </div>
  );
};

export default PropertyDescription;
