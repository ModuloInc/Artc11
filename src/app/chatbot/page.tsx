// src/app/page.tsx
"use client";

import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [response, setResponse] = useState<string>("Hi there! How can I assist you?");
  const [value, setValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  const handleSubmit = async () => {
    if (!value.trim()) return;

    setIsLoading(true);
    try {
      const response = (await axios.post("/chat", { question: value })).data
        .choices[0].message.content;
      setResponse(response);
      setValue(""); // Clear input after sending
    } catch (error) {
      console.error("Error fetching response:", error);
      setResponse("Sorry, there was an error processing your request.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">EU Politics Chatbot</h1>

        <div className="mb-6 bg-gray-50 p-4 rounded-lg max-h-60 overflow-y-auto">
          <p className="text-gray-800">{response}</p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={value}
            onChange={onChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question about EU politics..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></input>

          <button
            onClick={handleSubmit}
            disabled={isLoading || !value.trim()}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isLoading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;