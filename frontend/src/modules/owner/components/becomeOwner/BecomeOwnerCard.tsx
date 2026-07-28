import {
  BecomeOwnerHeader,
  BecomeOwnerSubmitButton,
  DocumentTypeSelect,
  VerificationDocumentUpload,
} from ".";
import useBecomeOwner from "../../hooks/useBecomeOwner";

const BecomeOwnerCard = () => {
  const {
    loading,
    documentType,
    file,
    setDocumentType,
    setFile,
    handleSubmit,
  } = useBecomeOwner();

  return (
    <div className="w-full max-w-lg rounded-2xl bg-card-light dark:bg-card-dark shadow-card border border-border-light dark:border-border-dark p-8 animate-scale-in">
      <BecomeOwnerHeader />

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <DocumentTypeSelect value={documentType} onChange={setDocumentType} />
        <VerificationDocumentUpload file={file} onChange={setFile} />
        <BecomeOwnerSubmitButton loading={loading} />
      </form>
    </div>
  );
};

export default BecomeOwnerCard;
