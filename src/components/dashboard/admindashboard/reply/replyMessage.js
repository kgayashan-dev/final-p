import React, { useEffect, useState, useRef } from "react";
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
import Message from "@/components/chating/Message";
import SendMessage from "@/components/chating/SendMessage";

const ReplyPage = ({ customer, technician }) => {
  const router = useRouter();
  const [message, setMessage] = useState([]);
  const [user, loading] = useAuthState(auth);
  const scroll = useRef(null); // Define the scroll ref

  useEffect(() => {
    if (!user) {
      router.push("/admin/dashboard?content=technicians-job");
    }
  });

  console.log(customer, "customer");
  useEffect(() => {
    const tecQ = query(collection(db, "messages"), orderBy("timestamp"));

    const unsubscribe = onSnapshot(tecQ, (querySnapshot) => {
      let messageArr = [];
      querySnapshot.forEach((doc) => {
        messageArr.push({ ...doc.data(), id: doc.id });
      });

      setMessage(messageArr);
      scroll.current.scrollIntoView({ behavior: "smooth" });

      //   console.log(messageArr);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="text-sm flex flex-col">
      {message.map((message) => (
        <Message
          key={message.id}
          message={message}
          cust={customer}// job customerßa
          technician={message.technician}
        />
      ))}
      <span ref={scroll}></span>
      <div className="absolute bottom-0  ">
        <SendMessage
          scroll={scroll}
          technician={technician}
          handleSendMessage={""}
          message={message}
          customer={customer}
          
        />
      </div>
    </div>
  );
};
export default ReplyPage;
