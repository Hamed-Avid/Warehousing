import { useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import { addAsyncCategory } from "../features/Category/categoriesSlice";

const CategoryForm = () => {
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const toggleHandler = (event) => {
    event.preventDefault();
    setIsShow((prevState) => !prevState);
  };

  const changeHandler = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(formData);
    if (formData.title != "") {
      console.log(formData);
      dispatch(addAsyncCategory(formData));
      toast.success(`category ${formData.title} added`);
      setFormData({ title: "", description: "" });
      setIsShow((prevState) => !prevState);
    } else toast.error("invalid fields");
  };

  return (
    <section className="mb-4 md:mx-12 lg:mx-48">
      <div className={`mb-8 ${!isShow && "hidden"}`}>
        <h2 className="text-xl text-slate-700 dark:text-slate-300 font-bold mb-2">
          Add New Category
        </h2>
        <form className="bg-slate-300 dark:bg-slate-700 p-4 rounded-xl flex flex-col gap-y-4">
          <div>
            <label className="block mb-1 text-slate-800 font-medium dark:text-slate-400">
              title
            </label>
            <input
              type="text"
              name="title"
              onChange={changeHandler}
              value={formData.title}
              className="bg-transparent rounded-xl border border-slate-500 p-2 text-slate-800 dark:text-slate-400 w-full md:w-auto"
            />
          </div>
          <div>
            <label className="block mb-1 text-slate-800 font-medium dark:text-slate-400">
              description
            </label>
            <textarea
              type="text"
              name="description"
              onChange={changeHandler}
              value={formData.description}
              className="bg-transparent rounded-xl border border-slate-500 p-2 text-slate-800 dark:text-slate-400 w-full"
            ></textarea>
          </div>
          <div className="flex items-center justify-between gap-x-4">
            <button
              className="flex-1 border-2 border-slate-800 dark:border-slate-400 hover:bg-slate-800 dark:hover:bg-slate-500 hover:text-white text-slate-800 dark:text-slate-400 rounded-xl py-2"
              onClick={toggleHandler}
            >
              Cancel
            </button>
            <button
              className="flex-1 bg-slate-500 hover:bg-slate-600 text-slate-200 rounded-xl py-2"
              onClick={submitHandler}
            >
              Add Category
            </button>
          </div>
        </form>
      </div>
      <button
        className={`underline flex text-center text-slate-600 text-lg py-2 px-4 font-medium ${
          isShow && "hidden"
        }`}
        onClick={toggleHandler}
      >
        Add New Category
      </button>
    </section>
  );
};

export default CategoryForm;
