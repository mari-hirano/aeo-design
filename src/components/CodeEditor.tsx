"use client";

import React from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  content: string;
  language?: string;
}

export function CodeEditor({ content, language = "typescript" }: CodeEditorProps) {
  return (
    <div className="w-full h-full relative">
      <Editor
        height="100%"
        width="100%"
        defaultLanguage={language}
        defaultValue={content}
        theme="vs-dark"
        options={{
          fontSize: 11.5,
          fontFamily: 'Roboto Mono',
          lineHeight: 20,
          fontLigatures: true,
          minimap: {
            enabled: false
          },
          scrollbar: {
            vertical: 'visible',
            horizontal: 'visible'
          },
          lineNumbers: 'on',
          roundedSelection: false,
          padding: {
            top: 8,
            bottom: 8
          },
          cursorStyle: 'line',
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
          renderLineHighlight: 'all',
          scrollBeyondLastLine: false,
          fixedOverflowWidgets: true
        }}
      />
    </div>
  );
} 