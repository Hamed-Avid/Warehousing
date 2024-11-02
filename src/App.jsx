import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Providers from "./containers/Providers";
import Product from "./pages/Product";

export default function App() {
  return (
    <Providers>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Providers>
  );
}
