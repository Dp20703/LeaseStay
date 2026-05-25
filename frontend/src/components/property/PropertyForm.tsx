import { useState } from "react";

interface PropertyFormProps {
  onSubmit: (formData: FormData) => void;
  loading: boolean;
}

const PropertyForm = ({ onSubmit, loading }: PropertyFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState<FileList | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("price", price);

    if (images) {
      Array.from(images).forEach((file) => {
        formData.append("images", file);
      });
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
      <input
        type="text"
        placeholder="Property Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="ls-input"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="ls-input min-h-[150px]"
      />

      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="ls-input"
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="ls-input"
      />

      <input
        type="file"
        multiple
        onChange={(e) => setImages(e.target.files)}
        className="ls-input"
      />

      <button type="submit" disabled={loading} className="ls-button-primary">
        {loading ? "Saving..." : "Save Property"}
      </button>
    </form>
  );
};

export default PropertyForm;
