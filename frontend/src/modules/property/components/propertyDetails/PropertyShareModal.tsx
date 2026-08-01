import { toast } from "react-toastify";
import {
  Share2,
  Copy,
  FaWhatsapp,
  FaFacebook,
  FaTwitter,
  Send,
} from "@/shared/constants/icons";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog/dialog";

interface PropertyShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  property: {
    _id: string;
    title: string;
    description: string;
    slug: string;
    thumbnail: {
      url: string;
    };
  };
  trackPropertyShareCount: (id: string) => Promise<void>;
}

export default function PropertyShareModal({
  open,
  onOpenChange,
  property,
  trackPropertyShareCount,
}: PropertyShareModalProps) {
  const propertyUrl = `${window.location.origin}/properties/${property.slug}`;

  const shareData = {
    title: property.title,
    text: property.description,
    url: propertyUrl,
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(propertyUrl);

    await trackPropertyShareCount(property._id);

    toast.success("Link copied");
  };

  const nativeShare = async () => {
    try {
      await navigator.share(shareData);

      await trackPropertyShareCount(property._id);
    } catch (error) {
      console.log(error);
    }
  };

  const socialLinks = [
    {
      name: "WhatsApp",
      icon: <FaWhatsapp size={24} />,
      url: `https://wa.me/?text=${encodeURIComponent(propertyUrl)}`,
    },
    {
      name: "Telegram",
      icon: <Send size={24} />,
      url: `https://t.me/share/url?url=${encodeURIComponent(propertyUrl)}`,
    },
    {
      name: "Twitter",
      icon: <FaTwitter size={24} />,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        propertyUrl,
      )}`,
    },
    {
      name: "FaFacebook",
      icon: <FaFacebook size={24} />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        propertyUrl,
      )}`,
    },
  ];

  const openSocialShare = async (url: string) => {
    window.open(url, "_blank");

    await trackPropertyShareCount(property._id);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Share Property</DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          {/* Preview */}

          <div className="overflow-hidden rounded-2xl border">
            <img
              src={property.thumbnail.url}
              alt={property.title}
              className="h-52 w-full object-cover"
            />

            <div className="p-4">
              <h3 className="font-semibold">{property.title}</h3>

              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                {property.description}
              </p>
            </div>
          </div>

          {/* Social Icons */}

          <div className="grid grid-cols-4 gap-4">
            {socialLinks.map((social) => (
              <button
                key={social.name}
                onClick={() => openSocialShare(social.url)}
                className="flex flex-col items-center gap-2 rounded-xl border p-4 hover:bg-muted"
              >
                {social.icon}

                <span className="text-xs">{social.name}</span>
              </button>
            ))}
          </div>

          {/* Copy */}

          <button
            onClick={copyLink}
            className="flex w-full items-center justify-center gap-2 rounded-xl border p-3"
          >
            <Copy />
            Copy Link
          </button>

          {/* Native Share */}

          {"share" in navigator && (
            <button
              onClick={nativeShare}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary p-3 text-white"
            >
              <Share2 />
              Share
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
