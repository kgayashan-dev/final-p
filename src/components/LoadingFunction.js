import React from "react";

const LoadingFunction = () => {
  return (
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
  );
};

export default LoadingFunction;
