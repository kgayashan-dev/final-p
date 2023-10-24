import Viewrate from "@/components/dashboard/admindashboard/viewtech-ratings";
import Reac, { useEffect, useState } from "react";
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
const Content8 = () => {
  const [technician, setTechnician] = useState([]);

  const fetchData = () => {
    const qt = query(collection(db, "technician"));

    const unsubscribeTec = onSnapshot(qt, (querySnapshot) => {
      let techArr = [];
      querySnapshot.forEach((doc) => {
        techArr.push({ ...doc.data(), id: doc.id });
      });
      setTechnician(techArr);
    });

    return () => {
      unsubscribeTec();
    };
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Viewrate technician={technician} />
    </div>
  );
};

export default Content8;
