import React, { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import Contactus from "./contactus";

const ContactPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.1 }}

      className="mb-10"
    >
      <div className="   mx-auto  ">
        <div className=" relative bg-white rounded-lg  shadow-md">
          <img
            className="h-[500px] w-full  "
            src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
            alt=""
          />
        </div>

        <h2 className=" absolute top-[40%] b-4 text-5xl sm:text-5xl md:text-6xl tracking-tight font-extrabold text-start text-white">
          Contact <span className="text-amber-600">Us</span>
        </h2>
      </div>
      <div className="m-10 font-light text-gray-500 flex flex-col justify-between text-justify  ">
        <div className=" text-left flex flex-col justify-between gap-4">
          <p>
            If you have any questions, concerns, or feedback, we would love to
            hear from you. Get in touch with our team using the contact details
            provided below:
          </p>

          <p>
            <span className="font-bold">Phone:</span> +94 35 123 4567
            <br />
            <span className="font-bold">Email:</span> ptech@gmail.com
            <br />
            <span className="font-bold">Phone:</span> 1221 Kandy Rd, Kegalle,
            Sri Lanka
          </p>
        </div>

        <div className="text-right flex flex-col justify-between gap-8">
          <p>
            Our dedicated support team is available to assist you during our
            business hours:
          </p>

          <p>
            <span className="font-bold">Monday to Friday:</span> 9:00 AM - 5:00
            PM
            <br />
            <span className="font-bold">Saturday:</span> 10:00 AM - 2:00 PM
            (Limited Support)
            <br />
            <span className="font-bold">Sunday:</span> Closed
          </p>
        </div>
        <div className="text-left flex flex-col justify-between gap-4">
          <p>In addition, you can also connect with us on social media:</p>
          <p>
            <span className="font-bold">Facebook:</span>{" "}
            <a href="https://www.facebook.com/example">facebook.com/example</a>
            <br />
            <span className="font-bold">Twitter:</span>{" "}
            <a href="https://www.twitter.com/example">twitter.com/example</a>
            <br />
            <span className="font-bold">Instagram:</span>{" "}
            <a href="https://www.instagram.com/example">
              instagram.com/example
            </a>
          </p>
        </div>
      </div>
      <div className="m-10">
        <p>
          We value your feedback and strive to continuously improve our
          services. Your input is essential to our success, so please don't
          hesitate to get in touch. We look forward to hearing from you!
        </p>
      </div>

      <div>
        <Contactus />
      </div>
    </motion.div>
  );
};

export default ContactPage;
