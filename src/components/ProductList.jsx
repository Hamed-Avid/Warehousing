import { useEffect, useRef, useState } from "react";
import { useProduct } from "../context/ProductContext";
import { useCategory } from "../context/CategoryContext";
import { RiDeleteBin3Line, RiEdit2Fill, RiEyeFill } from "react-icons/ri";
import SearchBar from "./SearchBar";
import Pagination from "./ui/Pagination";
import { useNavigate } from "react-router-dom";
import Modal from "./ui/Modal";
import DeleteProduct from "./DeleteProduct";
import useOutSideClick from "../hooks/useOutSideClick";
import EditProduct from "./EditProduct";
import useFiltered from "../hooks/useFilter";

export default function ProductList() {
  const { products } = useProduct();
  const { categories, GetCategory } = useCategory();
  const [currentPage, setCurrentPage] = useState(1);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selected, setSelected] = useState();
  const [filters, setFilters] = useState({
    sort: "latest",
    search: "",
    category: "",
  });
  const modalRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const filtersHandler = (type, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: type === "search" ? value.trim().toLowerCase() : value,
    }));
  };

  const modalHandler = (type, id) => {
    setSelected(id);
    type === "edit" ? setShowEdit(true) : setShowDelete(true);
  };

  const toggleHandler = () => {
    setShowDelete(false);
    setShowEdit(false);
  };

  const { filtered, totalPages } = useFiltered(products, filters, currentPage);

  useOutSideClick(modalRef, toggleHandler);

  return (
    <>
      <SearchBar
        filters={filters}
        categories={categories}
        handler={filtersHandler}
      />

      {products.length ? (
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-md">
              <table className="min-w-full">
                <thead className="border-b bg-gray-400">
                  <tr className="flex-row">
                    <th className="table__head">Title</th>
                    <th className="table__head hidden md:block">Category</th>
                    <th className="table__head">
                      <span className="lg:hidden">Qty</span>
                      <span className="hidden lg:block">Quantity</span>
                    </th>
                    <th className="table__head">Price</th>
                    <th className="table__head hidden md:block">Date</th>
                    <th className="table__head"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered?.map(
                    ({ id, title, quantity, price, categoryId, createdAt }) => (
                      <tr
                        key={id}
                        className="cursor-pointer border-b bg-gray-300 transition duration-300 ease-in-out hover:bg-gray-100"
                      >
                        <td className="table__item max-w-32 truncate md:max-w-44 lg:max-w-none">
                          {title}
                        </td>
                        <td className="table__item hidden md:block">
                          {GetCategory(categoryId)?.title}
                        </td>
                        <td className="table__item">{quantity}</td>
                        <td className="table__item">${price}</td>
                        <td className="table__item hidden md:block">
                          {new Date(createdAt).toLocaleDateString()}
                        </td>
                        <td className="whitespace-nowrap text-sm font-normal text-gray-900">
                          <div className="flex flex-row justify-center gap-3">
                            <button
                              className="rounded-lg bg-cyan-800 p-2 font-medium text-white"
                              onClick={() => navigate(`/products/${id}`)}
                            >
                              <RiEyeFill />
                            </button>
                            <button
                              className="rounded-lg bg-lime-800 p-2 font-medium text-white"
                              onClick={() => modalHandler("edit", id)}
                            >
                              <RiEdit2Fill />
                            </button>
                            <button
                              className="rounded-lg bg-danger p-2 font-medium text-white"
                              onClick={() => modalHandler("delete", id)}
                            >
                              <RiDeleteBin3Line />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <h3 className="my-20 text-center font-bold text-primary">
          Currently, there are no products available.
        </h3>
      )}

      {showEdit && (
        <Modal title="Edit Product" modalRef={modalRef} handler={toggleHandler}>
          <EditProduct id={selected} handler={toggleHandler} />
        </Modal>
      )}

      {showDelete && (
        <Modal
          title="Delete Product"
          modalRef={modalRef}
          handler={toggleHandler}
        >
          <DeleteProduct id={selected} handler={toggleHandler} />
        </Modal>
      )}

      {totalPages > 1 && (
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          pageHandler={(e) => setCurrentPage(e)}
        />
      )}
    </>
  );
}
