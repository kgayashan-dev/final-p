import React, { useState, useEffect } from "react";
import { Timestamp } from "firebase/firestore";
import { auth, db } from "../../../../utils/firebase";
import { BsTrashFill } from "react-icons/bs";

import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import FeedbackEditPage from "./feedback-edit-page";

const CustomerFeedback = () => {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "userfeedback"));

    // Fetch feedback data from Firestore
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const userFeedbackArr = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Convert Timestamp to JavaScript Date object
        const date = data.date ? data.date.toDate() : null;

        userFeedbackArr.push({ ...data, id: doc.id, date: date });
      });
      setFeedback(userFeedbackArr);
    });

    return () => {
      unsubscribe();
    };
  }, []); // Empty dependency array to run the effect only once on component mount

  const deleteFeedback = async (id) => {
    await deleteDoc(doc(db, "userfeedback", id));
    toast.success("Feedback is deleted", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,

    })
  };
  return (
    <div className="h-[90vh] overflow-scroll">
      <div className="capitalize">
        <div className="font-medium text-xl m-6">
          <h1>Our Customer's Feedback</h1>
        </div>
        <FeedbackEditPage feedback={feedback} deleteFeedback={deleteFeedback}/>
      </div>
    </div>
  );
};

export default CustomerFeedback;
