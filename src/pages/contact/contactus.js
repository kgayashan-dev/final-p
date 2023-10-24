import React, { useEffect, useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";

const contactus = () => {
  const form = useRef();
  const scrollRef = useRef(null);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_yay0e34",
        "template_z6xcijl",
        form.current,
        "bMceIYBR9IX_LrvYm",
        {}
      )

      .then(
        (result) => {
          console.log(result.text);
          alert("Email has been sent! ");
          toast.success("Email Sent ✅", {
            // Move the toast inside the 'then' block
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
          });

          // Reset the form fields after email is sent
          // form.current.reset();
        },
        (error) => {
          console.log(error.text);
          toast.error("Failed to send email! ❌", {
            // Show an error toast if the email sending fails
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
          });
        }
      );

    e.target.reset();
  };

  return (
    
    <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ root: scrollRef }}
    
    className="flex justify-center  items-center px-8 gap-8  ">
      <div className="z-20  w-1/5 h-full flex flex-col justify-start  ">
        <div className="p-1 bg-amber-400 w-10 rounded-lg my-4"></div>
        <div className="flex ustify-start  items-right ">
          <h1 className="  text-5xl font-bold jtext-start  text-gray-600">
            Contact us via Email
          </h1>
        </div>
      </div>

      <div className="   w-[60vh] h-[60vh] p-10 rounded-sm  shadow-xl">
        <form ref={form} onSubmit={sendEmail}>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>

            <input
              placeholder="Enter Your Name"
              name="name"
              className="shadow-sm w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500   p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              To
            </label>

            <input
              type="email"
              placeholder="Enter email address"
              value="e1946419@bit.mrt.ac.lk"
              name="email"
              readOnly
              className="shadow-sm hidden bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            />
          </div>
          {/* Subject */}

          <div className="mb-6">
            <label
              htmlFor="subject"
              className=" mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Subject
            </label>

            <input
              type="text"
              placeholder="Enter Subject"
              name="subject"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Message
            </label>
            <textarea
              id="message"
              rows="4"
              name="message"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Leave a message."
            ></textarea>
          </div>
          <div className="flex items-start mt-6 mb-6"></div>
          <button
            type="submit"
            className="text-white bg-amber-500 hover:bg-amber-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Send
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default contactus;
