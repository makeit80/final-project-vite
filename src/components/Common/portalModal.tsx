import ReactDom from "react-dom";

const PortalModal = ({ children }) => {
  const el = document.getElementById("modal")

  return ReactDom.createPortal(children, el)
}

export default PortalModal