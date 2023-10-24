import React, { useState, useEffect, useRef } from "react";
import { auth, db } from "../../../../utils/firebase";
import { query, collection, onSnapshot, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const RequestNewJob = () => {
  const [type, setType] = useState([{ type: "Repair" }, { type: "Service" }]);
  const [equipment, setEquipment] = useState([]);
  const [brand, setBrand] = useState([]);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [model, setModel] = useState([]);
  const formRef = useRef();

  useEffect(() => {
    const q = query(collection(db, "equipment"));
    // Fetch equipment data from Firestore
    const unsubscribeEq = onSnapshot(q, (querySnapshot) => {
      let equBArr = [];
      querySnapshot.forEach((doc) => {
        equBArr.push({ ...doc.data(), id: doc.id });
      });
      setEquipment(equBArr);
    });

    const qb = query(collection(db, "brand"));
    // Fetch equipment data from Firestore
    const unsubscribeBrand = onSnapshot(qb, (querySnapshot) => {
      let equBrandArr = [];
      querySnapshot.forEach((doc) => {
        equBrandArr.push({ ...doc.data(), id: doc.id });
      });
      setBrand(equBrandArr);
    });

    const qm = query(collection(db, "model"));
    // Fetch equipment data from Firestore
    const unsubscribeModel = onSnapshot(qm, (querySnapshot) => {
      let models = [];
      querySnapshot.forEach((doc) => {
        models.push({ ...doc.data(), id: doc.id });
      });
      setModel(models);
    });

    // Get the current signed-in user's email and contact
    const currentUser = auth.currentUser;
    if (currentUser) {
      setEmail(currentUser.email);
      setContact(currentUser.contact || ""); // Set a default value (empty string) if "contact" is undefined
      setName(currentUser.displayName || ""); // Set a default value (empty string) if "displayName" is undefined
      // Assuming you have other fields like "displayName" in your user document
    }

    return () => {
      unsubscribeEq();
      unsubscribeBrand();
      unsubscribeModel();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDate = new Date();

    // Get the form values
    const jobType = e.target.elements.type.value;
    const selectedEquipment = e.target.elements.equipment.value;
    const selectedBrand = e.target.elements.brand.value;
    const selectedModel = e.target.elements.model.value;
    const description = e.target.elements.description.value;
    const contact = e.target.elements.contact.value;

    // Add the job to Firestore
    await addDoc(collection(db, "job"), {
      custName: name,
      contact: contact,
      email: email,
      date: currentDate,
      jobType: jobType,
      selectedEquipment: selectedEquipment,
      selectedBrand: selectedBrand,
      selectedModel: selectedModel,
      description: description,
    });

    // Reset the form fields
    formRef.current.reset();

    // setEquipment("");

    toast.success("You request the job well ✅", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
  };

  return (
    <div className="m-6 ">
      <div className="mb-6">
        <h1 className="font-medium text-xl">Request new job</h1>
      </div>

      <div className="h-[80vh] overflow-scroll p-4">
      <form onSubmit={handleSubmit} ref={formRef}>
        {/* Type */}
        <div className="mb-6 ">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Type
          </label>
          <div className="mb-6">
            <select
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              name="type"
              id="type"
            >
              {type.map((type, key) => (
                <option key={key} value={type.type}>
                  {type.type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Select Equipment */}
        <div className="mb-6">
          <label
            htmlFor="equipment"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select Equipment
          </label>
          <div className="mb-6">
            <select
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              name="equipment"
              id="equipment"
            >
              {equipment.map((equ, key) => (
                <option key={key} value={equ.name}>
                  {equ.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Select Brand */}
        <div className="mb-6">
          <label
            htmlFor="brand"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select Brand
          </label>
          <select
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            name="brand"
            id="brand"
          >
            {brand.length > 0 &&
              brand.map((b, key) => (
                <option key={key} value={b.name}>
                  {b.name}
                </option>
              ))}
          </select>
        </div>

        <div className="mb-6">
          <label
            htmlFor="model"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select model
          </label>
          <select
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            name="model"
            id="model"
          >
            {model.length > 0 &&
              model.map((m, key) => (
                <option key={key} value={m.name}>
                  {m.name}
                </option>
              ))}
          </select>
        </div>

        {/* Enter Model */}
        {/* <div className="mb-6">
          <label
            htmlFor="model"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter Model
          </label>
          <input
            type="text"
            id="model"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div> */}

        {/*  contact number*/}
        <div className="mb-6">
          <label
            htmlFor="contact"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter contact number
          </label>
          <input
            type="number"
            id="contact"
            min={0}
            maxLength={10}
            // max={10}
            name="contact"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <textarea
            id="description"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Description"
          ></textarea>
        </div>

        <div className="flex items-start mt-6 mb-6"></div>
        <button
          type="submit"
          className="text-white bg-amber-500 hover:bg-amber-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Request
        </button>
      </form>
      </div>
    
    </div>
  );
};

export default RequestNewJob;
