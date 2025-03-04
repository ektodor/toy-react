import { useState } from "react";
import CartComponent from "../components/frontend/CartComponent";
import { SyncLoader } from "react-spinners";
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
function Cart() {
  // 加入購物車的商品 id
  const [productId, setProductId] = useState("");
  // 送出訂單後更新購物車
  const [needGetCart, setNeedGetCart] = useState(true);
  // Loading
  const [loading, setLoading] = useState(false);
  return (
    <>
      <SyncLoader
        color="#7de67d"
        cssOverride={override}
        loading={loading}
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <div className=" my-5 text-center">
        <h1>我是購物車頁面</h1>
      </div>
      <div className="mt-4 p-5">
        <CartComponent
          productId={productId}
          needGetCart={needGetCart}
          setProductId={setProductId}
          setNeedGetCart={setNeedGetCart}
          setLoading={setLoading}
        />
      </div>
    </>
  );
}

export default Cart;
