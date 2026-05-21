import AppRoutes from "@/routes/AppRoutes";

import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <AppRoutes />

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme={
          document.documentElement.classList.contains("dark") ? "dark" : "light"
        }
      />
    </>
  );
};

export default App;
