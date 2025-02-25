import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import * as bootstrap from "bootstrap";
import axios from "axios";
function ProductModalCompnent({
  tempProduct,
  setTempProduct,
  isModalOpen,
  setIsChangeData,
  setIsModalOpen,
}) {
  const { VITE_API_URL, VITE_API_USER } = import.meta.env;
  const [subImg, setSubImg] = useState("");
  // MODAL
  const modalRef = useRef(null);
  useEffect(() => {
    modalRef.current = new bootstrap.Modal("#productModal");
  }, []);
  useEffect(() => {
    if (isModalOpen) {
      modalRef.current.show();
      setSubImg("");
    } else {
      modalRef.current.hide();
    }
  }, [isModalOpen]);

  const handleChange = (e) => {
    setTempProduct({
      ...tempProduct,
      [e.target.id]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };
  // MODAL
  useEffect(() => {
    modalRef.current = new bootstrap.Modal("#productModal");
  }, []);

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
  // 新增產品
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
      setIsChangeData(true);
      alert("新增成功");
      setIsModalOpen(false);
    } catch (err) {
      alert("新增失敗: " + err.response.data.message);
    }
  };
  // 更新產品
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
      setIsChangeData(true);
      alert("編輯成功");
      setIsModalOpen(false);
    } catch (err) {
      alert("編輯失敗: " + err.response.data.message);
    }
  };
  return (
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
              onClick={() => setIsModalOpen(false)}
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
              onClick={() => setIsModalOpen(false)}
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
  );
}

ProductModalCompnent.propTypes = {
  tempProduct: PropTypes.shape({
    id: PropTypes.string,
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    category: PropTypes.string,
    unit: PropTypes.string,
    origin_price: PropTypes.number,
    price: PropTypes.number,
    description: PropTypes.string,
    content: PropTypes.string,
    is_enabled: PropTypes.bool,
    imagesUrl: PropTypes.array,
  }),
  setTempProduct: PropTypes.func,
  getProducts: PropTypes.func,
  isModalOpen: PropTypes.bool,
  setIsChangeData: PropTypes.func,
  setIsModalOpen: PropTypes.func,
};

export default ProductModalCompnent;
