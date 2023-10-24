import React from "react";
import { toast } from "react-toastify";
import{BsFillTrashFill} from "react-icons/bs"
import { RxDotsVertical } from "react-icons/rx";
import { addDoc, collection, serverTimestamp, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../utils/firebase";
import { useFormik } from "formik";
import * as Yup from "yup";

const AddAnotherAdmin = ({ user }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      contact: "",
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .max(20, "Name must be at least 20 characters.")
        .required("Name is required."),

      email: Yup.string()
        .email("Invalid email address.")
        .required("Email is required."),

      contact: Yup.string()
        .matches(/^\d{10}$/, "Invalid contact number.")// 1234567890-exactly 10 digits 
        .required("Contact number is required."),
    }),

    // onSubmit vslues to the db

    onSubmit: async (values) => {
      try {
        await addDoc(collection(db, "user"), {
          name: values.name,
          role: "admin",
          email: values.email,
          contact: values.contact,
          timestamp: serverTimestamp(),
        });

        await addDoc(collection(db, "admin"), {
          name: values.name,
          role: "admin",
          email: values.email,
          contact: values.contact,
          timestamp: serverTimestamp(),
        });

        formik.resetForm();

        toast.success("You added an admin successfully ✅", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
        });
      } catch (error) {
        console.error("Error adding admin:", error);
        toast.error(
          "An error occurred while adding the admin. Please try again.",
          {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
          }
        );
      }
    },
  });

  // delete the admin

  const handleDelete = async (userId) => {
    try {
      await deleteDoc(doc(db, "admin", userId));

      toast.success("Admin deleted successfully ✅", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
    } catch (error) {
      console.error("Error deleting entry:", error);
      toast.error(
        "An error occurred while deleting the entry. Please try again.",
        {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
        }
      );
    }
  };

  return (
    <div className="m-6">
      <div className="mb-6">
        <h1 className="font-medium text-xl">Add New admin</h1>
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

        <div className="flex items-start mt-6 mb-6"></div>
        <button
          type="submit"
          className="text-white bg-amber-500 hover:bg-amber-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add
        </button>
      </form>

      <div>
        <div className="pt-4 px-2 text-sm">
          <div className="w-full m-auto p-4 h-[20vh] border rounded-lg bg-white overflow-scroll">
            <div className="my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer ">
              <span>Name</span>
              <span className="sm:text-left text-right">Email</span>
              <span className="hidden md:grid">Contact</span>
              <span className="hidden sm:grid"> Aded date</span>
            </div>
            {user.map((user, key) => (
              <div key={key} className="">
                <ul className="">
                  <li className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer ">
                    <div className="flex items-center">
                      <p className="pl-4">{user.name}</p>
                    </div>
                    <p className="text-gray-600 sm:text-left text-right overflow-hidden">
                      {user.email}
                    </p>
                    <p className="hidden md:flex">
                      {user.contact ? user.contact : "N/A"}
                    </p>

                    <div className="sm:flex  hidden justify-between items-center ">
                      <p className="hidden md:flex">
                        {user.timestamp ? (
                          <>
                            {" "}
                            {
                              user.timestamp
                                .toDate()
                                .toLocaleString()
                                .split(",")[0]
                            }{" "}
                          </>
                        ) : (
                          "_"
                        )}
                      </p>
                      <div className="text-red-500 hover:bg-red-200 p-1 rounded-lg">
                      <BsFillTrashFill className="text-lg" onClick={() => handleDelete(user.id)} />

                      </div>
                    </div>
                  </li>
                  {/* ))} */}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAnotherAdmin;
