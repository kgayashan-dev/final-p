import React, { useState, useEffect } from "react";
import AmountChanges from "@/components/dashboard/admindashboard/amountchanges";
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
  const [totalTodayAmount, setTotalTodayAmount] = useState(0);
  const [totalTodayComAmtProfit, setTotalTodayComAmtProfit] = useState(0);

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

      // Calculate the total today amount
      const today = new Date();
      const todayFormatted = today.toISOString().split("T")[0];

      let totalTodayAmount = 0;
      let totalTodayAmounCom = 0;
      jobArr.forEach((jobItem) => {
        if (jobItem.lastAmountDate && jobItem.lastAmountDate.toDate) {
          const jobDate = new Date(jobItem.lastAmountDate.toDate());
          const lastAmountDate = jobDate.toISOString().split("T")[0];
          // console.log(jobItem.withProfit);
          // console.log(jobItem.profit);

          if (lastAmountDate === todayFormatted) {
            totalTodayAmount += parseFloat(jobItem.withProfit); // returns the amount of today job
            totalTodayAmounCom += parseFloat(jobItem.profit);
          }
        }
      });

      setTotalTodayAmount(totalTodayAmount);
      setTotalTodayComAmtProfit(totalTodayAmounCom);
      console.log(totalTodayAmount, "Jelly");
    });

    // Unsubscribe from the snapshot listener when the component unmounts
    return () => unsubscribe();
  };

  // console.log(job);


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

  // console.log(job.id);

  const [changeCost, setChangeCost] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleCostChange = (newCost) => {
    setChangeCost(newCost);
  };

  return (
    <div>
      <AmountChanges
        id={job.id}
        managerCharges={job.managerCharge}
        jobType={job.jobType}
        jobIdRoute={jobId}
        jobIdRoute2={routejobId}
        totalTodayAmount={totalTodayAmount}
        totalTodayComAmtProfit={totalTodayComAmtProfit}
        prevcost={job.cost}
        total={job.amount}
        fullAmount={job.withProfit}
        additionalCost={job.additionalCost}
        email={job.email}
        onCostChange={handleCostChange}
      />
    </div>
  );
};

export default EditCost;
