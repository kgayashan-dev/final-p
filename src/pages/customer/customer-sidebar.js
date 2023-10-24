import React, { useEffect, useState } from "react";
import Link from "next/link";

import {
  MdDashboard,
  MdIncompleteCircle,
  MdOutlineEditCalendar,
} from "react-icons/md";
import {
  AiOutlineUser,
  AiOutlineDotChart,
  AiOutlineMail,
} from "react-icons/ai";
import { GrUserManager } from "react-icons/gr";
import { RiFeedbackLine, RiTodoLine } from "react-icons/ri";
import { BiShoppingBag } from "react-icons/bi";
import { FiUserPlus } from "react-icons/fi";
import { TbHeartRateMonitor } from "react-icons/tb";
import { FaSignOutAlt } from "react-icons/fa";

import Router, { useRouter } from "next/router";
import { auth, db } from "../../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

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
// import Customers from "./admindashboard/customers";

const CustomerSidebar = ({ onMenuItemClick }) => {
  // ... Your existing Sidebar component code ...

  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    // getData();

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
  }, []);

  return (
    <div className="w-72 pt-3 h-[92vh] bg-slate-50 capitalize shadow overflow-scroll  border-r">
      <div className="items-center">
        <ul className="space-y-2 font-medium flex flex-col gap-1">
          <li>
            <Link href={"/customer/dashboard?content=tech-job-details"}>
              <span className="flex items-center p-4  text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <AiOutlineUser className="text-2xl" />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Technician's Job details
                </span>
              </span>
            </Link>
          </li>

          {/* customer new job*/}
          <li>
            <Link href="/customer/dashboard?content=request-new-job">
              <span className="flex items-center p-4  text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <MdOutlineEditCalendar className="text-2xl" />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Request New Job
                </span>
              </span>
            </Link>
          </li>

          {/* for customer his jobs */}
          <li>
            <Link href="/customer/dashboard?content=my-jobs">
              <span className="flex items-center p-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <MdOutlineEditCalendar className="text-2xl" />
                <span className="flex-1 ml-3 whitespace-nowrap">My Jobs</span>
              </span>
            </Link>
          </li>

          {/* sign out for all users  */}
          <li className="  flex items-center justify-center">
            <button
              onClick={() => auth.signOut()}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FaSignOutAlt className="text-2xl" />
              <span className="flex-1 ml-3 whitespace-nowrap">Sign Out</span>
            </button>
          </li>
        </ul>

        {/* Sign Out */}
      </div>
    </div>
  );
};

export default CustomerSidebar;
