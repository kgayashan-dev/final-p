import React, { useEffect, useState } from "react";
import { BsPerson } from "react-icons/bs";
import { GrUserManager } from "react-icons/gr";
import { FaChartBar } from "react-icons/fa";
import { auth, db } from "../../../../utils/firebase";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
  orderBy,
  limit,
  getDocs,
  getDoc,
} from "firebase/firestore";
import Slug from "@/pages/panel/[q]";

const Card2 = () => {
  const [technicians, setTechnicians] = useState([]);
  const [topRatedTechnicians, setTopRatedTechnicians] = useState([]);
  const [topRatedTechnicianNames, setTopRatedTechnicianNames] = useState([]);
  const [job, setJob] = useState([]);
  const [mostJobCustomer, setMostJobCustomerName] = useState("");

  useEffect(() => {
    const q = query(collection(db, "technician"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const technicianArr = [];
      querySnapshot.forEach((doc) => {
        technicianArr.push({ ...doc.data(), id: doc.id });
      });
      setTechnicians(technicianArr);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    let maxRate = 0;
    const topTechnicians = [];

    technicians.forEach((technician) => {
      if (technician.rate > maxRate) {
        maxRate = technician.rate;
        topTechnicians.length = 0; // Clear the array of previous top technicians
        topTechnicians.push(technician);
      } else if (technician.rate === maxRate) {
        topTechnicians.push(technician); // 0
      }
    });

    setTopRatedTechnicians(topTechnicians);
    // Set the names of top-rated technicians
    setTopRatedTechnicianNames(topTechnicians.map((tech) => tech.name));
  }, [technicians]);

  const technicianset = topRatedTechnicianNames.join(", ");

  useEffect(() => {
    const jobQ = query(collection(db, "job"));

    const unsubscribe = onSnapshot(jobQ, (querySnapshot) => {
      const jobArr = [];
      querySnapshot.forEach((doc) => {
        jobArr.push({ ...doc.data(), id: doc.id });
      });
      setJob(jobArr);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Add this useEffect to calculate the customer with the most jobs
  useEffect(() => {
    const customerJobCounts = {}; // Object to track job counts for each customer

    job.forEach((job) => {
      const customerId = job.email; // field named email in the job data
      if (customerId) {
        customerJobCounts[customerId] = customerJobCounts[customerId]
          ? customerJobCounts[customerId] + 1
          : 1;
      }
    });

    // Find the customer with the most jobs
    let maxJobCount = 0;
    let mostJobCustomer = null;

    for (const customerId in customerJobCounts) {
      if (customerJobCounts[customerId] > maxJobCount) {
        maxJobCount = customerJobCounts[customerId];
        mostJobCustomer = customerId;
      }
    }
    console.log(mostJobCustomer);
    setMostJobCustomerName(mostJobCustomer);
  });

  return (
    <div className="grid lg:grid-cols-4 gap-5 p-4  ">
      <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
        <div className="bg-blue-500 p-1 rounded-l-sm"></div>

        <div className="flex flex-col w-full pb-4">
          <div className="pl-2">
            <p className="text-lg md:text-xl font-semibold">
              Top Rated technician
            </p>
            <p className=" text-blue-500 text-md">{technicianset}*</p>
          </div>
        </div>
        <p className="bg-blue-200 flex justify-center items-center p-2 rounded-lg">
          {" "}
          <span className="text-blue-700 text-lg ">
            <GrUserManager />
          </span>
        </p>
      </div>

      <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
        <div className="bg-pink-500 p-1 rounded-l-sm"></div>

        <div className="flex flex-col w-full pb-4">
          <div className="pl-2">
            <p className="text-lg md:text-xl font-semibold">Top Customer</p>
            <p className="text-pink-600">{mostJobCustomer}</p>
          </div>
        </div>
        <p className="bg-pink-200 flex justify-center items-center p-2 rounded-lg">
          {" "}
          <span className="text-pink-700 text-lg ">
            <GrUserManager />
          </span>
        </p>
      </div>
    </div>
  );
};

export default Card2;
