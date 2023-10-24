import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { auth, db } from "utils/firebase.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import {
  query,
  Timestamp,
  serverTimestamp,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

const FeedbackPage = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    /// Run checks for dexcription
    if (!email) {
      toast.error("Some Fields empty 😅", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return;
    }

    // Get the current signed-in user
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // If the user is signed in, add their information to the feedback
        const { uid, displayName, email: userEmail } = user;

        // Insert the feedback with user information
        await addDoc(collection(db, "userfeedback"), {
          name: displayName,
          subject: subject,
          email: userEmail,
          profilepicture: user.photoURL,
          text: message,
          date: serverTimestamp(),
        });
      } else {
        // Handle the case when the user is not signed in or signed out
        toast.warning("User is not signed in or signed out");
      }

      // Clear the form fields after submission
      setName("");
      setContact("");
      setEmail("");
      setMessage("");
      setSubject("");

      toast.success("Your feedback successfully sent ✅", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.6 }}

    >
      <div className="   mx-auto ">
        <div className="font-light  text-gray-500 ">
          <div className=" relative bg-white rounded-lg  shadow-md">
            <img
              className="h-[500px] w-full  "
              src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
              alt=""
            />
          </div>

          <h2 className=" absolute top-[40%] b-4 text-5xl sm:text-5xl md:text-6xl tracking-tight font-extrabold text-start text-white dark:text-white">
            Give us your <span className="text-amber-600">Feedback</span>
          </h2>

          <div className="m-10 text-justify">
            <p>
              At our company, our value customer feedback as an essential aspect
              of our business. We believe that listening to our customers'
              opinions, suggestions, and concerns helps us improve our products
              and services. We actively encourage our customers to provide
              feedback through various channels, such as surveys, reviews, and
              direct communication. By carefully analyzing and considering
              customer feedback, we gain valuable insights
            </p>
          </div>
          <div></div>
        </div>
      </div>
      <div className="m-auto my-8 w-[50%] text-xl">
        <form action="#" className="space-y-8 text-xl" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="name@account.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              value={subject}
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="Let us know how we can help you"
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Your message
            </label>
            <textarea
              id="message"
              rows="6"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Leave a comment..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="py-3 bg-amber-500 px-5 text-sm font-medium text-center text-white rounded-lg  sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 "
          >
            Send message
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default FeedbackPage;
