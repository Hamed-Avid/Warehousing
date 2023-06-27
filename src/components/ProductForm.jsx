import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getAsyncCategories } from "../features/Category/categoriesSlice";
import { addAsyncProduct } from "../features/Product/productsSlice";

const ProductForm = () => {
  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    quantity: 0,
    categoryId: "",
  });

  useEffect(() => {
    dispatch(getAsyncCategories());
  }, []);

  const changeHandler = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const { title, quantity, categoryId } = formData;
    if (title.length > 1 && quantity > 0 && categoryId.length) {
      dispatch(addAsyncProduct(formData));
      toast.success(`${title} Added`);
      setFormData({ title: "", quantity: 0, categoryId: "" });
    } else toast.error("invalid fields");
  };

  return (
    <section className="mb-10 md:mx-12 lg:mx-48">
      <h2 className="text-xl text-slate-700 dark:text-slate-300 font-bold mb-2">Add New Product</h2>
      <div className="bg-slate-300 dark:bg-slate-700 p-4 rounded-xl flex flex-col gap-y-4">
        <div>
          <label className="block mb-1 text-slate-800 font-medium dark:text-slate-400">title</label>
          <input
            type="text"
            name="title"
            onChange={changeHandler}
            value={formData.title}
            className="bg-transparent rounded-xl border border-slate-500 p-2 text-slate-800 dark:text-slate-400 w-full md:w-auto"
          />
        </div>
        <div>
          <label className="block mb-1 text-slate-800 font-medium dark:text-slate-400">quantity</label>
          <input
            type="number"
            name="quantity"
            onChange={changeHandler}
            value={formData.quantity}
            className="bg-transparent rounded-xl border border-slate-500 p-2 text-slate-800 dark:text-slate-400 w-full md:w-auto"
          />
        </div>
        <div>
          <label className="block mb-1 text-slate-800 font-medium dark:text-slate-400">category</label>
          <select
            name="categoryId"
            onChange={changeHandler}
            value={formData.categoryId}
            className="bg-transparent py-2 px-3 text-slate-800 font-medium dark:text-slate-400 rounded-xl w-full border border-slate-500"
          >
            <option className="bg-slate-300 dark:bg-slate-500 text-slate-600 font-medium dark:text-slate-300" value="">
              select a category
            </option>
            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
                className="bg-slate-500 text-slate-300"
              >
                {category.title}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-between gap-x-4">
          <button
            className="flex-1 bg-slate-500 text-slate-200 rounded-xl py-2"
            onClick={submitHandler}
          >
            Add new Product
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductForm;
