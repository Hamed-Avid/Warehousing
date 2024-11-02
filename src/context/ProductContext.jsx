import { createContext, useContext, useEffect, useReducer } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { initialProducts } from "../lib/data";

const ProductContext = createContext();

function reducer(products, { type, payload }) {
  switch (type) {
    case "add": {
      return [...products, payload];
    }

    case "edit": {
      const product = products.find((p) => p.id === payload.id);
      product.title = payload.title;
      product.price = payload.price;
      product.quantity = payload.quantity;
      product.categoryId = payload.categoryId;
      return products;
    }

    case "delete": {
      return products.filter((product) => product.id !== payload);
    }

    default:
      throw new Error("Unknown Action " + type);
  }
}

export default function ProductProviders({ children }) {
  const [local, setLocal] = useLocalStorage("products", initialProducts);
  const [products, dispatch] = useReducer(reducer, local);

  useEffect(() => {
    setLocal(products);
  }, [products]);

  const AddProduct = ({ title, quantity, price, category }) => {
    dispatch({
      type: "add",
      payload: {
        id: Date.now(),
        title,
        price,
        quantity,
        categoryId: parseInt(category),
        createdAt: Date.now(),
      },
    });
  };

  const GetProduct = (productId) => {
    return products.find((ctg) => ctg.id === parseInt(productId));
  };

  const EditProduct = ({ id, title, quantity, price, category }) => {
    dispatch({
      type: "edit",
      payload: {
        id,
        title,
        price,
        quantity,
        categoryId: parseInt(category),
      },
    });
  };

  const DeleteProduct = (productId) => {
    dispatch({
      type: "delete",
      payload: parseInt(productId),
    });
  };

  return (
    <ProductContext.Provider
      value={{ products, AddProduct, GetProduct, EditProduct, DeleteProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  const context = useContext(ProductContext);
  if (context === undefined)
    throw new Error("ProductContext was used outside of ProductProvider");
  return context;
}
