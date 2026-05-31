const RelatedPropertiesSkeleton = () => {
  return (
    <div className=" grid md:grid-cols-2 lg:grid-cols-3 gap-6 ">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className=" h-[400px] rounded-3xl animate-pulse bg-muted-light dark:bg-muted-dark "
        />
      ))}
    </div>
  );
};

export default RelatedPropertiesSkeleton;
