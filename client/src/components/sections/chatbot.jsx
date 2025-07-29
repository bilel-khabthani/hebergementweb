// src/components/Chatbot.jsx
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function Chatbot({ isChatOpen, toggleChat }) {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [welcomeSent, setWelcomeSent] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/chat/questions");
        const data = await res.json();
        setQuestions(data);
      } catch (err) {
        console.error("Erreur chargement questions :", err);
      }
    };
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (isChatOpen && !welcomeSent) {
      const welcomeMsg = {
        content: "👋 Bonjour et bienvenue ! Je suis là pour répondre à vos questions.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages([welcomeMsg]);
      setWelcomeSent(true);
    }
  }, [isChatOpen, welcomeSent]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (messages.length === 0) return;
    const lastMsg = messages[messages.length - 1];
    if (
      lastMsg.sender === "ai" &&
      lastMsg.content !==
        "💡 N’hésitez pas à poser une autre question ou à contacter l’admin via le bouton ci-dessous."
    ) {
      const timer = setTimeout(() => {
        const autoMsg = {
          content:
            "💡 N’hésitez pas à poser une autre question ou à contacter l’admin via le bouton ci-dessous.",
          sender: "ai",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, autoMsg]);
      }, 20000);
      return () => clearTimeout(timer);
    }
  }, [messages]);

  const handleSendMessageFromButton = async (questionText) => {
    const userMsg = {
      content: questionText,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const res = await fetch("http://localhost:8080/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: questionText }),
      });
      const data = await res.json();
      const aiMsg = {
        content: data.reply || "Pas de réponse du serveur.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error("Erreur chatbot:", err);
      const errorMsg = {
        content: "❌ Erreur lors de la connexion au serveur.",
        sender: "system",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-pink-500 to-orange-400 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 z-50"
        aria-label="Ouvrir le chat"
      >
        <MessageCircle size={24} />
      </motion.button>

      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.35 }}
            className="fixed bottom-20 right-6 w-80 max-h-[80vh] bg-white rounded-xl shadow-2xl border border-gray-300 z-50 overflow-hidden flex flex-col"
          >
            <div className="bg-gradient-to-r from-pink-600 to-orange-400 p-4 flex justify-between items-center">
              <h3 className="text-white font-semibold text-lg tracking-wide">
                Support Memo
              </h3>
              <button
                onClick={toggleChat}
                className="text-white hover:text-gray-300 transition-colors text-xl font-bold"
              >
                &times;
              </button>
            </div>

            <div className="p-4 overflow-y-auto bg-gray-50 flex-1 scrollbar-thin scrollbar-thumb-pink-400 scrollbar-track-gray-200">
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mt-2 flex justify-start"
                >
                  <div className="bg-pink-100 text-pink-800 rounded-lg p-3 max-w-[75%] animate-pulse">
                    <p>Écrit…</p>
                  </div>
                </motion.div>
              )}
              <AnimatePresence>
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                    className={`mt-2 flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[75%] rounded-lg p-3 shadow ${
                        msg.sender === "user"
                          ? "bg-orange-100 text-orange-900"
                          : msg.sender === "ai"
                          ? "bg-pink-100 text-pink-900"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                      <span className="block text-xs opacity-60 mt-1 text-right select-none">
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-gray-300 bg-gray-100 max-h-44 overflow-y-auto scrollbar-thin scrollbar-thumb-pink-500 scrollbar-track-gray-300">
              <p className="mb-3 text-sm font-semibold text-gray-700">
                Questions rapides :
              </p>
              <div className="flex flex-col space-y-3">
                {questions.map((q, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleSendMessageFromButton(q)}
                    className="relative bg-white text-gray-900 rounded-lg py-2 px-4 text-left font-medium shadow-md
                      transition-transform transform
                      hover:-translate-y-1 hover:shadow-lg
                      active:translate-y-0 active:shadow-md
                      before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-pink-400 before:to-orange-300 before:opacity-20 before:-z-10"
                  >
                    {q}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-gray-300 bg-gray-100">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  window.open("mailto:pegasioprojet@gmail.com", "_blank");
                }}
                className="w-full bg-pink-600 hover:bg-orange-500 text-white font-semibold py-2 rounded-lg shadow-md transition-colors duration-300"
              >
                Contacter un attaché commercial
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}