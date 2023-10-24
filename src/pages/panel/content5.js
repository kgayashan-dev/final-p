import React, { useEffect, useState } from 'react'
import ManagerTech from 'src/components/dashboard/admindashboard/managers_tech.js'

import { auth, db } from "../../../utils/firebase";

// import { auth, db } from "../../../../utils/firebase";

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

const Content5 = () => {

  const [manager, setManager] = useState([]);
  const [technician, setTechnician] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "manager"));

    // Fetch manager data from Firestore
    const unsubscribeMan = onSnapshot(q, (querySnapshot) => {
      let managerArr = [];
      querySnapshot.forEach((doc) => {
        managerArr.push({ ...doc.data(), id: doc.id });
      });
      setManager(managerArr);
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
      unsubscribeMan();
      unsubscribeTec();
    };
  }, []);
  return (
    <div>
      <ManagerTech manager={manager} technician= {technician}/>
      </div>
  )
}

export default Content5