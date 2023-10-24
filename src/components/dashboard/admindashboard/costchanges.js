import React, { useState, useEffect } from "react";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";
Link;
import { db, auth } from "../../../../utils/firebase";
import { toast } from "react-toastify";

import Link from "next/link";

const costchanges = ({
  id,
  prevcost,
  additionalCost,
  email,
  total,
  onCostChange,
  jobIdRoute,
  jobIdRoute2,
  managerCharge,
}) => {
  const [newAdditionalCost, setNewAdditionalCost] = useState(null);
  const [newCost, setNewCost] = useState(null);

  useEffect(() => {
    setNewCost(prevcost);
    setNewAdditionalCost(additionalCost);
  }, []);

  console.log({ jobIdRoute2 });

  const saveValues = async () => {
    const amount = parseFloat(newAdditionalCost) + parseFloat(newCost);

    try {
      await updateDoc(doc(db, "job", id), {
        additionalCost: parseFloat(newAdditionalCost),
        cost: parseFloat(newCost),
        amount: parseFloat(amount),
      });
      setNewCost("");
      setNewAdditionalCost("");
      toast.success("Cost has been made. 🚀", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      console.log("Additional information added successfully");
    } catch (error) {
      console.error("Error updating additional information: ", error);
    }
  };

  //   if (jobIdRoute) {
  //     jobIdRoute && setNewCost(prevcost);

  //   }

  return (
    <div className="p-6">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
       Cost information
      </h5>

      <div className="m-auto p-6 h-[60vh] w-[70vh] rounded-md border-neutral-300 my-8 shadow-xl ">
        <div className="bg-slate-100 rounded-lg p-4 my-4 flex flex-col items-start gap-2">
          <label htmlFor="cost">Cost: {prevcost}</label>
          <input
            type="number"
            name="cost"
            id=""
            value={newCost}
            onChange={(e) => setNewCost(e.target.value)}
            defaultValue={0}
            min={0}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
        </div>
        <div className="bg-slate-100 rounded-lg p-4 my-4 flex flex-col items-start gap-2">
          <label htmlFor="o-charges " className="">
            Other Charges: {additionalCost}
          </label>
          <input
            type="number"
            defaultValue={0}
            min={0}
            name="o-charges"
            id=""
            value={newAdditionalCost}
            onChange={(e) => setNewAdditionalCost(e.target.value)}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
        </div>

        <div className="text-xl font-bold">
          <h1>Total = {total ? total.toFixed(2) : ""}</h1>
        </div>
        <div className="flex justify-end items-center gap-2 ">
          <button
            onClick={saveValues}
            className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Enter
          </button>
        </div>
      </div>
    </div>
  );
};

export default costchanges;
