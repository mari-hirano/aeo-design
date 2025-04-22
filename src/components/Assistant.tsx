"use client";

import { useRef, useState, useEffect } from "react";
import {
  Sparkle,
  X,
  Paperclip,
  CornerDownLeft,
  Loader2,
  CheckCircle2,
  ChevronDown,
  CircleStop,
  Square,
} from "lucide-react";

interface Message {
  type: "user" | "assistant";
  text: string;
  attachments?: Attachment[];
}

interface Step {
  id: number;
  text: string;
  file?: string;
  isStarted: boolean;
  isCompleted: boolean;
}

interface Attachment {
  id: string;
  file: File;
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
  const [showInitializing, setShowInitializing] = useState(false);
  const [showStructuredContent, setShowStructuredContent] = useState(false);
  const [isContentExpanded, setIsContentExpanded] = useState(true);
  const [steps, setSteps] = useState<Step[]>([
    { id: 1, text: "Create", file: "package.json", isStarted: false, isCompleted: false },
    { id: 2, text: "Create", file: "src/main.jsx", isStarted: false, isCompleted: false },
    { id: 3, text: "Install dependencies", file: "npm install", isStarted: false, isCompleted: false },
    { id: 4, text: "Create", file: "src/components.tsx", isStarted: false, isCompleted: false },
    { id: 5, text: "Update", file: "src/app.tsx", isStarted: false, isCompleted: false },
    { id: 6, text: "Start application", file: "npm run dev", isStarted: false, isCompleted: false },
  ]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isResponding, setIsResponding] = useState(false);
  const [finalMessageStreaming, setFinalMessageStreaming] = useState(false);
  const [finalMessageText, setFinalMessageText] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);

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

  const startNextStep = (currentStepId: number) => {
    const nextStep = steps.find(step => step.id === currentStepId + 1);
    if (nextStep) {
      setTimeout(() => {
        setSteps(prev => prev.map(step =>
          step.id === nextStep.id ? { ...step, isStarted: true } : step
        ));
        setTimeout(() => {
          setSteps(prev => prev.map(step =>
            step.id === nextStep.id ? { ...step, isCompleted: true } : step
          ));
          startNextStep(nextStep.id);
        }, 1000 + Math.random() * 2000); // Random time between 1-3 seconds
      }, Math.random() * 1000); // Random time between 0-1 second
    } else {
      // All steps are complete
      setTimeout(() => {
        streamFinalMessage();
      }, 1000);
    }
  };

  const streamFinalMessage = () => {
    const finalMessage = "The development server is now running and you can see your app. Feel free to customize the content, colors, or layout to better match your brand styles!";
    setFinalMessageStreaming(true);
    const words = finalMessage.split(' ');
    let currentIndex = 0;

    const streamWord = () => {
      if (currentIndex < words.length) {
        const word = words[currentIndex];
        const space = currentIndex < words.length - 1 ? ' ' : '';
        setFinalMessageText((prev) => prev + word + space);
        currentIndex++;
        setTimeout(() => {
          scrollToBottom();
          streamWord();
        }, 50);
      } else {
        setFinalMessageStreaming(false);
        setIsResponding(false);
      }
    };

    streamWord();
  };

  const simulateStreaming = (text: string) => {
    setIsStreaming(true);
    setIsResponding(true);
    const words = text.split(' ');
    let currentIndex = 0;

    const streamWord = () => {
      if (currentIndex < words.length) {
        const word = words[currentIndex];
        const space = currentIndex < words.length - 1 ? ' ' : '';
        setStreamingText((prev) => prev + word + space);
        currentIndex++;
        setTimeout(() => {
          scrollToBottom();
          streamWord();
        }, 50);
      } else {
        setIsStreaming(false);
        setStreamingText("");
        setMessages((prev) => [...prev, { type: "assistant", text }]);
        setShowInitializing(true);
        setTimeout(() => {
          setShowInitializing(false);
          setShowStructuredContent(true);
          setTimeout(() => {
            setSteps(prev => prev.map(step =>
              step.id === 1 ? { ...step, isStarted: true } : step
            ));
            setTimeout(() => {
              setSteps(prev => prev.map(step =>
                step.id === 1 ? { ...step, isCompleted: true } : step
              ));
              startNextStep(1);
            }, 2000);
          }, 1000);
        }, 3000);
        scrollToBottom();
      }
    };

    streamWord();
  };

  // Update useEffect to include finalMessageText in dependencies
  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingText, finalMessageText]);

  const handleSendMessage = () => {
    if (!messageText.trim() && attachments.length === 0) return;

    setMessages((prev) => [...prev, { 
      type: "user", 
      text: messageText,
      attachments: attachments.length > 0 ? [...attachments] : undefined
    }]);
    
    setMessageText("");
    setAttachments([]);
    adjustTextareaHeight();

    setTimeout(() => {
      simulateStreaming(
        "I will help you create a Dog training checklist app.\nFirst, let's establish some key architectural decisions:\n\n1. Tech Stack\n   - Next.js with TypeScript\n   - Tailwind CSS for styling\n   - Mobile-first design approach\n\n2. Core Features\n   - Interactive training checklists\n   - Progress tracking & analytics\n   - Photo/video documentation\n   - Customizable templates\n\nLet's start by setting up the basic structure and initial UI components."
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

    const newAttachments = Array.from(files).map(file => ({
      id: Math.random().toString(36).substring(7),
      file
    }));
    
    setAttachments(prev => [...prev, ...newAttachments]);
    e.target.value = '';
  };

  const handleRemoveAttachment = (id: string) => {
    setAttachments(prev => prev.filter(attachment => attachment.id !== id));
  };

  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    return () => {
      // Cleanup object URLs when component unmounts
      attachments.forEach(attachment => {
        if (attachment.file.type.startsWith('image/')) {
          URL.revokeObjectURL(URL.createObjectURL(attachment.file));
        }
      });
    };
  }, [attachments]);

  return (
    <div
      className={`fixed top-[35px] right-0 bottom-0 w-[288px] bg-[#292929] flex flex-col transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -100% 50%; }
          100% { background-position: 200% 50%; }
        }
        .shimmer-text {
          background: linear-gradient(90deg, #666666 0%, #CCCCCC 50%, #666666 100%);
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shimmer 2s linear infinite;
        }
        .expand-height {
          transition: all 0.3s ease-out;
        }
        .content-section {
          transition: max-height 0.3s ease-out, opacity 0.2s ease-out;
          overflow: hidden;
        }
        .content-section.collapsed {
          max-height: 0;
          opacity: 0;
        }
        .content-section.expanded {
          max-height: 499px;
          opacity: 1;
        }
      `}</style>

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
                  <div className="w-full bg-[#353535] rounded-[8px] p-2">
                    <div className="flex flex-col gap-2">
                      {message.attachments && message.attachments.length > 0 && (
                        <div className="flex gap-2 mb-1 overflow-x-auto">
                          {message.attachments.map((attachment) => (
                            <div
                              key={attachment.id}
                              className="flex-shrink-0"
                            >
                              <div className="w-10 h-10 bg-[#292929] rounded flex items-center justify-center overflow-hidden">
                                {attachment.file.type.startsWith('image/') ? (
                                  <img
                                    src={URL.createObjectURL(attachment.file)}
                                    alt={attachment.file.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <Square className="w-5 h-5 text-[#CCCCCC]" />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="flex items-start gap-2">
                        <img
                          src="/orion/images/Avatar.png"
                          alt="User avatar"
                          className="w-4 h-4 rounded-full m-0.5"
                          onError={(e) => {
                            console.error('Error loading avatar image');
                            e.currentTarget.src = '/orion/images/Avatar.png';
                          }}
                        />
                        <div className="flex-1 text-[11.5px] leading-[20px] text-[#CCCCCC] whitespace-pre-wrap font-inter font-normal">
                          {message.text}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div key={index} className="flex flex-col gap-4">
                  <div className="text-[11.5px] leading-[20px] text-[#CCCCCC] whitespace-pre-wrap font-inter font-normal">
                    {message.text}
                  </div>
                  {index === messages.length - 1 && showStructuredContent && (
                    <div className={`w-full border border-[#454545] rounded-[4px] text-[11.5px] leading-[20px] text-[#CCCCCC] font-inter font-normal expand-height`}>
                      <button 
                        onClick={() => setIsContentExpanded(!isContentExpanded)}
                        className={`w-full p-2 font-semibold bg-[#353535] flex items-center justify-between ${steps.some(step => step.isStarted) && isContentExpanded ? 'border-b border-[#454545]' : ''}`}
                      >
                        <span>Doggo training web app</span>
                        <ChevronDown 
                          className={`w-[14px] h-[14px] text-[#CCCCCC] transform transition-transform duration-300 ${isContentExpanded ? '' : '-rotate-90'}`}
                          strokeWidth={2}
                        />
                      </button>
                      {steps.some(step => step.isStarted) && (
                        <div className={`content-section ${isContentExpanded ? 'expanded' : 'collapsed'}`}>
                          <div className="p-2 pt-0 bg-[#292929]">
                            {steps.map(step => step.isStarted && (
                              <div key={step.id} className="flex items-center gap-1 mt-2">
                                {step.isCompleted ? (
                                  <CheckCircle2 className="w-[14px] h-[14px] text-[#79E09C]" strokeWidth={2} />
                                ) : (
                                  <Loader2 className="w-[14px] h-[14px] text-[#CCCCCC] animate-spin" strokeWidth={2} />
                                )}
                                <span className={!step.isCompleted ? 'shimmer-text' : ''}>
                                  {step.text}
                                </span>
                                <span className="bg-[#404040] px-0.5 rounded text-[#C0C0C0]">
                                  {step.file}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {index === messages.length - 1 && steps.every(step => step.isCompleted) && (
                    <div className="text-[11.5px] leading-[20px] text-[#CCCCCC] whitespace-pre-wrap font-inter font-normal">
                      {finalMessageText}
                    </div>
                  )}
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
            {showInitializing && (
              <div className="flex">
                <div className="text-[11.5px] leading-[20px] whitespace-pre-wrap font-inter font-normal shimmer-text">
                  Initializing...
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
            {attachments.length > 0 && (
              <div className="flex gap-2 p-2 border-b border-[#454545] overflow-x-auto">
                {attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="relative group flex-shrink-0"
                  >
                    <div className="w-10 h-10 bg-[#353535] rounded flex items-center justify-center overflow-hidden">
                      {attachment.file.type.startsWith('image/') ? (
                        <img
                          src={URL.createObjectURL(attachment.file)}
                          alt={attachment.file.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Square className="w-5 h-5 text-[#CCCCCC]" />
                      )}
                    </div>
                    <button
                      onClick={() => handleRemoveAttachment(attachment.id)}
                      className="absolute -top-1 -right-1 w-4 h-4 bg-[#454545] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3 text-[#CCCCCC]" />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 text-[10px] text-[#CCCCCC] truncate text-center px-1">
                      {attachment.file.name}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
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
                multiple
                className="hidden"
              />
              <button 
                onClick={handleImageButtonClick}
                className="h-6 w-6 flex items-center justify-center rounded text-[#BDBDBD] hover:text-white hover:bg-[#404040] active:bg-[#353535] transition-colors"
              >
                <Paperclip className="w-[14px] h-[14px]" strokeWidth={2} />
              </button>
              <button
                onClick={handleSendMessage}
                disabled={!messageText.trim() || isResponding}
                className={`h-6 rounded flex items-center gap-1 ${!isResponding ? 'pr-1' : ''} transition-colors ${
                  messageText.trim() && !isResponding
                    ? "bg-[#007ACC] hover:bg-[#1B8AE0] text-white"
                    : "bg-[#3C3C3C] text-[#848484] cursor-not-allowed"
                }`}
              >
                {isResponding ? (
                  <div className="w-6 h-6 flex items-center justify-center">
                    <CircleStop className="w-[14px] h-[14px]" strokeWidth={2} />
                  </div>
                ) : (
                  <>
                    <span className="text-[11.5px] px-1">Send</span>
                    <CornerDownLeft className="w-[14px] h-[14px]" strokeWidth={2} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 