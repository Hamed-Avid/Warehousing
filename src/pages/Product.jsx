import { useNavigate, useParams } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import { BsFillImageFill } from "react-icons/bs";
import { useCategory } from "../context/CategoryContext";
import { RiArrowGoBackFill } from "react-icons/ri";

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { GetProduct } = useProduct();
  const { GetCategory } = useCategory();
  const { title, categoryId, price, quantity, createdAt } =
    GetProduct(id) || {};

  return (
    <section className="flex flex-col items-center justify-center">
      {title ? (
        <div className="my-10 flex w-full max-w-screen-sm flex-col items-center gap-10 rounded-xl bg-frg p-3 pb-10">
          <BsFillImageFill size={80} className="rounded-lg bg-gray-400 p-4" />
          <div className="flex w-full items-center justify-evenly">
            <h1 className="font-bold text-primary">{title}</h1>

            <span className="rounded-xl bg-bkg px-3 py-1 text-primary">
              ${price}
            </span>
          </div>
          <div className="flex w-full items-center justify-evenly">
            <span className="rounded-xl bg-bkg px-3 py-1 text-primary">
              {GetCategory(categoryId)?.title}
            </span>
            <span className="rounded-xl bg-bkg px-3 py-1 text-primary">
              {quantity}
            </span>
            <span className="rounded-xl bg-bkg px-3 py-1 text-primary">
              {new Date(createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      ) : (
        <span className="my-20 text-red-500">something wrong !!!</span>
      )}
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="rounded-xl bg-secondary px-5 py-1"
      >
        <RiArrowGoBackFill />
      </button>
    </section>
  );
}
