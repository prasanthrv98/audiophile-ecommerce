import "./cart.scss";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";

const Cart = ({ cart, onUpdateCartQty, onClearCart, onClose }) => {
  // Display if there is no items in the cart
  if (cart?.total_items === 0 || cart === undefined)
    return (
      <div className="cart">
        <h3 className="heading-category">Cart (0)</h3>
        <h5 className="text-primary">Cart is Empty, Please Add some items.</h5>
      </div>
    );

  return (
    <div className="cart">
      <div className="cart__header">
        <h5 className="heading-category">cart({cart?.total_unique_items})</h5>
        <button className="text-primary cart__remove-btn" onClick={onClearCart}>
          Remove All
        </button>
      </div>
      <div className="cart__body">
        {cart?.line_items.map((item) => (
          <CartItem
            item={item}
            key={item.id}
            onUpdateQty={onUpdateCartQty}
            cartItemId={item.id}
          />
        ))}
      </div>
      <div className="cart__footer">
        <span className="text-primary">TOTAL</span>
        <span className="heading-category">
          {cart?.subtotal.formatted_with_symbol}
        </span>
      </div>
      <Link
        to="/checkout"
        className="btn btn-primary text-subtitle  checkout-btn"
        onClick={onClose}
      >
        checkout
      </Link>
    </div>
  );
};

export default Cart;
