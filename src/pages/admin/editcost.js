import React, { useState, useEffect } from "react";
import Costchanges from "@/components/dashboard/admindashboard/costchanges";
import { useRouter } from "next/router";
import { auth, db } from "../../../utils/firebase";

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
import { useAuthState } from "react-firebase-hooks/auth";
import LoadingFunction from "@/components/LoadingFunction";

const EditCost = () => {
  const [user, loading] = useAuthState(auth);
  const [job, setJobs] = useState([]);
  const router = useRouter();
  const jobId = Object.keys(router.query)[0]; // Gets the first key
  const routejobId = router.query; // Gets the first key

  console.log(jobId, "query");

  const fetchData = () => {
    const qjob = query(collection(db, "job")); // Assuming 'db' is your Firestore database reference

    const unsubscribe = onSnapshot(qjob, (querySnapshot) => {
      const jobArr = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      for (const jobData of jobArr) {
        if (jobData.id === jobId) {
          setJobs(jobData);
          break; // Exit loop
        }
      }
    });

    // Unsubscribe from the snapshot listener when the component unmounts
    return () => unsubscribe();
  };

  console.log(job);
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  // check user

  const checkUser = () => {
    if (loading) {
      return <LoadingFunction />;
    }
    if (!user) {
      router.push(`/auth/login`);
    }
  };

  useEffect(() => {
    checkUser();
  }, [user, loading]);

  console.log(job.id);

  const [changeCost, setChangeCost] = useState(0);

  const handleCostChange = (newCost) => {
    setChangeCost(newCost);
    
  };
  return (
   <div>
      <Costchanges
        id={job.id}
        jobIdRoute={jobId}
        jobIdRoute2={routejobId}
        prevcost={job.cost}
        total={job.amount}
        additionalCost={job.additionalCost}
        email={job.email}
        onCostChange={handleCostChange}
      />
    </div>
  );
};

export default EditCost;
