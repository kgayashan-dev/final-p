import React, { useState, useEffect } from "react";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  serverTimestamp,
  doc,
  getDocs,
  addDoc,
  where,
} from "firebase/firestore";
Link;
import { db, auth } from "../../../../utils/firebase";
import { toast } from "react-toastify";

import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";

const AmountChanges = ({
  id,
  prevcost,
  additionalCost,
  email,
  total,
  jobType,
  onCostChange,
  jobIdRoute,
  fullAmount,
  jobIdRoute2,
  managerCharges,
  totalTodayComAmtProfit,
  totalTodayAmount,
  Times,
}) => {
  const [managerCharge, setManagerCharge] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [user, loading] = useAuthState(auth);

  console.log({ jobIdRoute2 });

  console.log(totalTodayAmount, "totaltodayAmount");

  useEffect(() => {
    // Calculate managerCharges based on total
    const calculatedManagerCharge = total + total * 0.3;// 30
    setManagerCharge(calculatedManagerCharge);
  }, [total]);

  const saveValues = async () => {
    const newTotal = parseFloat(managerCharge); // this is the payable
    const profit = parseFloat(newTotal) * 0.3;
    const newAmount = parseFloat(profit + newTotal);

    console.log(newAmount);

    try {
      await updateDoc(doc(db, "job", id), {
        managerCharge: parseFloat(newTotal),
        lastAmountDate: serverTimestamp(),
        profit: profit,
        withProfit: newTotal,
      });
      addRevenues();

      toast.success("Payable amount has been made. 🚀", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      setManagerCharge("");
      console.log("Additional information added successfully");
    } catch (error) {
      console.error("Error updating additional information: ", error);
    }
  };

  const addRevenues = async () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0]; // Get the date in the 'YYYY-MM-DD' format

    console.log(formattedDate);
    if (user && user.displayName) {
      const data = {
        name: user.displayName + " admin",
        email: user.email,
        date: formattedDate, // Store the date in the 'YYYY-MM-DD' format
        totalTodayAmount: totalTodayAmount,
        totalTodayComAmt: managerCharge,
      };

      // Check if a document with today's date already exists
      const querySnapshot = await getDocs(
        query(collection(db, "revenue"), where("date", "==", formattedDate))
      );

      if (querySnapshot.size === 0) {
        // Document doesn't exist, add a new one
        try {
          await addDoc(collection(db, "revenue"), data);
          toast.success("Today revenue added well ✅", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
          });
        } catch (error) {
          console.error("Error adding revenue:", error);
          toast.error("Failed to add revenue.", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
          });
        }
      } else {
        // Document exists, update it
        const docId = querySnapshot.docs[0].id; // Assuming there's only one document for a given date
        try {
          await updateDoc(doc(db, "revenue", docId), data);
          toast.success("Today Revenue updated well ✅", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
          });
        } catch (error) {
          console.error("Error updating revenue:", error);
          toast.error("Failed to update revenue.", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
          });
        }
      }
    } else {
      // Handle the case where user is not authenticated or loaded
      console.error("User not authenticated or loaded.");
    }
  };
  return (
    <div className="p-6">
      <div className="mb-2 text-2xl flex justify-between  font-bold tracking-tight text-gray-900 dark:text-white">
        <span>Charges information of technician Services</span>
        <span className="text-sm">{currentDate.toDateString()}</span>
      </div>

      <div className="p-4">
        <div className=" h-[20vh] p-4 border rounded-lg bg-white overflow-scroll">
          <div className=" p-2 grid lg:grid-cols-3 sm:grid-cols-3 grid-cols-2  justify-between  items-center">
            <span className="hidden sm:grid">Job jobType</span>
            <span className="hidden sm:grid">Technician Cost</span>
            <span className="hidden sm:grid">Other Charges</span>
          </div>
          <ul>
            <li className="bg-gray-50 cursor-pointer hover:bg-gray-100 rounded-lg my-3 p-2 grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-2 items-center justify-between">
              {/* date should be dynamic */}

              <div className="sm:flex  justify-between items-center">
                <p>{jobType} </p>
              </div>
              <div className="sm:flex  justify-between items-center">
                <p>{prevcost} </p>
              </div>
              <div className="sm:flex  justify-between items-center ">
                <p>{additionalCost}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-xl font-bold">
        <h1>Total = {total ? total.toFixed(2) : "Pending.."}</h1>
      </div>
      <div className="bg-slate-100 rounded-lg p-4 my-4 flex flex-col items-start gap-2">
        <label htmlFor="o-charges " className="">
          Set payable charges for the customers with 30%: 
        </label>
        <input
          type="number"
          defaultValue={total}
          min={0}
          name="o-charges"
          id=""
          value={managerCharge}
          onChange={(e) => setManagerCharge(e.target.value)}
          required
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        />
      </div>
      <div className="text-xl font-bold">
        <h1>{fullAmount ===  undefined ? "" : `Payable = ${fullAmount.toFixed(2) }`}</h1>
      </div>
      <div className="w-full  gap-2 my-4">
        <button
          onClick={saveValues}
          className="text-white w-full  bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          Enter
        </button>
      </div>
    </div>
  );
};

export default AmountChanges;
