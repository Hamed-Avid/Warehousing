const ProductUpdateForm = ({ formData, categories, setProduct }) => {
  const changeHandler = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setProduct({ ...formData, [name]: value });
  };

  return (
    <form>
      <div className="flex gap-x-2 mb-3">
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          value={formData.title}
          className="bg-transparent rounded-xl border border-slate-500 p-2 text-slate-400 w-full md:w-auto"
        />
        <input
          type="number"
          name="quantity"
          onChange={changeHandler}
          value={formData.quantity}
          className="bg-transparent rounded-xl border border-slate-500 p-2 text-slate-400 w-full md:w-1/4"
        />
      </div>
      <select
        name="categoryId"
        onChange={changeHandler}
        value={formData.categoryId}
        className="bg-transparent py-2 px-3 text-slate-400 rounded-xl w-full border border-slate-500"
      >
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
    </form>
  );
};

export default ProductUpdateForm;
