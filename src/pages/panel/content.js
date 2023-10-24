import Customers from "@/components/dashboard/admindashboard/customers";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../../utils/firebase";

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
const Content = () => {
  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const q = query(collection(db, "customer"));
  
      const unsubscribeCus = onSnapshot(q, (querySnapshot) => {
        let custArr = [];
        querySnapshot.forEach((doc) => {
          custArr.push({ ...doc.data(), id: doc.id });
        });
        setCustomer(custArr);
      });
  
      return () => {
        unsubscribeCus();
      };
    };
  
    fetchCustomers();
  }, []);

  return (
    <div>
      <Customers customer={customer} />
    </div>
  );
};

export default Content;
