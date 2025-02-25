import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Pagination from "./PaginationComponent";
function ProductsComponent({
  setTempProduct,
  setIsModalOpen,
  isChangeData,
  setIsChangeData,
}) {
  const { VITE_API_URL, VITE_API_USER } = import.meta.env;
  const [products, setProducts] = useState([]);

  const [pagination, setPagination] = useState({});
  useEffect(() => {
    if (isChangeData) {
      getProducts();
    }
    setIsChangeData(false);
  }, [isChangeData]);

  // GET
  const getProducts = async (page) => {
    try {
      const res = await axios.get(
        `${VITE_API_URL}/api/${VITE_API_USER}/admin/products?page=${page}`
      );
      setPagination(res.data.pagination);
      setProducts(res.data.products);
    } catch (e) {
      alert(e.message);
    }
  };
  // DETELE
  const deleteProduct = async (id) => {
    const yes = confirm("確定要刪除商品");
    if (yes) {
      try {
        await axios.delete(
          `${VITE_API_URL}/api/${VITE_API_USER}/admin/product/${id}`
        );
        getProducts();
        alert("刪除成功");
        setIsModalOpen(false);
      } catch (err) {
        alert("刪除失敗:" + err.message);
      }
    }
  };
  const openModal = (item) => {
    if (!item) {
      item = {
        id: "",
        imageUrl: "",
        title: "",
        category: "",
        unit: "",
        origin_price: "",
        price: "",
        description: "",
        content: "",
        is_enabled: false,
        imagesUrl: [],
      };
    }
    setTempProduct(item);
    setIsModalOpen(true);
  };
  return (
    <div>
      <div className="container">
        <div className="text-end mt-4">
          <button className="btn btn-primary" onClick={() => openModal(null)}>
            建立新的產品
          </button>
        </div>
        <table className="table mt-4">
          <thead>
            <tr>
              <th width="120">分類</th>
              <th>產品名稱</th>
              <th width="120">原價</th>
              <th width="120">售價</th>
              <th width="100">是否啟用</th>
              <th width="120">編輯</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item.id}>
                <td>{item.category}</td>
                <td>{item.title}</td>
                <td className="text-end">{item.origin_price}</td>
                <td className="text-end">{item.price}</td>
                <td>
                  {item.is_enabled ? (
                    <span className="text-success">啟用</span>
                  ) : (
                    <span>未啟用</span>
                  )}
                </td>
                <td>
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => openModal(item)}
                    >
                      編輯
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => deleteProduct(item.id)}
                    >
                      刪除
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination pagination={pagination} getProducts={getProducts} />
    </div>
  );
}
ProductsComponent.propTypes = {
  setTempProduct: PropTypes.func,
  setIsChangeData: PropTypes.func,
  isChangeData: PropTypes.bool,
  setIsModalOpen: PropTypes.func,
};
export default ProductsComponent;
