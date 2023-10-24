import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { Timestamp, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../../../utils/firebase";
import Tooltip from "@/components/tootip/tooltip";

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

import SendMessagePage from "../../../components/dashboard/admindashboard/reply/sendMessage";

const Myjobs = () => {
  const [customerId, setCustomerId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [messageModel, setMessageModel] = useState(false);
  const [showCostModel, setShowCostModel] = useState(false);
  const [job, setJob] = useState([]);
  const [selectJob, setSelectedJob] = useState(null);

  const [selectJobId, setSelectedJobId] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        setCustomerId(user.email);
      }
    });

    const qjob = query(collection(db, "job"));

    const unsubscribeJob = onSnapshot(qjob, (querySnapshot) => {
      let jobArr = [];
      querySnapshot.forEach((doc) => {
        jobArr.push({ ...doc.data(), id: doc.id });
      });
      setJob(jobArr);
    });

    return () => {
      unsubscribeJob();
      unsubscribeAuth();
    };
  }, []);

  const handleOpenModal = (job) => {
    setSelectedJob(job); // Set the selected technician
    setShowModal(true);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setSelectedJob(null); // Clear the selected technician
    setShowModal(false);
  };

  const handleOpenMessageModal = (job) => {
    setSelectedJob(job); // Set the selected technician
    setMessageModel(true);
  };

  // Function to handle closing the modal
  const handleCloseMessageModal = () => {
    setSelectedJob(null); // Clear the selected technician
    setMessageModel(false);
  };


  const handleDeleteJob = async (jobId) => {
    const jobDocRef = doc(db, "job", jobId);
  
    try {
      await deleteDoc(jobDocRef);
      console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };
  




  return (
    <div className="bg-gray-100 ">
      <div className="flex justify-between p-4 font-semibold">
        <h2 className="font-medium text-xl">My Job (customer)</h2>
      </div>
      <div className="p-4">
        <div className="w-full m-auto p-4 border rounded-lg bg-white h-[80vh] overflow-scroll">
          <div className="my-3 p-2 grid md:grid-cols-7 sm:grid-cols-5 grid-cols-4 items-center justify-between ">
            <span>Job Type</span>
            <span className="sm:text-left text-right">Tech: Assigned Date</span>
            <span className="hidden sm:grid">Requested Date</span>

            <span className="hidden md:grid">Status</span>
            <span className="sm:grid">Assigned Technician</span>

            <span className="hidden sm:grid">Payment</span>
            <span className="hidden sm:grid">Message</span>
          </div>
          <ul>
            {job.map((jobItem) => {
              if (jobItem.email === customerId) {
                return (
                  <li
                    // onClick={()=>handleOpenCostModal(jobItem)}
                    key={jobItem.id}
                    className="bg-gray-50 text-sm p-1 hover:bg-gray-100 rounded-lg my-3 grid md:grid-cols-7 sm:grid-cols-5 grid-cols-2 items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center w-4/5">
                      <p className="pl-4 overflow-x-scroll">
                        {jobItem.jobType}
                        <span className="text-xs pl-1 text-red-400">
                          {jobItem.selectedEquipment}
                        </span>
                      </p>
                    </div>
                    <p className="text-gray-600">
                      {jobItem.assignedDate
                        ? jobItem.assignedDate
                            .toDate()
                            .toLocaleString()
                            .split(",")[0]
                        : "Pending.."}
                    </p>
                    <p className="text-gray-600">
                      {jobItem.date
                        ? jobItem.date.toDate().toLocaleString().split(",")[0]
                        : "Pending.."}
                    </p>
                    <p
                      className={`bg-zinc-100 w-24 rounded-lg  p-1 sm:text-left  ${
                        jobItem.status === "Pending"
                          ? "text-green-500"
                          : jobItem.status === "Working"
                          ? "text-blue-500"
                          : jobItem.status === "Completed"
                          ? "text-amber-500"
                          : jobItem.status === "Canceled"
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      {jobItem.status ? jobItem.status : "Pending"}
                    </p>
                    <div className="sm:flex hidden justify-between items-center">
                      <div>
                        <Link
                          href={`/admin/${encodeURIComponent(
                            btoa(jobItem.assignedTo)
                          )}?status=active`}
                        >
                          <Tooltip content={`Rate ${jobItem.assignedTo}`}>
                            <p className="hover:underline hover:text-blue-600 ">
                              {jobItem.assignedTo
                                ? jobItem.assignedTo.split(".")[0]
                                : ""}
                            </p>
                          </Tooltip>
                        </Link>
                      </div>
                    </div>

                    <div className="p-2 rounded-lg flex justify-right gap-2 items-center">
                      <button
                        onClick={() => handleOpenModal(jobItem)}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 "
                      >
                        {jobItem.withProfit ? jobItem.withProfit : "Pending"}
                      </button>
                    </div>
                    <div className="flex justify-between">
                      <button
                        onClick={() => {
                          handleOpenMessageModal(jobItem);
                          setSelectedJobId(jobItem);
                        }}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600  "
                      >
                        Message
                      </button>
                      <button className="text-red-500 hover:bg-red-200 p-1 rounded-lg hover:cursor-pointer" onClick={()=>handleDeleteJob(jobItem.id)}> <BsFillTrashFill/> </button>

                    </div>


                    
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </div>
      </div>
      {showModal && (
        <div className="absolute  bg-black/30 backdrop-blur-sm  inset-0 top-0 flex justify-center items-center">
          <div className="flex flex-col gap-1">
            <AiFillCloseCircle
              className="text-black place-self-end text-xl  hover:cursor-pointer"
              onClick={() => handleCloseModal(false)}
            />

            <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition duration-700 ease-in">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Additional Information
              </h5>

              <div className="bg-slate-100 rounded-sm p-4 my-4">
                {selectJob.withProfit !== undefined &&
                selectJob.withProfit !== undefined ? (
                  <p>
                    {`You have to pay Rs.${parseFloat(
                      selectJob.withProfit
                    ).toFixed(2)}`}
                  </p>
                ) : (
                  <p>Pending...</p>
                )}
              </div>

              <div className="flex justify-end items-center gap-2 ">
                <button
                  onClick={() => setShowModal(false)}
                  className="inline-flex items-center px-4 py-1 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {messageModel && selectJobId && (
        <div className="absolute  bg-black/30 backdrop-blur-sm  inset-0 top-0 flex justify-center items-center">
          <div className="flex flex-col gap-1">
            <AiFillCloseCircle
              onClick={() => handleCloseMessageModal(false)}
              className="text-black place-self-end text-xl  hover:cursor-pointer"
            />
            <div className=" relative p-6 w-[75vh] h-[70vh] flex flex-col gap-2 bg-white border border-gray-200 rounded-lg shadow overflow-scroll ">
              <h1 className="top-5 text-xl font-bold">
                Message from customer {selectJob.assignedTo}{" "}
              </h1>
              <div className="overflow-scroll ">
                <div>
                  <SendMessagePage
                    customer={selectJobId.email}
                    jobTechnician={selectJobId.assignedTo}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Myjobs;
