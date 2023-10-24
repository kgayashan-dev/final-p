import React, { useEffect, useState } from "react";
import { UserData } from "public/chartinfo.js";
import { Bar, Pie, Line, Doughnut } from "react-chartjs-2";
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

const EquipmentReport = () => {
  const [job, setJob] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [totalCost, setTotalCost] = useState(0);
  const [endDate, setEndDate] = useState("");
  const [equipmentData, setEquipmentData] = useState({
    labels: [],
    datasets: [
      {
        label: "Number of Equipments",
        data: [],
        borderColor: "#29C979",
        backgroundColor: "##6DE1A7",
        barThickness: 30,
        responsive: true,
      },
    ],
  });

  useEffect(() => {
    const q = query(collection(db, "job"));

    const unsubscribeJob = onSnapshot(q, (querySnapshot) => {
      let jobArr = [];
      querySnapshot.forEach((doc) => {
        jobArr.push({ ...doc.data(), id: doc.id });
      });

      // Filter jobs based on selected date range
      const filteredJobs = jobArr.filter((jobItem) => {
        const jobDate = new Date(jobItem.newDate);
        return jobDate >= new Date(startDate) && jobDate <= new Date(endDate);
      });

      setJob(filteredJobs);

      let total = 0;
      filteredJobs.forEach((jobItem) => {
        total += parseFloat(jobItem.cost);
      });
      setTotalCost(total);
      // Calculate equipment usage counts
      const equipmentUsage = {};

      filteredJobs.forEach((jobItem) => {
        const selectedEquipment = jobItem.selectedEquipment;
        console.log(selectedEquipment);
        selectedEquipment.split(",").forEach((equipment) => {
          const equipmentType = equipment.trim();
          if (equipmentType in equipmentUsage) {
            equipmentUsage[equipmentType]++;
          } else {
            equipmentUsage[equipmentType] = 1;
          }
        });
      });

      const equipmentLabels = Object.keys(equipmentUsage);
      const equipmentUsageCounts = Object.values(equipmentUsage);

      setEquipmentData({
        labels: equipmentLabels,
        datasets: [
          {
            label: "Number of Equipments",
            data: equipmentUsageCounts,
            borderColor: "#29C979",
            backgroundColor: "#6DE1A7",
            barThickness: 30,
            responsive: true,
          },
        ],
      });
    });

    return () => {
      unsubscribeJob(); // Clean up the listener when the component unmounts
    };
  }, [startDate, endDate]);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  return (
    <div>
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white capitalize">
        Equipment wise Report
      </h5>
      <div>
        <p>
          Select date range to get the information between{" "}
          {`${startDate} and ${endDate}`}
        </p>
      </div>

      <p>{""}</p>
      <div className="my-2 flex justify-between items-center">
        <div className=" ">
          <form action="">
            <input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              id="subject"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-56 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Enter cost"
              required
            />
          </form>
        </div>

        <div className="my-2 ">
          <form action="">
            <input
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              id="subject"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-56 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Enter cost"
              required
            />
          </form>
        </div>
      </div>
      <div className="flex justify-between gap-2">
        <div className="w-full md:col-span-2 relative lg:h-[32vh] h-[60vh] mb-4  p-4 border rounded-lg bg-white">
          {/* <Bar data={chartData} /> */}

          <h1>Chart</h1>
          {/* <Bar data={userData} /> */}
          <div
            style={{ height: "200px" }}
            className="flex justify-center items-center"
          >
            <Pie data={equipmentData} />
          </div>

          <div className="mt-8 -m-4">
            <h1 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Total(cost)
            </h1>
            {/* {job.map((job, key) => ( */}
            <div className="lg:col-span-2 col-span-3 bg-white flex justify-between w-full border p-4 rounded-lg">
              <div className="bg-amber-500 p-1 rounded-l-sm"></div>

              <div className="flex flex-col w-full p-4">
                <div className="pl-2">
                  <p className="text-2xl font-bold">
                 
                    Rs.
                      {new Intl.NumberFormat().format(
                        totalCost.toFixed(2)
                      )}
                  </p>
                </div>
              </div>
              <p className="bg-amber-200 flex justify-center items-center p-2 rounded-lg">
                {" "}
                <span className="text-amber-700 text-lg"></span>
              </p>
            </div>
            {/* ))} */}
          </div>
        </div>

        <div className="w-full col-span-1 relative lg:h-[50vh] h-[50vh] border rounded-lg bg-white p-4 overflow-scroll">
          <ul>
            <h1>Equipment Details</h1>
            <ul>
              {job.map((job, key) => (
                <div key={key}>
                  <li className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer">
                    <div className="pl-4">
                      <p className="text-gray-800 font-bold text-sm">
                        {job.jobType}
                        <span className="text-red-400 font-thin">
                          {" "}
                          {job.selectedEquipment.split(" ")[0]}{" "}
                        </span>
                      </p>
                    </div>

                    <div className="pl-4">
                      <p className="text-gray-800 font-bold">{job.cost}</p>
                    </div>

                    <span className="lg:flex md:hidden absolute right-6 text-sm">
                      {job.newDate}
                    </span>
                  </li>
                </div>
              ))}
            </ul>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EquipmentReport;
