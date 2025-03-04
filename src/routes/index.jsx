/**
 * 前台
 * 首頁(商品列表) - Index.jsx
 * 所有商品列表 - Products.jsx
 * 單一商品 - SingleProduct.jsx
 * 結帳 - Order.jsx
 *
 * 後台 admin
 * 所有商品 - Products.jsx
 */

import Layout from "../Layout";
import Login from "../Login";
import NotFound from "../NotFound";
import Cart from "../views/Cart";
import Index from "../views/Index";
import Order from "../views/Order";
import Products from "../views/Products";
import SingleProduct from "../views/SingleProduct";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "products/:id",
        element: <SingleProduct />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "",
        element: <Index />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "order",
        element: <Order />,
      },
    ],
  },
  // {
  //   path:'admin',
  //   element:
  // },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
