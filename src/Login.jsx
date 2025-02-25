import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
function Login({ setIsLogin, setIsChangeData }) {
  const { VITE_API_URL } = import.meta.env;
  const [user, setUser] = useState({});
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
      // getProducts();
      setIsChangeData(true);
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
      // getProducts();
      setIsChangeData(true);
    } catch (err) {
      setIsLogin(false);
      alert("請重新登入:" + err.message);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <div className="card">
      <form onSubmit={(e) => login(e)}>
        <div>
          <label className="form-label" htmlFor="username">
            Username :{" "}
          </label>
          <input
            className="form-control"
            type="email"
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
          <button type="submit" className="btn btn-primary ">
            登入
          </button>
        </div>
      </form>
    </div>
  );
}
Login.propTypes = {
  setIsChangeData: PropTypes.func,
  setIsLogin: PropTypes.func,
};
export default Login;
