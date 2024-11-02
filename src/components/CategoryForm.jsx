import TextField from "./ui/TextField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategorySchema } from "../lib/FormDataSchema";
import TextAreaField from "./ui/TextAreaField";
import Button from "./ui/Button";
import { useCategory } from "../context/CategoryContext";
import { toast } from "react-toastify";

export default function CategoryForm({ handler }) {
  const { AddCategory } = useCategory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(CategorySchema) });

  const onSubmit = async ({ title, description }) => {
    try {
      await AddCategory({ title, description });
      toast.success(title, " category added");
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

      <TextAreaField
        label="Description"
        name="description"
        register={register}
        error={errors.description}
      />

      <div className="my-2 flex items-center justify-between gap-4">
        <Button label="Cancel" handler={handler} />
        <Button label="Add Category" isPrimary type="submit" />
      </div>
    </form>
  );
}
