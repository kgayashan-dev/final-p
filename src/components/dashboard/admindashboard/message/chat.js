import React, { use, useEffect, useRef, useState } from "react";
import Message from "../message/Message";
import SendMessage from "../message/sendmessage";
import {
  query,
  onSnapshot,
  orderBy,
  collection,
  addDoc,
  doc,
  getDocs,
} from "firebase/firestore";

import { Timestamp, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../../../../utils/firebase";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";

function Chat({
  selectedUserEmail,
  currentUser,
  userRole,
  assignedToName,
  assignedToEmail,
  assignedToId,
}) {
  const [messages, setMessages] = useState([]);
  const [conver, setConver] = useState([]);
  const [technician, setTechnician] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [input, setInput] = useState("");
  const [user, loading] = useAuthState(auth);

  const scroll = useRef();



  useEffect(() => {
    if (currentUser) {
      const conversationRef = collection(db, `messages`);
      const q = query(conversationRef, orderBy("timestamp"));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let messages = [];
        querySnapshot.forEach((doc) => {
          messages.push({ ...doc.data(), id: doc.id });
        });
        setMessages(messages);
        scroll.current.scrollIntoView({ behavior: "smooth" });
        console.log("Conversation Reference:");
      });

      return () => {
        unsubscribe();
      };
    }
  }, [selectedUserEmail, currentUser]);

  console.log(messages);

  return (
    <div className=" h-[57vh] overflow-scroll border rounded-lg ">
      <div className="flex flex-col p-[10px]  ">
        {messages.map((message) => (
          <Message
            key={message.id}
            message={message.currentUser}
            technician={technician}
          />
        ))}
      </div>
      <span ref={scroll}></span>
      <div className=" ">
        <SendMessage
          scroll={scroll}
          technician={technician}
          handleSendMessage={""}
         
          customer={customer}
        />
      </div>
    </div>
  );
}

export default Chat;
