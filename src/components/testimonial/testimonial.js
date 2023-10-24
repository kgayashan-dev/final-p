import React, { useEffect, useState } from "react";
import { IoCaretBackCircleOutline } from "react-icons/io5";
import { IoCaretForwardCircleOutline } from "react-icons/io5";

const Testimonial = ({ data }) => {
  
    const itemsPerPage = 2;
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const [currentPage, setCurrentPage] = useState(0);
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
      const startIndex = currentPage * itemsPerPage;
      const displayedTestimonials = data.slice(
        startIndex,
        startIndex + itemsPerPage
      );
      setTestimonials(displayedTestimonials);
    }, [currentPage, data]);

    const nextPage = () => {
      const nextPageIndex = (currentPage + 1) % totalPages;
      setCurrentPage(nextPageIndex);
    };

    const prevPage = () => {
      const prevPageIndex =
        currentPage === 0 ? totalPages - 1 : currentPage - 1;
      setCurrentPage(prevPageIndex);
  
  };

  return (
    <section className="h-[70vh] w-full ">
      <div className="flex h-full w-full justify-start  items-start ">
        <div className="z-20   w-1/5 h-full flex flex-col justify-center ">
          <div className="p-1 bg-amber-400 w-6 rounded-lg my-8"></div>
          <h1 className="  text-6xl font-bold justify-start  items-right text-start  text-gray-600">
            Customer Feedback
          </h1>
        </div>

        <div className="flex w-full h-full justify-center items-center ">
          <div className="relative w-[110vh] bg-white h-[40vh] flex shadow-xl gap-7 p-10">
            {testimonials.map((data, id) => (
              <div key={id} className="w-1/2 flex transition duration-200 ease-in">
                <div className="flex flex-col justify-start  gap-3 ">
                  <img
                    src={data.profilepicture}
                    className="absolute top-5 w-12 rounded-full"
                    alt="Testimonial"
                  />
                  <p className="absolute top-20 w-[45vh]">{data.text}</p>
                  <p className="absolute font-semibold bottom-16">
                    {data.name}
                  </p>
                  {/* <p className="text-xs -mt-4">{currentTestimonial.role}</p> */}
                </div>
              </div>
            ))}

            <div className="absolute bottom-7 ">
              <div className="flex justify-center items-center gap-3">
                <IoCaretBackCircleOutline
                  size={30}
                  className="hover:cursor-pointer"
                  onClick={nextPage}
                />
                <IoCaretForwardCircleOutline
                  size={30}
                  className="hover:cursor-pointer"
                  onClick={prevPage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
