import React, { useEffect, useState } from "react";
import { BsFillBagCheckFill } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import { Timestamp, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../../../utils/firebase";
import CustomerDetailsModal from "./customerdetailsmodel";

import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  where,
  getDocs,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";

const AssignmCust = () => {
  const [customer, setCustomer] = useState([]);
  const [job, setJob] = useState([]);
  const [user, setUser] = useAuthState(auth);
  const [technician, setTechnician] = useState([]);
  const [assignedPersonId, setAssignedPersonId] = useState("");
  const [selectedPersonId, setSelectedPersonId] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerdetails, setCustomerDetails] = useState(false);
  const [tech, setTchId] = useState(null);
  useEffect(() => {
    const q = query(collection(db, "customer"));

    // Fetch manager data from Firestore
    const unsubscribeCus = onSnapshot(q, (querySnapshot) => {
      let custArr = [];
      querySnapshot.forEach((doc) => {
        custArr.push({ ...doc.data(), id: doc.id });
      });
      setCustomer(custArr);
    });

    //

    const qjob = query(collection(db, "job"));

    // Fetch manager data from Firestore
    const unsubscribeJob = onSnapshot(qjob, (querySnapshot) => {
      let jobArr = [];
      querySnapshot.forEach((doc) => {
        jobArr.push({ ...doc.data(), id: doc.id });
      });
      setJob(jobArr);
    });

    // data from Firestore
    // technicians
    const qt = query(collection(db, "technician"));

    const unsubscribeTec = onSnapshot(qt, (querySnapshot) => {
      let techArr = [];
      querySnapshot.forEach((doc) => {
        techArr.push({ ...doc.data(), id: doc.id });
      });
      setTechnician(techArr);
    });

    return () => {
      unsubscribeCus();
      unsubscribeTec();
      unsubscribeJob();
      // unsubscribeAuth();
    };
  }, []);

  const email = technician.map((tec) => tec.email);
  console.log(email);

  const sendEmail = async (techEmail) => {
    // Query the technician collection to find the document with the matching email
    const q = query(
      collection(db, "technician"),
      where("email", "==", techEmail)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Get the first document (assuming email is unique)
      const docRef = querySnapshot.docs[0].ref;

      try {
        await updateDoc(docRef, {
          assignedNotification: "assigned",
          assignedDate: serverTimestamp(),
        });

        alert("Email sent successfully");
      } catch (error) {
        console.error("Error updating technician document:", error);
        alert("Failed to send email");
      }
    } else {
      alert("Technician with provided email not found");
    }
  };

  const handleAssignPerson = async (e, jobId, techEmail) => {
    e.preventDefault();

    // Check if a technician is selected
    if (assignedPersonId) {
      // Update the customer's document in Firebase with the selected technician
      await updateDoc(doc(db, "job", jobId), {
        assignedTo: assignedPersonId,
        assignedDate: serverTimestamp(),
      });

      // Clear the selected technician value
      setAssignedPersonId("");
      // sendEmail(techEmail);

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
    await updateDoc(doc(db, "job", customerId), {
      assignedTo: null, // Set it to null
      assignedDate: null, // Set the assignedDate to null
    });

    toast.success("Technician has been unassigned from the customer.", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
  };

  const handleCustomerClick = (customer) => {
    setSelectedCustomer(customer);
    setCustomerDetails(true);
  };

  return (
    <div className="bg-gray-100">
      <div className="p-6">
        <h3 className="font-medium text-xl capitalize">
          Assign Technician to available job manually.
        </h3>

        <div className="pt-4">
          <div className="w-full p-4 border h-[80vh] rounded-lg bg-white overflow-scroll">
            <div className="my-3 p-2 grid md:grid-cols-6 sm:grid-cols-3 grid-cols-2  justify-between cursor-pointer items-center">
              <span>Job type</span>
              <span className="sm:text-left text-right">Custmer Name</span>
              <span className="sm:text-left text-right">Customer Email</span>
              <span className="sm:text-left text-right">Assigned Date</span>

              <span className="hidden sm:grid">Technician Name</span>
              <span className="hidden sm:grid">Assign</span>
            </div>
            <ul>
              {job.map((job, id) => (
                <li
                  key={id}
                  className="bg-gray-50 text-sm hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-6 sm:grid-cols-3 grid-cols-2 items-center justify-between"
                >
                  <div className="flex">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <BsFillBagCheckFill className="text-purple-800" />
                    </div>
                    <div className="p-1">
                      <p className="text-gray-800 font-bold">{job.jobType} </p>
                      <p className="items-center text-red-500  text-xs ">
                        {job.selectedEquipment}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 sm:text-left text-right">
                    <span
                      onClick={() => handleCustomerClick(job)}
                      className="text-gray-800 text-md cursor-pointer"
                    >
                      {job.custName.split(" ")[0]}
                    </span>
                  </p>
                  <p className="text-gray-600 sm:text-left text-start overflow-hidden">
                    <span>{job.email.split(`com`)[0]}</span>
                  </p>
                  <p className="text-gray-600 sm:text-left text-right">
                    <span>
                      {job.assignedDate
                        ? job.assignedDate
                            .toDate()
                            .toLocaleString()
                            .split(",")[0]
                        : "Not Assigned"}
                    </span>
                  </p>

                  {/* date should be dynamic */}
                  <div className="hidden md:flex">
                    <select
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                      value={assignedPersonId[job.email]}
                      onChange={(e) => setAssignedPersonId(e.target.value)}
                    >
                      <option value="">Select Technician</option>
                      {technician
                        .filter((st) => st.status === "active") // Filter active technicians
                        .map((st) => (
                          <option key={st.name} value={st.email}>
                            {st.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <p className="text-gray-600 sm:text-left flex justify-start ">
                    <span>
                      <button
                        onClick={(e) =>
                          handleAssignPerson(e, job.id, job.email)
                        }
                        className="bg-blue-500 mr-2  p-2 text-white rounded-md hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
                      >
                        Assign
                      </button>

                      <button
                        onClick={(e) => handleUnassignPerson(e, job.id)}
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

          {customerdetails && selectedCustomer && (
            <CustomerDetailsModal
              customer={selectedCustomer}
              onClose={() => {
                setSelectedCustomer(null);
                setCustomerDetails(false);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignmCust;
