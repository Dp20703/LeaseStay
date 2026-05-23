import { NavLink } from "react-router-dom";

import { FaHeart, FaHome, FaUser } from "react-icons/fa";
import { FcSettings } from "react-icons/fc";

const UserSidebar = () => {
  return (
    <aside className="ls-sidebar">
      <h2 className="ls-sidebar-title">My Account</h2>

      <div className="flex flex-col gap-3">
        <NavLink to="/profile" className="ls-sidebar-link">
          <FaUser />

          <span>Profile</span>
        </NavLink>

        <NavLink to="/wishlist" className="ls-sidebar-link">
          <FaHeart />

          <span>Wishlist</span>
        </NavLink>

        <NavLink to="/my-properties" className="ls-sidebar-link">
          <FaHome />

          <span>My Properties</span>
        </NavLink>
        <NavLink to="/account-settings" className="ls-sidebar-link">
          <FcSettings />

          <span>Change Setting</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default UserSidebar;
