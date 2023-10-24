import React from "react";
import { BsTrashFill } from "react-icons/bs";
const FeedbackEditPage = ({ feedback, deleteFeedback}) => {
 
  console.log(feedback);
  return (
    <div>
      {feedback.map((fb, key) => (
        <div
          key={key}
          className="m-4 lg:col-span-2 col-span-1 bg-white flex justify-between w-auto border p-1 rounded-lg"
        >
          <div className="flex flex-col w-full p-1">
            <div className="text-xl flex justify-start items-center gap-2">
              <span>
                <img
                  className="w-8 flex justify-center items-center  rounded-full"
                  src={fb.profilepicture}
                  alt="dp"
                />
              </span>
              <div>
                <div className="flex gap-4 items-center">
                  <p className="text-sm font-bold">{fb.name}</p>{" "}
                  <p className="text-xs font-thin">
                    {fb.date ? fb.date.toLocaleDateString() : "Not Available"}
                  </p>{" "}
                </div>
                <p className="text-sm font-thin">{fb.text}</p>{" "}
              </div>
            </div>
          </div>
          <p className="bg-red-200 flex justify-center items-center p-2 rounded-lg">
            {" "}
            <span
              className="text-red-700 text-lg"
              onClick={() => deleteFeedback(fb.id)}
            >
              <BsTrashFill />
            </span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default FeedbackEditPage;
