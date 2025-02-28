import { useState } from "react";

import ProductsComponent from "./components/frontend/ProductsCompnent";
import { SyncLoader } from "react-spinners";
import CartComponent from "./components/frontend/CartComponent";
import OrderComponent from "./components/frontend/OrderComponent";

function Index() {
  // 加入購物車的商品 id
  const [productId, setProductId] = useState("");
  // 送出訂單後更新購物車
  const [needGetCart, setNeedGetCart] = useState(true);
  // Loading
  const [loading, setLoading] = useState(false);
  const override = {
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    display: "flex",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.5)",
    alignItems: "center",
    zIndex: 9999, // 確保遮罩層在最上層
    // pointerEvents: "all", // 使得所有點擊事件都被遮罩層攔截
  };

  return (
    <div id="app">
      <SyncLoader
        color="#7de67d"
        cssOverride={override}
        loading={loading}
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <div className="container">
        <ProductsComponent setProductId={setProductId} />
        <div className="mt-4">
          <CartComponent
            productId={productId}
            needGetCart={needGetCart}
            setProductId={setProductId}
            setNeedGetCart={setNeedGetCart}
            setLoading={setLoading}
          />
        </div>
        <div className="my-5 row justify-content-center">
          <OrderComponent
            setLoading={setLoading}
            setNeedGetCart={setNeedGetCart}
          />
        </div>
      </div>
    </div>
  );
}

export default Index;
