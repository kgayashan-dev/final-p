import { addDoc, serverTimestamp } from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "../../../../../utils/firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";

function SendToTech({ scroll, message, customer, jobTechnician }) {
  const [input, setInput] = useState("");
  const [user, loading] = useAuthState(auth);

  const [userRole, setUserRole] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (!loading && user) {
        const q = query(collection(db, "user"));

        // Fetch user data from Firestore
        const unsubscribeUsers = onSnapshot(q, (querySnapshot) => {
          let userArr = [];
          querySnapshot.forEach((doc) => {
            userArr.push({ ...doc.data(), id: doc.id });
          });

          // Search for the current user's role
          for (const userData of userArr) {
            if (userData.email === user.email) {
              setUserRole(userData.userRole);
              break; // Exit loop after finding the user's role
            }
          }
        });

        return () => {
          unsubscribeUsers();
        };
      } else if (!loading) {
        alert("Please wait");
      }
    };

    fetchData();
  }, [user, loading]);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (input === "") {
      alert("please enter a valid message!");
      return;
    }
    const { uid, displayName, email } = auth.currentUser;

    const conversationRef = collection(db, `messages`);

    await addDoc(conversationRef, {
      text: input,
      currentUser: email,
      userRole: userRole,
      technician: jobTechnician,
      timestamp: serverTimestamp(),
    });

    setInput("");
    // Scroll to the bottom after sending a message
    // scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  console.log(jobTechnician);

  return (
    <div className="w-full   p-2">
      <form action="" className="flex items-center" onSubmit={sendMessage}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Message"
          className="flex-grow p-2 border rounded-l-lg w-[60vh] focus:outline-none"
        />
        <button
          type="submit"
          className="bg-amber-400 py-2 px-4  rounded-r-lg hover:bg-amber-300 focus:outline-none"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default SendToTech;
