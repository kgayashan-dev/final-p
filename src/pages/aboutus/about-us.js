import React, { useState, useEffect } from "react";
import { Timestamp } from "firebase/firestore";
import { auth, db } from "../../../utils/firebase";

import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import Testimonial from "@/components/testimonial/testimonial";

const AboutusPage = () => {
  const [feedback, setFeedbcak] = useState([]);

  // get feedbacks

  useEffect(() => {
    const q = query(collection(db, "userfeedback"));

    // Fetch manager data from Firestore
    const unsubscribeFed = onSnapshot(q, (querySnapshot) => {
      let userFBArr = [];
      querySnapshot.forEach((doc) => {
        userFBArr.push({ ...doc.data(), id: doc.id });
      });
      setFeedbcak(userFBArr);
    });

    return () => {
      unsubscribeFed();
    };
  });

  return (
    <div className="">
      <div className=" ">
        <div className="font-light  text-gray-500  ">
          <div className=" relative bg-white rounded-lg  shadow-md">
            <img
              className="h-[500px] w-full  "
              src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
              alt=""
            />
          </div>

          <h2 className=" absolute top-[40%] b-4 text-4xl tracking-tight font-extrabold text-start text-white ">
            About <span className="text-amber-600">Us</span>
          </h2>
          <div className="m-8 text-justify">
            <p>
              Welcome to Pearl Tech, a leading provider of electronic and
              electrical equipment repair services. With a team of highly
              skilled technicians and a commitment to exceptional customer
              service, we are dedicated to resolving your technical issues
              efficiently and effectively. At Pearl Tech, we understand the
              importance of your electronic and electrical equipment in both
              personal and professional settings. Whether it's a malfunctioning
              , a faulty home appliance, or complex industrial machinery, our
              experienced technicians possess the expertise to diagnose and
              repair a wide range of electronic and electrical devices. Our
              mission is to deliver reliable and cost-effective repair solutions
              while ensuring utmost customer satisfaction. We strive to exceed
              your expectations by combining our technical proficiency with a
              personalized approach. We believe in building long-lasting
              relationships with our clients, earning their trust through our
              exceptional workmanship, integrity, and transparency.
            </p>
          </div>

          <div className="m-8 text-justify">
            <p>
              One of the key features of our web application is our integrated
              chat service, connecting you directly with our knowledgeable
              technicians. We understand that clear communication is essential
              in resolving technical issues, and our chat service allows you to
              conveniently discuss your concerns, ask questions, and receive
              real-time updates on the progress of your repair. With our
              user-friendly interface and intuitive navigation, you can easily
              request repair services, track the status of your repairs, and
              access helpful resources to troubleshoot common issues. Our web
              application is designed to provide you with a seamless and
              streamlined experience, ensuring that you can quickly and
              efficiently address your electronic and electrical equipment
              repair needs. At Pearl Tech, we are continuously expanding our
              knowledge base and staying up-to-date with the latest advancements
              in technology. This enables us to adapt to the ever-evolving
              electronic landscape and deliver cutting-edge solutions to our
              valued customers. Thank you for choosing Pearl Tech for your
              electronic and electrical equipment repair needs. We look forward
              to serving you and providing you with the highest level of service
              and support.
            </p>
          </div>
          <div className="m-8 text-justify">
            <p>
              At Pearl Tech, we are more than just a repair service – we are a
              team of dedicated professionals who share a passion for
              electronics and electrical systems. With a combined experience
              spanning years, our technicians possess the expertise needed to
              diagnose and repair a wide array of electronic devices, from
              household appliances to intricate industrial machinery.
            </p>
          </div>
          <div className="m-8 text-justify">
            <p>
              Our commitment extends beyond technical proficiency. We understand
              that your electronic equipment holds significant value in your
              daily life, and we treat each repair with the utmost care and
              attention. Our customer-centric approach is rooted in
              transparency, integrity, and a relentless pursuit of excellence.
            </p>
          </div>
          <div></div>
        </div>
      </div>

      <div className="flex justify-between gap-5 mx-10 ">
        <div>
          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img
                className="rounded-t-lg"
                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
                alt=""
              />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Noteworthy technology acquisitions 2023
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Here are the most notable electronic and electrical equipment
                repair projects completed by our company in 2023 so far, listed
                in reverse chronological order..
              </p>
              {/* <a
                href="#"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Learn more
              </a> */}
            </div>
          </div>
        </div>

        <div>
          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img
                className="rounded-t-lg"
                src="https://images.unsplash.com/photo-1563770660941-20978e870e26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
                alt=""
              />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Noteworthy technology acquisitions 2023
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Here are the most notable electronic and electrical equipment
                repair projects completed by our company in 2023 so far, listed
                in reverse chronological order..
              </p>
              {/* <a
                href="#"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Learn more
              </a> */}
            </div>
          </div>
        </div>

        <div>
          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img
                className="rounded-t-lg"
                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
                alt=""
              />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Noteworthy technology acquisitions 2023
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Here are the most notable electronic and electrical equipment
                repair projects completed by our company in 2023 so far, listed
                in reverse chronological order..
              </p>
              {/* <a
                href="#"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Learn more
              </a> */}
            </div>
          </div>
        </div>
      </div>
      <div className=" lg:py-16 px-4 mx-8">
        <h2 className="mb-2 text-2xl tracking-tight font-extrabold  text-gray-900 dark:text-white">
          Why you choose us
        </h2>
        <p className=" font-light text-start text-gray-500  text-lg">
          When you choose Pearl Tech for your electronic and electrical
          equipment repair needs, you can expect exceptional service and
          numerous benefits. We offer:
        </p>
      </div>

      <div className="flex justify-center items-center gap-4 m-4 ">
        <div>
          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Expert Technician
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Our highly skilled technicians have in-depth knowledge and
                experience in repairing a wide range of electronic and
                electrical devices.
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Satisfaction Guarantee
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                We stand behind our work. Your satisfaction is our top priority,
                and we will go above and beyond to ensure that you are happy
                with the results
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Convenient Service
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                We prioritize the quality of our repairs, ensuring that your
                equipment is restored to optimal functionality.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="m-8 flex flex-col justify-center gap-4 ">
        <div className=" w-full">
          <p className=" text-md text-slate-500"></p>
        </div>

        <Testimonial data={feedback} />
      </div>
    </div>
  );
};

export default AboutusPage;
