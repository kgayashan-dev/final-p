import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../../../utils/firebase";

const style = {
  message: `flex items-center shadow-xl m-4 py-2 px-3 rounded-tl-full rounded-tr-full`,
  sent: `bg-[#395dff] text-white flex-row-reverse text-end float-right rounded-bl-full`,
  recieved: `bg-[#e5e5ea] text-black float-left rounded-br-full`,
};

function Message({ message, cust }) {
  const [user, setUser] = useAuthState(auth);

  console.log(cust);// comes from job

  const messageClass =
  message.currentUser === user.email
      ? `${style.sent}`
      : `${style.recieved}`;

  console.log(message,"tech");
  return (
    <div className="relative text-sm">
      <div className={`${style.message} ${messageClass}`}>
        <div className="absolute flex justify-end items-center">
          <p className=" -mt-10  text-gray-600 text-xs">{message.currentUser }</p>
        </div>
        <div className=" flex justify-between  ">
          <p>{message.text}</p>
        </div>
      </div>
    </div>
  );
}

export default Message;
