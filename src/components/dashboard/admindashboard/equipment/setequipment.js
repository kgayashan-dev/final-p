import React, { useState, useEffect } from "react";

import { BsFillTrashFill } from "react-icons/bs";

const Setequipment = ({ equipment, deleteEquipment }) => {
  return (
    <div className="">
      <ul>
        <li
          className={
            "flex justify-between bg-white-400 w-auto p-2 my-2 border rounded-lg hover:cursor-pointer"
          }
        >
          <div className="flex items-center  gap-7">
            <h2 className="">{equipment.name} </h2>

            {equipment.time ? (
              <h2 className="text-sm text-blue-500">
                {new Date(equipment.time.seconds * 1000).toLocaleDateString()}
              </h2>
            ) : (
              <h2 className="text-xs text-green-500">Time is not available</h2>
            )}
          </div>

          <button
            onClick={() => deleteEquipment(equipment.id)}
            className=" bg-rose-200 text-black p-2 text-xl rounded-lg hover:bg-rose-400 focus:ring-2"
          >
            <BsFillTrashFill className="text-rose-600" />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Setequipment;
