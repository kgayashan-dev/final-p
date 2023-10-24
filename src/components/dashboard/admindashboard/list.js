import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import CustomerDetailsModal from "./customerdetailsmodel"; // Assuming you have this component
import { db } from "../../../../utils/firebase";
import { query, collection, onSnapshot } from "firebase/firestore";

const List = ({ job }) => {
  const handleCustomerClick = () => {
    // alert("Customer clicked" + job);
  };

  return (
    <div className="w-full col-span-1 relative  border rounded-lg bg-white p-4 overflow-scroll">
      <h1>Job information</h1>
      <div className="overflow-scroll lg:h-[40vh] h-[40vh] mt-3">
        <ul className="relative">
          {job.map((jobItem) => (
            <li
              onClick={handleCustomerClick}
              key={jobItem.id}
              className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer"
            >
              <div className="bg-purple-300 rounded-lg p-3">
                <FaUser className="text-purple-800" />
              </div>
              <div className="pl-4">
                <p className="text-gray-800 font-bold text-xs">
                  {jobItem.jobType}{" "}
                  <span className="text-red-400">
                    {" "}
                    {jobItem.selectedEquipment.split(" ")[0]}
                  </span>
                </p>
                <p className="text-blue-400 font-sm">{jobItem.status}</p>
              </div>
              <span className="lg:flex md:hidden absolute right-6 text-sm">
                {jobItem.newDate}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default List;
