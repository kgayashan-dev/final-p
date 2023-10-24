import React, { useState } from "react";
import { data } from "data/data.js";
import { IoChevronForwardCircleOutline } from "react-icons/io5";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import Link from "next/link";
import { motion, useScroll } from "framer-motion";

const CategoryPage = () => {
  // const [equipment, setEquipment] = useState(data);

  const { scrollYProgress } = useScroll();

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4; // Number of items to display per page
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const [equipment, setEquipment] = useState(data.slice(0, itemsPerPage));

  // navigate buttons
  const nextPage = () => {
    const nextPageIndex = (currentPage + 1) % totalPages;
    setCurrentPage(nextPageIndex);
    const startIndex = nextPageIndex * itemsPerPage;
    setEquipment(data.slice(startIndex, startIndex + itemsPerPage));
  };

  const prevPage = () => {
    const prevPageIndex = currentPage === 0 ? totalPages - 1 : currentPage - 1;
    setCurrentPage(prevPageIndex);
    const startIndex = prevPageIndex * itemsPerPage;
    setEquipment(data.slice(startIndex, startIndex + itemsPerPage));
  };

  const filterType = (category) => {
    const filteredEquipment = data.filter((item) => {
      return item.category === category;
    });

    setEquipment(filteredEquipment.slice(0, itemsPerPage));
    setCurrentPage(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-[1640px] m-auto px-8  py-12"
    >
      <h1 className="text-amber-500 font-bold text-4xl text-start">
        Repairing Equipments
      </h1>

      {/* Filter row */}
      <div className="flex flex-col lg:flex-row justify-between mt-4">
        {/* Filter type */}

        <div>
          <p className="font-bold text-gray-700">Filter type</p>
          <div className="flex justify-between flex-wrap">
            <button
              onClick={() => filterType("electronic")}
              className="m-2 px-2 hover:text-white border-2 border-amber-500 p-1 rounded-lg text-amber-500 hover:bg-amber-500"
            >
              Electronics
            </button>
            <button
              onClick={() => filterType("electrical")}
              className="m-2 px-2 hover:text-white border-2 border-amber-500 p-1 rounded-lg text-amber-500 hover:bg-amber-500"
            >
              Electrical
            </button>
          </div>
        </div>
      </div>

      {/* display equipment */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 pt-8">
        {equipment.map((item, index) => (
          <div
            key={index}
            className="border shadow-lg hover:scale-105 duration-300"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-[200px] object-cover rounded-t-lg"
            />
            <div className="flex justify-between px-2 py-4 ">
              <p>{item.name}</p>
              <p>
                <span className="bg-orange-500 text-white rounded-full p-1"></span>
                <span className="bg-transparent  text-black rounded-lg p-2 mx-1 border-2 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  <Link
                    href={`/learn-more/${encodeURIComponent(item.name)}`}
                    passHref
                  >
                    See more
                  </Link>
                </span>
              </p>
            </div>
          </div>
        ))}

        {/* Pagination buttons */}
      </div>

      <div className="mt-6 flex justify-center items-center mx-auto">
        <IoChevronBackCircleOutline
          size={35}
          onClick={prevPage}
          className="m-2    hover:text-amber-500 hover:cursor-pointer"
        />
        <IoChevronForwardCircleOutline
          size={35}
          onClick={nextPage}
          className="m-2    hover:text-amber-500 hover:cursor-pointer"
        />
      </div>
    </motion.div>
  );
};

export default CategoryPage;
