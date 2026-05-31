import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaChevronLeft,
  FaChevronRight,
  FaExpand,
  FaTimes,
} from "@/constants/icons";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";

interface PropertyImage {
  _id?: string;
  url: string;
  publicId?: string;
}

interface PropertyGalleryProps {
  images: PropertyImage[];
}

const PropertyGallery = ({ images }: PropertyGalleryProps) => {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [isOpen, setIsOpen] = useState(false);

  const selectedImage = images[selectedIndex];

  const nextImage = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!images?.length) return null;

  return (
    <>
      {/* Main Gallery */}
      <div className="space-y-4">
        {/* Hero Image */}

        <div className="relative overflow-hidden rounded-3xl">
          <img
            src={selectedImage?.url}
            alt="Property"
            className="h-[500px] w-full object-cover rounded-3xl"
          />

          {/* Counter */}

          <div className="absolute bottom-5 left-5 rounded-full bg-black/70 px-4 py-2 text-sm text-white ">
            {selectedIndex + 1} / {images.length}
          </div>

          {/* Expand */}

          <button
            onClick={() => setIsOpen(true)}
            className=" absolute top-6 right-6 h-12 w-12 rounded-full bg-white/90 dark:bg-slate-900/90 flex items-center justify-center shadow-lg hover:scale-110 transition "
          >
            <FaExpand />
          </button>

          <button
            onClick={() => navigate(-1)}
            className="absolute top-6 left-6 z-10 flex items-center gap-2 px-5 py-3 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white shadow-xl backdrop-blur-md hover:scale-105 transition"
          >
            <FaArrowLeft />
            <span className="font-medium">Back</span>
          </button>
        </div>

        {/* Thumbnails */}

        <div className="flex gap-3 overflow-x-auto pb-2">
          {images?.map((image, index) => (
            <button
              key={image._id || index}
              onClick={() => setSelectedIndex(index)}
              className={`shrink-0 overflow-hidden rounded-2xl border-2 transition ${
                selectedIndex === index
                  ? "border-primary"
                  : "border-transparent"
              }`}
            >
              <img src={image.url} alt="" className="h-24 w-32 object-cover" />
            </button>
          ))}
        </div>
      </div>
      {/* Fullscreen Modal */}
      {isOpen &&
        createPortal(
          <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center">
            {/* Close */}

            <button
              onClick={() => setIsOpen(false)}
              className=" absolute top-6 right-6 h-12 w-12 rounded-full bg-white text-black flex items-center justify-center "
            >
              <FaTimes />
            </button>

            {/* Previous */}

            <button
              onClick={prevImage}
              className=" absolute left-6 h-14 w-14 rounded-full bg-white text-black flex items-center justify-center "
            >
              <FaChevronLeft />
            </button>

            {/* Next */}

            <button
              onClick={nextImage}
              className=" absolute right-6 h-14 w-14 rounded-full bg-white text-black flex items-center justify-center "
            >
              <FaChevronRight />
            </button>

            {/* Image */}

            <img
              src={selectedImage.url}
              alt=""
              className=" max-h-[90vh] max-w-[90vw] object-contain rounded-2xl"
            />
          </div>,
          document.body,
        )}
      ;
    </>
  );
};

export default PropertyGallery;
