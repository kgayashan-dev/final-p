import React, { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { Timestamp, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../../../utils/firebase";

import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
const CustomerDetailsModal = ({ customer, onClose }) => {
  const [customerdb, setCustomedb] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "customer"));

    // Fetch manager data from Firestore
    const unsubscribeCus = onSnapshot(q, (querySnapshot) => {
      let custArr = [];
      querySnapshot.forEach((doc) => {
        custArr.push({ ...doc.data(), id: doc.id });
      });
      setCustomedb(custArr);
    });

    return () => {
      unsubscribeCus();
    };
  });

  return (
    <div className="absolute bg-black/30 backdrop-blur-sm inset-0 top-0 flex justify-center items-center">
      <div className="flex flex-col gap-1">
        <AiFillCloseCircle
          className="text-black place-self-end text-xl hover:cursor-pointer"
          onClick={onClose}
        />

        <div className="p-6 w-[100vh] flex flex-col gap-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          {/* Display customer details here */}
          <p>
            <strong>Customer Name: </strong> {customer.custName}
          </p>
          <p>
            <strong>Customer Email:</strong> {customer.email}
          </p>
          <p>
            <strong>Job Requested Date: </strong>
            {customer.date.toDate().toLocaleString().split(",")[0]}
          </p>
          <p>
            <strong>Customer Contact No:</strong>{" "}
            {customerdb.find((c) => c.email === customer.email)?.phoneNumber}
          </p>
          {/* <p>Customer Email: {customer.email}</p> */}
          {/* ...other customer details */}
          <div className="flex justify-end items-center gap-2">
            <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailsModal;
