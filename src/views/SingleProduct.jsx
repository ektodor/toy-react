import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
const { VITE_API_URL, VITE_API_USER } = import.meta.env;
function SingleProduct() {
  const { id } = useParams();
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
  useEffect(() => {
    getProduct();
  }, [id]);
  // GET
  const getProduct = async () => {
    try {
      const res = await axios.get(
        `${VITE_API_URL}/api/${VITE_API_USER}/product/${id}`
      );

      setTempProduct(res.data.product);
    } catch (e) {
      alert(e.message);
    }
  };
  // 購物車
  async function addProductToCart(productId) {
    try {
      await axios.post(`${VITE_API_URL}/api/${VITE_API_USER}/cart`, {
        data: {
          product_id: productId,
          qty: 1,
        },
      });
      alert("新增成功");
    } catch (err) {
      alert(`新增購物車商品失敗 : ${err.response.data.message}`);
    }
  }
  return (
    <>
      <div className=" my-5 text-center">
        <h1>我是單一商品</h1>
      </div>
      <div>
        <h1 className="modal-title fs-5" id="productModalLabel">
          {tempProduct.title}
        </h1>
        <div className="row">
          <div className="col">
            <img
              className="img-fluid"
              src={tempProduct.imageUrl == "" ? null : tempProduct.imageUrl}
              alt=""
            />
          </div>
        </div>

        <h4 className="mt-3 fw-bold">{tempProduct.title}</h4>
        <span className="badge rounded-pill text-bg-warning">
          {tempProduct.category}
        </span>
        <div className="mt-3">
          <p className="mb-0">產品說明 : </p>
          <p>{tempProduct.content}</p>
        </div>
        <div>
          <p className="mb-0">產品描述:</p>
          <p>{tempProduct.description}</p>
        </div>
        <div>
          <p className="mb-0">產品價格:</p>
          <del>原價:{tempProduct.origin_price}元</del>
          <p className="d-inline"> / {tempProduct.price}元</p>
          <p className="d-inline">{tempProduct.unit}</p>
        </div>
        <div className=" d-flex flex-warp gap-2 mt-3">
          {tempProduct.imagesUrl?.map((item) => (
            <div className="d-flex flex-column w-25 " key={item}>
              <img className="img-fluid mb-3" src={item} alt="" />
            </div>
          ))}
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              addProductToCart(tempProduct.id);
            }}
          >
            加入購物車
          </button>
        </div>
      </div>
    </>
  );
}

export default SingleProduct;
