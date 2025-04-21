"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  Sparkle,
  X,
  ImageIcon,
  CornerDownLeft,
} from "lucide-react";

interface Message {
  type: "user" | "assistant";
  text: string;
}

interface AssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Assistant({ isOpen, onClose }: AssistantProps) {
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "60px";
      textarea.style.height = `${Math.min(200, textarea.scrollHeight)}px`;
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageText(e.target.value);
    adjustTextareaHeight();
  };

  const simulateStreaming = (text: string) => {
    setIsStreaming(true);
    const words = text.split(" ");
    let currentIndex = 0;

    const streamWord = () => {
      if (currentIndex < words.length) {
        setStreamingText((prev) =>
          prev + (currentIndex === 0 ? "" : " ") + words[currentIndex]
        );
        currentIndex++;
        setTimeout(streamWord, 50);
      } else {
        setIsStreaming(false);
        setStreamingText("");
        setMessages((prev) => [...prev, { type: "assistant", text }]);
      }
    };

    streamWord();
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    setMessages((prev) => [...prev, { type: "user", text: messageText }]);
    setMessageText("");
    adjustTextareaHeight();

    setTimeout(() => {
      simulateStreaming(
        "I understand you want to create a new web application. I can help you with that. Let's start by setting up the basic structure and dependencies. What kind of features would you like to include?"
      );
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    const file = files[0];
    setMessageText((prev) => `${prev}[Attached file: ${file.name}]\n`);
    
    e.target.value = '';
  };

  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`fixed top-[35px] right-0 bottom-0 w-[288px] bg-[#292929] flex flex-col transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Assistant Header */}
      <div className="h-[40px] flex-none flex items-center justify-between px-4 border-b border-[#454545] bg-[#292929]">
        <div className="flex items-center gap-2">
          <Sparkle className="w-[14px] h-[14px] text-[#C4AFFF]" strokeWidth={2} />
          <span className="text-[11.5px] leading-[13px] text-[#CCCCCC] tracking-[-0.01em]">
            AI Assistant
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-[#CCCCCC] hover:text-white"
        >
          <X className="w-[14px] h-[14px] text-[#BDBDBD]" strokeWidth={2} />
        </button>
      </div>

      {/* Assistant Content */}
      <div className="flex-1 p-3 overflow-y-auto space-y-4 [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:bg-[#1E1E1E] [&::-webkit-scrollbar-thumb]:bg-[#424242] [&::-webkit-scrollbar-thumb]:hover:bg-[#4F4F4F]">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-b from-purple-600 to-blue-600 flex items-center justify-center mb-4">
              <Sparkle className="w-6 h-6 text-[#C4AFFF]" />
            </div>
            <h2 className="text-white text-xl font-semibold mb-2">
              What do you want to build?
            </h2>
            <p className="text-[#CCCCCC] text-sm">
              Prompt, run, edit, and deploy full-stack apps within your Webflow site
            </p>
          </div>
        ) : (
          <>
            {messages.map((message, index) =>
              message.type === "user" ? (
                <div key={index} className="flex justify-end">
                  <div className="w-full bg-[#353535] rounded-[8px] p-3">
                    <div className="flex items-start gap-2">
                      <Image
                        src="/images/Avatar.png"
                        alt="User avatar"
                        width={24}
                        height={24}
                        className="w-6 h-6 rounded-full"
                      />
                      <div className="flex-1 text-[11.5px] leading-[20px] text-[#CCCCCC] whitespace-pre-wrap font-inter font-normal">
                        {message.text}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div key={index} className="flex">
                  <div className="text-[11.5px] leading-[20px] text-[#CCCCCC] whitespace-pre-wrap font-inter font-normal">
                    {message.text}
                  </div>
                </div>
              )
            )}
            {isStreaming && (
              <div className="flex">
                <div className="text-[11.5px] leading-[20px] text-[#CCCCCC] whitespace-pre-wrap font-inter font-normal">
                  {streamingText}
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="flex-none p-3">
        <div className="border border-[#454545] bg-[#202020] rounded-[4px]">
          <div className="flex flex-col">
            <textarea
              ref={textareaRef}
              value={messageText}
              onChange={handleMessageChange}
              onKeyDown={handleKeyPress}
              className="w-full min-h-[60px] bg-[#1E1E1E] text-[#CCCCCC] resize-none p-2 focus:outline-none text-[13px] leading-[20px] font-inter font-normal"
              placeholder="Type your message..."
              style={{
                maxHeight: "200px",
                overflowY:
                  messageText.split("\n").length > 1 ? "auto" : "hidden",
              }}
            />
            <div className="flex justify-between items-center px-2 py-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*"
                className="hidden"
              />
              <button 
                onClick={handleImageButtonClick}
                className="h-6 w-6 flex items-center justify-center rounded hover:text-white transition-colors"
              >
                <ImageIcon className="w-[14px] h-[14px] text-[#BDBDBD]" strokeWidth={2} />
              </button>
              <button
                onClick={handleSendMessage}
                disabled={!messageText.trim()}
                className={`h-6 px-3 rounded flex items-center gap-2 transition-colors ${
                  messageText.trim()
                    ? "bg-[#007ACC] hover:bg-[#1B8AE0] text-white"
                    : "bg-[#3C3C3C] text-[#848484] cursor-not-allowed"
                }`}
              >
                <span className="text-[11.5px]">Send</span>
                <CornerDownLeft className="w-[14px] h-[14px] text-[#BDBDBD]" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 