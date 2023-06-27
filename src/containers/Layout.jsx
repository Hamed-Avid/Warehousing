import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";

const Layout = ({ children }) => {
  return (
    <div className="transition duration-200 bg-gray-200 dark:bg-slate-800 min-h-screen">
      <Navbar />
      <ToastContainer />
      <main className="container mx-auto px-4 overflow-hidden md:flex-row flex-col lg:max-w-screen-xl">
        {children}
      </main>
    </div>
  );
};

export default Layout;
