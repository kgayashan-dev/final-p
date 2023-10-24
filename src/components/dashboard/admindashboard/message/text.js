import React from "react";

const Text = ({}) => {
  return (
    <div>
      <div className="relative flex justify-between items-center ">
        <p>{message.text}</p>
        <button
          onClick={() => deleteMessage(message.id)}
          className="absolute flex-row-reverse text-end -right-2 text-white -top-1 hover:cursor-pointer"
        >
          <IoIosCloseCircleOutline />
        </button>
      </div>
    </div>
  );
};

export default Text;
