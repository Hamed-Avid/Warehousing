import Navbar from "../components/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="transition duration-200 bg-bkg min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 overflow-hidden md:flex-row flex-col lg:max-w-screen-xl">
        {children}
      </main>
    </div>
  );
};

export default Layout;
