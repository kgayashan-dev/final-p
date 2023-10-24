import React from "react";

const DescriptionPage = () => {
  return (
    <div className=" h-mx-auto px-8">
      <h1 className="text-amber-500 font-bold text-4xl text-start">
        Who we are
      </h1>
      <div className="max-w-[1640px] mx-auto ">
        <div className="max-h-[500px] relative md:flex-col">
          {/* Overlay */}
          <div className="absolute pr-2 w-full h-full  max-h-[500px] items-center  flex flex-row justify-end ">
            <div className="flex  w-[50%] p-4  rounded-md">
              <p className="text-black px-4  text-lg text-justify font-thin">
                At Pearl Teck, we are a trusted provider of electronic and
                electrical equipment repair services, catering to diverse
                industries with a customer-centric approach. Our highly skilled
                technicians bring expertise and experience to every repair
                project, ensuring your devices are restored to optimal
                functionality. We prioritize customer satisfaction, offering
                personalized attention and responsive support. By staying at the
                forefront of industry developments, we handle a wide range of
                devices and promote sustainability through eco-friendly
                practices. Trust us as your partner for all your electronic and
                electrical equipment repair needs.
                <span className="pt-8"></span>
                
              </p>
            </div>
          </div>

          <div className=" w-[40%] pl-12">
            <img
              className="w-full h-[450px] object-cover"
              src="/des.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionPage;
