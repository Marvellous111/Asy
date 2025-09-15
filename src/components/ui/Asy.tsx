"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { AudioLines, Keyboard, X, Send, LoaderCircle } from "lucide-react";
import { useTamboThreadInput, useTamboThread } from "@tambo-ai/react";

declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}


interface AsyProps {
  children: React.ReactNode; // We want to wrap content in modetoggle
}



const Asy: React.FC<AsyProps> = ({ children }) => {
  const [isTextMode, setIsTextMode] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [transcript, setTranscript] = useState("");
  const [isTextSubmitting, setIsTextSubmitting] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [colorFilter, setColorFilter] = useState('');
  const [isDyslexiaFont, setIsDyslexiaFont] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
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
    console.log("trasncript sent", transcript);
    const query = isVoiceMode ? transcript : textInput;
    if (!query.trim()) return;
    // setValue(query);

    if (isTextSubmitting == false) setIsTextSubmitting(true);
    try {
      await sendThreadMessage(query, {
        streamResponse: true,
      });
      console.log("Tambo response:", thread);
      console.log("info text submit:", isTextSubmitting)
    } catch (error) {
      console.error("Error occurred for tambo text: ", error);
      if (isTextSubmitting) setIsTextSubmitting(false)
      console.log("info text submit:", isTextSubmitting)
    } finally {
      if (isTextSubmitting) setIsTextSubmitting(false)
      console.log("info text submit:", isTextSubmitting)
    }
    

    const toolResult = thread.messages[thread.messages.length - 2].content[0]
    console.log(toolResult)

    if (isTextSubmitting) setIsTextSubmitting(false)

    console.log("info text submit:", isTextSubmitting)

    const resultText = toolResult["text"];

    const jsonParsedText = JSON.parse(resultText)

    if (jsonParsedText["newSize"]) {
      const correctfontsize = jsonParsedText["newSize"];
      console.log(jsonParsedText)
      setFontSize(correctfontsize);
    }
    if (jsonParsedText["filterId"]) {
      const filterId = jsonParsedText["filterId"];
      if (filterId !== ""){
        setColorFilter(`url(#${filterId})`)
      } else {
        setColorFilter("url(#normal)")
      }
    }
    if (jsonParsedText["dyslexiaFont"]) {
      setIsDyslexiaFont(jsonParsedText["dyslexiaFont"])
    }
    if (jsonParsedText["reduceMotion"]) {
      const reduceMotion = jsonParsedText["reduceMotion"];
      setIsReducedMotion(reduceMotion)
    }
    setTextInput("");
    setTranscript("");
  };

  const toggleListening = () => {
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      handleSend()
    } else if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return (
    <div 
      ref={contentRef} 
      className={
        `${isReducedMotion ? "motion-reduce:transition-none motion-reduce:hover:transition-none" : ""}
        ${isDyslexiaFont ? "dyslexia-font" : ""}
        min-h-screen`
      } 
      style={{
        fontSize: `${fontSize}rem`,
        filter: colorFilter
      }}
    >
      {children}
      {/* Hidden SVG for color blindness filters */}
      <svg style={{ display: 'none' }}>
        <defs>
          <filter id="protanopia">
            <feColorMatrix type="matrix" values="0.567 0.433 0 0 0 0.558 0.442 0 0 0 0 0.242 0.758 0 0 0 0 0 1 0" />
          </filter>
          <filter id="protanomaly">
            <feColorMatrix type="matrix" values="0.817 0.183 0 0 0 0.333 0.667 0 0 0 0 0.125 0.875 0 0 0 0 0 1 0" />
          </filter>
          <filter id="deuteranopia">
            <feColorMatrix type="matrix" values="0.625 0.375 0 0 0 0.7 0.3 0 0 0 0 0.3 0.7 0 0 0 0 0 1 0" />
          </filter>
          <filter id="deuteranomaly">
            <feColorMatrix type="matrix" values="0.8 0.2 0 0 0 0.258 0.742 0 0 0 0 0.142 0.858 0 0 0 0 0 1 0" />
          </filter>
          <filter id="tritanopia">
            <feColorMatrix type="matrix" values="0.95 0.05 0 0 0 0 0.433 0.567 0 0 0 0.475 0.525 0 0 0 0 0 1 0" />
          </filter>
          <filter id="tritanomaly">
            <feColorMatrix type="matrix" values="0.967 0.033 0 0 0 0 0.733 0.267 0 0 0 0.183 0.817 0 0 0 0 0 1 0" />
          </filter>
          <filter id="achromatopsia">
            <feColorMatrix type="matrix" values="0.299 0.587 0.114 0 0 0.299 0.587 0.114 0 0 0.299 0.587 0.114 0 0 0 0 0 1 0" />
          </filter>
          <filter id="achromatomaly">
            <feColorMatrix type="matrix" values="0.618 0.320 0.062 0 0 0.163 0.775 0.062 0 0 0.163 0.320 0.516 0 0 0 0 0 1 0" />
          </filter>
          <filter id="normal">
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" />
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
              <div className="absolute left-[0px] bottom-4 w-full px-4 text-center">
                <span
                  className="text-black text-sm truncate max-w-full bg-grey-500 rounded-md block animate-text-slide-up"
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
                title={isTextSubmitting ? "Sending message..." : "Send message to Tambo"}
                onClick={handleSend}
                aria-label={isTextSubmitting ? "Sending message..." : "Send message to Tambo"}
                aria-busy={isTextSubmitting}
                disabled={isTextSubmitting || !textInput.trim()}
                className={`p-2 rounded-full w-full h-[40px] flex justify-center items-center-safe gap-3 transition-colors ${
                  isTextSubmitting
                    ? "bg-gray-600 cursor-not-allowed"
                    : textInput.trim()
                    ? "bg-black hover:bg-black cursor-pointer"
                    : "bg-gray-600 cursor-not-allowed"
                }`}
              >
                {isTextSubmitting ? (
                  <div className="flex gap-3 w-full items-center justify-center">
                    <LoaderCircle 
                      strokeWidth={1.75}
                      absoluteStrokeWidth
                      size={16}
                      className="text-white animate-spin"
                    />
                    <span className="text-white">Sending message</span>
                  </div>
                ) : (
                  <div className="flex gap-3 w-full items-center justify-center">
                    <Send
                      strokeWidth={1.75}
                      absoluteStrokeWidth
                      size={16}
                      className="text-white"
                    />
                    <span className="text-white">Send message to AI</span>
                  </div>
                )}
                
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