"use client";

import { useState } from "react";
import * as React from "react";

const TextModal = () => {
  const [isActive, setIsActive] = useState(false);
  const [message, setMessage] = useState("");

  const toggleTextMode = () => {
    setIsActive((prev) => !prev);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Message sent:", message);
      setMessage("");
    }
  };

  return (
    <div
      className={`fixed bottom-4 right-4 flex flex-col items-center justify-center transition-all duration-300 ease-in-out ${
        isActive ? "w-[30rem] h-48 bg-gray-200" : "w-16 h-16 bg-gray-100"
      } rounded-lg shadow-lg`}
    >
      <button
        onClick={toggleTextMode}
        className={`flex items-center justify-center w-16 h-16 bg-green-500 rounded-full transition-transform duration-300 ease-in-out ${
          isActive ? "scale-125" : "scale-100"
        }`}
      >
        <span className="text-white font-bold">Type</span>
      </button>
      {isActive && (
        <div className="mt-4 w-full px-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="mt-2 w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default TextModal;
