import React, { useState, useEffect } from "react";
import { FaScrewdriver } from "react-icons/fa";
import { BsTools } from "react-icons/bs";
import { motion } from "framer-motion";

const Services = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div>
        <div className="mx-auto">
          <div className=" relative bg-white rounded-lg  shadow-md">
            <img
              className="h-[500px] w-full"
              src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
              alt=""
            />
          </div>

          <h2 className=" absolute top-[40%] b-4 text-6xl tracking-tight mx-16 font-extrabold text-start text-white dark:text-white">
            Our <span className="text-amber-600">services</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-4 sm:grid-cols-1 md gap-5 p-8  ">
          <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
            <div className="flex flex-col w-full pb-4">
              <div className="pl-2 flex justify-start items-center gap-4">
                <FaScrewdriver className="bg-amber-400 p-2 text-4xl rounded-full" />
                <div>
                  <p className="text-lg md:text-xl font-semibold">
                    Appliance Repair:
                  </p>
                  <p className="text-gray-600 text-sm">
                    Restore the functionality of your household appliances,
                    ensuring your day-to-day life remains seamless.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
            <div className="flex flex-col w-full pb-4">
              <div className="pl-2 flex justify-start items-center gap-4">
                <FaScrewdriver className="bg-amber-400 p-2 text-4xl rounded-full" />

                <div>
                  <p className="text-lg md:text-xl font-semibold">
                    Device Diagnostics:
                  </p>
                  <p className="text-gray-600 text-sm">
                    Count on our skilled technicians to conduct thorough
                    diagnostics and pinpoint the root cause of complex issues.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
            <div className="flex flex-col w-full pb-4">
              <div className="pl-2 flex justify-start items-center gap-4">
                <FaScrewdriver className="bg-amber-400 p-2 text-4xl rounded-full" />
                <div>
                  <p className="text-lg md:text-xl font-semibold">
                    Industrial Machinery Repair:
                  </p>
                  <p className="text-gray-600 text-sm">
                    From intricate machinery to industrial-grade equipment, we
                    specialize in the repair of vital business assets.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
            <div className="flex flex-col w-full pb-4">
              <div className="pl-2 flex justify-start items-center gap-2">
                <FaScrewdriver className="bg-amber-400 p-2 text-4xl rounded-full" />
                <div>
                  <p className="text-lg md:text-xl font-semibold">
                    Component Replacement:
                  </p>
                  <p className="text-gray-600  text-sm">
                    Our expertise extends to replacing faulty components,
                    ensuring optimal performance and longevity.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
            <div className="flex flex-col w-full pb-4">
              <div className="pl-2 flex justify-start items-center gap-2">
                <FaScrewdriver className="bg-amber-400 p-2 text-4xl rounded-full" />
                <div>
                  <p className="text-lg md:text-xl font-semibold">
                    Preventive Maintenance:
                  </p>
                  <p className="text-gray-600  text-sm">
                    Explain your preventive maintenance programs designed to
                    identify potential issues before they escalate, saving
                    clients time and money.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
            <div className="flex flex-col w-full pb-4">
              <div className="pl-2 flex justify-start items-center gap-2">
                <FaScrewdriver className="bg-amber-400 p-2 text-4xl rounded-full" />
                <div>
                  <p className="text-lg md:text-xl font-semibold">
                    Consultation Services:
                  </p>
                  <p className="text-gray-600  text-sm">
                    Offer consultation sessions where clients can discuss their
                    needs and receive expert advice on repair options and
                    alternatives.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
            <div className="flex flex-col w-full pb-4">
              <div className="pl-2 flex justify-start items-center gap-2">
                <FaScrewdriver className="bg-amber-400 p-2 text-4xl rounded-full" />
                <div>
                  <p className="text-lg md:text-xl font-semibold">
                    Warranty Services:
                  </p>
                  <p className="text-gray-600  text-sm">
                    Explain any warranty policies you offer on your repair
                    services, demonstrating your confidence in the quality of
                    your work.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col ">
          <div className="mx-8">
            <h1 className="text-lg font-bold">Why Choose Our Services:</h1>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1  gap-6 p-8  ">
            <div className="lg:col-span-1 col-span-1 bg-white flex justify-between w-full  rounded-lg">
              <div className="flex flex-col w-full pb-4">
                <div className="pl-2 flex justify-start items-center gap-6">
                  <BsTools className="bg-amber-200 p-2 text-6xl rounded-full " />
                  <div>
                    <p className="text-lg md:text-xl font-semibold">
                      Axperienced Technicians:
                    </p>
                    <p className="text-gray-600 text-sm">
                      Highlight the qualifications and expertise of your
                      technicians, showcasing their knowledge and commitment to
                      excellence.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1 col-span-1 bg-white flex justify-between w-full  rounded-lg">
              <div className="flex flex-col w-full pb-4">
                <div className="pl-2 flex justify-start items-center gap-6">
                  <BsTools className="bg-amber-200 p-2 text-6xl rounded-full " />
                  <div>
                    <p className="text-lg md:text-xl font-semibold">
                      Fast Turnaround Time:
                    </p>
                    <p className="text-gray-600 text-sm">
                      Mention your dedication to swift and efficient repairs,
                      minimizing disruptions to your clients' routines or
                      operations.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1 col-span-1 bg-white flex justify-between w-full  rounded-lg">
              <div className="flex flex-col w-full pb-4">
                <div className="pl-2 flex justify-start items-center gap-6">
                  <BsTools className="bg-amber-200 p-2 text-6xl rounded-full " />
                  <div>
                    <p className="text-lg md:text-xl font-semibold">
                      Transparent Pricing:
                    </p>
                    <p className="text-gray-600 text-sm">
                      Emphasize your commitment to transparent pricing, ensuring
                      clients know the cost before repairs begin.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1 col-span-1 bg-white flex justify-between w-full  rounded-lg">
              <div className="flex flex-col w-full pb-4">
                <div className="pl-2 flex justify-start items-center gap-6">
                  <BsTools className="bg-amber-200 p-2 text-6xl rounded-full " />
                  <div>
                    <p className="text-lg md:text-xl font-semibold">
                      Customer Testimonials:
                    </p>
                    <p className="text-gray-600 text-sm">
                      Incorporate positive feedback from satisfied clients who
                      have experienced your services firsthand.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1 col-span-1 bg-white flex justify-between w-full  rounded-lg">
              <div className="flex flex-col w-full pb-4">
                <div className="pl-2 flex justify-start items-center gap-6">
                  <BsTools className="bg-amber-200 p-2 text-6xl rounded-full " />
                  <div>
                    <p className="text-lg md:text-xl font-semibold">
                      Tailored Solutions:
                    </p>
                    <p className="text-gray-600 text-sm">
                      Highlight your ability to tailor solutions to each
                      client's specific needs, recognizing that every repair
                      situation is unique.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1 col-span-1 bg-white flex justify-between w-full  rounded-lg">
              <div className="flex flex-col w-full pb-4">
                <div className="pl-2 flex justify-start items-center gap-6 m-2">
                  <BsTools className="bg-amber-200 px-2 my-2 text-6xl rounded-full " />
                  <div>
                    <p className="text-lg md:text-xl font-semibold">
                      Continued Support:
                    </p>
                    <p className="text-gray-600 text-sm">
                      Mention any post-repair support or guidance you offer to
                      ensure clients' ongoing satisfaction.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Services;
