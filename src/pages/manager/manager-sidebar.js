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

const Sidebar = ({ onMenuItemClick }) => {
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
        <ul className="space-y-5 font-medium flex flex-col gap-1">
          <li>
            <Link href="/manager/dashboard?content=customer">
              <span className="flex items-center p-3 rounded-lg bg-amber-400 text-white hover:bg-amber-400 dark:hover:bg-gray-700">
                <AiOutlineUser className="text-2xl" />
                <span className="flex-1 ml-3 whitespace-nowra bgamb">
                  Customers
                </span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  {customer.length}
                </span>
              </span>
            </Link>
          </li>

          <li>
            <Link href="/manager/dashboard?content=customer-feedbacks">
              <span className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <RiFeedbackLine className="text-2xl" />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Customer Feedbacks
                </span>
              </span>
            </Link>
          </li>

          <li>
            <Link href="/manager/dashboard?content=add-technician">
              <span className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <FiUserPlus className="text-2xl" />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Add technicians
                </span>
              </span>
            </Link>
          </li>

          <li>
            <Link href="/manager/dashboard?content=send-email">
              <span className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <AiOutlineMail className="text-2xl" />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Send email
                </span>
              </span>
            </Link>
          </li>

          <li>
            <Link href="/manager/dashboard?content=view-rate">
              <span className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <TbHeartRateMonitor className="text-2xl" />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  View ratings
                </span>
              </span>
            </Link>
          </li>

          {/* Manager */}

          <li>
            <Link href="/manager/dashboard?content=job-summary">
              <span className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <BiShoppingBag className="text-2xl" />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Job Summary
                </span>
              </span>
            </Link>
          </li>

          <li>
            <Link href={"/manager/dashboard?content=tech-cost-report"}>
              <span className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <AiOutlineUser className="text-2xl" />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Preview cost report
                </span>
              </span>
            </Link>
          </li>

          <li>
            <Link href="/manager/dashboard?content=assign-tech-job">
              <span className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <FiUserPlus className="text-2xl" />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Assign Technicin to job
                </span>
              </span>
            </Link>
          </li>

          <li>
            <Link href="/manager/dashboard?content=employee-status">
              <span className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <BiShoppingBag className="text-2xl" />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  {" "}
                  Employee status
                </span>
              </span>
            </Link>
          </li>
          {/* sign out for all users  */}
          <li className="  flex items-center justify-center">
            <button
              onClick={() => auth.signOut()}
              className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
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

export default Sidebar;
