import React from "react";

const ToggleButton = ({ checked, onChange }) => {
  return (
    <div
      onClick={onChange}
      className={`cursor-pointer w-[34px] h-[14px] flex items-center rounded-full ${
        checked ? "bg-[#2196F380]" : "bg-[#00000080]"
      }`}
    >
      <div
        className={`w-5 h-5 rounded-full shadow-md transform duration-300 ${
          checked ? "translate-x-4 bg-[#2196F3]" : "-translate-x-[2px] bg-[#FAFAFA]"
        }`}
      ></div>
    </div>
  );
};

export default ToggleButton;