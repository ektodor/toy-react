import { useState } from "react";
import "./App.css";
// import axios from "axios";
import ProductModalCompnent from "./components/ProductModalComponent";
import Login from "./Login";
import ProductsComponent from "./components/ProductsComponent";
function App() {
  // const { VITE_API_URL, VITE_API_USER } = import.meta.env;
  const [isLogin, setIsLogin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempProduct, setTempProduct] = useState({
    id: "",
    imageUrl: "",
    title: "",
    category: "",
    unit: "",
    origin_price: 0,
    price: 0,
    description: "",
    content: "",
    is_enabled: false,
    imagesUrl: [],
  });
  const [isChangeData, setIsChangeData] = useState(false);
  return (
    <>
      {!isLogin ? (
        <Login setIsLogin={setIsLogin} setIsChangeData={setIsChangeData} />
      ) : (
        <>
          <ProductsComponent
            setTempProduct={setTempProduct}
            setIsModalOpen={setIsModalOpen}
            isChangeData={isChangeData}
            setIsChangeData={setIsChangeData}
          />
          <ProductModalCompnent
            tempProduct={tempProduct}
            setTempProduct={setTempProduct}
            isModalOpen={isModalOpen}
            setIsChangeData={setIsChangeData}
            setIsModalOpen={setIsModalOpen}
          />
        </>
      )}
    </>
  );
}

export default App;
