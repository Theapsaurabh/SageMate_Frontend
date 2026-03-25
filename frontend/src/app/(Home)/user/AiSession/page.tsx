"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Activity, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const questions = [
  "I feel overwhelmed most of the time.",
  "I have trouble sleeping.",
  "I feel anxious or stressed daily.",
  "I get irritated easily.",
  "I feel sad for no reason.",
];

export default function AISession() {
  const [step, setStep] = useState<"test" | "chat" | "result">("test");
  const [score, setScore] = useState(0);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [messages, setMessages] = useState([
    { sender: "ai", text: "I'm your AI Mental Wellness Guide. Ask anything for instant recommendations." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnswer = (value: number) => {
    const newScores = [...answers, value];
    setAnswers(newScores);

    if (index + 1 < questions.length) {
      setIndex(index + 1);
    } else {
      const total = newScores.reduce((a, b) => a + b, 0);
      setScore(total);
      setStep("result");
    }
  };

  const getCategory = () => {
    if (score <= 5) return "Low Stress";
    if (score <= 10) return "Moderate Stress";
    if (score <= 15) return "High Stress";
    return "Severe Stress";
  };

  const getTherapist = () => {
    if (score <= 5) return "Mindfulness / Lifestyle Coach";
    if (score <= 10) return "CBT / Anxiety Specialist";
    if (score <= 15) return "Clinical Psychologist";
    return "Psychiatrist (Medical Doctor)";
  };

  const getCourse = () => {
    if (score <= 5) return "Meditation Basics, Yoga, Breathing Course";
    if (score <= 10) return "CBT Foundations, Anxiety Control Course";
    if (score <= 15) return "Emotional Healing Course";
    return "Deep Trauma Healing Program";
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const res = await fetch("https://localhost:3001/ai/recommendation-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMsg.text }),
    });

    const data = await res.json();

    setMessages((prev) => [...prev, { sender: "ai", text: data.reply }]);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 p-6">

      {/* Header */}
      <h1 className="text-3xl font-bold text-center flex justify-center gap-2 mb-6">
        <Brain className="text-blue-600" />
        AI Stress Test & Recommendations
      </h1>

      {/* Stress Test */}
      {step === "test" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-xl mx-auto bg-white dark:bg-gray-900 p-6 rounded-2xl shadow"
        >
          <h2 className="text-xl font-semibold mb-4">Quick Stress Test</h2>

          <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
            {questions[index]}
          </p>

          <div className="flex flex-col gap-3">
            {[0,1,2,3].map((val) => (
              <Button key={val} onClick={() => handleAnswer(val)}>
                {["Never", "Sometimes", "Often", "Always"][val]}
              </Button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Result Section */}
      {step === "result" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-xl mx-auto bg-white dark:bg-gray-900 p-6 rounded-2xl shadow space-y-4"
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Activity className="text-red-500" />
            Your Stress Report
          </h2>

          <p><strong>Stress Level:</strong> {getCategory()}</p>
          <p><strong>Recommended Therapist:</strong> {getTherapist()}</p>
          <p><strong>Recommended Courses:</strong> {getCourse()}</p>

          <Button className="w-full mt-4" onClick={() => setStep("chat")}>
            Continue Chat With AI
          </Button>
        </motion.div>
      )}

      {/* Chat After Test */}
      {step === "chat" && (
        <div className="max-w-2xl mx-auto mt-6 bg-white dark:bg-gray-900 p-4 rounded-2xl shadow">

          <div className="h-[400px] overflow-y-auto space-y-3">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                className={`p-3 rounded-xl max-w-[75%] ${
                  msg.sender === "user"
                    ? "ml-auto bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700"
                }`}
              >
                {msg.text}
              </motion.div>
            ))}
            {loading && <p className="text-blue-500">Thinking...</p>}
          </div>

          <div className="flex gap-2 mt-4">
            <input
              className="flex-1 border rounded-lg px-3 py-2 dark:bg-gray-800"
              placeholder="Ask anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button onClick={sendMessage}>
              <Send />
            </Button>
          </div>
        </div>
      )}

    </div>
  );
}
