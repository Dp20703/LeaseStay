interface Props {
  error?: string;
}

const PropertyFormError = ({ error }: Props) => {
  if (!error) return null;

  return <p className="text-sm text-red-500 mt-1">{error}</p>;
};

export default PropertyFormError;
