import Link from "next/link";
import Reac, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { FiSettings } from "react-icons/fi";
import Tooltip from "@/components/tootip/tooltip";
import Sidebar from "@/components/dashboard/sidebar";


import { useAuthState } from "react-firebase-hooks/auth";
// import auth from 'firebase';
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
import { toast } from "react-toastify";

const Dashboard = ({children}) => {
  const router = useRouter();

  const [selectedMenuItem, setSelectedMenuItem] = useState("content1");

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };



  const [job, setJobs] = useState([]);
 
  useEffect(() => {
    const qjob = query(collection(db, "job")); // Assuming 'db' is your Firestore database reference

    const unsubscribe = onSnapshot(qjob, (querySnapshot) => {
      const jobArr = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setJobs(jobArr);
    });

    // Unsubscribe from the snapshot listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const [isAdmin, setIsAdmin] = useState(false);
  const [isCust, setIsCust] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [isTech, setIsTech] = useState(false);

  useEffect(() => {
    admin.map((admin, key) => {
      if (admin.email === user.email) {
        setIsAdmin(true);
      }
    });

    customer.map((cust, key) => {
      if (cust.email === user.email) {
        setIsCust(true);
      }
    });
    manager.map((man, key) => {
      if (man.email === user.email) {
        setIsManager(true);
      }
    });

    technician.map((tec, key) => {
      if (tec.email === user.email) {
        setIsTech(true);
      }
    });
  }, []);

 
  // const activeMenu = true;

  const [customer, setCustomer] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [manager, setManager] = useState([]);
  const [technician, setTechnician] = useState([]);
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    const q = query(collection(db, "manager"));
    const tecQ = query(collection(db, "technician"));
    const cusQ = query(collection(db, "customer"));
    const adQ = query(collection(db, "admin"));

    const unsubscribeManager = onSnapshot(q, (querySnapshot) => {
      let managerArr = [];
      querySnapshot.forEach((doc) => {
        managerArr.push({ ...doc.data(), id: doc.id });
      });
      managerArr.reverse();
      setManager(managerArr);
    });

    const unsubscribeTechnician = onSnapshot(tecQ, (querySnapshot) => {
      let technicianArr = [];
      querySnapshot.forEach((doc) => {
        technicianArr.push({ ...doc.data(), id: doc.id });
      });

      setTechnician(technicianArr);
    });
    // cusomter collection read data
    const unsubscribeCustomer = onSnapshot(cusQ, (querySnapshot) => {
      let customerArr = [];
      querySnapshot.forEach((doc) => {
        customerArr.push({ ...doc.data(), id: doc.id });
      });
      customerArr.reverse();
      setCustomer(customerArr);
    });

    const unsubscribeAdmin = onSnapshot(adQ, (querySnapshot) => {
      let adminArr = [];
      querySnapshot.forEach((doc) => {
        adminArr.push({ ...doc.data(), id: doc.id });
      });

      setAdmin(adminArr);
    });

    // Cleanup function
    return () => {
      unsubscribeManager();
      unsubscribeTechnician();
      unsubscribeCustomer();
      unsubscribeAdmin();
    };
  }, [user, loading]);

  return (
    <div className="flex ">
      <Sidebar
        onMenuItemClick={handleMenuItemClick}
        isAdmin={isAdmin}
        isCust={isCust}
        isManager={isManager}
        isTech={isTech}
        className=""
      />

     
    
    </div>
  );
};

export default Dashboard;
