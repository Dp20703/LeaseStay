import type { InputHTMLAttributes, ReactNode } from "react";

type AuthInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  icon?: ReactNode;
};

const AuthInput = ({ label, error, icon, ...props }: AuthInputProps) => {
  return (
    <div>
      <label className="ls-label">{label}</label>

      <div className="relative mt-2">
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
            {icon}
          </span>
        )}

        <input
          {...props}
          className={`ls-input ${icon ? "pl-11" : ""} ${
            error ? "border-red-500" : ""
          }`}
        />
      </div>

      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default AuthInput;
