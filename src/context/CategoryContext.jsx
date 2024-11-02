import { createContext, useContext, useEffect, useReducer } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { initialCategories } from "../lib/data";

const CategoryContext = createContext();

function reducer(categories, { type, payload }) {
  switch (type) {
    case "add": {
      return [...categories, payload];
    }

    default:
      throw new Error("Unknown Action " + type);
  }
}

export default function CategoryProvider({ children }) {
  const [local, setLocal] = useLocalStorage("categories", initialCategories);
  const [categories, dispatch] = useReducer(reducer, local);

  useEffect(() => {
    setLocal(categories);
  }, [categories]);

  const AddCategory = ({ title, description }) => {
    dispatch({
      type: "add",
      payload: { id: Date.now(), title, description },
    });
  };

  const GetCategory = (categoryId) => {
    return categories.find((ctg) => ctg.id === categoryId);
  };

  return (
    <CategoryContext.Provider value={{ categories, AddCategory, GetCategory }}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategory() {
  const context = useContext(CategoryContext);
  if (context === undefined)
    throw new Error("CategoryContext was used outside of CategoryProvider");
  return context;
}
