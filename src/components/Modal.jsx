import React from "react";

function Modal({ title, children }) {
  return (
    <div className="w-[100%] h-[100%] absolute top-0 left-0 bg-light-gray/50">
      {children}
    </div>
  );
}

export default Modal;
