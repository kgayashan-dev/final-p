import React, { Fragment, useState, useEffect } from "react";
import { MdOutlinePersonOutline } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BsPencilFill } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import { MdOutlineFlipCameraAndroid } from "react-icons/md";
import { auth, db } from "../../../../utils/firebase";
import { Timestamp } from "firebase/firestore";
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

const ManagerTech = ({ manager, technician }) => {
  const [showModal, setShowModal] = useState(false);
  // const [manager, setManager] = useState([]);
  // const [technician, setTechnician] = useState([]);
  const currentDate = new Date();

  // Function to toggle the status of a manager
  const toggleActiveManager = async (managerId) => {
    const managerRef = doc(db, "manager", managerId);
    const managerDoc = await getDoc(managerRef);

    if (managerDoc.exists()) {
      const currentStatus = managerDoc.data().status;
      const updatedStatus = currentStatus === "active" ? "inactive" : "active";

      await updateDoc(managerRef, {
        status: updatedStatus,
        timestamp: currentDate,
      });

      toast.success("Job status updated successfully!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
    } else {
      toast.error("Manager document not found!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
    }
  };

  // Function to toggle the status of a technician
  const toggleActiveTech = async (techId) => {
    const techRef = doc(db, "technician", techId);
    const techDoc = await getDoc(techRef);

    if (techDoc.exists()) {
      const currentStatus = techDoc.data().status;
      const updatedStatus = currentStatus === "active" ? "inactive" : "active";

      await updateDoc(techRef, { status: updatedStatus, date: currentDate });

      toast.success("Job status updated successfully!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
    } else {
      toast.error("Technician document not found!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
    }
  };

  // console.log(manager);
  return (
    <div className="bg-gray-100 h-[95vh] overflow-scroll">
      <div className="flex justify-between p-4 font-semibold">
        <h2 className="font-medium text-xl">Managers</h2>
      </div>

      <div className="p-4">
        <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-scroll">
          <div className="my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between ">
            <span>Name</span>
            <span className="sm:text-left text-right">Email</span>
            <span className="hidden md:grid">Date</span>
            <span className="hidden sm:grid">Job Status</span>
          </div>

          <ul>
            {manager.map((man, key) => (
              <div key={key}>
                <li
                  className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer "
                >
                  <div className="flex items-center">
                    <div className="bg-amber-100 p-3 rounded-lg">
                      <MdOutlinePersonOutline className="text-gray-800" />
                    </div>
                    <div>
                      <p className="pl-4">{man.name}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600 sm:text-left text-right">
                      {man.email}
                      {console.log(man.status)}
                    </p>
                  </div>

                  <p className="hidden md:flex">
                    {man.timestamp && (
                      <>
                        {new Date(
                          man.timestamp.seconds * 1000
                        ).toLocaleDateString()}
                      </>
                    )}
                  </p>

                  <div
                    className={`sm:flex  hidden justify-between items-center ${
                      man.status === "active"
                        ? "text-green-800"
                        : "text-red-500"
                    }`}
                  >
                    <p>{man.status}</p>
                    <div
                      className="bg-rose-200 p-2 rounded-lg hover:bg-red-300"
                      onClick={() => toggleActiveManager(man.id)}
                    >
                      <MdOutlineFlipCameraAndroid className="text-rose-600" />
                    </div>
                  </div>
                </li>
              </div>
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
                Set Job Status
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Are you sure to set the status of manager?
              </p>

              <div className="flex justify-end items-center gap-2 ">
                <button
                  onClick={toggleStatus}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Change
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between p-4 font-semibold">
        <h2 className="font-medium text-xl">Technicians</h2>
      </div>

      <div className="p-4">
        <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-scroll">
          <div className="my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between ">
            <span>Name</span>
            <span className="sm:text-left text-right">Email</span>
            <span className="hidden md:grid">Date</span>
            <span className="hidden sm:grid">Job Status</span>
          </div>

          <ul>
            {technician.map((tec, key) => (
              <div key={key}>
                <li className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer ">
                  <div className="flex items-center">
                    <div className="bg-amber-100 p-3 rounded-lg">
                      <MdOutlinePersonOutline className="text-gray-800" />
                    </div>
                    <div>
                      <p className="pl-4">{tec.name}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600 sm:text-left text-right">
                      {tec.email}
                      {/* {console.log(man.status)} */}
                    </p>
                  </div>

                  <p className="hidden md:flex">
                    {tec.date && (
                      <>
                        {new Date(tec.date.seconds * 1000).toLocaleDateString()}
                      </>
                    )}
                  </p>

                  <div
                    className={`sm:flex  hidden justify-between items-center ${
                      tec.status === "active"
                        ? "text-green-800"
                        : "text-red-500"
                    }`}
                  >
                    <p>{tec.status}</p>
                    <div
                      className="bg-rose-200 p-2 rounded-lg hover:bg-red-300"
                      onClick={() => toggleActiveTech(tec.id)}
                    >
                      <MdOutlineFlipCameraAndroid className="text-rose-600" />
                    </div>
                  </div>
                </li>
              </div>
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
                Set Job Status
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Are you sure to set the status of manager?
              </p>

              <div className="flex justify-end items-center gap-2 ">
                <button
                  onClick={toggleStatus}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Change
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerTech;
