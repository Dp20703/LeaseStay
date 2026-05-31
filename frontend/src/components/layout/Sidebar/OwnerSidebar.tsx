import { NavLink } from "react-router-dom";
import { FaHome, FaPlus, FaTachometerAlt } from "react-icons/fa";

const OwnerSidebar = () => {
  return (
    <aside className="ls-sidebar">
      <h2 className="ls-sidebar-title">Owner Panel</h2>

      <div className="flex flex-col gap-3">
        <NavLink to="/owner/dashboard" className="ls-sidebar-link">
          <FaTachometerAlt />

          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/owner/properties" end className="ls-sidebar-link">
          <FaHome />

          <span>My Properties</span>
        </NavLink>

        <NavLink to="/owner/properties/create" className="ls-sidebar-link">
          <FaPlus />

          <span>Add Property</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default OwnerSidebar;
