import { useState } from "react";
import OrderComponent from "../components/frontend/OrderComponent";
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
function Order() {
  // Loading
  const [loading, setLoading] = useState(false);
  // 送出訂單後更新購物車
  const [needGetCart, setNeedGetCart] = useState(true);
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
        <h1>我是訂單頁面</h1>
      </div>
      <div className="my-5 row justify-content-center">
        <OrderComponent
          setLoading={setLoading}
          setNeedGetCart={setNeedGetCart}
        />
      </div>
    </>
  );
}

export default Order;
