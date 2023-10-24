import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

const Star = ({ star, review }) => {
  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5;
    return (
      <span key={index}>
        {star >= index + 1 ? (
          <FaStar className="bg-yellow-500" />
        ) : star >= number ? (
          <FaStarHalfAlt className="bg-yellow-500" />
        ) : (
          <AiOutlineStar className="bg-yellow-500" />
        )}
      </span>
    );
  });

  return (

      <div className="">
        {ratingStar}
        {/* <p>{review} customer review</p> */}
      </div>

  );
};

export default Star;
