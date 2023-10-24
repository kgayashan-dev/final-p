import React, { useState, useEffect } from "react";
import { storage } from "utils/firebase.js";
import { motion } from "framer-motion";
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
// import { v4 } from "uuid"; // Import the uuid library if not already done

const NotificationPage = () => {
  const [file, setFile] = useState(null);
  const [imageList, setImageList] = useState([]);

  const imageListRef = ref(storage, "news/");

  // image upload
  const uploadImage = () => {
    console.log("uploading image");
    if (file == null) return;
    const storageRef = ref(storage, `news/${file.name}`);
    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        alert("image uploaded!");
        setImageList((prev) => [...prev, url].reverse());
      });
    });
  };

  // image download automatically
  useEffect(() => {
    listAll(imageListRef)
      .then((snapshot) => {
        const promises = snapshot.items.map((item) =>
          getDownloadURL(item).then((url) => url)
        );
        return Promise.all(promises);
      })
      .then((urls) => {
        setImageList(urls.reverse());
      })
      .catch((error) => console.log(error));
  }, []);

  // delete image
  const deleteImage = async (url) => {
    const imageRef = ref(storage, url.replace(storage.toString(), ""));
    try {
      // call delete object from storage
      await deleteObject(imageRef);
      alert("Are you sure you want to delete the image?");

      // delete an image
      setImageList((prev) => prev.filter((u) => u !== url));
      //   alert("Image deleted successfully!");
    } catch (error) {
      console.log(error);
      alert("Failed to delete image!");
    }
  };

  console.log(imageList.length);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}

      transition={{ delay: 0.1 }}


      className="  mx-auto "
    >
      <div className="  mx-auto ">
        <div>
          <div className=" relative bg-white rounded-lg  shadow-md">
            <img
              className="h-[500px] w-full  "
              src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
              alt=""
            />
          </div>

          <h2 className=" absolute top-[40%] b-4 text-5xl sm:text-5xl md:text-6xl tracking-tight font-extrabold text-start text-white">
            New<span className="text-amber-600">s</span>
          </h2>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-4 m-6">
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-16  justify-center items-center   ">
          <div>
            <div className=" bg-white border border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700 shadow-sm ">
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    New Product Launch
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-justify">
                  We are excited to announce the launch of our latest product,
                  the "Smart Home Assistant." This innovative device will
                  revolutionize how you interact with your home. With its
                  advanced AI capabilities, it can control various smart
                  devices, answer your questions, and provide real-time updates
                  on weather and news. Experience the future of smart living
                  today!
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className=" bg-white border border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-70 shadow-sm ">
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl text-right font-bold tracking-tight text-gray-900 dark:text-white">
                    Special Offer
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-right">
                  Avail our exclusive summer discount on all appliance repairs
                  and services! Beat the heat and ensure your appliances are in
                  top-notch condition. Our skilled technicians are here to
                  assist you with any repair needs. Don't miss out on this
                  limited-time offer. Call us now to schedule an appointment!
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className=" bg-white border border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700  ">
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Community Outreach
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-justify">
                  We are committed to giving back to the community. Our team
                  recently organized a charity event to support underprivileged
                  families. We provided free repairs and maintenance for their
                  household appliances. It was heartwarming to see the smiles on
                  their faces as we helped improve their living conditions.
                  Thank you to everyone who contributed to making this event a
                  success!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="m-6  tracking-tight text-gray-900 dark:text-white">
        <h1 className="text-2xl font-bold">News letters available below.</h1>
      </div>
      {/* display images */}
      <div className="w-full m-auto flex justify-center items-center overflow-x-scroll">
        {imageList.map((url) => {
          return (
            <div key={url} className="gap-2">
              <img
                src={url}
                alt="im"
                className="w-80 h-auto max-w-xl m-4 rounded-lg shadow-xl dark:shadow-gray-800 hover:scale-105 duration-150 hover:cursor-pointer"
              />
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default NotificationPage;
