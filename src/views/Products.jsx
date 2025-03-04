import ProductsComponent from "../components/frontend/ProductsCompnent";

function Products() {
  return (
    <div>
      <div className=" my-5 text-center">
        <h1>我是商品列表</h1>
      </div>
      <div className="container">
        <ProductsComponent
        //  setProductId={setProductId}
        />
      </div>
    </div>
  );
}

export default Products;
