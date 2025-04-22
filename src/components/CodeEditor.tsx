"use client";

import { ChevronRight } from "lucide-react";
import Editor from "@monaco-editor/react";
import Image from "next/image";

interface CodeEditorProps {
  isPreviewVisible: boolean;
  isAssistantOpen: boolean;
  editorValue: string;
  onEditorChange: (value: string | undefined) => void;
  onPreviewToggle: () => void;
  onAssistantToggle: () => void;
}

export function CodeEditor({
  isPreviewVisible,
  isAssistantOpen,
  editorValue,
  onEditorChange,
  onPreviewToggle,
  onAssistantToggle,
}: CodeEditorProps) {
  return (
    <div
      style={{ width: isPreviewVisible ? "50%" : "100%" }}
      className="flex flex-col min-h-0 border-r border-[#454545] transition-[width] duration-300"
    >
      <div className="h-[40px] flex-none border-b border-[#454545] flex items-center justify-between pl-4 pr-2 bg-[#292929]">
        <span className="text-[11.5px] leading-[13px] text-[#CCCCCC] tracking-[-0.01em] flex items-center">
          src <ChevronRight className="w-[14px] h-[14px] mx-1 text-white/67" strokeWidth={2} />{" "}
          app <ChevronRight className="w-[14px] h-[14px] mx-1 text-white/67" strokeWidth={2} />{" "}
          page.tsx
        </span>
        <div className="flex items-center gap-2">
          {!isPreviewVisible && (
            <>
              <button
                onClick={onPreviewToggle}
                className="flex items-center text-[#CCCCCC] hover:text-white border border-[#454545] px-2 h-6 rounded"
              >
                <span className="text-[11.5px]">Show Preview</span>
              </button>
              {!isAssistantOpen && (
                <button
                  onClick={onAssistantToggle}
                  className="w-6 h-6 flex items-center justify-center text-[#CCCCCC] hover:text-white"
                >
                  <Image
                    src="/orion/images/AssistantButton.png"
                    alt="Open Assistant"
                    className="w-6 h-6"
                    width={24}
                    height={24}
                  />
                </button>
              )}
            </>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          defaultLanguage="typescript"
          value={editorValue}
          theme="vs-dark"
          onChange={onEditorChange}
          beforeMount={(monaco) => {
            monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
              noSemanticValidation: true,
              noSyntaxValidation: true,
            });
            monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
              noSemanticValidation: true,
              noSyntaxValidation: true,
            });
          }}
          options={{
            minimap: { enabled: false },
            fontSize: 11.5,
            lineHeight: 20,
            fontFamily: "Roboto Mono",
            fontLigatures: true,
            lineNumbers: "on",
            roundedSelection: false,
            scrollBeyondLastLine: false,
            readOnly: false,
            automaticLayout: true,
            quickSuggestions: false,
            suggestOnTriggerCharacters: false,
            parameterHints: { enabled: false },
            hover: { enabled: false },
            wordBasedSuggestions: "off"
          }}
        />
      </div>
    </div>
  );
} 