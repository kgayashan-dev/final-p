import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  getDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import React from "react";
import { useState, useEffect } from "react";
import { FiSend } from "react-icons/fi";

import { auth, db } from "../../../../../utils/firebase";

function SendMessage({
  scroll,
  currentUser,
  userRole,
  selectedUserEmail,
  assignedToEmail,
 
}) {
  const [input, setInput] = useState("");
  const [messageText, setMessageText] = useState("");

  const [technician, setTechnician] = useState([]);

  useEffect(() => {
    const tecQ = query(collection(db, "technician"));

    const unsubscribeTechnician = onSnapshot(tecQ, (querySnapshot) => {
      let technicianArr = [];
      querySnapshot.forEach((doc) => {
        technicianArr.push({ ...doc.data(), id: doc.id });
      });
      technicianArr.reverse();
      setTechnician(technicianArr);
    });
    return () => {
      unsubscribeTechnician();
    };
  }, []);

  const handleSendMessage = async () => {
    const conversationRef = collection(db, `messages`);

    await addDoc(conversationRef, {
      text: input,
      currentUser: user.email,
      userRole: customer,
      timestamp: serverTimestamp(),
    });
  };



  return (
    <div className="text-sm h-14 w-full max-w-[800px]  flex  justify-center items-center absolute -bottom-2">
      <div className="w-full">
        <form action="" className="flex items-center" onSubmit={handleSendMessage}>
          <input
            value={input}
            onChange={(e) => setMessageText(e.target.value)}
            type="text"
            placeholder="Message"
            className=" p-2 border rounded-l-lg focus:outline-none w-[61vh]"
          />
          <button
            type="submit"
            className="bg-amber-400 py-2 px-4 rounded-r-lg hover:bg-amber-300 focus:outline-none"
          >
            <FiSend size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default SendMessage;
