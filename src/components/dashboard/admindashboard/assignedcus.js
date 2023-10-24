import React, { useEffect, useState } from "react";
import { BsPersonPlus } from "react-icons/bs";
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

const AssignmCust = () => {
  const [customer, setCustomer] = useState([]);
  const [technician, setTechnician] = useState([]);
  const [assignedPersonId, setAssignedPersonId] = useState("");
  const [selectedPersonId, setSelectedPersonId] = useState("");

  useEffect(() => {
    const qCustomer = query(collection(db, "customer"));
    const unsubscribeCus = onSnapshot(qCustomer, (querySnapshot) => {
      let custArr = [];
      querySnapshot.forEach((doc) => {
        custArr.push({ ...doc.data(), id: doc.id });
      });
      setCustomer(custArr);
    });
  
    return () => {
      unsubscribeCus();
    };
  }, []);
  
  useEffect(() => {
    const qTechnician = query(collection(db, "technician"));
    const unsubscribeTec = onSnapshot(qTechnician, (querySnapshot) => {
      let techArr = [];
      querySnapshot.forEach((doc) => {
        techArr.push({ ...doc.data(), id: doc.id });
      });
      setTechnician(techArr);
    });
  
    return () => {
      unsubscribeTec();
    };
  }, []);
  

  const handleAssignPerson = async (e, customerId) => {
    e.preventDefault();

    // Check if a technician is selected
    if (assignedPersonId) {
      // Update the customer's document in Firebase with the selected technician
      await updateDoc(doc(db, "customer", customerId), {
        assignedTo: assignedPersonId,
        assignedDate: serverTimestamp(), 
      });

      // Clear the selected technician value
      setAssignedPersonId("");
      toast.success("You have assigned technician to customer now.", {
        position: toast.POSITION.TOP_CENTER,
        
        autoClose: 1500,
      });
    } else {
      toast.warning("Please select a technician first.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
    }
  };

  //unassign
  const handleUnassignPerson = async (e, customerId) => {
    e.preventDefault();
  
    // Update the customer's document in Firebase to remove the assigned value
    await updateDoc(doc(db, "customer", customerId), {
      assignedTo: null, // Set it to null 
      assignedDate: null, // Set the assignedDate to null
    });
  
    toast.success("Technician has been unassigned from the customer.", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
  };

  return (
    <div className="bg-gray-100">
      <div className="p-6">
        <h3 className="font-medium text-xl">
          Assign Technician to Customer manually
        </h3>

        <div className="pt-4">
          <div className="w-full p-4 border h-[80vh] rounded-lg bg-white overflow-scroll">
            <div className="my-3 p-2 grid md:grid-cols-6 sm:grid-cols-3 grid-cols-2  justify-between cursor-pointer items-center">
              <span>Customer Name</span>
              <span className="sm:text-left text-right">Contact No</span>
              <span className="sm:text-left text-right">Customer Email</span>
              <span className="sm:text-left text-right">Assigned Date</span>

              <span className="hidden sm:grid">Technician Name</span>
              <span className="hidden sm:grid">Assign</span>
            </div>
            <ul>
              {customer.map((cust) => (
                <li
                  key={cust.id}
                  className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-6 sm:grid-cols-3 grid-cols-2 items-center justify-between"
                >
                  <div className="flex">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <BsPersonPlus className="text-purple-800" />
                    </div>
                    <div>
                      <p className="text-gray-800 font-bold">{cust.name}</p>
                      <p className="text-gray-800 text-xs">{cust.contact}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 sm:text-left text-right">
                    <span>{cust.contact}</span>
                  </p>
                  <p className="text-gray-600 sm:text-left text-right">
                    <span>{cust.email}</span>
                  </p>
                  <p className="text-gray-600 sm:text-left text-right">
                    <span>{cust.assignedDate ? cust.assignedDate.toDate().toLocaleString() : "Not Assigned"}</span>
                  </p>

                  {/* date should be dynamic */}
                  <div className="hidden md:flex">
                    <select
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                      value={assignedPersonId[cust.name]}
                      onChange={(e) => setAssignedPersonId(e.target.value)}
                    >
                      <option value="">Select Technician</option>
                      {technician
                        .filter((st) => st.status === "active") // Filter active technicians
                        .map((st) => (
                          <option key={st.name} value={st.name}>
                            {st.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <p className="text-gray-600 sm:text-left flex justify-start ">
                    <span>
                      <button
                        onClick={(e) => handleAssignPerson(e, cust.id)}
                        className="bg-blue-500 mr-2  p-2 text-white rounded-md hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
                      >
                        Assign
                      </button>

                      <button
                        onClick={(e) => handleUnassignPerson(e, cust.id)}
                        className="bg-blue-500  p-2 text-white rounded-md hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
                      >
                        Unassign
                      </button>
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmCust;
