import { Link } from "react-router-dom";

type AuthHeaderProps = {
  title: string;
  subtitle: string;
};

const AuthHeader = ({ title, subtitle }: AuthHeaderProps) => {
  return (
    <div className="text-center mb-4">
      <Link to="/" className="text-2xl font-bold text-primary">
        LeaseStay
      </Link>

      <h1 className="text-3xl font-bold mt-6">{title}</h1>

      <p className="text-sm text-text-muted dark:text-text-darkMuted mt-2">
        {subtitle}
      </p>
    </div>
  );
};

export default AuthHeader;
