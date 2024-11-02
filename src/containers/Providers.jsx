import { BrowserRouter } from "react-router-dom";
import CategoryProvider from "../context/CategoryContext";
import Layout from "./Layout";
import ProductProviders from "../context/ProductContext";

export default function Providers({ children }) {
  return (
    <BrowserRouter>
      <CategoryProvider>
        <ProductProviders>
          <Layout>{children}</Layout>
        </ProductProviders>
      </CategoryProvider>
    </BrowserRouter>
  );
}
