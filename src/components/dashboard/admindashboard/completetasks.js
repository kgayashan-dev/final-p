import React, { useState, useEffect } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";
Link;
// useAuthState
import { db, auth } from "../../../../utils/firebase";
import { toast } from "react-toastify";

import LoadingFunction from "@/components/LoadingFunction";
import Link from "next/link";
import Chat from "./message/chat";
import ReplyPage from "./reply/replyMessage";
import { useAuthState } from "react-firebase-hooks/auth";

const Completetask = () => {
  const [status, setStatus] = useState([
    { status: "Pending" },
    { status: "Completed" },
    { status: "Working" },
    { status: "Canceled" },
  ]);

  const [technicianId, setTechnicianId] = useState(null);
  const [message, setMessage] = useState([]);

  const [selectJob, setSelectedJob] = useState(null);
  const [selectJobId, setSelectedJobId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [messageModel, setMessageModel] = useState(false);
  const [user, loading] = useAuthState(auth);

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

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        setTechnicianId(user.email);
        console.log(user.email);
      } else {
        return (
          <div>
            <LoadingFunction />
          </div>
        );
      }
    });

    fetchData();

    return () => {
      unsubscribeAuth();
    };
  }, []);

  const handleOpenModal = (jobId) => {
    setSelectedJobId(jobId);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setSelectedJob(null); // Clear the selected technician
    setShowModal(false);
  };

  const handleStatusChange = async (e, jobId) => {
    const newStatus = e.target.value;

    try {
      await updateDoc(doc(db, "job", jobId), {
        status: newStatus,
      });
      console.log("Job status updated successfully.");
    } catch (error) {
      console.error("Error updating job status:", error);
      toast.error("Failed to update job status.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
    }
  };

  useEffect(() => {
    const tecQ = query(collection(db, "messages"));

    const unsubscribe = onSnapshot(tecQ, (querySnapshot) => {
      let messageArr = [];
      querySnapshot.forEach((doc) => {
        messageArr.push({ ...doc.data(), id: doc.id });
      });
      messageArr.reverse();
      setMessage(messageArr);
      console.log(messageArr);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleDateChange = async (e, jobId) => {
    const newDate = e.target.value;
    // console.log(newCost);
    try {
      await updateDoc(doc(db, "job", jobId), {
        newDate: newDate, // compled date
      });
      toast.success("Job date updated successfully.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
    } catch (error) {
      console.error("Error updating date:", error);
      toast.error("Failed to update date.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
    }
  };

  console.log(selectJobId, "up");

  // const [selectedJob, setSelectedJob] = useState(null);
  return (
    <div className="bg-gray-100 h-[92vh]">
      <div className="flex justify-between px-4 pt-4">
        <h2 className="font-medium text-xl">
          See the available jobs and set status
        </h2>
      </div>

      <div className="p-4">
        <div className="w-full h-[80vh] p-4 border rounded-lg bg-white overflow-scroll">
          <div className="my-3 p-2 grid md:grid-cols-4 sm:grid-cols-4 grid-cols-2  justify-between cursor-pointer items-center">
            <span>Task / Job</span>
            <span className="sm:text-left text-right ">Status</span>
            <span className="hidden md:grid">Complete date</span>
            {/* <span className="hidden sm:grid">Cost</span> */}
            <span className="hidden sm:grid"></span>
          </div>
          <ul>
            {job.map((job) => {
              if (job.assignedTo === technicianId) {
                return (
                  <li
                    key={job.id}
                    className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-2 grid-cols-2 items-center justify-between"
                  >
                    <div className="flex justify-start items-center ">
                      <div className="bg-purple-100 p-3 items-center rounded-lg ">
                        <span className="relative">
                          {job.status === "Completed" ? (
                            <TiTick className="text-green-500" />
                          ) : (
                            <FaShoppingBag className="text-purple-800" />
                          )}
                          <span className="absolute">
                            {job.assignedNotification ? (
                              <div className="bg-red-500 p-1 rounded-full">
                                A
                              </div>
                            ) : (
                              ""
                            )}
                          </span>
                        </span>
                      </div>
                      <div className="m-2">
                        <p className="text-gray-800 font-bold">
                          {job.jobType}{" "}
                          <span className="text-xs text-blue-600">
                            {job.selectedEquipment}
                          </span>
                        </p>
                        <p className="text-gray-800 text-xs">
                          Cust Name: {job.custName.split(" ")[0]}
                        </p>
                        <p className="text-gray-800 text-xs">
                          Tech Name:
                          {job.assignedTo == null ? "" : job.assignedTo}
                        </p>
                      </div>
                    </div>

                    <span className="text-gray-600 sm:text-left text-right">
                      <select
                        value={job.status}
                        onChange={(e) => handleStatusChange(e, job.id)}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        name=""
                        id=""
                      >
                        {status.map((st, key) => (
                          <option
                            key={key}
                            value={st.status}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                          >
                            {st.status}
                          </option>
                        ))}
                      </select>
                    </span>

                    {/* date should be dynamic */}
                    <span className="hidden md:flex">
                      <input
                        type="date"
                        onChange={(e) => handleDateChange(e, job.id)}
                        id="subject"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="Enter cost"
                        required
                      />
                    </span>

                    <div className="sm:flex hidden justify-between items-center">
                      <span>
                        {" "}
                        <Link
                          href={{ pathname: "/admin/editcost", query: job.id }}
                        >
                          <button className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                            {job.amount ? job.amount: "Set Cost"}
                          </button>
                        </Link>
                      </span>
                      <span>
                        <button
                          onClick={() => {
                            setSelectedJob(job);
                            setMessageModel(true);
                          }}
                          className=" relative text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                        >
                          Message
                          {message.map((msg) => {
                            return msg.technician === user.email ? (
                              <div
                                key={msg.id}
                                className="absolute inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 border border-white rounded-full -top-2 -right-2"
                              ></div>
                            ) : null;
                          })}
                        </button>
                      </span>
                    </div>
                  </li>
                );
              }
            })}
          </ul>
        </div>

        {messageModel && selectJob && (
          <div className="absolute  bg-black/30 backdrop-blur-sm  inset-0 top-0 flex justify-center items-center">
            <div className="flex flex-col gap-1">
              <AiFillCloseCircle
                onClick={() => setMessageModel(false)}
                className="text-black place-self-end text-xl  hover:cursor-pointer"
              />
              <div className=" relative p-6 w-[75vh] h-[70vh] flex flex-col gap-2 bg-white border border-gray-200 rounded-lg shadow overflow-scroll ">
                <h1 className="top-5 text-xl font-bold">
                  Message from customer {selectJob.custName.split(" ")[0]}{" "}
                </h1>
                <div className="overflow-scroll ">
                  <div>
                    <ReplyPage
                      message={message}
                      customer={selectJob.email}
                      technician={selectJob.assignedTo}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Completetask;
