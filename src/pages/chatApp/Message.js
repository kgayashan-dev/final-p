import React from "react";

function Message({ message }) {
  return (
    <div className="message">
      <span>{message.sender}:</span> {message.text}
    </div>
  );
}

export default Message;
