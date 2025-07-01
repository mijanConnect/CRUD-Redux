import AddItem from "./components/AddItem";
import ProductList from "./components/PeoductList";

export default function App() {
  return (
    <>
      <h1 className="text-center text-3xl font-bold p-3 mb-6 bg-gray-100">
        CRUD using React Redux
      </h1>
      <div className="flex w-full">
        <AddItem />
        <ProductList />
      </div>
    </>
  );
}
