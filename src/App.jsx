import { useState } from "react";
import "./App.css";
import axios from "axios";
function App() {
  const { VITE_API_URL, VITE_API_USER } = import.meta.env;
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);
  const [tempProduct, setTempProduct] = useState(null);
  const changeUser = (e) => {
    const { name } = e.target;
    setUser({
      ...user,
      [name]: e.target.value,
    });
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${VITE_API_URL}/admin/signin`, {
        ...user,
      });

      const { token, expired } = res.data;
      document.cookie = `token=${token}; expires=${new Date(expired)};`;
      axios.defaults.headers.common["Authorization"] = token;
      setIsLogin(true);
      getData();
    } catch (e) {
      setIsLogin(false);
      alert("登入失敗");
    }
  };

  const getData = async () => {
    try {
      const res = await axios.get(
        `${VITE_API_URL}/api/${VITE_API_USER}/products/all`
      );
      setProducts(res.data.products);
    } catch (e) {
      alert(e.message);
    }
  };

  const checkLogin = async (e) => {
    e.preventDefault();
    var token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common["Authorization"] = token;
    try {
      await axios.post(`${VITE_API_URL}/api/user/check`, {});
      setIsLogin(true);
      getData();
    } catch (e) {
      setIsLogin(false);
      alert("請重新登入");
    }
  };

  return (
    <>
      {!isLogin ? (
        <div className="card">
          <form>
            <div>
              <label className="form-label" htmlFor="username">
                Username :{" "}
              </label>
              <input
                className="form-control"
                type="text"
                name="username"
                id="username"
                onChange={(e) => changeUser(e)}
              />
            </div>
            <div className="mt-3">
              <label className="form-label" htmlFor="password">
                Password :{" "}
              </label>
              <input
                className="form-control"
                type="password"
                name="password"
                id="password"
                onChange={(e) => changeUser(e)}
              />
            </div>
            <div className="d-flex mt-3 justify-content-between">
              <button
                type="submit"
                className="btn btn-primary "
                onClick={(e) => checkLogin(e)}
              >
                確認登入狀況
              </button>
              <button
                type="submit"
                className="btn btn-primary "
                onClick={(e) => login(e)}
              >
                登入
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="container">
          <div className="row mt-5">
            <div className="col-md-6">
              <h2>產品列表</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>產品名稱</th>
                    <th>原價</th>
                    <th>售價</th>
                    <th>是否啟用</th>
                    <th>查看細節</th>
                    <th>轉換啟用</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item) => (
                    <tr key={item.id}>
                      <td>{item.title}</td>
                      <td>{item.origin_price}</td>
                      <td>{item.price}</td>
                      <td>{item.is_enabled ? "啟用" : "未啟用"}</td>
                      <td>
                        <button
                          className={`btn btn-primary ${
                            item.is_enabled ? "" : "disabled"
                          }`}
                          onClick={() => setTempProduct(item)}
                        >
                          查看細節
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            const updatedProducts = products.map((p) =>
                              p.id === item.id
                                ? { ...p, is_enabled: !p.is_enabled }
                                : p
                            );
                            setProducts(updatedProducts);
                          }}
                        >
                          轉換啟用狀態
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="col-md-6">
              <h2>單一產品細節</h2>
              {tempProduct ? (
                <div className="card mb-3">
                  <img
                    src={tempProduct.imageUrl}
                    className="object-fit-cover border rounded primary-image"
                    alt="主圖"
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {tempProduct.title}
                      <span className="badge bg-primary ms-2">
                        {tempProduct.category}
                      </span>
                    </h5>
                    <p className="card-text">
                      商品描述：{tempProduct.description}
                    </p>
                    <p className="card-text">商品內容：{tempProduct.content}</p>
                    <div className="d-flex">
                      <p className="card-text text-secondary">
                        <del>{tempProduct.origin_price}</del>
                      </p>
                      元 / {tempProduct.price} 元
                    </div>
                    <h5 className="mt-3">更多圖片：</h5>
                    <div className="d-flex">
                      {tempProduct.imagesUrl
                        ? tempProduct.imagesUrl.map((item) => {
                            return (
                              <img
                                key={item}
                                src={item}
                                className="object-fit-cover border rounded w-25 me-2"
                              />
                            );
                          })
                        : "無更多圖片"}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-secondary">請選擇一個商品查看</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
