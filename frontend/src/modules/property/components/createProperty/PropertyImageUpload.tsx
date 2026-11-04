import { useState } from "react";

import { validateImageFiles } from "@/shared/utils/fileValidation";

interface Props {
  setImages: (files: FileList | null) => void;
  error?: string;
  /** Images already stored on the property (edit mode) — counts toward the limit. */
  existingCount?: number;
}

const PropertyImageUpload = ({ setImages, error, existingCount = 0 }: Props) => {
  const [localError, setLocalError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const message = validateImageFiles(files, existingCount);

    if (message) {
      setLocalError(message);
      setImages(null);
      e.target.value = "";
      return;
    }

    setLocalError("");
    setImages(files && files.length ? files : null);
  };

  const shown = localError || error;

  return (
    <div className="ls-card p-6 space-y-4">
      <h2 className="text-xl font-semibold">
        {existingCount > 0 ? "Add More Images" : "Property Images"}
      </h2>

      <input
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp"
        onChange={handleChange}
      />

      <p className="text-xs text-muted-foreground">
        JPG, PNG or WebP · max 10 MB each · up to 10 images in total
      </p>

      {shown && <p className="text-red-500 text-sm">{shown}</p>}
    </div>
  );
};

export default PropertyImageUpload;
