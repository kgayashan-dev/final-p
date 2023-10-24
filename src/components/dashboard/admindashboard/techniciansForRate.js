import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

import { auth, db } from "../../../../utils/firebase";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import Link from "next/link";
import { motion } from "framer-motion";

const TechnicianCard = ({ technician }) => {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    // Set the initial rating based on the technician's rate value from the database
    if (technician.rate) {
      setRating(technician.rate); // 4
    }
  }, [technician.rate]);

  const handleRating = async (newRating) => {
    try {
      console.log("Rating:", newRating);
      console.log("Technician ID:", technician.id);

      // Update the rating in the database
      await updateDoc(doc(db, "technician", technician.id), {
        rate: newRating,
      });

      setRating(newRating);
    } catch (error) {
      console.error("Error updating rating:", error);
    }
  };
  return (
    <div className="m-4">
      <div>
        <div className="flex items-center mb-4 space-x-10">
          <img
            className="w-16 h-16 rounded-full"
            src="https://images.unsplash.com/photo-1473830394358-91588751b241?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
            alt=""
          />
          <div className="space-y-1 font-medium dark:text-white text-gray-700">
            <span>
              {technician.name}
              <p
                datetime="2014-08-16 19:00"
                className="block text-sm text-gray-500 "
              >
                Joined on{" "}
                {technician.date.toDate().toLocaleString().split(",")[0]}
              </p>
              <p>
                <p>{technician.email}</p>
              </p>
            </span>
          </div>
        </div>
        <div className="flex items-center mb-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={`${
                star <= rating ? "text-amber-400" : ""
              } hover: cursor-pointer text-lg`}
              onClick={() => handleRating(star)}
            />
          ))}
          <p className="flex text-xs text-amber-500 items-center p-2">
            {" "}
            {technician.rate == undefined || ""
              ? ""
              : `${(technician.rate / 5) * 100}%`}
          </p>
        </div>

        <p className="mb-2 text-gray-500 dark:text-gray-400">
          {technician.qualification}
        </p>
        <p className="mb-3 text-gray-500 dark:text-gray-400">
          Our highly skilled technicians have in-depth knowledge and experience
          in repairing a wide range of electronic and electrical devices.
        </p>

        <div>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            There are any other technicians are available
          </p>
        </div>
      </div>
    </div>
  );
};

const RateTechnicians = ({ rateId }) => {
  const [technicians, setTechnicians] = useState([]);

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

  const filteredTechnicians = technicians.filter(
    (technician) =>
      technician.email === rateId && technician.status === "active"
  );

  return (
    <motion.div
    initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.3 }}
    
    className="bg-gray-100 h-screen w-screen">
      <div className="flex flex-row bg-slate-100 p-4">
        <Link href={"/admin/dashboard?content=my-jobs"}>
          <p className="hover:cursor-pointer">/Back</p>
        </Link>

        <p className="hover:cursor-pointer">/Rate</p>
      </div>
      <div className="flex justify-between p-4 font-semibold">
        <h2 className="font-medium text-xl">Rate Your Technician</h2>
      </div>

      <div className="p-4">
        <div className=" m-auto p-4 border rounded-lg bg-white h-[60vh] w-[60vh] overflow-scroll">
          <div className="grid sm:grid-cols-1 ">
            {filteredTechnicians.map((technician) => (
              <TechnicianCard
                key={technician.id}
                technician={technician}
                handleRating={(newRating) =>
                  handleRating(newRating, technician.id)
                }
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RateTechnicians;
