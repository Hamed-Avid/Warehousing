import AddNew from "../components/AddNew";
import ProductList from "../components/ProductList";

export default function HomePage() {
  return (
    <>
      <AddNew />

      <h1 className="my-3 text-center text-4xl font-bold text-primary">
        Product list
      </h1>

      <ProductList />
    </>
  );
}
