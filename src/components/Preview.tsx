import React from 'react';

interface PreviewProps {
  className?: string;
}

export function Preview({ className = "" }: PreviewProps) {
  return (
    <div className={`h-full w-full bg-white ${className}`}>
      <iframe
        srcDoc={`
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body {
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                  margin: 20px;
                  line-height: 1.6;
                }
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                }
                .header {
                  color: #2563eb;
                  text-align: center;
                }
                .content {
                  background-color: #f3f4f6;
                  padding: 20px;
                  border-radius: 8px;
                  margin-top: 20px;
                }
                .footer {
                  text-align: center;
                  margin-top: 20px;
                  color: #6b7280;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <h1 class="header">Welcome to Preview</h1>
                <div class="content">
                  <h2>Sample Content</h2>
                  <p>This is a simple preview panel showing HTML content. Later, this can be connected to display the rendered output of your code editor.</p>
                  <ul>
                    <li>Feature 1</li>
                    <li>Feature 2</li>
                    <li>Feature 3</li>
                  </ul>
                </div>
                <div class="footer">
                  <p>Preview Footer</p>
                </div>
              </div>
            </body>
          </html>
        `}
        className="w-full h-full border-none"
        title="preview"
      />
    </div>
  );
} 