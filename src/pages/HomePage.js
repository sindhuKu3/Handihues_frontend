import ProductList from "../features/product-list/ProductComponent/ProductList";
const HomePage = () => {
    return (
      <div className="HomePage">
          <img
          className="-pt-5 w-full"
            src="./images/HomeScreen.png"
            alt="error"
            style={{ height: "521px" }}
          ></img>
          <ProductList />
      </div>
    );
}
 
export default HomePage;