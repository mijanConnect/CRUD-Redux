import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "../features/products/productSlice";

export default function ProductList() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // const handleAdd = () => {
  //   dispatch(
  //     addProduct({
  //       title: "Test Product",
  //       description: "Test Description",
  //       price: 100,
  //       thumbnail:
  //         "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/thumbnail.webp",
  //     })
  //   );
  // };

  const handleUpdate = (id) => {
    dispatch(
      updateProduct({
        id,
        product: {
          title: "Edited Title",
          price: 999,
          thumbnail:
            "https://cdn.dummyjson.com/product-images/fragrances/dolce-shine-eau-de/thumbnail.webp",
        },
      })
    );
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <div className="flex-[2]">
      <h2 className="text-center text-3xl pb-4 font-bold">Product List</h2>
      {status === "loading" && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul className="flex flex-wrap">
        {items.map((p) => (
          <li
            key={p.id}
            className="w-full sm:w-1/2 lg:w-1/3 p-4 bg-gray-100 border"
          >
            <img
              className="object-cover h-64 w96 rounded-sm"
              src={p.thumbnail}
              alt={p.title}
            />
            <p className="py-2">
              <strong>{p.title}</strong>
            </p>
            <p>${p.price}</p>
            <div className="flex flex-wrap gap-2 mt-1">
              <button
                onClick={() => handleUpdate(p.id)}
                className="text-white bg-blue-600 py-1 px-6 font-medium rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="text-white bg-red-600 py-1 px-6 font-medium rounded"
              >
                Delete
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="text-white bg-green-600 py-1 px-6 font-medium rounded"
              >
                View
              </button>
            </div>
          </li>
        ))}
      </ul>
      {/* <button
        onClick={handleAdd}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        Add Product
      </button> */}
    </div>
  );
}
