import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
};

const Button = ({ children, onClick, className = "" }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        bg-primary
        hover:bg-primary-dark
        text-black
        px-5
        py-2
        rounded-xl
        transition
        cursor-pointer
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
