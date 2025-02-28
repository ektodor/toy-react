import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import ProductModalComponent from "./ProductModalComponent";
import Pagination from "../PaginationComponent";
function ProductsComponent({ setProductId }) {
  const { VITE_API_URL, VITE_API_USER } = import.meta.env;
  // 取得商品
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  useEffect(() => {
    getProducts(1);
  }, []);
  // GET
  const getProducts = async (page) => {
    try {
      const res = await axios.get(
        `${VITE_API_URL}/api/${VITE_API_USER}/products?page=${page}`
      );
      setPagination(res.data.pagination);
      setProducts(res.data.products);
    } catch (e) {
      alert(e.message);
    }
  };
  // modal
  const [modalStatus, setModalStatus] = useState(false);
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

  return (
    <>
      {/* 產品Modal */}
      <ProductModalComponent
        tempProduct={tempProduct}
        setTempProduct={setTempProduct}
        modalStatus={modalStatus}
        setModalStatus={setModalStatus}
        setProductId={setProductId}
      />
      {/* 產品Modal */}
      <table className="table align-middle">
        <thead>
          <tr>
            <th>圖片</th>
            <th>商品名稱</th>
            <th>價格</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => {
            return (
              <tr key={item.id}>
                <td style={{ width: "200px" }}>
                  <img
                    src={item.imageUrl}
                    style={{
                      height: "100px",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></img>
                </td>
                <td>{item.title}</td>
                <td>
                  <div className="h5">{item.price}</div>
                  <del className="h6">原價:{item.origin_price}</del>
                  <div className="h5">{item.unit}</div>
                </td>
                <td>
                  <div className="btn-group btn-group-sm">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => {
                        setTempProduct({ ...item });
                        setModalStatus(true);
                      }}
                    >
                      <i className="fas fa-spinner fa-pulse"></i>
                      查看更多
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => setProductId(item.id)}
                    >
                      <i className="fas fa-spinner fa-pulse"></i>
                      加到購物車
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination pagination={pagination} getProducts={getProducts} />
    </>
  );
}
ProductsComponent.propTypes = {
  setProductId: PropTypes.func,
};
export default ProductsComponent;
