import React, { useEffect, useState } from "react";
import { BsPerson } from "react-icons/bs";
import { GrUserManager } from "react-icons/gr";
import { FaChartBar } from "react-icons/fa";


const Topcard = ({manager, technician, customer}) => {

  return (
    <div className="grid lg:grid-cols-5 gap-5 p-4">
      <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
        <div className="bg-teal-500 p-1 rounded-l-sm"></div>

        <div className="flex flex-col w-full pb-4">
          <div className="pl-2">
            <p className="text-2xl font-bold">Rs 7,743</p>
            <p className="text-gray-600">Daily Revenue</p>
          </div>
        </div>
        <p className="bg-teal-200 flex justify-center items-center p-2 rounded-lg">
          {" "}
          <span className="text-teal-700 text-lg">
            <FaChartBar />
          </span>
        </p>
      </div>
      <div className="bg-white flex justify-between w-full border p-4 rounded-lg">
        <div className="bg-pink-500 p-1 rounded-l-sm"></div>
        <div className="flex flex-col w-full pl-1 pb-4 ">
          <div className="pl-2">
            <p className="text-2xl font-bold">{customer}</p>
            <p className="text-gray-600">Customers</p>
          </div>
        </div>
        <p className="bg-pink-200 flex justify-center items-center p-2 rounded-lg">
          {" "}
          <span className="text-pink-700 text-lg">
            <BsPerson />
          </span>
        </p>
      </div>
      <div className="bg-white flex justify-between w-full border p-4 rounded-lg">
        <div className="bg-blue-500 p-1 rounded-l-sm"></div>
        <div className="flex flex-col w-full pl-1 pb-4 ">
          <div className="pl-2">
            <p className="text-2xl font-bold">{technician}</p>
            <p className="text-gray-600">Technicians</p>
          </div>
        </div>
        <p className="bg-blue-200 flex justify-center items-center p-2 rounded-lg">
          {" "}
          <span className="text-blue-700 text-lg">
            <BsPerson />
          </span>
        </p>
      </div>
      <div className="bg-white flex justify-between w-full border p-4 rounded-lg">
        <div className="bg-purple-500 p-1 rounded-l-sm"></div>
        <div className="flex flex-col w-full pl-1 pb-4 ">
          <div className="pl-2">
            <p className="text-2xl font-bold">{manager}</p>
            <p className="text-gray-600">Managers</p>
          </div>
        </div>
        <p className="bg-purple-200 flex justify-center items-center p-2 rounded-lg">
          {" "}
          <span className="text-purple-700 text-lg">
            <GrUserManager />
          </span>
        </p>
      </div>
    </div>
  );
};

export default Topcard;
