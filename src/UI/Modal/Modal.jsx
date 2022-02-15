import ReactDom from "react-dom";
import Backdrop from "../Backdrop/Backdrop";

const Modal = ({ onClose, children }) => {
  return;
  <>
    {ReactDom.createPortal(
      <Backdrop onClick={onClose}>{children}</Backdrop>,
      document.getElementById("modalOverlay")
    )}
    ;
  </>;
};

export default Modal;
