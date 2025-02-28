import { useForm } from "react-hook-form";
import axios from "axios";
import PropTypes from "prop-types";
import { useRef } from "react";
function OrderComponent({ setLoading, setNeedGetCart }) {
  const { VITE_API_URL, VITE_API_USER } = import.meta.env;
  // form
  const formRef = useRef("");
  const {
    register, // 用來註冊表單元素
    handleSubmit, // 用來處理表單提交
    formState: { errors }, // 錯誤訊息
    // control, // 判斷控制的表單，搭配 useWatch
  } = useForm({
    mode: "onChange", // 表單驗證的時機
  });
  /* 用來即時監控表表單狀況
    const watchForm = useWatch({
      control,
    });
    useEffect(() => {
      console.log(watchForm);
      console.log(errors);
    }, [watchForm]);
    */
  async function onSubmit(data) {
    // data => 表單資料
    setLoading(true);
    const { email, name, tel, address, message } = data;
    try {
      await axios.post(`${VITE_API_URL}/api/${VITE_API_USER}/order`, {
        data: {
          user: {
            email,
            name,
            tel,
            address,
          },
          message,
        },
      });
      formRef.current.reset();
      setNeedGetCart(true);
      alert("訂單成功送出");
    } catch (err) {
      alert(`送出表單失敗 : ${err.response.data.message}`);
    } finally {
      setLoading(false);
    }
  }
  return (
    <form className="col-md-6" onSubmit={handleSubmit(onSubmit)} ref={formRef}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className={`form-control ${errors.email ? "is-invalid" : ""}`}
          placeholder="請輸入 Email"
          {...register("email", {
            required: "Email 請勿空白",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Email 格式無效",
            },
          })}
        />
        {errors.email && (
          <div className="invalid-feedback">{errors.email.message}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          收件人姓名
        </label>
        <input
          id="name"
          name="姓名"
          type="text"
          className={`form-control ${errors.name ? "is-invalid" : ""}`}
          placeholder="請輸入姓名"
          {...register("name", { required: "姓名請勿空白" })}
        />
        {errors.name && (
          <div className="invalid-feedback">{errors.name.message}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="tel" className="form-label">
          收件人電話
        </label>
        <input
          id="tel"
          name="電話"
          type="text"
          className={`form-control ${errors.tel ? "is-invalid" : ""}`}
          placeholder="請輸入電話"
          {...register("tel", {
            required: "收件人電話請勿空白",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "手機號碼格式錯誤",
            },
          })}
        />
        {errors.tel && (
          <div className="invalid-feedback">{errors.tel.message}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="address" className="form-label">
          收件人地址
        </label>
        <input
          id="address"
          name="地址"
          type="text"
          className={`form-control ${errors.address ? "is-invalid" : ""}`}
          placeholder="請輸入地址"
          {...register("address", { required: "收件人地址請勿空白" })}
        />
        {errors.address && (
          <div className="invalid-feedback">{errors.address.message}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="message" className="form-label">
          留言
        </label>
        <textarea
          id="message"
          className="form-control"
          cols="30"
          rows="10"
          {...register("message")}
        ></textarea>
      </div>
      <div className="text-end">
        <button type="submit" className="btn btn-danger">
          送出訂單
        </button>
      </div>
    </form>
  );
}
OrderComponent.propTypes = {
  setNeedGetCart: PropTypes.func,
  setLoading: PropTypes.func,
};
export default OrderComponent;
