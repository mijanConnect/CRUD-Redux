import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../features/products/productSlice";

export default function AddItem() {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    title: "",
    description: "",
    price: 0,
    rating: 5,
    thumbnail: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value =
      event.target.type === "number"
        ? event.target.valueAsNumber
        : event.target.value;

    setState({
      ...state,
      [name]: value,
    });
  };

  const handleAdd = (event) => {
    event.preventDefault();
    dispatch(
      addProduct({
        ...state,
      })
    );
  };

  return (
    <div className="flex-[1]">
      <h2 className="text-center text-3xl pb-4 font-bold">Add a product</h2>
      <div className="mx-6 bg-gray-100 rounded">
        <form className="flex flex-col p-8" onSubmit={handleAdd}>
          <input
            type="text"
            value={state.title}
            name="title"
            onChange={handleChange}
            className="my-2 border p-2 rounded"
            placeholder="Enter a product title"
          />
          <textarea
            value={state.description}
            name="description"
            onChange={handleChange}
            className="my-2 border p-2 rounded"
            placeholder="Enter a product description"
          />

          <input
            type="number"
            value={state.price}
            name="price"
            onChange={handleChange}
            className="my-2 border p-2 rounded"
            placeholder="Enter a product price"
          />
          <input
            type="text"
            value={state.thumbnail}
            name="thumbnail"
            onChange={handleChange}
            className="my-2 border p-2 rounded"
            placeholder="Enter a product thumbnail URL"
          />

          <button
            type="submit"
            className="text-white bg-green-600 py-1 px-6 font-medium rounded mt-4"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
