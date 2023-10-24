import React, { useState, useEffect } from "react";
import { AiTwotoneMoneyCollect } from "react-icons/ai";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../../../utils/firebase";
import { toast } from "react-toastify";
import { date } from "yup";

const FinalReport = () => {
  const [revenue, setRevenue] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [fiterRev, setFilteredRevenue] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "revenue"));

    const unsubscribeRev = onSnapshot(q, (querySnapshot) => {
      let revArr = [];
      querySnapshot.forEach((doc) => {
        revArr.push({ ...doc.data(), id: doc.id });
      });
      revArr.reverse();
      setRevenue(revArr.reverse(revArr[date]));

      const filteredJobs = revArr.filter((jobItem) => {
        console.log(jobItem.date.split("T")[0]);

        const jobDate = new Date(jobItem.date.split("T")[0]);
        return jobDate >= new Date(startDate) && jobDate <= new Date(endDate);
      });

      setFilteredRevenue(filteredJobs.reverse(revArr[date]));
    });

    return () => {
      unsubscribeRev();
    };
  }, [startDate, endDate]);

  // date rang

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };


  return (
    <div className="bg-gray-100 h-[80vh] text-sm">
      <div className="m-4">
        <h2 className="font-medium text-xl">Final Report Admin</h2>
      </div>

      <div className="px-4">
        <div className=" h-[70vh] p-4 border rounded-lg bg-white overflow-scroll">
          <h1 className="font-medium text-xl">
            Filter acording to the seleced date range
          </h1>
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
          <div className=" p-2 grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 justify-between  items-center">
            <span>Date</span>
            <span className="sm:text-left text-right ">Name</span>
            <span className="hidden md:grid">Email</span>
            <span className="hidden sm:grid"> Total Daily Revenue</span>
            {/* <span className="hidden sm:grid">Total Company Profit</span> */}
          </div>

          <ul>
            {fiterRev.map((rev) => (
              <li
                key={rev.id}
                className="bg-gray-50 cursor-pointer hover:bg-gray-100 rounded-lg my-3 p-2 grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between"
              >
                <div className="flex justify-start items-center ">
                  <div className="bg-purple-100 p-3 items-center rounded-lg ">
                    <AiTwotoneMoneyCollect className="text-purple-800" />
                  </div>
                  <div className="m-2">
                    <p className="text-gray-800 font-bold">
                      {new Date(rev.date).toLocaleString().split(",")[0]}
                     
                    </p>
                  </div>
                </div>

                <span className="text-gray-600 sm:text-left text-right">
                  Added by: {rev.name.split(" ")[0]}
                </span>
                <span className="text-gray-600 sm:text-left text-right">
                  {rev.email}
                </span>

                {/* date should be dynamic */}
                <div className="sm:flex hidden justify-center text-center p-1 mx-4 font-bold rounded-lg bg-teal-200">
                  <span className="hidden md:flex">
                    <p className={`rounded-lg  p-1 sm:text-left  font-bold `}>
                      Rs.
                      {new Intl.NumberFormat().format(
                        rev.totalTodayAmount.toFixed(2)
                      )}
                    </p>
                  </span>
                </div>

                {/* <div className="sm:flex hidden justify-center text-center p-1 mx-4  font-bold rounded-lg bg-orange-200">
                  <span className="hidden md:flex text-right">
                    <p className="p-1">
                      Rs.
                      {new Intl.NumberFormat().format(
                        rev.totalTodayComAmt.toFixed(2)
                      )}
                    </p>
                  </span>
                </div> */}
                <div className="flex justify-start items-center gap-6"></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FinalReport;
