import { Link } from "react-router-dom";

interface NavbarLogoProps {
  admin?: boolean;
}

const NavbarLogo = ({ admin = false }: NavbarLogoProps) => {
  return (
    <Link
      to={admin ? "/admin/dashboard" : "/"}
      className="flex items-center gap-3"
    >
      <div className="flex h-11 w-11 text-base items-center justify-center rounded-xl bg-primary font-bold text-white shadow-sm">
        LS
      </div>

      <div className="hidden sm:block">
        <h1 className="text-base font-bold text-text-light dark:text-text-dark">
          LeaseStay
        </h1>

        <p className="text-xs text-text-muted">
          {admin ? "Admin Portal" : "Rental Marketplace"}
        </p>
      </div>
    </Link>
  );
};

export default NavbarLogo;
