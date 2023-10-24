import React, { useState } from "react";

function SendMessage({ handleSendMessage }) {
  const [messageText, setMessageText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendMessage(messageText);
    setMessageText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        placeholder="Type your message..."
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default SendMessage;
