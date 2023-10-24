import React, { useState } from "react";
import AddEquipment from "./equipment/addequioments";
import AddBrands from "./brand/adbrands";

const AddEquipmentModel = () => {
  const [mode, setModel] = useState(true);

  const equipmentButtonClass = mode ? "bg-gray-100 " : "bg-blue-500 text-white";
  const modelButtonClass = mode ? "bg-blue-500 text-white" : "bg-gray-100 ";

  return (
    <div>
      <div className=" flex justify-between  h-10 rounded-md">
        <button
          onClick={() => setModel(true)}
          className={`w-full rounded-l-md text-black ${equipmentButtonClass}`}
        >
          Add Equipments
        </button>
        <button
          onClick={() => setModel(false)}
          className={`w-full rounded-r-md text-black ${modelButtonClass}`}
        >
          Add Brand
        </button>
      </div>
      <div>
        {mode ? (
          <div className="bg-slate-400">
            <AddEquipment />
          </div>
        ) : (
          <div className="bg-slate-400">
            <AddBrands />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddEquipmentModel;
