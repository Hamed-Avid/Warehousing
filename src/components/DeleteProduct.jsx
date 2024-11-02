import { useProduct } from "../context/ProductContext";
import Button from "./ui/Button";

export default function DeleteProduct({ id, handler }) {
  const { DeleteProduct } = useProduct();

  const deleteHandler = () => {
    DeleteProduct(id);
    handler();
  };

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-center font-bold text-primary">are you sure?</h1>
      <div className="my-2 flex items-center justify-between gap-8">
        <Button label="Cancel" handler={handler} />
        <Button label="Delete" isPrimary handler={deleteHandler} />
      </div>
    </div>
  );
}
