import React, { useState, useEffect } from "react";

import { auth, db } from "../../../../../utils/firebase";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import Setmodel from "./setmodel";
import { toast } from "react-toastify";

const AddModel = () => {
  const [equipment, setEquipment] = useState([]);
  const [input, setInput] = useState(null);
  const [brand, setBrand] = useState([]);

  const deleteBrand = async (id) => {
    await deleteDoc(doc(db, "brand", id));
    toast.error("Your brand is deleted", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
  };

  useEffect(() => {
    const q = query(collection(db, "brand"));

    // Fetch manager data from Firestore
    const unsubscribeBrand = onSnapshot(q, (querySnapshot) => {
      let brandArr = [];
      querySnapshot.forEach((doc) => {
        brandArr.push({ ...doc.data(), id: doc.id });
      });
      setBrand(brandArr);
    });
    return () => {
      unsubscribeBrand();
    };
  }, []);
  // adding
  const addBrand = async (e) => {
    e.preventDefault();
    if (input === "") {
      alert("Please enter");
      toast.warning("Your brand field is empty 😕", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
    }
    await addDoc(collection(db, "brand"), {
      name: input,
      time: serverTimestamp(),
    });
    setInput("");

    toast.success("Your brand put well ✅", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
  };

  return (
    <div className="">
      <div className="bg-gray-100  capitalize">
        <div className="p-4">
          <div className="w-full p-4 border rounded-lg bg-white ">
            <div className=" border rounded-lg  p-4 ">
              <form onSubmit={addBrand}>
                <div className="mb-6 flex justify-end items-center">
                  <input
                    type="text"
                    id="brandName"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="Enter type of brands here.. "
                    required
                  />

                  <button
                    type="submit"
                    className="text-white   bg-amber-500 hover:bg-amber-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Add
                  </button>
                </div>
              </form>

              <div className="capitalize h-[50vh] overflow-scroll">
                {brand.map(
                  (
                    branditem // Renamed to  to represent individual
                  ) => (
                    <Setmodel
                      key={branditem.id}
                      brand={branditem} // Pass the individual
                      deleteBrand={deleteBrand}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddModel;
