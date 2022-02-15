import "./cartItem.scss";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { useState } from "react";

const CartItem = ({ item, onUpdateQty, cartItemId }) => {
  let productName = item.product_name.split(" ");
  productName.pop();
  productName = productName.join(" ");

  const [itemQty, setItemQty] = useState(item.quantity);

  const addQtyHandler = () => {
    onUpdateQty(cartItemId, item.quantity + 1);
    setItemQty((prevQty) => prevQty + 1);
  };

  const removeQtyHandler = () => {
    onUpdateQty(cartItemId, item.quantity - 1);

    if (itemQty === 1) return;
    setItemQty((prevQty) => prevQty - 1);
  };

  return (
    <div className="cart-item">
      <img src={item.image.url} alt="" className="cart-item__img" />
      <div className="cart-item__info">
        <span className="text-primary item-name">{productName}</span>
        <span className="text-primary item-price">
          {item.price.formatted_with_symbol}
        </span>
      </div>
      <div className="cart-item__btn">
        <RemoveIcon className="btn-icon" onClick={removeQtyHandler} />
        <span className="text-subtitle">{itemQty}</span>
        <AddIcon className="btn-icon" onClick={addQtyHandler} />
      </div>
    </div>
  );
};

export default CartItem;
