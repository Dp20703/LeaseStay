import { useState } from "react";
import { toast } from "react-toastify";

import propertyAPI from "@/modules/property/services/propertyService";
import type { Property } from "@/modules/property/types";
import { Star, Trash2 } from "@/shared/constants/icons";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";

interface Props {
  property: Property;
  /** Called after a change so the parent can refresh the property list. */
  onChanged: () => Promise<unknown> | void;
}

/**
 * Manage media that is ALREADY uploaded: remove images / documents and
 * choose the thumbnail. (Uploading new files is handled by the main form.)
 */
const PropertyMediaManager = ({ property, onChanged }: Props) => {
  const [busyId, setBusyId] = useState<string | null>(null);

  const run = async (
    id: string,
    action: () => Promise<unknown>,
    ok: string,
  ) => {
    try {
      setBusyId(id);

      await action();
      await onChanged();

      toast.success(ok);
    } catch (error: any) {
      toast.error(getErrorMessage(error, "Action failed"));
    } finally {
      setBusyId(null);
    }
  };

  const removeImage = (imageId: string) => {
    if (property.images.length <= 1) {
      toast.error("A property needs at least one image");
      return;
    }

    if (!window.confirm("Remove this image?")) return;

    run(
      imageId,
      () => propertyAPI.deleteImage(property._id, imageId),
      "Image removed",
    );
  };

  const removeDocument = (documentId: string) => {
    if (!window.confirm("Remove this document?")) return;

    run(
      documentId,
      () => propertyAPI.deleteDocument(property._id, documentId),
      "Document removed",
    );
  };

  return (
    <div className="ls-card space-y-6 p-6">
      <div>
        <h2 className="text-xl font-semibold">Current Images</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Pick a thumbnail or remove images. Add new ones in the form below.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {property.images.map((image) => {
          const isThumbnail = property.thumbnail?.publicId === image.publicId;

          return (
            <div
              key={image._id}
              className="relative overflow-hidden rounded-xl border"
            >
              <img
                src={image.url}
                alt="Property"
                className="h-32 w-full object-cover"
              />

              {isThumbnail && (
                <span className="ls-badge-primary absolute left-2 top-2 text-xs">
                  Thumbnail
                </span>
              )}

              <div className="flex items-center justify-between gap-2 p-2">
                <button
                  type="button"
                  disabled={isThumbnail || busyId === image._id}
                  onClick={() =>
                    run(
                      image._id,
                      () => propertyAPI.setThumbnail(property._id, image._id),
                      "Thumbnail updated",
                    )
                  }
                  className="flex items-center gap-1 text-xs font-medium text-primary disabled:opacity-40"
                >
                  <Star size={14} /> Thumbnail
                </button>

                <button
                  type="button"
                  disabled={busyId === image._id}
                  onClick={() => removeImage(image._id)}
                  aria-label="Remove image"
                  className="text-red-500 disabled:opacity-40"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {property.propertyDocuments?.length > 0 && (
        <div>
          <h3 className="mb-3 text-lg font-semibold">Current Documents</h3>

          <ul className="space-y-2">
            {property.propertyDocuments.map((doc) => (
              <li
                key={doc._id}
                className="flex items-center justify-between rounded-xl border p-3 text-sm"
              >
                <span className="capitalize">
                  {String(doc.type || "document").replace(/_/g, " ")}
                </span>

                <div className="flex items-center gap-4">
                  {doc.url && (
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary underline"
                    >
                      View
                    </a>
                  )}

                  <button
                    type="button"
                    disabled={busyId === doc._id}
                    onClick={() => removeDocument(doc._id)}
                    aria-label="Remove document"
                    className="text-red-500 disabled:opacity-40"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PropertyMediaManager;
