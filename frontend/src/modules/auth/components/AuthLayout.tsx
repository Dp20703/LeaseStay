import type { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl">{children}</div>
    </section>
  );
};

export default AuthLayout;
