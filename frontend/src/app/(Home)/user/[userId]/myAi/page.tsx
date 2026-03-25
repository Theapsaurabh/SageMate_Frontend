"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, HeartHandshake, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function MyAITherapyChat() {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hey, I'm your AI Therapist. Tell me what’s bothering you today? I'm here to listen. 💙"
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // API dedicated to therapy conversation
    const res = await fetch("https://localhost:3001/ai/therapy-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMsg.text }),
    });

    const data = await res.json();

    setMessages((prev) => [...prev, { sender: "ai", text: data.reply }]);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="p-6 text-center">
        <h1 className="text-3xl font-bold flex justify-center gap-2">
          <HeartHandshake className="text-purple-600" />
          MyAI – Your Personal Therapist
        </h1>
        <p className="text-gray-600 mt-2">Safe, private and supportive conversations.</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 space-y-4">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`max-w-[75%] p-3 rounded-2xl ${
              msg.sender === "user"
                ? "ml-auto bg-purple-600 text-white"
                : "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            }`}
          >
            {msg.text}
          </motion.div>
        ))}

        {loading && (
          <p className="text-center text-purple-600 animate-pulse">Thinking...</p>
        )}
      </div>

      <div className="p-4 border-t bg-white dark:bg-gray-900 flex gap-2">
        <Input
          placeholder="Share your thoughts…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <Button onClick={sendMessage} disabled={loading}>
          <Send />
        </Button>
      </div>
    </div>
  );
}
