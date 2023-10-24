import React, { useEffect, useState } from "react";

import { BiTask } from "react-icons/bi";
import { TiTick } from "react-icons/ti";



const JobSummary = ({ job }) => {
  // const [job, setJob] = useState([]);

  const [selectedStatus, setSelectedStatus] = useState("All");

  const handleFilter = (status) => {
    setSelectedStatus(status);
  };

  return (
    <div className="capitalize bg-gray-100 p-6">
      <div>
        <h1 className="font-medium text-xl">Job Summary</h1>
      </div>
      <div className="lg:col-span-2 col-span-1 bg-white flex border p-2 rounded-lg">
        <div className="bg-amber-500 p-1 rounded-l-sm"></div>

        <div className="flex flex-col m-4">
          <div className="pl-2">
            <div className="flex justify-center gap-4 hover:cursor-pointer text-white">
              <button
                className={`bg-amber-500 p-2 rounded-sm  ${
                  selectedStatus === "All" && "bg-yellow-500"
                }`}
                onClick={() => handleFilter("All")}
              >
                All
              </button>
              <button
                className={`bg-amber-500 p-2 rounded-sm hover:cursor-pointer ${
                  selectedStatus === "Pending" && "bg-yellow-500"
                }`}
                onClick={() => handleFilter("Pending")}
              >
                Pending
              </button>
              <button
                className={`bg-amber-500 p-2 rounded-sm hover:cursor-pointer ${
                  selectedStatus === "Working" && "bg-yellow-500"
                }`}
                onClick={() => handleFilter("Working")}
              >
                Working
              </button>
              <button
                className={`bg-amber-500 p-2 rounded-sm hover:cursor-pointer ${
                  selectedStatus === "Completed" && "bg-yellow-500"
                }`}
                onClick={() => handleFilter("Completed")}
              >
                Completed
              </button>
              <button
                className={`bg-amber-500 p-2 rounded-sm  hover:cursor-pointer ${
                  selectedStatus === "Canceled" &&
                  "bg-yellow-500 hover:cursor-pointer"
                }`}
                onClick={() => handleFilter("Canceled")}
              >
                Canceled
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="my-4">
        <div className="w-full m-auto p-4 border lg:h-[70vh] h-[50vh] rounded-lg bg-white overflow-scroll ">
          <div className="my-3 p-2 grid md:grid-cols-6 sm:grid-cols-5 grid-cols-4  items-center justify-between ">
            <span>Job Id</span>
            <span className="sm:text-left text-right">cus name</span>
            <span className="sm:text-left text-right">Status</span>
            <span className="hidden md:grid">Checked Date</span>
            <span className="hidden sm:grid">Cost</span>
            <span className="hidden sm:grid">Technician</span>
          </div>
          {job
            .filter(
              (j) => selectedStatus === "All" || j.status === selectedStatus
            )
            .map((j) => (
              <ul key={j.id}>
                <li className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-6 sm:grid-cols-5 grid-cols-4 items-center justify-between cursor-pointer">
                  <div className="flex items-center">
                    <div className="bg-amber-100 p-2 rounded-lg">
                      <span>
                        {j.status === "Completed" ? (
                          <TiTick className="text-green-500" />
                        ) : (
                          <BiTask className="text-amber-800" />
                        )}
                      </span>
                    </div>
                    <p className="pl-1 text-md">
                      {j.jobType}{" "}
                      <span className="text-red-400">
                        {j.selectedEquipment.split(" ")[0]}
                      </span>
                    </p>
                  </div>
                  <div>{j.custName.split(" ")[0]}</div>

                  <p
                    className={`bg-zinc-100 w-24 rounded-lg  p-1 sm:text-left  ${
                      j.status === "Pending"
                        ? "text-green-500"
                        : j.status === "Working"
                        ? "text-blue-500"
                        : j.status === "Completed"
                        ? "text-amber-500"
                        : j.status === "Canceled"
                        ? "text-red-500"
                        : ""
                    }`}
                  >
                    {j.status}
                  </p>
                  <p className="hidden md:flex">{j.newDate}</p>

                  <div
                    className={`sm:flex hidden justify-between items-center`}
                  >
                    <p>{j.amount}</p>
                  </div>

                  <div
                    className={`sm:flex hidden justify-between items-center`}
                  >
                    <p>
                      {j.assignedTo == null ? "" : j.assignedTo.split("@")[0]}
                    </p>
                  </div>
                </li>
              </ul>
            ))}
        </div>
      </div>
    </div>
  );
};

export default JobSummary;
