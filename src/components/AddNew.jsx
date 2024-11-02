import { useRef, useState } from "react";
import useOutSideClick from "../hooks/useOutSideClick";
import CategoryForm from "./CategoryForm";
import ProductForm from "./ProductForm";
import Button from "./ui/Button";
import Modal from "./ui/Modal";

export default function AddNew() {
  const [openCategory, setOpenCategory] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);
  const modalRef = useRef(null);

  const toggleHandler = () => {
    setOpenCategory(false);
    setOpenProduct(false);
  };

  useOutSideClick(modalRef, toggleHandler);

  return (
    <div className="my-3 flex items-center justify-between gap-6">
      <Button label="Add Category" handler={() => setOpenCategory(true)} />
      <Button label="Add Product" handler={() => setOpenProduct(true)} />

      {openCategory && (
        <Modal
          modalRef={modalRef}
          title="Add New Category"
          handler={toggleHandler}
        >
          <CategoryForm handler={toggleHandler} />
        </Modal>
      )}

      {openProduct && (
        <Modal
          modalRef={modalRef}
          title="Add New Product"
          handler={toggleHandler}
        >
          <ProductForm handler={toggleHandler} />
        </Modal>
      )}
    </div>
  );
}
