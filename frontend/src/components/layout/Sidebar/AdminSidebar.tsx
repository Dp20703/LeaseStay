import { NavLink } from "react-router-dom";
import { FaCheckCircle, FaHome, FaUsers } from "react-icons/fa";

const AdminSidebar = () => {
  return (
    <aside className="ls-sidebar">
      <h2 className="ls-sidebar-title">Admin Panel</h2>

      <div className="flex flex-col gap-3">
        <NavLink to="/admin" className="ls-sidebar-link">
          <FaHome />

          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/admin/users" className="ls-sidebar-link">
          <FaUsers />

          <span>Users</span>
        </NavLink>

        <NavLink to="/admin/verifications" className="ls-sidebar-link">
          <FaCheckCircle />

          <span>Verifications</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default AdminSidebar;
