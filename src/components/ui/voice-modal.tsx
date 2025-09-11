"use client";

import { useState } from "react";
import * as React from "react";

const VoiceModal = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleVoiceMode = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <div
      className={`fixed bottom-4 right-4 flex flex-col items-center justify-center transition-all duration-300 ease-in-out ${
        isActive ? "w-[296px] h-[296px] bg-gray-200" : "w-16 h-16 bg-gray-100"
      } rounded-lg shadow-lg`}
    >
      <button
        onClick={toggleVoiceMode}
        className={`flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full transition-transform duration-300 ease-in-out ${
          isActive ? "scale-125" : "scale-100"
        }`}
      >
        <span className="text-white font-bold">Speak</span>
      </button>
      {isActive && (
        <div className="mt-4 text-center text-gray-700 opacity-0 animate-fade-in-up">
          <p>Listening...</p>
        </div>
      )}
    </div>
  );
};

export default VoiceModal;