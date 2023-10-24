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
import Customers from "./admindashboard/customers";

const Sidebar = ({ onMenuItemClick }) => {
  // ... Your existing Sidebar component code ...

  const [feedback, setFeedback] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [admin, setAdmin] = useState([]);

  const [manager, setManager] = useState([]);
  const [technician, setTechnician] = useState([]);
  const [user, loading] = useAuthState(auth);

  // get feedbacks

  useEffect(() => {
    const unsubscribeFed = onSnapshot(
      collection(db, "userfeedback"),
      (querySnapshot) => {
        let userFBArr = [];
        querySnapshot.forEach((doc) => {
          userFBArr.push({ ...doc.data(), id: doc.id });
        });
        setFeedback(userFBArr);
      }
    );

    return () => {
      unsubscribeFed();
    };
  }, []);

  // console.log(feedback);
  const handleClick = (menuItem) => {
    onMenuItemClick(menuItem);
    // Redirect to the corresponding content page
  };

  // see if user is logged
  const getData = async () => {
    if (loading) return;
    if (!user) return Router.push("/");
  };

  // getUser data
  useEffect(() => {
    getData();

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

  const [showMenu, setShowMenu] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCust, setIsCust] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [isTechnician, setIsTechnician] = useState(false);

  return (
    <div className="w-96 pt-3 h-[92vh] bg-slate-50 capitalize shadow overflow-scroll  border-r">
      <div>
        <ul className="space-y-2 font-medium flex flex-col gap-1">
          <li>
            <Link href={`/panel/admin/admin-dashboard`}>
              <p className="flex items-center p-2 text-white rounded  hover:text-gray-100 bg-amber-500">
                <MdDashboard className="text-2xl" />
                <span className="ml-3">Dashboard</span>
              </p>
            </Link>
          </li>

          <li>
            <Link href="/panel/content">
              <p className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <AiOutlineUser className="text-2xl" />
                <span className="flex-1 ml-3 whitespace-nowrap">Customers</span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  {customer.length}
                </span>
              </p>
            </Link>
          </li>

          <li>
            <Link href="/panel/content5">
              <p className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <GrUserManager className="text-2xl" />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Managers and Technicians
                </span>
              </p>
            </Link>
          </li>

          <li>
            <Link href="/panel/content6">
              <p className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <RiFeedbackLine className="text-2xl" />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Customer Feedbacks
                </span>

                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  {feedback.length}
                </span>
              </p>
            </Link>
          </li>
          <li>
            <Link href="/panel/content21">
              <p className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <FiUserPlus className="text-2xl" />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Add Manager
                </span>
              </p>
            </Link>
          </li>

          <li>
            <Link href="/panel/content7">
              <p className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <AiOutlineMail className="text-2xl" />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Send email
                </span>
              </p>
            </Link>
          </li>

          <li>
            <Link href="/panel/content8">
              <p className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <TbHeartRateMonitor className="text-2xl" />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  View ratings
                </span>
              </p>
            </Link>
          </li>

          {/* Manager */}

          <li>
            <Link href="/panel/content16">
              <p className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <BiShoppingBag className="text-2xl" />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Job Summary
                </span>
              </p>
            </Link>
          </li>
          <li>
            <Link href="/panel/content3">
              <p className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <FiUserPlus className="text-2xl" />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Add technicians
                </span>
              </p>
            </Link>
          </li>

          <li>
            <Link href={"/panel/content13"}>
              <p className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <AiOutlineUser className="text-2xl" />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Technician's Job details
                </span>
              </p>
            </Link>
          </li>

          {/* view technician for all users */}
          <li>
            <Link href="/panel/content14">
              <p className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <GrUserManager className="text-2xl" />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Technicians
                </span>
              </p>
            </Link>
          </li>
          {/* Customer Feedbacks */}

          {/* technician job details  */}

          {/* View Ratings */}

          {/* View completed task */}
          <li>
            <Link href="/panel/content9">
              <p className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <MdIncompleteCircle className="text-2xl" />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Technician's Jobs
                </span>
              </p>
            </Link>
          </li>

          <li>
            <Link href="/panel/content10">
              <p className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <FiUserPlus className="text-2xl" />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Assign Technicin to job
                </span>
              </p>
            </Link>
          </li>

          {/* Todo list for technician */}
          <li>
            <Link href="/panel/content15">
              <p className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <RiTodoLine className="text-2xl" />
                <span className="flex-1 ml-3 whitespace-nowrap">Todo List</span>
              </p>
            </Link>
          </li>

          {/* customer new job*/}
          <li>
            <Link href="/panel/content17">
              <p className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <MdOutlineEditCalendar className="text-2xl" />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Request New Job
                </span>
              </p>
            </Link>
          </li>

          {/* for customer his jobs */}
          <li>
            <Link href="/panel/content18">
              <p className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <MdOutlineEditCalendar className="text-2xl" />
                <span className="flex-1 ml-3 whitespace-nowrap">My Jobs</span>
              </p>
            </Link>
          </li>

          {/* technician */}
          <li>
            <Link href="/panel/content13">
              <p className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <BiShoppingBag className="text-2xl" />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  {" "}
                  View Jobs
                </span>
              </p>
            </Link>
          </li>
          <li>
            <Link href="/panel/content20">
              <p className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <BiShoppingBag className="text-2xl" />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  {" "}
                  Employee status
                </span>
              </p>
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

export default Sidebar;
