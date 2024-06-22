import { useSelector } from "react-redux";
import Cart from "../features/cart/Cart";
import { selectedItems } from "../features/cart/cartSlice";
import { Navigate } from "react-router-dom";

const CartPage = () => {
    const items = useSelector(selectedItems)
    return (
      <>
        {/*NAVIGATE TO HOMEPAGE AS SOON AS AS CART BECOME EMPTY  */}
        {items.length === 0 && <Navigate to="/" replace={true}></Navigate>}
        <div className="CartPage">
          <Cart />
        </div>
      </>
    );
}
 
export default CartPage;