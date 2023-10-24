import React, { useState, useEffect } from "react";
import { MdOutlinePersonOutline } from "react-icons/md";
import { RxDotsVertical } from "react-icons/rx";
import { Timestamp } from "firebase/firestore";
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
const Customers = () => {
  const [customer, setCustomer] = useState([]);

  const fetchData = () => {
    const cusQ = query(collection(db, "customer"));

    // cusomter collection read data
    const unsubscribeCustomer = onSnapshot(cusQ, (querySnapshot) => {
      let customerArr = [];
      querySnapshot.forEach((doc) => {
        customerArr.push({ ...doc.data(), id: doc.id });
      });
      customerArr.reverse();
      setCustomer(customerArr);
    });
    // Cleanup function
    return () => {
      unsubscribeCustomer();
    };
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="bg-gray-100 h-[92vh] overflow-scroll">
      <div className="flex justify-between p-4 font-semibold">
        <h2 className="font-medium text-xl">Customers</h2>
      </div>

      <div className="p-4">
        <div className="w-full m-auto p-4 h-[80vh] border rounded-lg bg-white overflow-scroll">
          <div className="my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer ">
            <span>Name</span>
            <span className="sm:text-left text-right">Email</span>
            <span className="hidden md:grid">Contact</span>
            <span className="hidden sm:grid"> Signed in date</span>
          </div>
          {customer.map((cust, key) => (
            <div key={key} className="">
              <ul className="">
                <li className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer ">
                  <div className="flex items-center">
                    <div className="p-0.5 w-10 rounded-full bg-green-400">
                      <img
                        src={cust.profilePictureUrl}
                        alt=""
                        className="w-10 rounded-full"
                      />
                    </div>
                    <p className="pl-4">{cust.username}</p>
                  </div>
                  <p className="text-gray-600 sm:text-left text-right">
                    {cust.email}
                  </p>
                  <p className="hidden md:flex">
                    {cust.phoneNumber ? cust.phoneNumber : "Not available"}
                  </p>

                  <div className="sm:flex  hidden justify-between items-center ">
                    <p className="hidden md:flex">
                      {cust.timestamp ? (
                        <> {cust.timestamp.toDate().toLocaleString()} </>
                      ) : (
                        "_"
                      )}
                    </p>
                    <RxDotsVertical />
                  </div>
                </li>
                {/* ))} */}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Customers;
