interface Props {
  setImages: (files: FileList | null) => void;
  error?: string;
}

const PropertyImageUpload = ({ setImages, error }: Props) => {
  return (
    <div className="ls-card p-6 space-y-4">
      <h2 className="text-xl font-semibold">Property Images</h2>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => setImages(e.target.files)}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default PropertyImageUpload;
