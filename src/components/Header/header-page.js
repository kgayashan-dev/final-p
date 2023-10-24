import React, { useState, useEffect } from "react";
import { AiOutlineBell, AiOutlineWechat } from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { HiOutlineClock } from "react-icons/hi";
import { GrMenu } from "react-icons/gr";
import Tooltip from "../tootip/tooltip";
import { CgMenuMotion } from "react-icons/cg";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { auth } from "../../../utils/firebase"; // Check this import path
import { useAuthState } from "react-firebase-hooks/auth";
import { storage } from "utils/firebase.js";
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
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { redirect, usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  const [user, loading] = useAuthState(auth);

  const [modal, showModal] = useState(false);

  const [imageList, setImageList] = useState([]);

  const imageListRef = ref(storage, "news/");
  const [isSticky, setIsSticky] = useState(false);

  const router = useRouter();

  const handleLogin = () => {
    router.push("/auth/login");
  };

  const isDashboardPage =
    router.pathname.startsWith("/admin") ||
    router.pathname.startsWith("/customer") ||
    router.pathname.startsWith("/manager") ||
    router.pathname.startsWith("/panel") ||
    router.pathname.startsWith("/technician") ||
    router.pathname.startsWith("/messages");

  // Check if the current page is the dashboard page

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

  const [showMenu, setShowMenu] = useState(false);

  // Function to handle the click on the GrMenu icon and toggle the visibility of the navigation links
  const handleMenuClick = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsSticky(scrollTop > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        router.push("/auth/login"); // Redirect to login page after sign out
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div
        className={`p-3 bg-gray-100 flex justify-between items-center pr-8  shadow-sm`}
      >
        <div className="hover:underline underline-offset-2 decoration-[1px] duration-200 rounded-sm  shadow-sm">
          <Link href={"/"}>
            <h1 className="text-amber-500 text-2xl font-bold ">PEarl-TEch</h1>
            <p className="text-xs -mt-1.5">Electronics Solution Company</p>
          </Link>
        </div>

        {/* <Link > */}
        <div className="flex justify-start items-center gap-2 ">
          <FaMapMarkerAlt className="bg-amber-400  p-1 text-2xl rounded-full" />
          <div className="text-xs">
            <p>Location: </p>
            <p>221 Kandy Rd, Kegalle, Sri Lanka </p>
          </div>
        </div>
        <div className="flex justify-start items-center gap-2 ">
          <BsFillTelephoneFill className="bg-amber-400  p-1 text-2xl rounded-full" />
          <div className="text-xs">
            <p>Phone: </p>
            <p>+94 35 123 4567 </p>
          </div>
        </div>

        <div className="flex justify-start items-center gap-2 ">
          <HiOutlineClock className="bg-amber-400  p-1 text-2xl rounded-full" />
          <div className="text-xs">
            <p>Schedule: </p>
            <p>Monday to Friday: 9:00 AM - 5:00 PM</p>
          </div>
        </div>

        <div className="group relative flex justify-center">
          {!user && (
            <Link href={"/auth/login"} passHref>
              <span className="rounded bg-amber-500 px-4 py-2  text-black shadow-sm flex justify-center items-center">
                Sign in
                {/* <BsArrowRight className="pl-2" size={25}/ */}
              </span>
            </Link>
          )}

          {user && (
            <div>
              <Tooltip content={user.displayName.split(" ")[0]}>
                {/* <div className="bg-green-500 w-3 h-3 rounded-full absolute bottom-1"></div> */}
                <div onClick={handleLogout}>
                  <img
                    className="w-12 rounded-full cursor-pointer "
                    src={user.photoURL}
                    alt={user.displayName.split(" ")[0]}
                  />
                </div>
              </Tooltip>
            </div>
          )}
        </div>
      </div>

      {!isDashboardPage && (
        <div className="z-20 shadow-xs uppercase text-sm font-semibold">
          <div
            className={`max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4 pr-8  ${
              isSticky
                ? "fixed w-full z-10 top-0 bg-black/80 lg:text-white transition duration-700 ease-in-out"
                : ""
            }   `}
          >
            <h2 className="text-gray-500">
              <CgMenuMotion size={25} />
            </h2>
            <button
              data-collapse-toggle="navbar-default"
              type="button"
              className="inline-flex items-center p-2 ml-3 text-sm  rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2   "
              aria-controls="navbar-default"
              aria-expanded={showMenu} // Use the state to determine if the menu is expanded or not
              onClick={handleMenuClick} // Call the handleMenuClick function when the GrMenu icon is clicked
            >
              <span className="sr-only">Open main menu</span>
              <GrMenu size={25} />
            </button>
            <div
              // Use the state to set the display style for the navigation links
              className={`w-full md:flex md:w-auto ${
                showMenu ? "hidden md:block" : "block"
              }`}
            >
              <div className={""}>
                <ul
                  className={`font-medium flex flex-col lg:items-center  p-4 md:p-0 mt-4 border  rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0   `}
                >
                  <li>
                    <Link href="/" passHref>
                      <Tooltip content="Home">
                        <span
                          className="block py-2 pl-3 pr-4  bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                          aria-current="page"
                        >
                          Home
                        </span>
                      </Tooltip>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/aboutus/about-us"} passHref>
                      <Tooltip content="About">
                        <span className="block py-2 pl-3 pr-4  active:text-blue-800 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                          About Us
                        </span>
                      </Tooltip>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/contact/contact-page"} passHref>
                      <Tooltip content="Contact">
                        <span className="block py-2 pl-3 pr-4  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                          Contact
                        </span>
                      </Tooltip>
                    </Link>
                  </li>
                  <li>
                    <Link href="/feedback/feedback" passHref>
                      <Tooltip content="Feedback">
                        <span className="block py-2 pl-3 pr-4 cursor-pointer  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                          Feedback
                        </span>
                      </Tooltip>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/services/services"} passHref>
                      <Tooltip content="Chat">
                        <span className=" block py-2 pl-3 pr-4  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                          Services
                        </span>
                      </Tooltip>
                    </Link>
                  </li>

                  <li>
                    <Link href={"/notification/notification-page"}>
                      <Tooltip content="Notifications">
                        <span
                          href="#"
                          className=" block py-2 pl-3 pr-4  rounded-xl hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                        >
                          <AiOutlineBell size={25} />
                          <span className="absolute top-0 -right-1 rounded-full flex justify-center  items-center text-xs bg-amber-500 w-4 h-4">
                            2
                          </span>
                        </span>
                      </Tooltip>
                    </Link>
                  </li>

                  {user && (
                    <div>
                      <li>
                        <Link
                          href={`/main`}
                          // href={`/testrol?uid=${user.uid}`}
                          passHref
                        >
                          <span className="block py-2 pl-3 pr-4 cursor-pointer  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                            Dashboard
                          </span>
                        </Link>
                      </li>
                    </div>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Header;
