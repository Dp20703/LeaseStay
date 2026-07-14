import { ToastContainer } from "react-toastify";
import AppRoutes from "./core/routes";

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
