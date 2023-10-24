import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import {
  collection,
  query,
  onSnapshot,
  updateDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../../../utils/firebase";

const TechnicianCard = ({ technician }) => {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    // Set the initial rating based on the technician's rate value from the database
    if (technician.rate) {
      setRating(technician.rate);// 4
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
    <div className=" ">
      <div className="relative bg-slate-100 w-[25vh] h-[30vh] border rounded my-7   ">
        <div className="0">
          <img
            src="https://images.unsplash.com/photo-1473830394358-91588751b241?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
            alt=""
            className="rounded-t"
          />
        </div>

        <div className="p-4">
          <h3>{technician.name}</h3>
          <p>{technician.email.split(".")[0]}</p>
        </div>
        <div className="absolute flex justify-start items-center gap-3 pl-4 bottom-4 ">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={`${
                star <= rating ? "text-amber-400" : ""
                
              } hover: cursor-pointer text-lg`}
              onClick={() => handleRating(star)}
            />
          ))}
        </div>
        <div className="absolute right-1 bottom-1 ">
          <p className="flex text-xs text-amber-500">
            {" "}
            {technician.rate == undefined || ""
              ? ""
              : `${(technician.rate / 5) * 100}%`}
          </p>
        </div>
      </div>
    </div>
  );
};

const RateTechnicians = () => {
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

  return (
    <div className="bg-gray-100 ">
      <div className="flex justify-between p-4 font-semibold ">
        <h2 className="font-medium text-xl"> Available Technicians</h2>
      </div>
      <div className="p-4">
        <div className="w-full m-auto p-4 border rounded-lg bg-white h-[80vh]  overflow-scroll">
          <div className="">
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 ">
              {technicians.map((technician) =>
                technician.status === "active" ? (
                  <TechnicianCard
                    key={technician.id}
                    technician={technician}
                    handleRating={(newRating) =>
                      handleRating(newRating, technician.id)
                    }
                  />
                ) : (
                  ""
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateTechnicians;
