import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import {
  deleteAsyncProduct,
  getAsyncProducts,
  updateAsyncProduct,
} from "../features/Product/productsSlice";
import { getAsyncCategories } from "../features/Category/categoriesSlice";
import ProductUpdateForm from "./ProductUpdateForm";
import { toast } from "react-toastify";
import SearchBar from "./SearchBar";

const ProductList = () => {
  const { products, error, loading } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    sort: "latest",
    search: "",
    category: "",
  });

  useEffect(() => {
    dispatch(getAsyncCategories());
    dispatch(getAsyncProducts());
  }, []);

  useEffect(() => {
    let result = products;
    result = filterSearchTitle(result);
    result = sortDate(result);
    result = filterSelectedCategory(result);
    setFilteredProducts(result);
  }, [products, filters.sort, filters.search, filters.category]);

  const filterSearchTitle = (array) => {
    return array.filter((product) =>
      product.title.toLowerCase().includes(filters.search)
    );
  };

  const sortDate = (array) => {
    return array.sort((a, b) => {
      if (filters.sort === "latest") {
        return new Date(a.createAT) > new Date(b.createAT) ? 1 : -1;
      } else if (filters.sort === "oldest") {
        return new Date(a.createAT) > new Date(b.createAT) ? -1 : 1;
      }
    });
  };

  const filterSelectedCategory = (array) => {
    return !filters.category
      ? array
      : array.filter(
          (product) => product.categoryId === parseInt(filters.category)
        );
  };

  const searchHandler = (e) => {
    setFilters({ ...filters, search: e.target.value.trim().toLowerCase() });
  };

  const sortHandler = (e) => {
    setFilters({ ...filters, sort: e.target.value });
  };

  const categoryHandler = (e) => {
    setFilters({ ...filters, category: e.target.value });
  };

  const findCategoryTitle = (id) => {
    return (
      categories &&
      categories.find((category) => category.id === parseInt(id)).title
    );
  };

  const deleteHandler = (id) => {
    dispatch(deleteAsyncProduct({ id }));
  };

  const editHandler = (id) => {
    setShowModal(true);
    const selectedProduct = products.find((product) => product.id === id);
    setProduct(selectedProduct);
  };

  const updateProduct = () => {
    setShowModal(false);
    const { id, title, quantity, categoryId } = product;
    dispatch(updateAsyncProduct({ id, title, quantity, categoryId }));
    toast.success(`${title} Updated`);
    setProduct(null);
  };

  return loading ? (
    <p className="text-slate-400 text-center">Loading ...</p>
  ) : error ? (
    <p className="text-slate-400 text-center">{error}</p>
  ) : products.length < 1 ? (
    <h3
      className="text-slate-400 text-center cursor-pointer"
      onClick={() => navigate("/newProduct")}
    >
      Add some Products
    </h3>
  ) : (
    <div className="flex flex-col">
      <SearchBar
        filters={filters}
        categories={categories}
        onSort={sortHandler}
        onSearch={searchHandler}
        onCategory={categoryHandler}
      />
      <div className="overflow-x-auto sm:-mx-6 lg:mx-12">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-md">
            <table className="min-w-full">
              <thead className="bg-gray-400 border-b">
                <tr className="flex-row">
                  <th className="text-sm font-semibold text-gray-900 px-6 py-4 text-left">
                    #
                  </th>
                  <th className="text-sm font-semibold text-gray-900 px-6 py-4 text-left">
                    Title
                  </th>
                  <th className="text-sm font-semibold text-gray-900 px-6 py-4 text-left">
                    Category
                  </th>
                  <th className="text-sm font-semibold text-gray-900 px-6 py-4 text-left">
                    Quantity
                  </th>
                  <th className="text-sm font-semibold text-gray-900 px-6 py-4 text-left">
                    Date
                  </th>
                  <th className="text-sm font-semibold text-gray-900 px-6 py-4 text-left"></th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(
                  ({ id, title, quantity, categoryId, createAt }, index) => {
                    return (
                      <tr
                        key={id}
                        className="bg-gray-300 border-b cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {++index}
                        </td>
                        <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                          {title}
                        </td>
                        <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                          {findCategoryTitle(categoryId)}
                        </td>
                        <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                          {quantity}
                        </td>
                        <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                          {new Date(createAt).toLocaleDateString()}
                        </td>
                        <td className="text-sm text-gray-900 font-normal whitespace-nowrap">
                          <div className="flex flex-row justify-center gap-2">
                            <button
                              className="bg-cyan-800 font-medium text-white rounded-lg p-1"
                              onClick={() => editHandler(id)}
                            >
                              Edit
                            </button>
                            <button
                              className="bg-fuchsia-900 font-medium text-white rounded-lg p-1"
                              onClick={() => deleteHandler(id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showModal && (
        <Modal
          setOpenModal={setShowModal}
          title={`Update ${product.title}`}
          submit={"Update"}
          submitHandler={updateProduct}
        >
          <ProductUpdateForm
            formData={product}
            categories={categories}
            setProduct={setProduct}
          />
        </Modal>
      )}
    </div>
  );
};

export default ProductList;
