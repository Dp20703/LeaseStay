import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "@/core/api/axios";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await api.patch(`/auth/reset-password/${token}`, {
        password,
      });

      toast.success(response.data.message);

      navigate("/login");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="ls-card w-full max-w-md p-8">
        <h1 className="text-3xl font-bold mb-2">Reset Password</h1>

        <p className="text-text-muted dark:text-text-darkMuted mb-8">
          Enter your new password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="ls-label">New Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="ls-input mt-2"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="ls-btn-primary w-full"
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
