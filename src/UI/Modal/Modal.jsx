import ReactDom from "react-dom";
import "./modal.scss";

const Backdrop = ({ onClick }) => {
  return <div className="backdrop" onClick={onClick}></div>;
};

const Modal = ({ onClose, children }) => {
  return (
    <>
      {ReactDom.createPortal(
        <Backdrop onClick={onClose} />,
        document.getElementById("modalOverlay")
      )}
      {ReactDom.createPortal(children, document.getElementById("modalOverlay"))}
    </>
  );
};

export default Modal;
