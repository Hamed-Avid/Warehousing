import { useForm } from "react-hook-form";
import { useProduct } from "../context/ProductContext";
import { useCategory } from "../context/CategoryContext";
import { ProductSchema } from "../lib/FormDataSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "./ui/TextField";
import SelectField from "./ui/SelectField";
import Button from "./ui/Button";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function EditProduct({ id, handler }) {
  const { GetProduct, EditProduct } = useProduct();
  const { categories } = useCategory();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(ProductSchema) });

  useEffect(() => {
    const product = GetProduct(id);
    reset({
      title: product.title,
      price: product.price,
      quantity: product.quantity,
      category: `${product.categoryId}`,
    });
  }, []);

  const onSubmit = async ({ title, quantity, price, category }) => {
    try {
      await EditProduct({ id, title, quantity, price, category });
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
        label="Quantity"
        name="quantity"
        type="number"
        register={register}
        error={errors.quantity}
      />

      <TextField
        label="Price"
        name="price"
        type="number"
        register={register}
        error={errors.price}
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
        <Button label="Update" isPrimary type="submit" />
      </div>
    </form>
  );
}
