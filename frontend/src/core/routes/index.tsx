import { useRoutes } from "react-router-dom";

import adminRoutes from "./admin.routes";
import authRoutes from "./auth.routes";
import ownerRoutes from "./owner.routes";
import publicRoutes from "./public.routes";
import userRoutes from "./user.routes";

import NotFoundPage from "@/core/pages/NotFoundPage";

const AppRoutes = () => {
  return useRoutes([
    ...publicRoutes,
    ...authRoutes,
    ...userRoutes,
    ...ownerRoutes,
    ...adminRoutes,
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);
};

export default AppRoutes;
