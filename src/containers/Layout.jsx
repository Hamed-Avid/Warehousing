import Navbar from "../components/Navbar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-bkg transition duration-200">
      <Navbar />
      <main className="container mx-auto flex-col overflow-hidden px-4 md:flex-row lg:max-w-screen-xl">
        {children}
      </main>
    </div>
  );
}
