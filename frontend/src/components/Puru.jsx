import React, { useEffect, useRef, useState } from "react";
import puru from "../assets/puru.png"; // make sure this exists

const QA_PAIRS = [
  { q: "What is Pramanu?", a: "Pramanu is a system that tracks Ayurvedic herbs from the farm to the final product using blockchain." },
  { q: "How does it help farmers?", a: "It records where and when they collect herbs and helps them get fair prices for good practices." },
  { q: "Why use blockchain?", a: "Because records on blockchain cannot be changed or faked." },
  { q: "How can customers use it?", a: "They scan a QR code on the pack to see the full journey of the herb." },
  { q: "What is recorded at harvest?", a: "Place, date, collector’s name, type of herb, and basic quality details." },
  { q: "Will it work without internet?", a: "Yes, data can be saved offline and uploaded later." },
  { q: "What about lab testing?", a: "Test results like purity, pesticide check, and DNA check are stored in the system." },
  { q: "How does it protect nature?", a: "It makes sure herbs are collected only in the right season, area, and limit." },
  { q: "Who can see the data?", a: "Farmers, companies, regulators, and customers — each with proper access." },
  { q: "Which herb will you start with?", a: "We start with Ashwagandha and later add more herbs." }
];

const normalize = (s = "") => s.toLowerCase().replace(/[^\w\s]/g, "").trim();
const buildMap = () => {
  const m = {};
  QA_PAIRS.forEach(({ q, a }) => (m[normalize(q)] = a));
  return m;
};
const QA_MAP = buildMap();
const DEFAULT_ANSWER = "Sorry, I don't have answers for this";

export default function Puru() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! I’m PURU. Your Praman saathi" }
  ]);
  const [userInput, setUserInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [imgError, setImgError] = useState(false);

  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing, isOpen]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 120);
  }, [isOpen]);

  const getBotReply = (question) => QA_MAP[normalize(question)] || DEFAULT_ANSWER;
  const pushMessage = (msg) => setMessages((prev) => [...prev, msg]);

  const handleSend = (e) => {
    e?.preventDefault();
    const text = userInput.trim();
    if (!text) return;
    pushMessage({ from: "user", text });
    setUserInput("");
    setTyping(true);
    setTimeout(() => {
      pushMessage({ from: "bot", text: getBotReply(text) });
      setTyping(false);
    }, 1200);
  };

  const handleQuickAsk = (q) => {
    setUserInput(q);
    setTimeout(() => handleSend({ preventDefault: () => {} }), 80);
  };

  return (
    <>
      {/* Floating button wrapper */}
      <div className="fixed right-5 bottom-20 z-50">
        <div className="relative w-16 h-16">
          {/* main button */}
          <button
            aria-label="Open PURU chat"
            onClick={() => setIsOpen(true)}
            className="relative z-10 w-16 h-16 bg-white shadow-lg rounded-full flex items-center justify-center border hover:scale-110 transform transition"
          >
            {!imgError ? (
              <img
                src={puru}
                alt="PURU"
                className="w-10 h-10 animate-slow-bounce"
                onError={() => setImgError(true)}
              />
            ) : (
              <span className="text-3xl animate-slow-bounce">🤖</span>
            )}
          </button>
        </div>
      </div>

      {/* Chat popup */}
      {isOpen && (
        <div className="fixed right-5 bottom-32 z-50 w-96 max-w-[92vw] h-[520px] bg-white shadow-2xl rounded-xl flex flex-col overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="flex justify-between items-center bg-blue-600 text-white px-4 py-2">
            <div className="flex items-center gap-2">
              {!imgError ? (
                <img src={puru} alt="PURU" className="w-6 h-6 rounded" onError={() => setImgError(true)} />
              ) : (
                <span className="text-xl">🤖</span>
              )}
              <h2 className="font-bold">PURU</h2>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-lg font-bold p-1 rounded hover:bg-white/10"
              aria-label="Close chat"
            >
              ✖
            </button>
          </div>

          {/* Quick Questions */}
          <div className="px-3 py-2 border-b border-gray-100 bg-gray-50">
            <div className="text-xs text-gray-600 mb-1">Try one of these:</div>
            <div className="flex flex-wrap gap-2">
              {QA_PAIRS.slice(0, 6).map((qa, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickAsk(qa.q)}
                  className="text-xs px-2 py-1 bg-white border border-gray-200 rounded-md hover:bg-blue-50"
                >
                  {qa.q}
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3 text-sm">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`px-3 py-2 rounded-lg max-w-[78%] break-words ${
                    msg.from === "user"
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex justify-start">
                <div className="bg-gray-200 px-3 py-2 rounded-lg">
                  <span className="inline-block animate-pulse">Typing…</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="flex border-t border-gray-300">
            <input
              ref={inputRef}
              type="text"
              className="flex-1 px-3 py-3 outline-none text-sm"
              placeholder="Ask something..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button type="submit" className="px-4 bg-blue-600 text-white hover:bg-blue-700" aria-label="Send message">
              Send
            </button>
          </form>
        </div>
      )}

      {/* Tailwind custom bounce */}
      <style jsx>{`
        @keyframes slow-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); } /* slower, smaller bounce */
        }
        .animate-slow-bounce {
          animation: slow-bounce 1s infinite; /* 3 seconds for slow bounce */
        }
      `}</style>
    </>
  );
}
