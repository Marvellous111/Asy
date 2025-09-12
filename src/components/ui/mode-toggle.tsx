"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { AudioLines, Keyboard, X, Send } from "lucide-react";
import { useTamboThreadInput, useTamboThread } from "@tambo-ai/react";

declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}


interface ModeToggleProps {
  children: React.ReactNode; // We want to wrap content in modetoggle
}



const Asy: React.FC<ModeToggleProps> = ({ children }) => {
  const [isTextMode, setIsTextMode] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [colorFilter, setColorFilter] = useState('');
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const { value, setValue, submit } = useTamboThreadInput();
  const { sendThreadMessage, thread } = useTamboThread();
  const [fontSize, setFontSize] = useState(1);



  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.lang = "en-US";
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;

        recognitionRef.current.onresult = (event) => {
          console.info("STARTED LISTENING TO VOICE INPUT")
          const last = event.results.length - 1;
          const text = event.results[last][0].transcript;
          setTranscript(text);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);


  // Auto-start listening when voice mode is activated
  useEffect(() => {
    if (isVoiceMode && recognitionRef.current) {
      setIsListening(true);
      recognitionRef.current.start();
    } else if (recognitionRef.current) {
      recognitionRef.current.stop();
      setTranscript("");
    }
  }, [isVoiceMode]);

  const handleTextMode = () => {
    setIsTextMode(true);
    setIsVoiceMode(false);
    setTranscript("");
  };

  const handleVoiceMode = () => {
    setIsVoiceMode(true);
    setIsTextMode(false);
  };

  const handleClose = () => {
    setIsVoiceMode(false);
    setIsTextMode(false);
    setTextInput("");
    setTranscript("");
  };

  const handleSend = async () => {
    // Handle send action (e.g., process textInput)
    console.log("Text sent:", textInput);
    const query = isVoiceMode ? transcript : textInput;
    if (!query.trim()) return;
    setValue(query);

    await sendThreadMessage(query, {
      streamResponse: true,
    });
    console.log("Tambo response:", thread);

    const toolResult = thread.messages[thread.messages.length - 2].content[0]
    console.log(toolResult)

    const resultText = toolResult["text"];

    const jsonParsedText = JSON.parse(resultText)

    if (jsonParsedText["newSize"]) {
      const correctfontsize = jsonParsedText["newSize"];
      console.log(jsonParsedText)
      setFontSize(correctfontsize);
    } else if (jsonParsedText["filterId"]) {
      const filterId = jsonParsedText["filterId"];
      setColorFilter(`url(#${filterId})`);
    }

    setTextInput("");
    setTranscript("");
  };

  const toggleListening = () => {
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return (
    <div 
      ref={contentRef} 
      className="min-h-screen" 
      style={{ fontSize: `${fontSize}rem`, filter: colorFilter }}
    >
      {children}
      {/* Hidden SVG for color blindness filters */}
      <svg style={{ display: 'none' }}>
        <defs>
          <filter id="protanopia">
            <feColorMatrix type="matrix" values="0.567 0.433 0 0 0 0.558 0.442 0 0 0 0 0.242 0.758 0 0 0 0 0 1 0" />
          </filter>
          <filter id="deuteranopia">
            <feColorMatrix type="matrix" values="0.625 0.375 0 0 0 0.7 0.3 0 0 0 0 0.3 0.7 0 0 0 0 0 1 0" />
          </filter>
          <filter id="tritanopia">
            <feColorMatrix type="matrix" values="0.95 0.05 0 0 0 0 0.433 0.567 0 0 0 0.475 0.525 0 0 0 0 0 1 0" />
          </filter>
        </defs>
      </svg>
      <div
        className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ease-out ${
          isVoiceMode || isTextMode
            ? "w-64 h-64 bg-white rounded-2xl flex items-center justify-center shadow-lg "
            : "w-auto h-auto flex gap-3 border p-[5px] rounded-full shadow-md  inset-shadow-2xs"
        }`}
      >
        {isVoiceMode ? (
          <div className="border-blue">
            <button
              title="close voice mode"
              onClick={handleClose}
              className="absolute top-2 right-2 p-2 rounded-full cursor-pointer hover:bg-gray-500/20 transition-colors"
            >
              <X
                strokeWidth={1.75}
                absoluteStrokeWidth
                size={16}
                className="text-black"
              />
            </button>
            <button
              title={isListening ? "Stop listening" : "Start listening"}
              aria-label={isListening ? "Stop listening" : "Start listening"}
              onClick={toggleListening} 
              className="w-16 h-16 bg-black border-white rounded-full cursor-pointer"
              style={{
                animation: isListening ? "pulseAndGrow 1.5s ease-in-out infinite" : "none",
              }}
            >
              {isListening && (
                <div className="w-full h-full bg-black rounded-full" />
              )}
            </button>
            {transcript && (
              <div className="absolute bottom-4 w-full px-4 text-center">
                <span
                  className="text-black text-sm truncate max-w-full block animate-text-slide-up"
                  style={{ animation: "textSlideUp 0.5s ease-in-out" }}
                >
                  {transcript}
                </span>
              </div>
            )}
          </div>
        ) : isTextMode ? (
          <>
            <button
              title="close text mode"
              onClick={handleClose}
              className="absolute top-2 right-2 p-2 rounded-full cursor-pointer hover:bg-gray-500/20 transition-colors"
            >
              <X
                strokeWidth={1.75}
                absoluteStrokeWidth
                size={16}
                className="text-black"
              />
            </button>
            <div className="flex flex-col gap-2 w-full px-4 items-end">
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Type your message..."
                className="w-full h-40 p-2 bg-inherit text-black rounded-lg resize-none focus:outline-none"
              />
              <button
                title="send message"
                onClick={handleSend}
                disabled={!textInput.trim()}
                className={`p-2 rounded-full w-full h-[40px] flex justify-center items-center-safe gap-3 transition-colors ${
                  textInput.trim()
                    ? "bg-black hover:bg-black cursor-pointer"
                    : "bg-gray-600 cursor-not-allowed"
                }`}
              >
                <Send
                  strokeWidth={1.75}
                  absoluteStrokeWidth
                  size={16}
                  className="text-white"
                />
                <span className="text-white">Send message to AI</span>
              </button>
            </div>
          </>
          ) : (
          <>
            <button
              title="text mode button"
              onClick={handleTextMode}
              className="p-3 bg-black rounded-full cursor-pointer hover:bg-gray-800 transition-colors"
            >
              <Keyboard
                strokeWidth={1.75}
                absoluteStrokeWidth
                size={20}
                className="text-white"
              />
            </button>
            <button
              title="voice mode button"
              onClick={handleVoiceMode}
              className="p-3 bg-black rounded-full cursor-pointer hover:bg-gray-800 transition-colors"
            >
              <AudioLines
                strokeWidth={1.75}
                absoluteStrokeWidth
                size={20}
                className="text-white"
              />
            </button>
          </>
        )}
      </div>
      <style jsx>{`
        @keyframes pulseAndGrow {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.7;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes textSlideUp {
          0% {
            transform: translateY(10px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-text-slide-up {
          animation: textSlideUp 0.5s ease-in-out;
        }
        .animate-text-slide-up:not(:last-child) {
          animation: textSlideUp 0.5s ease-in-out reverse;
        }
      `}</style>
    </div>
  );
};

export default Asy;