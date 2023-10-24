import React, { useEffect, useState } from "react";
import { UserData } from "public/chartinfo.js";
import { Bar, Pie, Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { FaUser } from "react-icons/fa";
import { Timestamp, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../../../utils/firebase";

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

const EquiReport2 = ({ job, equipment }) => {
  const [equipmentCounts, setEquipmentCounts] = useState({});
  const [selectEqu, setSelectEqu] = useState("");

  const calculateEquipmentCounts = (jobs) => {
    const counts = {};

    jobs.forEach((job) => {
      const equipmentTypes = job.selectedEquipment.split(",");

      equipmentTypes.forEach((equipment) => {
        const equipmentType = equipment.trim();

        if (counts[equipmentType]) {
          counts[equipmentType]++;
        } else {
          counts[equipmentType] = 1;
        }
      });
    });

    return counts;
  };

  // Assuming you have a `job` array with the relevant data
  const jobData = job; // Your job data

  useEffect(() => {
    const counts = calculateEquipmentCounts(jobData);
    setEquipmentCounts(counts);
  }, [jobData]);

  // ...

  // Render the EquiReport2 component and pass the job data and equipment counts as props

  return (
    <div className="bg-gray-100 h-[70vh] overflow-scroll">
      <div className="flex justify-between p-4 ">
        <h2 className="font-medium text-xl capitalize">Equipments list</h2>
      </div>
      <div className="mx-4">
        <div className="flex  justify-start items-center gap-8">
          <form
            action=""
            method="get"
            className="flex  justify-start items-center gap-4"
          >
            {/* Select Equipment */}
            <div className=" flex justify-center items-center gap-3">
              <label
                htmlFor="equipment"
                className="block font-medium text-gray-900 dark:text-white"
              >
                Filter using Equipments
              </label>
            </div>
            <div className="items-center">
              <select
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                name="equipment"
                id="equipment"
                onChange={(e) => setSelectEqu(e.target.value)}
              >
                {equipment.map((equ, key) => (
                  <option key={key} value={equ.name}>
                    {equ.name}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </div>

        <div className="font-semibold text-lg  flex items-baseline gap-2">
          <h1>Number of Equipments is/are </h1>
          <p className="text-gray-900">{equipmentCounts[selectEqu] || 0}</p>
        </div>
      </div>
      <div className="p-4">
        <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-scroll">
          <div className="my-3 p-2 grid md:grid-cols-5 sm:grid-cols-5 grid-cols-4 items-center justify-between ">
            <span>Customer Name</span>
            <span className="sm:text-left text-right">Type</span>
            <span className="hidden md:grid">Equipment</span>
            <span className=" sm:grid">Brand</span>
            <span className=" sm:grid">Model</span>

            {/* <span className="hidden sm:grid">Description/Issue</span> */}
          </div>
          <ul>
            {job.map((job, id) => (
              <li
                key={id}
                className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-4 grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer "
              >
                <div className="flex items-center">
                  <p className="pl-4">*{job.custName.split(" ")[0]}</p>
                </div>
                <p
                  className={`${
                    job.jobType === "Service"
                      ? "text-green-500"
                      : "text-amber-500"
                  } `}
                >
                  {job.jobType}
                </p>
                <p className="hidden md:flex text-amber-500 w-[10vh] rounded-sm p-2">
                  {job.selectedEquipment}
                </p>

                <div className="sm:flex hidden justify-between items-center">
                  <div>
                    <p>{job.selectedBrand}</p>
                  </div>
                </div>
                <div>
                  <p>{job.selectedModel}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EquiReport2;
