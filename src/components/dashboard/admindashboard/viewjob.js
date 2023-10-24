import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MdOutlinePersonOutline } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";

import { auth, db } from "../../../../utils/firebase";
import { BiTask } from "react-icons/bi";

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
import { toast } from "react-toastify";

const Viewjobs = () => {
  const [showModal, setShowModal] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [selectJob,setSelectedJob] = useState(null);
  const [job, setJob] = useState([]);

  useEffect(() => {
    // const signedInUser = auth.onAuthStateChanged((user) => {
    //   if (user) {
    //     setCustomerId(user.email);
    //   }
    // });

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
      // signedInUser();
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


  return (
    <div className="bg-gray-100 h-[92vh] overflow-scroll">
      <div className="flex justify-between p-4 ">
        <h2 className="font-medium text-xl capitalize">
          View Jobs requested by all customers
        </h2>
      </div>
      <div className="p-4">
        <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-scroll">
          <div className="my-3 p-2 grid md:grid-cols-7 sm:grid-cols-5 grid-cols-4 items-center justify-between ">
            <span>Customer Name</span>
            <span className="sm:text-left text-right">Type</span>
            <span className="hidden md:grid">Equipment</span>
            <span className=" sm:grid">Brand</span>
            <span className=" sm:grid">Model</span>
            <span className="hidden sm:grid">Description/Issue</span>
            {/* <span className="hidden sm:grid">Description/Issue</span> */}
          </div>
          <ul>
            {job.map((job, id) => (
              <li
                key={id}
                className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-0 grid md:grid-cols-7 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer "
              >
                <div className="flex items-center">
                  <p className="pl-4">{job.custName.split(" ")[0]}</p>
                </div>
                <p className="text-gray-600">{job.jobType}</p>
                <p className="hidden md:flex">{job.selectedEquipment}</p>

                <div className="sm:flex hidden justify-between items-center">
                  <div>
                    <p>{job.selectedBrand}</p>
                  </div>
                </div>
                <div>
                  <p>{job.selectedModel}</p>
                </div>
                <div className=" p-2  rounded-lg flex justify-start">
                  <button
                    onClick={() => handleOpenModal(job)}
                    className="bg-blue-600 p-2 rounded-md text-white"
                  >
                    View
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {showModal && (
        <div className="absolute  bg-black/30 backdrop-blur-sm  inset-0 top-0 flex justify-center items-center">
          <div className="flex flex-col gap-1">
            <AiFillCloseCircle
              className="text-black place-self-end text-xl  hover:cursor-pointer"
              onClick={() => setShowModal(false)}
            />

            <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition duration-700 ease-in">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Description/Issue
              </h5>

              <div className="bg-slate-100 rounded-sm p-4 my-4">
                <p>
                 {selectJob.description}
                </p>
              </div>

              <div className="flex justify-end items-center gap-2 ">
                <button
                  onClick={() => handleCloseModal(false)}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showMessage && (
        <div className="absolute  bg-black/30 backdrop-blur-sm   inset-0 top-0 flex justify-center items-center">
          <div className="flex flex-col gap-1">
            <AiFillCloseCircle
              className="text-black place-self-end text-xl  hover:cursor-pointer"
              onClick={() => setShowMessage(false)}
            />

            <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition duration-700 ease-in">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Available Message
              </h5>

              <div className="bg-slate-100 rounded-sm p-4 my-4">
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Aliquid voluptas laborum, qui facilis, esse impedit numquam
                </p>
              </div>

              <div className="flex gap-2 ">
                <Link href={"/message/message"}>
                  <button
                    onClick={() => setShowMessage(false)}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Ok
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Viewjobs;
