import React from "react";

function Circle({ children }) {
  return (
    <div className="p-2 rounded-full bg-purple text-white font-bold font-heading">
      {children}
    </div>
  );
}

export default Circle;
