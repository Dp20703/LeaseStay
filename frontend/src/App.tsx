import AppRoutes from "@/core/routes";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <AppRoutes />

      <ToastContainer
        position="top-right"
        autoClose={1500}
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
