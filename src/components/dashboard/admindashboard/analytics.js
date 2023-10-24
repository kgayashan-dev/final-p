import React from "react";
import {MdOutlinePersonOutline} from 'react-icons/md'
import {RxDotsVertical} from 'react-icons/rx'

const Analytics = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
    <div className="flex justify-between p-4">
      <h2 className="font-medium text-xl">Tasks</h2>
      
    </div>
    <div className="p-4">
      <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-scroll">
        <div className="my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer">
          <span>Task</span>
          <span className="sm:text-left text-right">Email</span>
          <span className="hidden md:grid">Last order</span>
          <span className="hidden sm:grid">Method</span>
        </div>
        <ul>
          {/* {data.map((order, id) => ( */}
            <li
              // key={id}
              className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer "
            >
              <div className="flex items-center">
                <div className="bg-amber-100 p-3 rounded-lg">
                  <MdOutlinePersonOutline className="text-gray-800" />
                </div>
                <p className="pl-4">
                  {" "}
                  {/* {order.name.first + " " + order.name.last} */}
                  customer
                </p>
              </div>
              <p className="text-gray-600 sm:text-left text-right">
                name@gmail.com
              </p>
              <p className="hidden md:flex">date</p>

              <div className="sm:flex  hidden justify-between items-center ">
                <p>order</p>
                <RxDotsVertical/>
              </div>
            </li>
          {/* ))} */}
        </ul>
      </div>
    </div>
  </div>
  );
};

export default Analytics;
