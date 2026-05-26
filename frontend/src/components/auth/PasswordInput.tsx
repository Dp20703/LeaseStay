import { useState } from "react";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";

type PasswordInputProps = {
  label: string;
  name: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const PasswordInput = ({
  label,
  name,
  value,
  error,
  onChange,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label className="ls-label">{label}</label>

      <div className="relative mt-2">
        <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />

        <input
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          className={`ls-input pl-11 pr-12 ${error ? "border-red-500" : ""}`}
          autoComplete="current-password"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default PasswordInput;
