import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import BookingForm from "./BookingForm";
import type { Property } from "@/types/entities/property.types";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  property: Property;
}

const BookingModal = ({ open, onClose, property }: BookingModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Book Property
          </DialogTitle>
        </DialogHeader>

        <BookingForm property={property} onSuccess={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
