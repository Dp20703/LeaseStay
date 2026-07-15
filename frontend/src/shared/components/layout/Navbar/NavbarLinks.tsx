import { NavLink } from "react-router-dom";
import { NAV_LINKS } from "@/shared/components/layout/navbar/navbar.constants";

const NavbarLinks = () => {
  return (
    <>
      {NAV_LINKS.map((link) => (
        <NavLink key={link.path} to={link.path} className={"ls-nav-link"}>
          {link.label}
        </NavLink>
      ))}
    </>
  );
};

export default NavbarLinks;
