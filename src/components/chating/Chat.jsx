import React, { useEffect, useRef, useState } from "react";
import Message from "../chating/Message";
import { query, onSnapshot, orderBy, collection } from "firebase/firestore";
import { db } from "../Firebase";
import SendMessage from "../chating/SendMessage";

function Chat() {
  const [messages, setMessages] = useState([]);

  const scroll = useRef();

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc });
      });
      setMessages(messages);
      scroll.current.scrollIntoView({ behavior: 'smooth' });
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="h-[80vh] overflow-scroll">
      <main className="flex flex-col p-[10px]  ">
        {messages &&
          messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
   
      </main>
      <span ref={scroll}></span>
      <SendMessage scroll={scroll} />
    </div>
  );
}

export default Chat;
