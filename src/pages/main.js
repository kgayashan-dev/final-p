import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../utils/firebase";
import React, { useState, useEffect } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/router";
import AdminComponent from "./admin/dashboard";
import CustomerComponent from "./customer/dashboard";
import TechnicianComponent from "./technician/dashboard";
import LoadingFunction from "@/components/LoadingFunction";

function Test() {
  const [user, loading] = useAuthState(auth);
  const [userRole, setUserRole] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (!loading && user) {
        const q = query(collection(db, "user"));

        // Fetch user data from Firestore
        const unsubscribeUsers = onSnapshot(q, (querySnapshot) => {
          let userArr = [];
          querySnapshot.forEach((doc) => {
            userArr.push({ ...doc.data(), id: doc.id });
          });

          // Search for the current user's role
          for (const userData of userArr) {
            if (userData.email === user.email) {
              setUserRole(userData.userRole);
              break; // Exit loop after finding the user's role
            }
          }
        });

        return () => {
          unsubscribeUsers();
        };
      } else if (!loading) {
        alert("Please wait");
      }
    };

    fetchData();
  }, [user, loading]);

  useEffect(() => {
    if (userRole !== null) {
      // Check the userRole and redirect accordingly
      if (userRole === "customer") {
        router.push("/customer/dashboard");
      } else if (userRole === "technician") {
        router.push("/technician/dashboard");
      } else if (userRole === "manager") {
        router.push("/manager/dashboard");
      } else if (userRole === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/auth/login");
      }
    }
  }, [userRole, router]);

  return (
    <div>
      <div>
        {userRole === "customer" && <CustomerComponent />}
        {userRole === "technician" && <TechnicianComponent />}
        {userRole === "manager" && <ManagerComponent />}
        {userRole === "admin" && <AdminComponent />}
      </div>

      <div>
        <LoadingFunction />
      </div>
    </div>
  );
}

export default Test;
