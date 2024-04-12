import { Outlet } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RootLayout = () => {
  return (
    <>
      <NavigationBar />
      <ToastContainer limit={1} />
      <Outlet />
    </>
  );
};

export default RootLayout;
