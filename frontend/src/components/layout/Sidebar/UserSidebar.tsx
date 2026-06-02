import { NavLink } from "react-router-dom";
import { FaCalendarCheck, FaHeart, FaUser } from "react-icons/fa";
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

        <NavLink to="/bookings" className="ls-sidebar-link">
          <FaCalendarCheck />

          <span>My Bookings</span>
        </NavLink>
        <NavLink to="/settings" className="ls-sidebar-link">
          <FcSettings />

          <span>Settings</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default UserSidebar;
