import React, { useState } from "react";
import { AiOutlineBell, AiOutlineWechat } from "react-icons/ai";
import { GrMenu } from "react-icons/gr";

const Tooltip = ({ content, children, zIndex = 10 }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="group relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      <span
        className={`absolute top-6 right-4 capitalize rounded text-gray-800 p-2 text-xs  bg-white group-hover:scale-100 shadow-lg shadow-opacity-50 transition-all transform scale-0 ${
          isHovered ? "scale-100" : ""
        }`}
        style={{ zIndex }}
      >
        {content}
      </span>
    </div>
  );
};


export default Tooltip;