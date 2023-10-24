import React, { useEffect, useRef, useState } from "react";
import Message from "../../pages/chatApp/Message";
import SendMessage from "../../pages/chatApp/sendMessage";

import { query, onSnapshot, orderBy, collection, addDoc } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import { db } from "../../../utils/firebase";

function Chat({ selectedUserEmail, currentUser }) {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const scroll = useRef();

  useEffect(() => {
    if (selectedUserEmail && currentUser) {
      const conversationRef = collection(db, "messages", `${selectedUserEmail}_${currentUser}`);
      const q = query(conversationRef, orderBy("timestamp"));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let messages = [];
        querySnapshot.forEach((doc) => {
          messages.push({ ...doc.data(), id: doc.id });
        });
        setMessages(messages);
        scroll.current.scrollIntoView({ behavior: "smooth" });
      });

      return () => {
        unsubscribe();
      };
    }
  }, [selectedUserEmail, currentUser]);

  const handleSendMessage = async (messageText) => {
    const conversationRef = collection(db, "messages", `${selectedUserEmail}_${currentUser}`);
    await addDoc(conversationRef, {
      text: messageText,
      sender: currentUser,
      timestamp: serverTimestamp()
    });
  };

  return (
    <div className="relative h-[57vh] overflow-scroll border rounded-lg ">
      <div className="flex flex-col p-[10px]  ">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      <span ref={scroll}></span>
      <SendMessage
        scroll={scroll}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
}

export default Chat;
