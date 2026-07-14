import { Route } from "react-router-dom";

import OwnerWrapper from "../wrappers/OwnerWrapper";
import OwnerLayout from "@/layouts/OwnerLayout";
import DashboardPage from "@/modules/owner/pages/DashboardPage";
import OwnerPropertiesPage from "@/modules/property/pages/OwnerPropertiesPage";
import OwnerBookingRequestsPage from "@/modules/owner/pages/OwnerBookingRequestsPage";
import CreatePropertyPage from "@/modules/property/pages/CreatePropertyPage";

const OwnerRoutes = () => {
  return (
    <Route element={<OwnerWrapper />}>
      <Route element={<OwnerLayout />}>
        <Route path="/owner/dashboard" element={<DashboardPage />} />
        <Route path="/owner/properties" element={<OwnerPropertiesPage />} />

        <Route
          path="/owner/properties/create"
          element={<CreatePropertyPage />}
        />

        <Route
          path="/owner/booking-requests"
          element={<OwnerBookingRequestsPage />}
        />
      </Route>
    </Route>
  );
};

export default OwnerRoutes;
