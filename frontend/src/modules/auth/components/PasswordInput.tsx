import { useState } from "react";
import { Eye, EyeOff, Lock } from "@/shared/constants/icons";

type PasswordInputProps = {
  label: string;
  name: string;
  value: string;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const PasswordInput = ({
  label,
  name,
  value,
  error,
  placeholder = "Enter your password",
  autoComplete = "current-password",
  disabled = false,
  onChange,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="ls-label">
        {label}
      </label>

      <div className="relative">
        <Lock
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
        />

        <input
          id={name}
          name={name}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          disabled={disabled}
          placeholder={placeholder}
          className={`ls-input pl-12 pr-12 ${
            error ? "border-red-500 focus:border-red-500" : ""
          }`}
        />

        <button
          type="button"
          tabIndex={-1}
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted transition-colors hover:text-primary"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default PasswordInput;
