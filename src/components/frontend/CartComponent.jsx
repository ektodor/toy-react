import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
function CartComponent({
  productId,
  needGetCart,
  setProductId,
  setNeedGetCart,
  setLoading,
}) {
  const { VITE_API_URL, VITE_API_USER } = import.meta.env;
  // 購物車
  const [cart, setCart] = useState({});
  useEffect(() => {
    if (!needGetCart) return;
    getCart();
    setNeedGetCart(false);
  }, [needGetCart]);
  // 取得購物車資料
  async function getCart() {
    setLoading(true);
    try {
      const res = await axios.get(`${VITE_API_URL}/api/${VITE_API_USER}/cart`);
      setCart(res.data.data);
    } catch (err) {
      alert(`取得購物車失敗 : ${err.response.data.message}`);
    } finally {
      setLoading(false);
    }
  }
  // 新增購物車商品
  useEffect(() => {
    if (productId == "") return;
    addProductToCart(productId);
    setProductId("");
  }, [productId]);
  async function addProductToCart(productId) {
    setLoading(true);
    try {
      await axios.post(`${VITE_API_URL}/api/${VITE_API_USER}/cart`, {
        data: {
          product_id: productId,
          qty: 1,
        },
      });
      getCart();
    } catch (err) {
      alert(`新增購物車商品失敗 : ${err.response.data.message}`);
    } finally {
      setLoading(false);
    }
  }
  // 更新購物車商品
  async function updateProductToCart(value, item) {
    if (value == "") return;
    setLoading(true);
    try {
      await axios.put(`${VITE_API_URL}/api/${VITE_API_USER}/cart/${item.id}`, {
        data: {
          product_id: item.product_id,
          qty: Number.parseInt(value),
        },
      });
      getCart();
    } catch (err) {
      alert(`更新購物車商品失敗 : ${err.response.data.message}`);
    } finally {
      setLoading(false);
    }
  }
  // 刪除購物車商品
  async function deleteProductToCart(id) {
    setLoading(true);
    try {
      await axios.delete(`${VITE_API_URL}/api/${VITE_API_USER}/cart/${id}`);
      getCart();
    } catch (err) {
      alert(`刪除購物車商品失敗 : ${err.response.data.message}`);
    } finally {
      setLoading(false);
    }
  }
  // 刪除全部購物車商品
  async function deleteAllProductToCart() {
    setLoading(true);
    try {
      await axios.delete(`${VITE_API_URL}/api/${VITE_API_USER}/carts`);
      getCart();
    } catch (err) {
      alert(`刪除全部購物車商品失敗 : ${err.response.data.message}`);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <div className="text-end">
        <button
          className="btn btn-outline-danger"
          type="button"
          onClick={deleteAllProductToCart}
        >
          清空購物車
        </button>
      </div>
      <table className="table align-middle">
        <thead>
          <tr>
            <th>品名</th>
            <th style={{ width: "150px" }}>數量</th>
            <th>單位</th>
            <th>單價</th>
            <th>總價</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.carts?.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.product.title}</td>
                <td>
                  <div className="input-group">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      id="button-addon1"
                      disabled={item.qty == 1}
                      onClick={() => updateProductToCart(item.qty - 1, item)}
                    >
                      <i className="bi bi-dash"></i>
                    </button>
                    <input
                      className="form-control w-25  "
                      placeholder=""
                      aria-label="Example text with button addon"
                      aria-describedby="button-addon1"
                      value={item.qty}
                      type="number"
                      min={1}
                      onChange={(e) =>
                        updateProductToCart(e.target.value, item)
                      }
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => updateProductToCart(item.qty + 1, item)}
                    >
                      <i className="bi bi-plus-lg"></i>
                    </button>
                  </div>
                </td>
                <td>{item.product.unit}</td>
                <td>
                  <del>{item.product.origin_price}</del>
                  <p>{item.product.price}</p>
                </td>
                <td>
                  <del>{item.product.final_total}</del>
                  {item.total}
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => deleteProductToCart(item.id)}
                  >
                    <i className="fas fa-spinner fa-pulse"></i>
                    刪除此商品
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" className="text-end">
              總計
            </td>
            <td className="text-end">{cart.total}</td>
          </tr>
          <tr>
            <td colSpan="3" className="text-end text-success">
              折扣價
            </td>
            <td className="text-end text-success">{cart.final_total}</td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}
CartComponent.propTypes = {
  productId: PropTypes.string,
  needGetCart: PropTypes.string,
  setProductId: PropTypes.func,
  setNeedGetCart: PropTypes.func,
  setLoading: PropTypes.func,
};
export default CartComponent;
