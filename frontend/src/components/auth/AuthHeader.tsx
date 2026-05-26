import { Link } from "react-router-dom";

type AuthHeaderProps = {
  title: string;
  subtitle: string;
};

const AuthHeader = ({ title, subtitle }: AuthHeaderProps) => {
  return (
    <div className="text-center mb-10">
      <Link to="/" className="text-3xl font-bold text-primary">
        LeaseStay
      </Link>

      <h1 className="text-4xl font-bold mt-6">{title}</h1>

      <p className="text-text-muted dark:text-text-darkMuted mt-3">
        {subtitle}
      </p>
    </div>
  );
};

export default AuthHeader;
