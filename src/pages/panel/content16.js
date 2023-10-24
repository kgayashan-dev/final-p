import JobSummary from "@/components/dashboard/admindashboard/jobsummary";
import React, { useEffect, useState } from "react";
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

const Content16 = () => {
  const [job, setJobs] = useState([]);

  const fetchData = () => {
    const qjob = query(collection(db, "job")); // Assuming 'db' is your Firestore database reference

    const unsubscribe = onSnapshot(qjob, (querySnapshot) => {
      const jobArr = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setJobs(jobArr);
    });

    // Unsubscribe from the snapshot listener when the component unmounts
    return () => unsubscribe();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <JobSummary job={job} />
    </div>
  );
};

export default Content16;
