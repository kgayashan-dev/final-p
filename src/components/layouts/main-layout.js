import React from "react";
import Header from "../Header/header-page";
import Footer from "../Footer/footer-page";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../utils/firebase";

export default function MainlayoutPage({ children }) {
  const router = useRouter();
  const [curentUser, loading] = useAuthState(auth);

  // Check if the current page is the dashboard page
  const isDashboardPage = router.pathname.startsWith("/panel" && "/admin"); // Corrected this line

  return (
    <div>
      <Header  />
      <div className="flex">
        <div className="w-full">{children}</div>
      </div>
      {!isDashboardPage && <Footer />}
    </div>
  );
}

