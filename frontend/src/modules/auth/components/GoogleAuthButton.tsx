import { GoogleLogin } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/modules/auth/hooks/useAuth";

const GoogleAuthButton = () => {
  const navigate = useNavigate();

  const { googleAuth } = useAuth();

  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse,
  ) => {
    try {
      if (!credentialResponse.credential) {
        toast.error("Google credential missing");

        return;
      }

      await googleAuth(credentialResponse.credential);

      toast.success("login successful");

      navigate("/");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "login failed");
    }
  };

  return (
    <div className="flex justify-center">
      <GoogleLogin
        text="continue_with"
        shape="pill"
        theme="outline"
        size="large"
        onSuccess={handleGoogleSuccess}
        onError={() => toast.error("Google login failed")}
      />
    </div>
  );
};

export default GoogleAuthButton;
