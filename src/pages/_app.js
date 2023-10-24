import "@/styles/globals.css";
import MainlayoutPage from "@/components/layouts/main-layout";
import { Nunito } from "next/font/google";
import Head from "next/head";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../utils/firebase";
import { SessionProvider } from "next-auth/react";



const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function App({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);



  useEffect(() => {
    let path = "Pearl Tech E Solutions";
    document.title = path;

    if (!user && typeof window !== "undefined") {
      // Only import the router when running on the client side
      const router = require("next/router").default;

      // Redirect to login if user is not authenticated
      // router.push("/auth/login");
    }
  }, [user]);


  return (
    <main className={nunito.className}>
    
        <MainlayoutPage>
          <ToastContainer limit={1} />
          <Component {...pageProps} />
        </MainlayoutPage>
    
      
    </main>
  );
}
