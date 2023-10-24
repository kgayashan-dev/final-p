import React, { useState, useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
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

const TechJobDetails = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTech, setSelectedTech] = useState(null); // State to store the selected technician
  const [technician, setTechnician] = useState([]);

  // Function to handle opening the modal
  const handleOpenModal = (tech) => {
    setSelectedTech(tech); // Set the selected technician
    setShowModal(true);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setSelectedTech(null); // Clear the selected technician
    setShowModal(false);
  };

  const fetchData = () => {
    const qt = query(collection(db, "technician"));

    const unsubscribeTec = onSnapshot(qt, (querySnapshot) => {
      let techArr = [];
      querySnapshot.forEach((doc) => {
        techArr.push({ ...doc.data(), id: doc.id });
      });
      setTechnician(techArr);
    });

    return () => {
      unsubscribeTec();
    };
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-gray-100 h-[95vh] ">
      <div>
        <div className="flex justify-between p-4 font-semibold">
          <h2 className="font-medium text-xl">Technician Job details</h2>
        </div>

        <div className="p-4 ">
          <div className="w-full m-auto p-4 border rounded-lg bg-white h-[85vh] overflow-scroll">
            <div className="my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between ">
              <span> Name</span>
              <span className="sm:text-left text-right">Email address</span>
              <span className="hidden md:grid">Contact No</span>
              <span className="sm:grid">Qualification</span>
            </div>
            {technician.map((tech, key) => (
              <div key={key}>
                <ul>
                  <li className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 text-sm p-0  grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer">
                    <div className="flex items-center">
                      <p className="pl-4">{tech.name}</p>
                    </div>

                    <div>
                      <p className="text-gray-600">{tech.email}</p>
                    </div>

                    <div>
                      <p className="hidden md:flex">{tech.contact}</p>
                    </div>

                    <div className="p-2 rounded-lg flex justify-right gap-2">
                      <button
                        onClick={() => handleOpenModal(tech)}
                        className="bg-blue-600 p-2 rounded-md text-white"
                      >
                        View
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showModal && selectedTech && (
        <div className="absolute bg-black/30 backdrop-blur-sm text-md p-1 inset-0 top-0 flex justify-center items-center">
          <div className="flex flex-col gap-1">
            <AiFillCloseCircle
              className="text-black place-self-end text-xl hover:cursor-pointer"
              onClick={handleCloseModal}
            />

            <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition duration-700 ease-in">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {selectedTech.name}
              </h5>

              <div className="bg-slate-100 rounded-sm p-4 my-4">
                <p>{selectedTech.qualification}</p>
              </div>

              <div className="flex justify-end items-center gap-2">
                <button
                  onClick={handleCloseModal}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TechJobDetails;
