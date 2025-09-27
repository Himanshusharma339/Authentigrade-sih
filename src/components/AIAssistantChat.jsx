import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, X, Bot, User, Loader2 } from "lucide-react";
import {
  getStreamingAssistantResponse,
  moderateUserContent,
} from "../services/openaiServices";

const AIAssistantChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "assistant",
      content:
        "Hello! I'm AuthentiGrade AI, your intelligent assistant for certificate verification and management. How can I help you today?",
      timestamp: new Date()?.toISOString(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingMessage]);

  const handleSendMessage = async () => {
    if (!inputMessage?.trim()) return;

    // Moderate user input
    try {
      const moderation = await moderateUserContent(inputMessage);
      if (moderation?.flagged) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            type: "system",
            content:
              "Your message contains inappropriate content and cannot be processed. Please rephrase your question.",
            timestamp: new Date()?.toISOString(),
          },
        ]);
        setInputMessage("");
        return;
      }
    } catch (error) {
      console.error("Moderation error:", error);
    }

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: inputMessage,
      timestamp: new Date()?.toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);
    setStreamingMessage("");

    try {
      // Get context from current page/state (mock for now)
      const context = {
        currentPage: window.location?.pathname,
        userRole: "admin", // This would come from your auth system
        timestamp: new Date()?.toISOString(),
      };

      // Use streaming response for better UX
      await getStreamingAssistantResponse(
        userMessage?.content,
        (chunk) => {
          setStreamingMessage((prev) => prev + chunk);
        },
        context
      );

      // Add the complete streamed message
      const assistantMessage = {
        id: Date.now() + 1,
        type: "assistant",
        content: streamingMessage,
        timestamp: new Date()?.toISOString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setStreamingMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: "assistant",
          content:
            "I apologize, but I encountered an error processing your request. Please try again or contact support if the issue persists.",
          timestamp: new Date()?.toISOString(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === "Enter" && !e?.shiftKey) {
      e?.preventDefault();
      handleSendMessage();
    }
  };

  const quickPrompts = [
    "How do I upload a certificate?",
    "What makes a certificate suspicious?",
    "How does fraud detection work?",
    "What are the verification steps?",
  ];

  const handleQuickPrompt = (prompt) => {
    setInputMessage(prompt);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-colors z-50"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-blue-600 text-white rounded-t-lg">
        <div className="flex items-center space-x-3">
          <Bot className="h-5 w-5" />
          <div>
            <h3 className="font-semibold">AuthentiGrade</h3>
            <p className="text-xs opacity-90">Online • Ready to help</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white hover:bg-blue-700 p-1 rounded"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages?.map((message) => (
          <div
            key={message?.id}
            className={`flex ${
              message?.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex space-x-2 max-w-[80%] ${
                message?.type === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div
                className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                  message?.type === "user"
                    ? "bg-blue-600 text-white"
                    : message?.type === "system"
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {message?.type === "user" ? (
                  <User className="h-4 w-4" />
                ) : (
                  <Bot className="h-4 w-4" />
                )}
              </div>
              <div
                className={`rounded-lg p-3 ${
                  message?.type === "user"
                    ? "bg-blue-600 text-white"
                    : message?.type === "system"
                    ? "bg-red-50 text-red-800 border border-red-200"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">
                  {message?.content}
                </p>
                <p className={`text-xs mt-1 opacity-70`}>
                  {new Date(message.timestamp)?.toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Streaming message */}
        {streamingMessage && (
          <div className="flex justify-start">
            <div className="flex space-x-2 max-w-[80%]">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
                <Bot className="h-4 w-4" />
              </div>
              <div className="rounded-lg p-3 bg-gray-100 text-gray-900">
                <p className="text-sm whitespace-pre-wrap">
                  {streamingMessage}
                </p>
                <div className="flex items-center mt-1">
                  <Loader2 className="h-3 w-3 animate-spin opacity-70" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Typing indicator */}
        {isTyping && !streamingMessage && (
          <div className="flex justify-start">
            <div className="flex space-x-2">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
                <Bot className="h-4 w-4" />
              </div>
              <div className="rounded-lg p-3 bg-gray-100 text-gray-900">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      {/* Quick Prompts */}
      {messages?.length === 1 && (
        <div className="px-4 pb-2">
          <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {quickPrompts?.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handleQuickPrompt(prompt)}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Input */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex space-x-2">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e?.target?.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about certificates..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={1}
            disabled={isTyping}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage?.trim() || isTyping}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Press Enter to send • Shift + Enter for new line
        </p>
      </div>
    </div>
  );
};

export default AIAssistantChat;
