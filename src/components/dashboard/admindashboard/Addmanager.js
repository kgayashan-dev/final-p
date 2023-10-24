import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../../utils/firebase";
import { useFormik } from "formik";
import * as Yup from "yup";

const Addmanager = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      contact: "",
      message: "",
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .max(20, "Name must be at least 20 characters.")
        .required("Name is required."),

      email: Yup.string()
        .email("Invalid email address.")
        .required("Email is required."),

      contact: Yup.string()
        .matches(/^\d{10}$/, "Invalid contact number.")
        .required("Contact number is required."),
    }),

    onSubmit: async (values) => {
      try {
        await addDoc(collection(db, "manager"), {
          name: values.name,
          contact: values.contact,
          email: values.email,
          qualification: values.message,
          status: "active",
          timestamp: serverTimestamp(),
        });

        formik.resetForm();

        toast.success("You added a manager successfully ✅", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
        });
      } catch (error) {
        console.error("Error adding manager:", error);
        toast.error(
          "An error occurred while adding the manager. Please try again.",
          {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
          }
        );
      }
    },
  });

  return (
    <div className="m-6">
      <div className="mb-6">
        <h1 className="font-medium text-xl">Register New Manager</h1>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Enter name"
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500 text-sm">{formik.errors.name}</div>
          ) : null}
        </div>

        <div className="mb-6">
          <label
            htmlFor="contact"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Contact No
          </label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={formik.values.contact}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Enter contact no"
          />
          {formik.touched.contact && formik.errors.contact ? (
            <div className="text-red-500 text-sm">{formik.errors.contact}</div>
          ) : null}
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="name@xmail.com"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Add Qualification
          </label>
          <textarea
            id="qualification"
            rows="4"
            value={formik.values.message}
            name="message"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Qualification"
          />
          {formik.touched.message && formik.errors.message ? (
            <div className="text-red-500 text-sm">{formik.errors.message}</div>
          ) : null}
        </div>
        <div className="flex items-start mt-6 mb-6"></div>
        <button
          type="submit"
          className="text-white bg-amber-500 hover:bg-amber-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Register new Manager
        </button>
      </form>
    </div>
  );
};

export default Addmanager;
