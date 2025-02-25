import { useEffect, useState } from "react";
import axios from "axios";

import ProductModalComponent from "./ProductModalComponent";
function ProductsComponent() {
  const { VITE_API_URL, VITE_API_USER } = import.meta.env;
  // 取得商品
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  useEffect(() => {
    (async function () {
      try {
        const res = await axios.get(
          `${VITE_API_URL}/api/${VITE_API_USER}/products?page=${page}`
        );
        setProducts(res.data.products);
        setPagination(res.data.pagination);
      } catch (err) {
        console.log(err.message);
        alert("取得資料失敗");
      }
    })();
  }, [page]);
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
                        console.log(modalStatus);
                      }}
                    >
                      <i className="fas fa-spinner fa-pulse"></i>
                      查看更多
                    </button>
                    <button type="button" className="btn btn-outline-danger">
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
      <nav aria-label="Page navigation">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>

          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default ProductsComponent;
