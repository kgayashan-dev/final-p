import React from "react";
import Link from "next/link";
import { TiTick } from "react-icons/ti";
import { BsPersonPlus } from "react-icons/bs";
import { motion, useScroll } from "framer-motion";

const Cat = ({ catId, image, category, equipment, price }) => {
  console.log(equipment.facts);

  const { scrollYProgress } = useScroll();


  return (
    <motion.div
   
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.3 }}

    
    className="flex flex-col h-[70vh] relative justify-start  rounded-md">
      <div className=" flex w-full lg:flex-row md:flex-col sm:flex-col  ">
        <div className="flex justify-start bg-slate-200 w-[35vh] h-[40vh] rounded-lg m-4 overflow-hidden">
          <img
            src={image}
            alt=""
            className=" rounded w-full hover:scale-110 duration-700 hover:overflow-hidden hover:cursor-pointer "
          />
        </div>

        <div className="flex flex-col justify-start  w-[35vh] h-[45vh] rounded-md my-4">
          <div className="text-start font-bold text-2xl  ">
            <h1>{catId}</h1>
            <h1 className="font-thin capitalize text-xl">{category}</h1>
          </div>
          <div className="flex flex-col  text-sm p-3 ">
            {equipment.facts && (
              <ul className="flex flex-col justify-start gap-3">
                {equipment.facts.map((fact, id) => (
                  <li key={id} className="flex   gap-3">
                    <div className="flex items-center gap-2">
                      <div className="bg-purple-100 p-2 rounded-lg">
                        <TiTick className="text-green-500" />
                      </div>
                      <div>
                        <p className="text-gray-800 font-thin">{fact}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="mx-4">
        <p>{price}</p>
      </div>
      <div className="absolute bottom-0 right-0">
        <Link href="/">
          <p className="py-2 px-6 bg-amber-500 text-white m-4 rounded-md hover:bg-amber-600 hover:cur hover:cursor-pointer">
            Back
          </p>
        </Link>
      </div>
    </motion.div>
  );
};

export default Cat;
