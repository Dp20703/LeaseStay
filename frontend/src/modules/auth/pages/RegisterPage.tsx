import RegisterForm from "@/components/auth/RegisterForm";

const RegisterPage = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl">
        <RegisterForm />
      </div>
    </section>
  );
};

export default RegisterPage;
