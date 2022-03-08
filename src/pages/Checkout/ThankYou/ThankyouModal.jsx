import { CheckCircle } from "@material-ui/icons";

import "./thankyouModal.scss";

const ThankyouModal = ({ orderData, onClick }) => {
  return (
    <div className="thankyou__container">
      <CheckCircle className="check-icon" />
      <h3 className="heading-tertiary">thank you for your order</h3>
      <p className="text-primary">
        You will receive an email confirmation shortly.
      </p>
      <button className="btn btn-primary text-subtitle" onClick={onClick}>
        back to home
      </button>
    </div>
  );
};

export default ThankyouModal;
