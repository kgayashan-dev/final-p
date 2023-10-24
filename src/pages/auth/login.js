import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuthState, useIdToken } from "react-firebase-hooks/auth";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import {
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../../../utils/firebase";
import { motion } from "framer-motion";

import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

const Login = () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [users, setUsers] = useState([]);
  const [result, setResult] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [pic, setPic] = useState(null);

  // Handle Google Sign-In

  useEffect(() => {
    const q = query(collection(db, "user"));

    // Fetch user data from Firestore
    const unsubscribeUsers = onSnapshot(q, (querySnapshot) => {
      let userArr = [];
      querySnapshot.forEach((doc) => {
        userArr.push({ ...doc.data(), id: doc.id });
      });
      setUsers(userArr);
    });
    return () => {
      unsubscribeUsers();
    };
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      const googleProvider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, googleProvider);
      const userEmail = result.user.email;

      setResult(result);
      console.log("sign in successfully");

      // Fetch user data from Firestore

      for (const userData of users) {
        if (userData.email === userEmail) {
          setUserRole(userData.userRole);
          console.log(userRole);
          break; // Exit loop after finding the user's role
        }
      }

      const q = query(collection(db, "user"), where("email", "==", userEmail));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        const userRole = userData.userRole;
        console.log("userRole", userRole);

        if (
          userRole === "admin" ||
          userRole === "technician" ||
          userRole === "manager" ||
          userRole === "customer"
        ) 
        {
          alert("U were there")
          router.push("/");
        } else {
          const userId = result.user.uid;
          const email = result.user.email;
          const username = result.user.displayName;
          const profilePictureUrl = result.user.photoURL;
          const phoneNumber = result.user.phoneNumber;

          await createCustomerDocument(
            userId,
            email,
            username,
            profilePictureUrl,
            phoneNumber
          );

          console.log("You weren't there");
        }
      } else {
        const userId = result.user.uid;
        const email = result.user.email;
        const username = result.user.displayName;
        const profilePictureUrl = result.user.photoURL;
        const phoneNumber = result.user.phoneNumber;

        await createCustomerDocument(
          userId,
          email,
          username,
          profilePictureUrl,
          phoneNumber
        );
        alert("You added");
      }
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  const createCustomerDocument = async (
    userId,
    email,
    username,
    profilePictureUrl,
    phoneNumber
  ) => {
    const customersRef = collection(db, "customer");

    try {
      await addDoc(customersRef, {
        userId,
        email,
        username,
        timestamp: serverTimestamp(),
        profilePictureUrl,
        phoneNumber,
      });
      addDoc(collection(db, "user"), {
        username,
        email: email,
        userRole: "customer",
        timestamp: serverTimestamp(),
      });

      console.log("User document created successfully!");
    } catch (error) {
      console.error("Error creating customer document:", error.message);
    }
  };

  const fbProvider = new FacebookAuthProvider();
  fbProvider.addScope("public_profile");

  const FacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, fbProvider);
      const credential = await FacebookAuthProvider.credentialFromResult(
        result
      );
      const token = credential.accessToken;
      let photoUrl = `https://graph.facebook.com/${result.user.providerData[0].uid}/picture?type=large&access_token=${token}`;
      setPic(photoUrl);
      await updateProfile(auth.currentUser, { photoURL: photoUrl });

      const userQuery = query(
        collection(db, "user"),
        where("uid", "==", result.user.uid)//currentUser.uid
      );
      const userSnapshot = await getDocs(userQuery);

      if (!userSnapshot.empty) {
        // User doesn't exist in the collection, add thems

        await addDoc(collection(db, "user"), {
          username: result.user.displayName,
          userId: result.user.uid,
          email: result.user.email,
          userRole: "customer",
          timestamp: serverTimestamp(), // added time
        });

        await addDoc(collection(db, "customer"), {
          username: result.user.displayName,
          profilePictureUrl: result.user.photoURL,
          userId: result.user.uid,
          email: result.user.email,
          timestamp: serverTimestamp(), // added time
        });

        console.log("New User Added");
      } else {
        console.log("User already exists in the collection");
      }

      console.log("Profile Picture Updated");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/");
      console.log(user.displayName);
      // console.log(user.photoURL);
      console.log(user);
    } else {
      console.log("no user");
    }
  }, [user]);

  return (
    <motion.div
      animate={{ opacity: 20 }}
      transition={{ ease: "easeOut", duration: 0.2 }}
      whileInView={{ opacity: 1 }}
      // viewport={{ root: scrollRef }}
      className="relative py-28 bg-gradient-to-br from-sky-50 to-gray-200"
    >
      <div className="relative container m-auto px-6 text-gray-500 md:px-12 xl:px-44">
        <div className="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
          <div className="relative rounded-xl bg-white shadow-xl">
            <div className="absolute right-0 p-4 ">
              <Link href="/">
                <AiOutlineCloseCircle
                  size={25}
                  className="
              hover:cursor-pointer
             group  rounded-full transition duration-300 hover:text-blue-400 focus:bg-blue-50 active:bg-blue-100"
                />
              </Link>
            </div>

            <div className="p-6 sm:p-16">
              <div className="space-y-2">
                <h1 className="text-amber-500 text-3xl font-bold ">
                  PEarl-TEch
                </h1>

                <h2 className="mb-8 text-2xl text-cyan-900 font-bold">
                  Sign in to unlock the best of Pearl Tech experiences.
                </h2>
              </div>
              <div className="mt-16 grid space-y-4">
                <button
                  onClick={handleGoogleSignIn}
                  className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
                >
                  <div className="relative flex items-center space-x-4 justify-center">
                    <FcGoogle
                      size={35}
                      className="absolute left-0 w-5"
                      alt="google logo"
                    />
                    <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                      Continue with Google
                    </span>
                  </div>
                </button>

                <button
                  onClick={FacebookLogin}
                  className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
                                     hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
                >
                  <div className="relative flex items-center space-x-4 justify-center">
                    <BsFacebook
                      size={35}
                      className="absolute left-0 w-5 text-blue-600"
                      alt="Facebook logo"
                    />
                    <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                      Continue with Facebook
                    </span>
                  </div>
                </button>
              </div>

              <div className="mt-32 space-y-4 text-gray-600 text-center sm:-mb-8"></div>
            </div>
          </div>
        </div>
        {loading && (
          <div className="flex justify-center items-center h-[92vh] cursor-wait">
            <div className="absolute  bg-white/30 backdrop-blur-sm  inset-0 top-0 flex justify-center items-center">
              <div
                className="inline-block h-10 w-10  animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role=""
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Directing To The Dashboard...
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Login;
