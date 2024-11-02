import Button from "./ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductSchema } from "../lib/FormDataSchema";
import TextField from "./ui/TextField";
import SelectField from "./ui/SelectField";
import { useCategory } from "../context/CategoryContext";
import { toast } from "react-toastify";
import { useProduct } from "../context/ProductContext";

export default function ProductForm({ handler }) {
  const { AddProduct } = useProduct();
  const { categories } = useCategory();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(ProductSchema) });

  const onSubmit = async ({ title, quantity, price, category }) => {
    try {
      await AddProduct({ title, quantity, price, category });
      toast.success(title, " product added");
      handler();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-y-4 rounded-xl bg-frg"
    >
      <TextField
        label="Title"
        name="title"
        register={register}
        error={errors.title}
      />

      <TextField
        label="Price"
        name="price"
        type="number"
        register={register}
        error={errors.price}
      />

      <TextField
        label="Quantity"
        name="quantity"
        type="number"
        register={register}
        error={errors.quantity}
      />

      <SelectField
        label="Category"
        name="category"
        register={register}
        error={errors.category}
        options={categories}
      />

      <div className="my-2 flex items-center justify-between gap-4">
        <Button label="Cancel" handler={handler} />
        <Button label="Add Product" isPrimary type="submit" />
      </div>
    </form>
  );
}
