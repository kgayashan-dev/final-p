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
import { data } from "autoprefixer";

const SalesReport = () => {
  const [job, setJob] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [monthlyTotalCosts, setMonthlyTotalCosts] = useState([]);
  const [userData, setUserData] = useState({
    labels: [],
    datasets: [
      {
        label: "Cost",
        data: [],
        borderColor: "#ff6384",
        backgroundColor: "rgba(0, 138, 255, 0.68)",
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

      // Calculate the total cost using the filtered job array
      let total = 0;
      filteredJobs.forEach((jobItem) => {
        total += parseFloat(jobItem.managerCharge);
      });
      setTotalCost(total);

      // Update the userData state for the chart
      const chartData = filteredJobs.map((jobItem) => ({
        month: new Date(jobItem.newDate).getMonth() + 1,
        cost: jobItem.managerCharge,
      }));

      // Sort the chartData array in ascending order based on the month
      // chartData.sort((a, b) => a.month - b.month);

      // Calculate the total cost for each month
      const monthlyTotal = Array(12).fill(0); // Initialize an array with 12 zeros (for each month)
      chartData.forEach((data) => {
        const monthIndex = data.month - 1; // Month indices are 0-based
        monthlyTotal[monthIndex] += parseFloat(data.cost);
      });

      setMonthlyTotalCosts(monthlyTotal);
      const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ];
    
      setUserData({
        labels: months, // Use month names as x-axis labels
        datasets: [
          {
            label: "Cost",
            data: monthlyTotal, //y axis
            borderColor: "#ff6384",
            backgroundColor: "rgba(0, 138, 255, 0.68)",
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
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Sales Report
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
        <div className="w-full md:col-span-2 relative lg:h-[30vh] h-[60vh] mb-4  p-4 border rounded-lg bg-white">
          {/* <Bar data={chartData} /> */}

          <h1>Chart</h1>

          {/* <Bar data={userData} /> */}
          <div style={{ height: "200px" }}>
            <Bar data={userData} />
          </div>

          <div className="mt-2 -m-4">
            <h1 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Total (amount)
            </h1>
            {/* {job.map((job, key) => ( */}
            <div className="lg:col-span-2 col-span-3 bg-white flex justify-between w-full border p-4 rounded-lg">
              <div className="bg-amber-500 p-1 rounded-l-sm"></div>

              <div className="flex flex-col w-full p-4">
                <div className="pl-2">
                  <p className="text-2xl font-bold">
                    Rs.
                    {new Intl.NumberFormat().format(totalCost.toFixed(2))}
                  </p>
                  {/* <p className="text-gray-600">Daily Revenue</p> */}
                </div>
              </div>
              <p className="bg-amber-200 flex justify-center items-center p-2 rounded-lg">
                {" "}
                <span className="text-amber-700 text-lg">
                  {/* <FaChartBar /> */}
                </span>
              </p>
            </div>
            {/* ))} */}
          </div>
        </div>

        <div className="w-full col-span-1 relative lg:h-[50vh] h-[50vh] border rounded-lg bg-white p-4 overflow-scroll">
          <h1>Payments for each job</h1>
          <ul>
            {/* {data.map((order, id) => ( */}

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
                    <p className="text-gray-800 font-bold">{job.managerCharge}</p>
                  </div>

                  <span className="lg:flex md:hidden absolute right-6 text-sm">
                    {job.newDate}
                  </span>
                </li>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SalesReport;
