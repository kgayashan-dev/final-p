import React, { useState, useRef, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import emailjs from "@emailjs/browser";
import { Timestamp, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../../../utils/firebase";
import { query, collection, onSnapshot, addDoc } from "firebase/firestore";

const Sendemail = () => {
 
  const [customer, setCustomer] = useState([]);

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    const toEmail = e.target.email.value;
    const subject = e.target.subject.value;
  
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!toEmail || !emailRegex.test(toEmail)) {
      toast.error("Please enter a valid email address", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      return;
    }
  
    // Basic subject validation
    if (!subject) {
      toast.error("Please enter a subject", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      return;
    }

    emailjs
      .sendForm(
        "service_yay0e34",
        "template_kzqf83b",
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

  useEffect(() => {
    const q = query(collection(db, "customer"));
    // Fetch manager data from Firestore
    const unsubscribeCus = onSnapshot(q, (querySnapshot) => {
      let custArr = [];
      querySnapshot.forEach((doc) => {
        custArr.push({ ...doc.data(), id: doc.id });
      });
      setCustomer(custArr);
    });
    return () => {
      unsubscribeCus();
    };
  }, []);

  return (
    <div className="m-6">
      <div className="mb-6">
        <h1 className="font-medium text-xl">Send Mail to customers</h1>
      </div>
      <form ref={form} onSubmit={sendEmail}>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            From
          </label>

          <input
            value="PearlTech Inc"
            onChange={(e) => handleInputChange(e, "name")}
            placeholder="Enter Your Name"
            name="name"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            To
          </label>

          <input
            type="email"
            placeholder="Enter email address"
            name="email"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>
        {/* Subject */}

        <div className="mb-6">
          <label
            htmlFor="subject"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Subject
          </label>

          <input
            type="text"
            placeholder="Enter Subject"
            name="subject"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
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
            required
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
  );
};

export default Sendemail;
