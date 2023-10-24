import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { GrUserManager } from "react-icons/gr";
import { AiFillCloseCircle, AiOutlineArrowLeft } from "react-icons/ai";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { FaChartBar } from "react-icons/fa";
import { BiUser } from "react-icons/bi";
import { BsFilePerson, BsNewspaper, BsPerson } from "react-icons/bs";
import { MdFavorite, MdPayments } from "react-icons/md";
import Tooltiip from "../../../components/tootip/tooltip";
import Barchart from "@/components/dashboard/admindashboard/barchart";
import List from "@/components/dashboard/admindashboard/list";
import Topcard from "src/components/dashboard/admindashboard/topcard.js";
import List2 from "@/components/dashboard/admindashboard/card2";
import SalesReport from "@/components/dashboard/admindashboard/chart_sales_report";
import EquiReport from "@/components/dashboard/admindashboard/chart_equi_report";

import { auth, db } from "../../../../utils/firebase";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  where,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import EditNews from "@/components/dashboard/admindashboard/editnews";
import EmployeeStatus from "@/components/dashboard/admindashboard/employeesta";
import Customers from "@/components/dashboard/admindashboard/customers";
import Content4 from "../content4";
import EquiReport2 from "@/components/dashboard/admindashboard/equipment-report-2";
import EmployeeList from "@/components/dashboard/admindashboard/dashboardemplist";
import RequestedJobs from "@/components/dashboard/admindashboard/requestedjobs-dash";
import CostSetReport from "@/components/dashboard/admindashboard/wholeReport-dashboard";
import { toast } from "react-toastify";
// import { Tooltip } from "chart.js";
import FinalReport from "@/components/dashboard/admindashboard/wholereport-dashboard2";
import AddEquipment from "@/components/dashboard/admindashboard/equipment/addequioments";
import AddEquipmentModel from "@/components/dashboard/admindashboard/addequipmentModel";
import AddAnotherAdmin from "@/components/dashboard/admindashboard/add-another-admin";

const AdminDashboard = () => {
  const route = useRouter();

  const [user, loading] = useAuthState(auth);

  const [manager, setManager] = useState([]);
  const [technician, setTechnician] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [job, setJob] = useState([]);
  const [revenue, setRevenue] = useState([]);

  const [sidebar, setSidebar] = useState(false);
  const [news, setNews] = useState(false);
  const [finalReport, setFinalReport] = useState(false);
  const [addEquipments, setAddEquipments] = useState(false);
  const [openCustomer, setOpenCustomer] = useState(false);
  const [openNoEquipment, setOpenNoEquipment] = useState(false);
  const [openSales, setOpenSales] = useState(false);
  const [openEquipment, setOpenEquipment] = useState(false);
  const [report, setReport] = useState(false);
  const [addAdmin, setAddAdmin] = useState(false);

  const [equipment, setEquipment] = useState([]);
  const [totalTodayAmount, setTotalTodayAmount] = useState(0);
  const [totalTodayComAmt, setTotalTodayComAmt] = useState(0);
  const [users, setUsers] = useState(null);

  const [currentDate, setCurrentDate] = useState(new Date());
  let jobArrNew = [];

  const getData = async () => {
    if (loading) return;
    if (!user) return route.push("/");
  };

  console.log(user);
  useEffect(() => {
    getData();

    const q = query(collection(db, "manager"));
    const tecQ = query(collection(db, "technician"));
    const cusQ = query(collection(db, "customer"));
    const qj = query(collection(db, "job"));
    const qe = query(collection(db, "equipment"));
    const qr = query(collection(db, "revenue"));
    const userQuery = query(collection(db, "admin"));

    const unsubscribeUser = onSnapshot(userQuery, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });

      setUsers(users);
    });

    const unsubscribeManager = onSnapshot(q, (querySnapshot) => {
      let managerArr = [];
      querySnapshot.forEach((doc) => {
        managerArr.push({ ...doc.data(), id: doc.id });
      });
      managerArr.reverse();
      setManager(managerArr);
    });
    const unsubscribeRev = onSnapshot(qr, (querySnapshot) => {
      let revArr = [];
      querySnapshot.forEach((doc) => {
        revArr.push({ ...doc.data(), id: doc.id });
      });
      revArr.reverse();
      setRevenue(revArr);
    });

    const unsubscribeTechnician = onSnapshot(tecQ, (querySnapshot) => {
      let technicianArr = [];
      querySnapshot.forEach((doc) => {
        technicianArr.push({ ...doc.data(), id: doc.id });
      });
      technicianArr.reverse();
      setTechnician(technicianArr);
    });

    const unsubscribeJob = onSnapshot(qj, (querySnapshot) => {
      let jobArr = [];
      querySnapshot.forEach((doc) => {
        jobArr.push({ ...doc.data(), id: doc.id });
      });
      setJob(jobArr);
      jobArrNew = jobArr.slice(); // This creates a new array with the same elements as jobArr

      // Calculate the total today amount
      const today = new Date();
      const todayFormatted = today.toISOString().split("T")[0];

      let totalTodayAmount = 0;
      let totalTodayAmounCom = 0;
      jobArr.forEach((jobItem) => {
        if (jobItem.lastAmountDate && jobItem.lastAmountDate.toDate) {
          const jobDate = new Date(jobItem.lastAmountDate.toDate());
          const lastAmountDate = jobDate.toISOString().split("T")[0];
          console.log(jobItem.withProfit);
          console.log(jobItem.profit);

          if (lastAmountDate === todayFormatted) {
            totalTodayAmount += parseFloat(jobItem.withProfit); // returns the amount of today job
            totalTodayAmounCom += parseFloat(jobItem.profit);
          }
        }
      });

      setTotalTodayAmount(totalTodayAmount);
      setTotalTodayComAmt(totalTodayAmounCom);
      console.log(totalTodayAmounCom);
    });

    // cusomter collection read data
    const unsubscribeCustomer = onSnapshot(cusQ, (querySnapshot) => {
      let customerArr = [];
      querySnapshot.forEach((doc) => {
        customerArr.push({ ...doc.data(), id: doc.id });
      });
      customerArr.reverse();
      setCustomers(customerArr);
    });

    const unsubscribeEqui = onSnapshot(qe, (querySnapshot) => {
      let equipArr = [];
      querySnapshot.forEach((doc) => {
        equipArr.push({ ...doc.data(), id: doc.id });
      });

      setEquipment(equipArr);
    });

    // Cleanup function
    return () => {
      unsubscribeManager();
      unsubscribeTechnician();
      unsubscribeCustomer();
      unsubscribeJob();
      unsubscribeEqui();
      unsubscribeRev();
      unsubscribeUser();
    };
  }, [user, loading]);

  const handleMouseEnter = () => {
    setNews(true);
  };

  const handleMouseLeave = () => {
    setNews(false);
  };
  console.log(totalTodayAmount);

  return (
    <div className="w-full bg-gradient-to-r h-[92vh] from-blue-50 to-blue-100 overflow-scroll">
      <div className="relative flex justify-between p-4 font-semibold">
        <div>
          <p className="">{currentDate.toDateString()}</p>
        </div>
        {user?.displayName && (
          <h1 className="text-lg">
            Welcome back, {user.displayName.split(" ")[0]} 👋
          </h1>
        )}
      </div>

      <div className="grid lg:grid-cols-5 gap-5 p-4">
        <div className="lg:col-span-2  col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
          <div className="bg-teal-500 p-1 rounded-l-sm"></div>

          <div className="flex flex-col w-full justify-center  ">
            <div className="pl-2">
              <p className="text-2xl font-bold">
                Revenue Rs.
                {totalTodayAmount
                  ? new Intl.NumberFormat().format(totalTodayAmount.toFixed(2))
                  : 0}
              </p>
              {/* <p className="text-gray-600">
                Daily Revenue profit ~ Rs.
                {totalTodayAmount
                  ? new Intl.NumberFormat().format(totalTodayComAmt.toFixed(2))
                  : ""}
              </p> */}
              {/* <span></span> */}
            </div>
          </div>

          <Tooltiip content="You should add to the data base ">
            <button className="mr-1 bg-teal-600 flex justify-center items-center p-2 rounded-lg"></button>
          </Tooltiip>

          <p className="bg-teal-200 flex justify-center items-center p-2 rounded-lg">
            {" "}
            <span className="text-teal-700 text-lg">
              <FaChartBar />
            </span>
          </p>
        </div>

        <div
          onClick={() => setOpenCustomer(true)}
          className="bg-white flex justify-between w-full border p-4 rounded-lg hover:cursor-pointer hover:bg-gray-100"
        >
          <div className="bg-pink-500 p-1 rounded-l-sm"></div>
          <div className="flex flex-col w-full pl-1 pb-4 ">
            <div className="pl-2">
              <p className="text-2xl font-bold">{customers.length}</p>
              <p className="text-gray-600">Customers</p>
            </div>
          </div>
          <p className="bg-pink-200 flex justify-center items-center p-2 rounded-lg">
            {" "}
            <span className="text-pink-700 text-lg">
              <BsPerson />
            </span>
          </p>
        </div>
        <div className="bg-white flex justify-between w-full border p-4 rounded-lg  hover:cursor-pointer hover:bg-gray-50">
          <div className="bg-blue-500 p-1 rounded-l-sm"></div>
          <div className="flex flex-col w-full pl-1 pb-4 ">
            <div className="pl-2">
              <p className="text-2xl font-bold">{technician.length}</p>
              <p className="text-gray-600">Technicians</p>
            </div>
          </div>
          <p className="bg-blue-200 flex justify-center items-center p-2 rounded-lg">
            {" "}
            <span className="text-blue-700 text-lg">
              <BsPerson />
            </span>
          </p>
        </div>
        <div className="bg-white flex justify-between w-full border p-4 rounded-lg  hover:cursor-pointer hover:bg-gray-50">
          <div className="bg-purple-500 p-1 rounded-l-sm"></div>
          <div className="flex flex-col w-full pl-1 pb-4 ">
            <div className="pl-2">
              <p className="text-2xl font-bold">{manager.length}</p>
              <p className="text-gray-600">Managers</p>
            </div>
          </div>
          <p className="bg-purple-200 flex justify-center items-center p-2 rounded-lg">
            {" "}
            <span className="text-purple-700 text-lg">
              <GrUserManager />
            </span>
          </p>
        </div>
      </div>

      <div
        className={`hover:${news ? "your-hover-class" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Content */}
      </div>

      <div>
        {/* // rated technicians */}
        <List2 technician={technician} />
      </div>

      <div className="px-4 pb-4 grid md:grid-cols-3 grid-cols-1 gap-2 ">
        <Barchart revenue={revenue} />
        <List job={job} />
      </div>
      {/* employee status */}
      <div className="px-4 pb-4 grid md:grid-cols-3 grid-cols-1 gap-2">
        <RequestedJobs job={job} />
        <EmployeeList job={job} technician={technician} manager={manager} />
      </div>

      <div className=" grid lg:grid-cols-2 gap-5 p-4 ">
        <div
          onClick={() => setReport(!report)}
          className=" col-span-1  bg-white flex justify-between w-full border p-4 rounded-lg hover:bg-gray-50 hover:cursor-pointer"
        >
          <div className="bg-pink-600 p-1 rounded-l-sm"></div>

          <div className="flex flex-col w-full">
            <div className="pl-2">
              {/* <p className="text-2xl font-bold">Rs 7,743</p> */}
              <p className="text-gray-600 font-semibold">
                Set the Payable amount for the customers
              </p>
            </div>
          </div>
          <p className="bg-pink-200 flex justify-center items-center p-2 rounded-lg">
            {" "}
            <span className="text-pink-700 text-lg">
              <MdPayments />
            </span>
          </p>
        </div>

        <div
          onClick={() => setFinalReport(!finalReport)}
          className="lg:col-span-1 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg hover:bg-gray-50 hover:cursor-pointer"
        >
          <div className="bg-pink-600 p-1 rounded-l-sm"></div>

          <div className="flex flex-col w-full">
            <div className="pl-2">
              <p className="text-gray-600 font-semibold">Final Report</p>
            </div>
          </div>
          <p className="bg-pink-200 flex justify-center items-center p-2 rounded-lg">
            {" "}
            <span className="text-pink-700 text-lg">
              <MdPayments />
            </span>
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5 p-4">
        <div
          onClick={() => setOpenSales(true)}
          className="bg-white flex justify-between w-full border p-4 rounded-lg hover:cursor-pointer hover:bg-gray-50  
          "
        >
          <div className="bg-blue-500 p-1 rounded-l-sm"></div>
          <div className="flex flex-col w-full pl-1 pb-4 ">
            <div className="pl-2">
              <p className="text-lg font-bold">View Cost Report</p>
              <p className="text-gray-600">Sales</p>
            </div>
          </div>
          <p className="bg-blue-200 flex justify-center items-center p-2 rounded-lg">
            {" "}
            <span className="text-blue-700 text-lg">
              <HiOutlineDocumentReport />
            </span>
          </p>
        </div>

        <div
          onClick={() => setOpenEquipment(true)}
          className="bg-white flex justify-between w-full border p-4 rounded-lg hover:cursor-pointer hover:bg-gray-50"
        >
          <div className="bg-green-500 p-1 rounded-l-sm"></div>
          <div className="flex flex-col justify-center w-full pl-1 pb-4 ">
            <div className="pl-2">
              <p className="text-lg font-bold">View Equipment report</p>
              <p className="text-gray-600">Items</p>
            </div>
          </div>
          <p className="bg-green-200 flex justify-center items-center p-2 rounded-lg">
            {" "}
            <span className="text-green-700 text-lg">
              <HiOutlineDocumentReport />
            </span>
          </p>
        </div>

        <div
          onClick={() => setOpenNoEquipment(true)}
          className="bg-white flex justify-between w-full border p-4 rounded-lg hover:cursor-pointer hover:bg-gray-50"
        >
          <div className="bg-yellow-500 p-1 rounded-l-sm"></div>
          <div className="flex flex-col justify-center w-full pl-1 pb-4 ">
            <div className="pl-2">
              <p className="text-lg font-bold">View Number of Equipments</p>
              <p className="text-yellow-600">Items</p>
            </div>
          </div>
          <p className="bg-yellow-200 flex justify-center items-center p-2 rounded-lg">
            {" "}
            <span className="text-yellow-700 text-lg">
              <HiOutlineDocumentReport />
            </span>
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5 p-4 ">
        <div
          onClick={() => setNews(!news)}
          className="lg:col-span-1 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg"
        >
          <div className="bg-teal-600 p-1 rounded-l-sm">{""}</div>

          <div className="flex flex-col w-full ">
            <div className="pl-2">
              <p className="text-2xl font-bold">Edit news</p>
            </div>
          </div>
          <p className="bg-teal-200 flex justify-center items-center p-2 rounded-lg">
            {" "}
            <span className="text-teal-700 text-lg">
              <BsNewspaper />
            </span>
          </p>
        </div>

        <div
          onClick={() => setAddEquipments(true)}
          className="lg:col-span-1 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg"
        >
          <div className="bg-teal-600 p-1 rounded-l-sm">{""}</div>

          <div className="flex flex-col w-full ">
            <div className="pl-2">
              <p className="text-2xl font-bold">Add equipments</p>
            </div>
          </div>
          <p className="bg-teal-200 flex justify-center items-center p-2 rounded-lg">
            {" "}
            <span className="text-teal-700 text-lg">
              <BsNewspaper />
            </span>
          </p>
        </div>

        <div
          onClick={() => setAddAdmin(true)}
          className="lg:col-span-1 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg"
        >
          <div className="bg-teal-600 p-1 rounded-l-sm">{""}</div>

          <div className="flex flex-col w-full ">
            <div className="pl-2">
              <p className="text-2xl font-bold">Add an another admin</p>
            </div>
          </div>
          <p className="bg-teal-200 flex justify-center items-center p-2 rounded-lg">
            {" "}
            <span className="text-teal-700 text-lg">
              <BiUser />
            </span>
          </p>
        </div>
      </div>
      {addEquipments && (
        <div className="absolute  bg-black/30 backdrop-blur-sm  inset-0 top-0 flex justify-center items-center">
          <div className="flex flex-col gap-1">
            <AiFillCloseCircle
              className="text-black place-self-end text-xl  hover:cursor-pointer"
              onClick={() => setAddEquipments(false)}
            />
            <div className=" relative p-6 w-[100vh] h-[80vh] flex flex-col gap-2 bg-white border border-gray-200 rounded-lg shadow overflow-scroll ">
              <h1 className="  top-5 text-xl font-bold">Add equipments</h1>
              <AddEquipmentModel />
              {/* <AddEquipment/> */}
            </div>
          </div>
        </div>
      )}

      {openSales && (
        <div className="absolute duration-500 z-10 bg-black/30 backdrop-blur-sm  inset-0 top-0 flex justify-center items-center ">
          <div className="flex flex-col gap-1">
            <AiFillCloseCircle
              className="text-black place-self-end text-xl  hover:cursor-pointer"
              onClick={() => setOpenSales(false)}
            />

            <div className="p-6 w-[100vh] flex flex-col gap-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
              <SalesReport />

              <div className="flex justify-end items-center gap-2 ">
                <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {openEquipment && (
        <div className="absolute  bg-black/30 backdrop-blur-sm  inset-0 top-0 flex justify-center items-center ">
          <div className="flex flex-col gap-1">
            <AiFillCloseCircle
              className="text-black place-self-end text-xl  hover:cursor-pointer"
              onClick={() => setOpenEquipment(false)}
            />

            <div className="p-6 w-[100vh] flex flex-col gap-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
              <EquiReport />

              <div className="flex justify-end items-center gap-2 ">
                <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {openNoEquipment && (
        <div className="absolute  bg-black/30 backdrop-blur-sm  inset-0 top-0 flex justify-center items-center ">
          <div className="flex flex-col gap-1">
            <AiFillCloseCircle
              className="text-black place-self-end text-xl  hover:cursor-pointer"
              onClick={() => setOpenNoEquipment(false)}
            />

            <div className="p-6 w-[100vh] flex flex-col gap-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
              <EquiReport2 job={job} equipment={equipment} />

              <div className="flex justify-end items-center gap-2 ">
                <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {openCustomer && (
        <div className="absolute  bg-black/30 backdrop-blur-sm  inset-0 top-0 flex justify-center items-center">
          <div className="flex flex-col gap-1">
            <AiFillCloseCircle
              className="text-black place-self-end text-xl  hover:cursor-pointer"
              onClick={() => setOpenCustomer(false)}
            />

            <div className="p-3 w-[130vh] h-[80vh] flex flex-col gap-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
              <div className="flex justify-between p-4 font-semibold">
                {/* <h2 className="font-medium text-xl">Customers</h2> */}
              </div>

              <Customers />
              <div className="flex justify-end items-center gap-2 ">
                <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {report && (
        <div className="absolute  bg-black/30 h-screen backdrop-blur-sm  inset-0 top-0 flex justify-center items-center ">
          <div className="flex flex-col gap-1">
            <AiFillCloseCircle
              className="text-black place-self-end text-xl  hover:cursor-pointer"
              onClick={() => setReport(false)}
            />

            <div className=" w-[120vh] h-[95vh] flex flex-col gap-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
              <CostSetReport job={job} />

              <div className="flex justify-end items-center gap-2 ">
                <button
                  onClick={() => setReport(false)}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {finalReport && (
        <div className="absolute  bg-black/30 backdrop-blur-sm h-screen inset-0 top-0 flex justify-center items-center ">
          <div className="flex flex-col gap-1">
            <AiFillCloseCircle
              className="text-black place-self-end text-xl  hover:cursor-pointer"
              onClick={() => setFinalReport(false)}
            />

            <div className="p-3 w-[150vh] flex flex-col gap-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
              <FinalReport job={job} jobArrNew={jobArrNew} />

              <div className="flex justify-end items-center gap-2 ">
                <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {news && (
        <div className="absolute  bg-black/30 backdrop-blur-sm  inset-0 top-0 flex justify-center items-center">
          <div className="flex flex-col gap-1">
            <AiFillCloseCircle
              className="text-black place-self-end text-xl  hover:cursor-pointer"
              onClick={() => setNews(false)}
            />
            <div className=" relative p-6 w-[100vh] h-[80vh] flex flex-col gap-2 bg-white border border-gray-200 rounded-lg shadow overflow-scroll ">
              <h1 className="  top-5 text-xl font-bold">
                Upload images to preview to the others
              </h1>
              <EditNews />
            </div>
          </div>
        </div>
      )}

      {addAdmin && (
        <div className="absolute  bg-black/30 backdrop-blur-sm  inset-0 top-0 flex justify-center items-center">
          <div className="flex flex-col gap-1">
            <AiFillCloseCircle
              className="text-black place-self-end text-xl  hover:cursor-pointer"
              onClick={() => setAddAdmin(false)}
            />
            <div className=" relative p-6 w-[100vh] h-[80vh] flex flex-col gap-2 bg-white border border-gray-200 rounded-lg shadow overflow-scroll ">
              <AddAnotherAdmin user={users} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
