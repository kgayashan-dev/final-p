import React, { useState, useEffect } from "react";
import { FaShoppingBag } from "react-icons/fa";

import Link from "next/link";

const CostSetReport = ({ job }) => {
  //   const [amount, setAmount] = useState(0);
 
  return (
    <div className="bg-gray-100 h-[90vh]">
      <div className="flex justify-between px-4 pt-4">
        <h2 className="font-medium text-xl">Customer preview cost report</h2>
      </div>

      <div className="p-4">
        <div className=" h-[80vh] p-4 border rounded-lg bg-white overflow-scroll">
          <div className=" p-2 grid lg:grid-cols-6 sm:grid-cols-3 grid-cols-2  justify-between  items-center">
            <span>Task / Job</span>
            <span className="sm:text-left text-right ">Status</span>
            <span className="hidden md:grid">Complete date</span>
            <span className="hidden sm:grid">Technician Cost</span>
            <span className="hidden sm:grid">Other Charges</span>

            <span className="hidden sm:grid">Amount</span>
          </div>
          <ul>
            {job.map((job) => (
              <li
                key={job.id}
                className="bg-gray-50 cursor-pointer hover:bg-gray-100 rounded-lg my-3 p-2 grid lg:grid-cols-6 sm:grid-cols-3 grid-cols-2 items-center justify-between"
              >
                <div className="flex justify-center items-center ">
                  <div className="bg-purple-100 p-3 items-center rounded-lg ">
                    <FaShoppingBag className="text-purple-800" />
                  </div>
                  <div className="m-2">
                    <p className="text-gray-800 font-bold">{job.jobType}</p>
                    <p className="text-gray-800 text-xs">
                      C. Name: {job.custName.split("")[0]}
                    </p>
                  </div>
                </div>

                <span className="text-gray-600 sm:text-left text-right">
                  <p
                    className={`bg-zinc-100  rounded-lg  p-1 sm:text-left  ${
                      job.status === "Pending"
                        ? "text-green-500"
                        : job.status === "Working"
                        ? "text-blue-500"
                        : job.status === "Completed"
                        ? "text-amber-500"
                        : job.status === "Canceled"
                        ? "text-red-500"
                        : ""
                    }`}
                  >
                    {job.status}
                  </p>
                </span>

                {/* date should be dynamic */}
                <span className="hidden md:flex">
                  <p
                    className={`rounded-lg  p-1 sm:text-left  ${
                      job.status == "Completed"
                        ? "text-amber-600 bg-amber-100 px-1"
                        : ""
                    }`}
                  >
                    {job.newDate}
                  </p>
                </span>
                <div className="sm:flex hidden justify-between items-center">
                  <p>{job.cost} cost</p>
                </div>
                <div className="sm:flex hidden justify-between items-center text-sm">
                  <p>{job.additionalCost}</p>
                </div>
                <div className="flex justify-start items-center gap-6">
                  <Link href={{ pathname: "/admin/editamount", query: job.id }}>
                    <button className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                      {job.managerCharge ? job.managerCharge : "Set" }
                    </button>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CostSetReport;
