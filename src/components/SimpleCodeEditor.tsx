"use client";

import { CodeEditor } from './CodeEditor';

interface SimpleCodeEditorProps {
  content: string;
  language: string;
}

export function SimpleCodeEditor({ content }: SimpleCodeEditorProps) {
  return (
    <CodeEditor
      isPreviewVisible={false}
      isAssistantOpen={false}
      editorValue={content}
      onEditorChange={() => {}}
      onPreviewToggle={() => {}}
      onAssistantToggle={() => {}}
    />
  );
} 