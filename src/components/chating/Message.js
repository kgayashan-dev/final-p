import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../utils/firebase";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { deleteDoc, doc } from "firebase/firestore";

const style = {
  message: `flex items-center shadow-xl m-2 py-2 px-3 rounded-tl-full rounded-tr-full`,
  sent: `bg-blue-600 text-white flex-row-reverse text-end float-right rounded-bl-full `,
  received: `bg-[#e5e5ea] text-black float-left rounded-br-full `,
  closeIcon: `absolute -right-5 -top-1 text-gray-400 hover:text-red-500 hover:cursor-pointer`,
};

function Message({ message, cust, technician }) {
  const [user, setUser] = useAuthState(auth);

  console.log(cust); // comes from job

  const messageClass =
    message.currentUser === user.email ? `${style.sent}` : `${style.received}`;

  console.log(message.currentUser, "tech"); // cutomer

  const deleteMessage = async (messageId) => {
    try {
      const docRef = doc(db, "messages", messageId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <div className="relative text-sm pb-3">
      {technician === user.email && (
        <div>
          <div className={`${style.message} ${messageClass}`}>
            <div className="absolute flex justify-end items-center">
              <p className="-mt-12 text-gray-600 text-xs">
                {message.currentUser}
              </p>
            </div>
            <div className="flex relative justify-between text-md ">
              <p>{message.text} </p>
              {message.currentUser === user.email &&
                technician === user.email && (
                  <span
                    onClick={() => deleteMessage(message.id)}
                    className={style.closeIcon}
                  >
                    <AiOutlineCloseCircle />
                  </span>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Message;
