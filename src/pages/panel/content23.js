import React, { useState, useEffect } from "react";
import CostSetReport from "../../components/dashboard/admindashboard/wholeReport-dashboard";
import { FaShoppingBag } from "react-icons/fa";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../../utils/firebase";
import { toast } from "react-toastify";



const Content23 = () => {
  const [job, setJob] = useState([]);

  const fetchData = () => {
    const q = query(collection(db, "job"));

    // Fetch job data from Firestore
    const unsubscribeJob = onSnapshot(q, (querySnapshot) => {
      let jobArr = [];
      querySnapshot.forEach((doc) => {
        jobArr.push({ ...doc.data(), id: doc.id });
      });
      setJob(jobArr);
    });

    return () => {
      unsubscribeJob();
    };

  };

  useEffect(()=>{
    fetchData()
  })

  return (
    <div>
      <CostSetReport job={job} />
    </div>
  );
};

export default Content23;
