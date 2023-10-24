import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../../../utils/firebase";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { deleteDoc, doc } from "firebase/firestore";

const style = {
  message: `flex items-center shadow-xl m-2 py-2 px-3 rounded-tl-full rounded-tr-full`,
  sent: `bg-[#395dff] text-white flex-row-reverse text-end float-right rounded-bl-full`,
  received: `bg-[#e5e5ea] text-black float-left rounded-br-full`,
  closeIcon: `absolute -right-5 -top-1 text-gray-400 hover:text-red-500 hover:cursor-pointer`,
};

function ShowReplyMessages({ message, customer, tech, jobTechnician }) {
  const [user, setUser] = useAuthState(auth);

  console.log(tech); // comes from job
  console.log(jobTechnician); // comes from job

  const messageClass =
    message.currentUser === user.email ? `${style.sent}` : `${style.received}`;

  // delete messagez

  const deleteMessage = async (messageId) => {
    try {
      const docRef = doc(db, "messages", messageId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <div className="relative  pb-4">
      {customer === user.email && tech === jobTechnician && (
        <div>
          <div className={`${style.message} ${messageClass}`}>
            <div className="absolute flex justify-end items-center">
              <p className="-mt-10 text-gray-600 text-xs">
                {message.currentUser}
              </p>
            </div>
            <div className="relative justify-between text-md">
              <p>{message.text} </p>

              {message.currentUser === user.email && tech === jobTechnician && (
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

export default ShowReplyMessages;
