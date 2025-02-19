import { useEffect, useRef, useState } from "react";
import "./App.css";
import axios from "axios";
import * as bootstrap from "bootstrap";
function App() {
  const { VITE_API_URL, VITE_API_USER } = import.meta.env;
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});
  const modalRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [subImg, setSubImg] = useState("");
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

  // LOGIN
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
      getProducts();
    } catch (err) {
      setIsLogin(false);
      alert("登入失敗:" + err.message);
    }
  };

  const checkLogin = async () => {
    var token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common["Authorization"] = token;
    try {
      await axios.post(`${VITE_API_URL}/api/user/check`, {});
      setIsLogin(true);
      getProducts();
    } catch (err) {
      setIsLogin(false);
      alert("請重新登入:" + err.message);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  // MODAL
  useEffect(() => {
    modalRef.current = new bootstrap.Modal("#productModal");
  }, []);
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
    setSubImg("");
    setTempProduct(item);
    modalRef.current.show();
  };
  const closeModal = () => {
    modalRef.current.hide();
  };
  const handleChange = (e) => {
    setTempProduct({
      ...tempProduct,
      [e.target.id]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };
  // IMAGE
  const changeSubImg = (e) => {
    setSubImg(e.target.value);
  };

  const addImage = () => {
    const imagesUrl = tempProduct.imagesUrl
      ? [...tempProduct.imagesUrl, subImg]
      : [subImg];
    setTempProduct({
      ...tempProduct,
      imagesUrl,
    });
  };

  const deleteImage = (item) => {
    const imagesUrl = tempProduct.imagesUrl.filter((image) => {
      return image != item;
    });
    setTempProduct({
      ...tempProduct,
      imagesUrl,
    });
  };
  // GET
  const getProducts = async () => {
    try {
      const res = await axios.get(
        `${VITE_API_URL}/api/${VITE_API_USER}/admin/products`
      );

      setProducts(res.data.products);
    } catch (e) {
      alert(e.message);
    }
  };
  // POST
  const addProduct = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...tempProduct,
        origin_price: Number(tempProduct.origin_price),
        price: Number(tempProduct.price),
        is_enabled: tempProduct.is_enabled ? 1 : 0,
      };
      // delete data.id;
      await axios.post(`${VITE_API_URL}/api/${VITE_API_USER}/admin/product`, {
        data,
      });
      getProducts();
      alert("新增成功");
      closeModal();
    } catch (err) {
      alert("新增失敗:" + err.message);
    }
  };
  // DETELE
  const deleteProduct = async (id) => {
    try {
      await axios.delete(
        `${VITE_API_URL}/api/${VITE_API_USER}/admin/product/${id}`
      );
      getProducts();
      alert("刪除成功");
      closeModal();
    } catch (err) {
      alert("刪除失敗:" + err.message);
    }
  };
  // PUT
  const editProduct = async (e) => {
    e.preventDefault();
    const data = {
      ...tempProduct,
      origin_price: Number(tempProduct.origin_price),
      price: Number(tempProduct.price),
      is_enabled: tempProduct.is_enabled ? 1 : 0,
    };
    try {
      await axios.put(
        `${VITE_API_URL}/api/${VITE_API_USER}/admin/product/${tempProduct.id}`,
        {
          data,
        }
      );
      getProducts();
      alert("編輯成功");
      closeModal();
    } catch (err) {
      alert("編輯失敗:" + err.message);
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
              {/* <button
                type="submit"
                className="btn btn-primary "
                onClick={(e) => checkLogin(e)}
              >
                確認登入狀況
              </button> */}
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
        <div>
          <div className="container">
            <div className="text-end mt-4">
              <button
                className="btn btn-primary"
                onClick={() => openModal(null)}
              >
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
        </div>
      )}

      <div
        id="productModal"
        className="modal fade"
        tabIndex="-1"
        aria-labelledby="productModalLabel"
        aria-hidden="true"
        ref={modalRef}
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content border-0">
            <div className="modal-header bg-dark text-white">
              <h5 id="productModalLabel" className="modal-title">
                <span>{tempProduct.id ? "編輯" : "新增"}產品</span>
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-sm-4">
                  <div className="mb-2">
                    <div className="mb-3">
                      <label htmlFor="imageUrl" className="form-label">
                        輸入圖片網址
                      </label>
                      <input
                        id="imageUrl"
                        type="text"
                        className="form-control"
                        placeholder="請輸入圖片連結"
                        value={tempProduct.imageUrl}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                    <img
                      className="img-fluid"
                      src={
                        tempProduct.imageUrl == "" ? null : tempProduct.imageUrl
                      }
                      alt=""
                    />
                  </div>
                </div>
                <div className="col-sm-8">
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      標題
                    </label>
                    <input
                      id="title"
                      type="text"
                      className="form-control"
                      placeholder="請輸入標題"
                      value={tempProduct.title}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label htmlFor="category" className="form-label">
                        分類
                      </label>
                      <input
                        id="category"
                        type="text"
                        className="form-control"
                        placeholder="請輸入分類"
                        value={tempProduct.category}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label htmlFor="unit" className="form-label">
                        單位
                      </label>
                      <input
                        id="unit"
                        type="text"
                        className="form-control"
                        placeholder="請輸入單位"
                        value={tempProduct.unit}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label htmlFor="origin_price" className="form-label">
                        原價
                      </label>
                      <input
                        id="origin_price"
                        type="number"
                        min="0"
                        className="form-control"
                        placeholder="請輸入原價"
                        value={tempProduct.origin_price}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label htmlFor="price" className="form-label">
                        售價
                      </label>
                      <input
                        id="price"
                        type="number"
                        min="0"
                        className="form-control"
                        placeholder="請輸入售價"
                        value={tempProduct.price}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>
                  <hr />

                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      產品描述
                    </label>
                    <textarea
                      id="description"
                      className="form-control"
                      placeholder="請輸入產品描述"
                      value={tempProduct.description}
                      onChange={(e) => handleChange(e)}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="content" className="form-label">
                      說明內容
                    </label>
                    <textarea
                      id="content"
                      className="form-control"
                      placeholder="請輸入說明內容"
                      value={tempProduct.content}
                      onChange={(e) => handleChange(e)}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        id="is_enabled"
                        className="form-check-input"
                        type="checkbox"
                        checked={tempProduct.is_enabled}
                        onChange={(e) => handleChange(e)}
                      />
                      <label className="form-check-label" htmlFor="is_enabled">
                        是否啟用
                      </label>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="imageUrl" className="form-label">
                      輸入副圖網址
                    </label>
                    <div>
                      <button
                        className="btn btn-outline-primary btn-sm d-block w-100 mb-3"
                        onClick={addImage}
                      >
                        新增圖片
                      </button>
                    </div>
                    <input
                      type="text"
                      className="form-control mb-3"
                      placeholder="請輸入副圖連結"
                      value={subImg}
                      onChange={(e) => changeSubImg(e)}
                    />
                    <div className=" d-flex flex-warp gap-2">
                      {tempProduct.imagesUrl?.map((item) => (
                        <div className="d-flex flex-column w-25 " key={item}>
                          <img className="img-fluid mb-3" src={item} alt="" />
                          <button
                            className="btn btn-outline-danger btn-sm d-block  w-auto"
                            onClick={() => deleteImage(item)}
                          >
                            刪除圖片
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                取消
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={(e) => {
                  tempProduct.id ? editProduct(e) : addProduct(e);
                }}
              >
                確認
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
