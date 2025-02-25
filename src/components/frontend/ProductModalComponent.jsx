import { useEffect, useRef } from "react";
import * as bootstrap from "bootstrap";
import PropTypes from "prop-types";
function ProductModalComponent({
  tempProduct,
  setTempProduct,
  modalStatus,
  setModalStatus,
}) {
  const modalRef = useRef(null);
  useEffect(() => {
    modalRef.current = new bootstrap.Modal("#productModal");
  }, []);
  useEffect(() => {
    if (modalStatus) {
      openModal();
    }
  }, [modalStatus]);
  function openModal() {
    modalRef.current.show();
  }
  function closeModal() {
    setTempProduct({
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
    setModalStatus(false);
    modalRef.current.hide();
  }
  return (
    <div
      className="modal fade"
      id="productModal"
      aria-labelledby="productModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="productModalLabel">
              {tempProduct.title}
            </h1>
            <button
              type="button"
              className="btn-close"
              onClick={closeModal}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
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
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeModal}
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

ProductModalComponent.propTypes = {
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
  modalStatus: PropTypes.bool,
  setModalStatus: PropTypes.func,
};

export default ProductModalComponent;
