/*
  Client-side file rules. They mirror the backend multer config
  (jpeg / png / webp / pdf, max 10 MB each) so users get an instant,
  readable message instead of a failed upload.
*/

export const MAX_FILE_SIZE_MB = 10;
export const MAX_IMAGES = 10;
export const MAX_DOCUMENTS = 5;

export const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const DOCUMENT_TYPES = [...IMAGE_TYPES, "application/pdf"];

const validate = (
  files: FileList | File[] | null | undefined,
  allowed: string[],
  max: number,
  label: string,
): string => {
  const list = Array.from(files ?? []);

  if (list.length === 0) return "";

  if (list.length > max) {
    return `You can upload at most ${max} ${label}`;
  }

  for (const file of list) {
    if (!allowed.includes(file.type)) {
      return `"${file.name}" is not a supported file type`;
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      return `"${file.name}" is larger than ${MAX_FILE_SIZE_MB} MB`;
    }
  }

  return "";
};

export const validateImageFiles = (
  files: FileList | File[] | null | undefined,
  alreadyUploaded = 0,
) =>
  validate(files, IMAGE_TYPES, Math.max(MAX_IMAGES - alreadyUploaded, 0), "images (JPG, PNG or WebP)");

export const validateDocumentFiles = (
  files: FileList | File[] | null | undefined,
) => validate(files, DOCUMENT_TYPES, MAX_DOCUMENTS, "documents (PDF, JPG, PNG or WebP)");
