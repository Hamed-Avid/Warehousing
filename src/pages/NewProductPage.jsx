import { useState } from "react";
import CategoryForm from "../components/CategoryForm";
import ProductForm from "../components/ProductForm";

const NewProductPage = () => {
  return (
    <section className="mt-4 mx-4 md:mx-8">
      <CategoryForm />
      <ProductForm />
    </section>
  );
};

export default NewProductPage;
