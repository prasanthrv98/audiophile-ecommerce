import { useState } from "react";
import FromInput from "../../UI/FromInput/FromInput";
import "./checkout.scss";

const Checkout = ({ cart }) => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    zipcode: "",
    city: "",
    coutry: "india",
  });

  const [formValid, setFormValid] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();
    console.log("btn clicked");
    console.log(formValues);
  };

  const onChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  console.log(cart?.line_items);

  return (
    <div
      className="main-container"
      style={{
        background: "#f2f2f2",
        paddingTop: "142px",
        paddingBottom: "142px",
      }}
    >
      <div className="checkout">
        <div className="checkout__col">
          <h3 className="heading-tertiary">checkout</h3>

          <form onSubmit={submitHandler} className="checkout__form">
            <div className="form-box">
              <span className="text-subtitle">billing details</span>
              <div className="input-box">
                <FromInput
                  inputType="text"
                  placeholder="John doe"
                  inputName="name"
                  labelName="Name"
                  inputStyle="inputStyle"
                  value={formValues.name}
                  onChange={onChange}
                  pattern="^[a-zA-Z]{3,16}$"
                />
                <FromInput
                  inputType="email"
                  placeholder="abc@example.com"
                  inputName="email"
                  labelName="Email Address"
                  inputStyle="inputStyle"
                  value={formValues.email}
                  onChange={onChange}
                />
                <FromInput
                  inputType="tel"
                  placeholder="923-222-2413"
                  inputName="phoneNumber"
                  labelName="Phone Number"
                  inputStyle="inputStyle"
                  value={formValues.phoneNumber}
                  onChange={onChange}
                  pattern="^[0-9]{10}"
                />
              </div>
            </div>

            <div className="form-box">
              <span className="text-subtitle">Shipping Info</span>
              <div className="input-box">
                <FromInput
                  inputType="address"
                  placeholder="1137 Anna Nagar"
                  inputName="address"
                  labelName="Address"
                  inputStyle="inputStyle"
                  classes="address-style"
                  value={formValues.address}
                  onChange={onChange}
                />
                <FromInput
                  inputType=""
                  placeholder="435 123"
                  inputName="zipcode"
                  labelName="Zip Code"
                  inputStyle="inputStyle"
                  pattern="[0-9]{6}"
                  value={formValues.zipcode}
                  onChange={onChange}
                />
                <FromInput
                  inputType="text"
                  placeholder="Chennai"
                  inputName="city"
                  labelName="City"
                  inputStyle="inputStyle"
                  value={formValues.city}
                  onChange={onChange}
                  pattern="^[a-zA-Z]{4,30}"
                />
                <FromInput
                  inputType="text"
                  inputName="country"
                  labelName="Country"
                  inputStyle="inputStyle"
                  value={formValues.coutry}
                  onChange={onChange}
                />
              </div>
            </div>

            {/* <button type="submit" className="btn btn-primary text-subtitle">
              submit
            </button> */}
          </form>
        </div>
        <div className="checkout__summary">
          <h5 className="heading-category">summary</h5>
          {cart?.line_items?.map((item) => (
            <div className="summary-item" key={item.id}>
              <img src={item.image.url} alt="" className="summary-item__img" />
              <div className="summary-item__info">
                <span className="text-primary item-name">
                  {item?.name.split(" ")[0]}
                </span>
                <span className="text-primary item-price">
                  {item?.price.formatted_with_symbol}
                </span>
              </div>
              <span className="item-quantity text-primary">
                x{item.quantity}
              </span>
            </div>
          ))}

          <div className="summary-total">
            <h5 className="text-primary">total</h5>
            <span className="heading-category">
              {cart?.subtotal?.formatted_with_symbol}
            </span>
          </div>

          <button
            className="btn btn-primary text-subtitle submit-btn"
            type="submit"
            onClick={submitHandler}
            disabled={formValid}
          >
            continue
          </button>
          <div data-valid={formValid} className="form-invalid">
            Form is Invalid, Can't Process Checkout.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
