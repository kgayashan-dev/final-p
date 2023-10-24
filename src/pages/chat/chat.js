import React from "react";

const Chat = () => {
  return (
    <div className="mt-7 flex flex-col justify-center items-center">
      <div>
        <h2>Chat Is Available for you</h2>
      </div>
      <div className=" my-7 relative lg:h-[70vh] h-[50vh] w-1/2 m-auto p-4 border rounded-lg bg-white overflow-scroll">
        {/* <Bar data={chartData} />
         */}
      </div>
    </div>
  );
};

export default Chat;
