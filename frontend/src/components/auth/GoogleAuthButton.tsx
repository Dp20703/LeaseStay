import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import type { CredentialResponse } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import api from "@/services/axios";

const GoogleAuthButton = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse,
  ) => {
    try {
      const response = await api.post("/auth/google", {
        credential: credentialResponse.credential,
      });

      login(
        response.data.data.token,

        response.data.data.user,
      );

      toast.success(response.data.message);

      navigate("/");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Google login failed");
    }
  };

  return (
    <div className="flex justify-center">
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => toast.error("Google login failed")}
      />
    </div>
  );
};

export default GoogleAuthButton;
