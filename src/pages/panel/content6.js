import CustomerFeedback from '@/components/dashboard/admindashboard/customerfeedback'
import React,{useEffect, useState} from 'react'

import { auth, db } from "../../../utils/firebase";

// import { auth, db } from "../../../../utils/firebase";

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

const Content6 = () => {
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
  }, []);

  return (
    <div className=''>
      <CustomerFeedback customerfeedback = {feedback}/>
    </div>
  )
}

export default Content6