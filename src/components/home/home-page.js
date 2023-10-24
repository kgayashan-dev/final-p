import React, { useRef } from "react";

import Image from "next/image";
import { motion, useScroll } from "framer-motion";
import DescriptionPage from "@/components/description/des-page";
import CategoryPage from "@/components/categories/cate-page";
import { SessionProvider } from "next-auth/react";
import Link from "next/link";

const Homepage = () => {
  const scrollRef = useRef(null);

  return (
    <motion.div
      ref={scrollRef}
      style={{ overflow: "scroll" }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", stiffness: 100, delay: 0.6 }}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
    >
      <div className="h-screen-xl  ">
        <div className="h-[800px] relative">
          <div className="absolute top-0 bg-black/10 h-[90vh] w-full"></div>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ root: scrollRef }}
            className="absolute  flex flex-col justify-center mt-36 ml-8 items-right   bg-opacity-75"
          >
            <p className="text-lg "> Welcome to Pearl Tech! </p>
            <h1 className="text-black text-5xl font-bold">
              The <span className="text-orange-600">Best</span>
            </h1>
            <h1 className="text-black text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
              Repair & <span className="text-orange-600">Services</span>{" "}
              solutions
            </h1>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ root: scrollRef }}
              className="w-3/5 py-6"
            >
              <p className="text-black text-lg font-thin">
                Your trusted partner for electronic and electrical equipment
                repair services. With a dedicated team of highly skilled
                technicians and a relentless commitment to delivering
                exceptional customer experiences, we are your go-to solution for
                resolving technical issues effectively and efficiently.
              </p>
            </motion.div>
            <div className="pt-6 text-lg flex">
              <button className="  border-2 border-amber-500 py-2 px-4 rounded-lg text-amber-500 hover:bg-amber-500 hover:text-white">
                Help
              </button>
              <Link href="/contact/contact-page">
                <p className=" text-white    border-2 border-amber-500 py-2 px-4 rounded-lg bg-amber-500 hover:bg-transparent hover:text-amber-500 ml-4">
                  Contact
                </p>
              </Link>
            </div>
          </motion.div>

          <img className=" w-full h-full object-cover" src="/tecc.png" alt="" />
        </div>
      </div>

      <DescriptionPage />
      <CategoryPage />
    </motion.div>
  );
};

export default Homepage;
