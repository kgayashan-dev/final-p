import React, { useEffect, useState } from "react";
import { UserData } from "public/chartinfo.js";
import { Bar, Pie, Line, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
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

const Barchart = () => {
  const [job, setJob] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [userData, setUserData] = useState({
    labels: [],
    datasets: [
      {
        label: "Cost",
        data: [],
        borderColor: "#ff6384",
        backgroundColor: "rgba(0, 138, 255, 0.68)",
        barThickness: 100,
        responsive: true,
      },
    ],
  });

  useEffect(() => {
    const q = query(collection(db, "revenue"));

    const unsubscribeJob = onSnapshot(q, (querySnapshot) => {
      let revArr = [];
      querySnapshot.forEach((doc) => {
        revArr.push({ ...doc.data(), id: doc.id });
      });

      // Calculate the totalTodayComAmt for each year
      const yearlyTotal = {};
      revArr.forEach((rev) => {
        const year = new Date(rev.date).getFullYear();
        if (yearlyTotal[year]) {
          yearlyTotal[year] += parseFloat(rev.totalTodayComAmt);
        } else {
          yearlyTotal[year] = parseFloat(rev.totalTodayComAmt);
        }
      });

      // Update the userData state for the chart
      const chartData = Object.entries(yearlyTotal).map(([year, total]) => ({
        year: parseInt(year), // ParseInt to convert the key from string to number
        totalTodayComAmt: total,
      }));

      // Sort the chartData array in ascending order based on the year
      chartData.sort((a, b) => a.year - b.year);

      setUserData({
        labels: chartData.map((data) => data.year), // year or x axis
        datasets: [
          {
            label: "Amount",
            data: chartData.map((data) => data.totalTodayComAmt), // y axis
            borderColor: "#ff6384",
            backgroundColor: "rgba(0, 138, 255, 0.68)",
            barThickness: 100,
            responsive: true,
          },
        ],
      });
    });

    return () => {
      unsubscribeJob(); // Clean up the listener when the component unmounts
    };
  }, []);

  return (
    <>
      <div className="w-full md:col-span-2 relative lg:h-[50vh] h-[50vh] m-auto p-4 border rounded-lg bg-white">
        {/* <Bar data={chartData} /> */}
        <h1>Anual Revenue</h1>

        {/* <Bar data={userData} /> */}
        {/* btn conflict will occur ue to height dont know thw reason */}
        <div style={{ height: "00px" }}>
          <Bar data={userData} />
        </div>
      </div>
    </>
  );
};

export default Barchart;
