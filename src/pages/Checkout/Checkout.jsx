import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { commerce } from "../../lib/commerce";
import { CircularProgress } from "@material-ui/core";
import FormInput from "../../UI/FormInput/FormInput";
import "./checkout.scss";
import Modal from "../../UI/Modal/Modal";
import ThankyouModal from "./ThankYou/ThankyouModal";
import PaymentForm from "./PaymentForm";

const Checkout = ({ cart, onCheckout, onRefresh }) => {
  const INITIAL_FORM_VALUES = {
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    zipcode: "",
    state: "",
    city: "",
    country: "US",
  };
  const [formValues, setFormValues] = useState(INITIAL_FORM_VALUES);
  const [shippingData, setShippingData] = useState({});
  const [formValid, setFormValid] = useState(false);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingSubdivisions, setShippingSubdivisions] = useState("");
  const [orderSuccessFul, setOrderSuccessFul] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const history = useHistory();

  const subdivisions = Object.entries(shippingSubdivisions).map(
    ([code, state]) => ({
      id: code,
      label: state,
    })
  );

  const fetchSubdivisions = async () => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      "US"
    );
    setShippingSubdivisions(subdivisions);
  };

  // after the payment submission
  const paymentSubmissionHandler = (orderData) => {
    setPaymentProcessing(false);
    setFormValues(INITIAL_FORM_VALUES); // clear checkout form input fields.
    console.log("latest order", orderData);
    setOrderSuccessFul(true);
  };

  const paymentProcessingHandler = () => {
    //scroll the page to top after payment button is clicked
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setPaymentProcessing(true);
  };

  const onChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  // take back to home page after successfull payment
  const backToHomeHandler = () => {
    setOrderSuccessFul(false);
    history.replace("/");
  };

  // fetch the states for the US Country with country code.
  useEffect(() => {
    fetchSubdivisions();
  }, []);

  // this will generate the checkout token.
  useEffect(() => {
    const generateToken = async () => {
      try {
        if (cart?.line_items.length >= 1) {
          const token = await commerce.checkout.generateToken(cart?.id, {
            type: "cart",
          });
          setCheckoutToken(token);
        }
      } catch (error) {
        console.log(error);
      }
    };
    generateToken();
  }, [cart]);

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(formValues);

    const email = formValues.email;
    const name = formValues.name;
    const phoneNumber = formValues.phoneNumber;
    const address = formValues.address;
    const state = formValues.state;
    const city = formValues.city;
    const zipcode = formValues.zipcode;
    const country = formValues.country;

    let emailValid = false;
    let nameValid = false;
    let phoneValid = false;
    let zipcodeValid = false;
    let cityValid = false;

    if (
      email !== "" &&
      name !== "" &&
      phoneNumber !== "" &&
      address !== "" &&
      state !== "" &&
      city !== "" &&
      zipcode !== ""
    ) {
      if (email.includes("@")) emailValid = true;
      if (/^[a-zA-Z\-]+$/.test(name)) nameValid = true;
      if (/^[0-9]{10}$/.test(phoneNumber)) phoneValid = true;
      if (/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/.test(city)) cityValid = true;
      if (/^[0-9]{5}$/.test(zipcode)) zipcodeValid = true;

      // all the form inputs are valid
      // submit the checkout
      if (emailValid && nameValid && phoneValid && zipcodeValid && cityValid) {
        setFormValid(true);
        const data = {
          name,
          email,
          phoneNumber,
          address,
          state,
          city,
          zipcode,
          country,
        };

        setShippingData(data);
      }
    }
  };

  return (
    <div
      className="main-container"
      style={{
        background: "#f2f2f2",
        paddingTop: "142px",
        paddingBottom: "142px",
      }}
    >
      {paymentProcessing && (
        <Modal>
          <div className="processing__container">
            <CircularProgress disableShrink />
            <h3 className="heading-category">
              Please wait your payment is processing...
            </h3>
          </div>
        </Modal>
      )}
      {orderSuccessFul && (
        <Modal onClose={() => setOrderSuccessFul(false)}>
          <ThankyouModal onClick={backToHomeHandler} />
        </Modal>
      )}

      <div className="checkout">
        <div className="checkout__col">
          <h3 className="heading-tertiary">checkout</h3>

          <form onSubmit={submitHandler} className="checkout__form">
            <div className="form-box">
              <span className="text-subtitle">billing details</span>
              <div className="input-box">
                <FormInput
                  inputType="text"
                  placeholder="John"
                  inputName="name"
                  labelName="Name"
                  inputStyle="inputStyle"
                  value={formValues.name}
                  onChange={onChange}
                  pattern="^[a-zA-Z]{3,16}$"
                  readonly={formValid}
                />
                <FormInput
                  inputType="email"
                  placeholder="abc@example.com"
                  inputName="email"
                  labelName="Email Address"
                  inputStyle="inputStyle"
                  value={formValues.email}
                  onChange={onChange}
                  readonly={formValid}
                />
                <FormInput
                  inputType="tel"
                  placeholder="923-222-2413"
                  inputName="phoneNumber"
                  labelName="Phone Number"
                  inputStyle="inputStyle"
                  value={formValues.phoneNumber}
                  onChange={onChange}
                  pattern="^[0-9]{10}"
                  readonly={formValid}
                />
              </div>
            </div>

            <div className="form-box">
              <span className="text-subtitle">Shipping Info</span>
              <div className="input-box">
                <FormInput
                  inputType="address"
                  placeholder="1137 Avenue Street"
                  inputName="address"
                  labelName="Address"
                  inputStyle="inputStyle"
                  classes="address-style"
                  value={formValues.address}
                  onChange={onChange}
                  readonly={formValid}
                />
                <FormInput
                  inputType="text"
                  placeholder="94103"
                  inputName="zipcode"
                  labelName="Zip Code"
                  inputStyle="inputStyle"
                  pattern="[0-9]{5}"
                  value={formValues.zipcode}
                  onChange={onChange}
                  readonly={formValid}
                />
                <FormInput
                  inputName="state"
                  labelName="State"
                  inputStyle="select"
                  value={subdivisions}
                  readonly={formValid}
                  onChange={onChange}
                />
                <FormInput
                  inputType="text"
                  inputName="city"
                  labelName="City"
                  inputStyle="inputStyle"
                  value={formValues.city}
                  onChange={onChange}
                  readonly={formValid}
                  placeholder="San Francisco"
                  pattern="^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$"
                />
                <FormInput
                  inputType="text"
                  inputName="country"
                  labelName="Country"
                  inputStyle="inputStyle"
                  value={formValues.country}
                  onChange={onChange}
                  readonly={formValid}
                />
              </div>
            </div>
          </form>

          {formValid && (
            <PaymentForm
              shippingData={shippingData}
              price={cart?.subtotal?.formatted_with_symbol}
              checkoutToken={checkoutToken}
              onCheckout={onCheckout}
              onRefresh={onRefresh}
              onPaymentSubmit={paymentSubmissionHandler}
              onPaymentProcess={paymentProcessingHandler}
            />
          )}
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

          {formValid && (
            <>
              <button
                className="btn btn-primary text-subtitle submit-btn"
                onClick={() => setFormValid(false)}
              >
                back
              </button>
              <div className="text-primary primary-color">
                Click back to Edit Form.
              </div>
            </>
          )}

          {!formValid && (
            <button
              className="btn btn-primary text-subtitle submit-btn"
              type="submit"
              onClick={submitHandler}
            >
              continue
            </button>
          )}

          <div data-valid={formValid} className="form-invalid primary-color">
            Fill the Form to process for payment.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
