import React, { useState } from "react";
import { MdOutlinePersonOutline } from "react-icons/md";
import { RxDotsVertical } from "react-icons/rx";

const Viewrate = ({ technician }) => {
  return (
    <div className="bg-gray-100 h-[92vh] overflow-scroll">
      <div className="flex justify-between p-4">
        <h2 className="text-xl">View Ratings</h2>
      </div>
      <div className="p-4">
        <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-scroll">
          <div className="my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer">
            <span>Name</span>
            <span className="sm:text-left text-right">Email</span>
            <span className="hidden md:grid">Rated Date</span>
            <span className="hidden sm:grid">Rate</span>
          </div>
          <ul>
            {technician.map((tech, id) => (
              <li
                key={id}
                className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer"
              >
                <div className="flex items-center">
                  <div className="bg-amber-100 p-3 rounded-lg">
                    <MdOutlinePersonOutline className="text-gray-800" />
                  </div>
                  <p className="pl-4">
                    {tech.name}{" "}
                    <span
                      className={`${
                        tech.status === "active"
                          ? "text-green-500"
                          : "text-red-500"
                      } text-xs pl-2`}
                    >
                      {tech.status}
                    </span>
                  </p>
                </div>
                <p className="text-gray-600 sm:text-left text-right">
                  {tech.email}
                </p>
                <p className="hidden md:flex">
                  {" "}
                  {new Date(tech.date.seconds * 1000).toLocaleDateString()}
                </p>
                <div className="sm:flex justify-between items-center">
                  <p>
                    {tech.rate == undefined || ""
                      ? "Not available"
                      : `${(tech.rate / 5) * 100}%`}
                  </p>
                  <RxDotsVertical />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Viewrate;
