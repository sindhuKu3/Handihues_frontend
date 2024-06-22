

import ProductList from "../features/product-list/ProductComponent/ProductList";
const HomePage = () => {
    return (
      <div className="HomePage">
    
          <img
          className="-pt-5"
            src="./images/front.png"
            alt="error"
            style={{ height: "550px" }}
          ></img>
          <ProductList />
     
      </div>
    );
}
 
export default HomePage;