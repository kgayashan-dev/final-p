import React, { useEffect, useState } from "react";
import { FaPersonBooth } from "react-icons/fa";
import CustomerDetailsModal from "./customerdetailsmodel"; // Assuming you have this component
import { db } from "../../../../utils/firebase";
import { query, collection, onSnapshot } from "firebase/firestore";

const EmployeeList = ({ job, technician, manager }) => {
  const [collectionMan, setcollectionMan] = useState("");
  const [collectionTech, setcollectionTech] = useState("");

  useEffect(() => {
    const fetchTableName = () => {
      const collectionMan = collection(db, "manager").id;
      setcollectionMan(collectionMan);
      const collectionTech = collection(db, "technician").id;
      setcollectionTech(collectionTech);
    };

    fetchTableName();
  }, []);

  return (
    <div className="w-full col-span-2 relative border rounded-lg bg-white p-4">
      <h1>Employee Status</h1>

      <div className="lg:h-[60vh] h-[50vh] overflow-scroll mt-3">
        <div className="p-2 bg-gray-100 ">
          <div className="w-full p-4 border rounded-lg bg-white overflow-y-auto">
            <div className="my-3 p-2 grid md:grid-cols-3 sm:grid-cols-3 grid-cols-2  justify-between cursor-pointer items-center">
              <span> Name</span>
              <span className="sm:text-left text-right ">Type</span>
              <span className="hidden md:grid">Status </span>
            
            </div>
            <div>
              <ul>
                {manager.map((man, key) => (
                  <li
                    key={key}
                    className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 text-sm p-1 grid md:grid-cols-3 sm:grid-cols-3 grid-cols-2 items-center justify-between"
                  >
                    <div className="flex">
                      <div className="bg-purple-100 p-3 rounded-lg">
                        <FaPersonBooth className="text-purple-800" />
                      </div>

                      <div className="flex justify-center items-center pl-2">
                        <p className="text-gray-800 font-bold ">{man.name}</p>
                      </div>
                    </div>
                    <div>
                      <p>{collectionMan}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 sm:text-left text-right">
                        <span
                          className={
                            man.status === "active"
                              ? `bg-green-200 p-2 rounded-lg`
                              : man.status === "inactive"
                              ? `bg-red-200 p-2 rounded-lg`
                              : ""
                          }
                        >
                          {man.status}
                        </span>
                      </p>
                    </div>

                    {/* date should be dynamic */}
                    {/* <p className="hidden md:flex">
                    <>
                      {new Date(
                        man.timestamp.seconds * 1000
                      ).toLocaleDateString()}
                    </>
                  </p> */}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gray-100  capitalize">
          <div className="p-2">
            <div className="w-full p-4 border rounded-lg bg-white overflow-y-auto">
              <div className="my-3 p-2 grid md:grid-cols-3 sm:grid-cols-3 grid-cols-2  justify-between cursor-pointer items-center">
                <span> Name</span>
                <span className="sm:text-left text-right ">Type</span>
                <span className="hidden md:grid">Status </span>
                {/* <span className="hidden sm:grid">Upadated date</span> */}
              </div>

              <div>
                <ul>
                  {technician.map((tec, key) => (
                    <li
                      key={key}
                      className="bg-gray-50 hover:bg-gray-100 text-sm p-1 rounded-lg my-3  grid md:grid-cols-3 sm:grid-cols-3 grid-cols-2 items-center justify-between"
                    >
                      <div className="flex">
                        <div className="bg-purple-100 p-3 rounded-lg">
                          <FaPersonBooth className="text-purple-800" />
                        </div>

                        <div className="flex justify-center items-center pl-2">
                          <p className="text-gray-800 font-bold ">{tec.name}</p>
                        </div>
                      </div>
                      <div>
                        <p>{collectionTech}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 sm:text-left text-right">
                          <span
                            className={
                              tec.status === "active"
                                ? `bg-green-200 p-2 rounded-lg`
                                : tec.status === "inactive"
                                ? `bg-red-200 p-2 rounded-lg`
                                : ""
                            }
                          >
                            {tec.status}
                          </span>
                        </p>
                      </div>

                      {/* date should be dynamic */}
                      {/* <p className="hidden md:flex">
                      <>
                        {new Date(tec.date.seconds * 1000).toLocaleDateString()}
                      </>
                    </p> */}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
