"use client"

import React from 'react';
import { useMode } from '@/context/ModeContext';
import { usePages } from '@/context/PagesContext';

interface PreviewProps {
  className?: string;
}

export function Preview({ className = "" }: PreviewProps) {
  const { selectedPage } = usePages();

  const getPreviewContent = () => {
    switch (selectedPage) {
      case 'home':
        return `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body {
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                  margin: 0;
                  line-height: 1.6;
                  background: white;
                }
                .container {
                  max-width: 4xl;
                  margin: 0 auto;
                  padding: 1.25rem;
                }
                .inner-container {
                  max-width: 4xl;
                  margin: 0 auto;
                }
                h1 {
                  font-size: 3rem;
                  font-weight: bold;
                  color: #1f2937;
                  margin-bottom: 2rem;
                }
                .grid {
                  display: grid;
                  grid-template-columns: repeat(2, 1fr);
                  gap: 2rem;
                  margin-bottom: 3rem;
                }
                .card {
                  padding: 1.5rem;
                  border-radius: 0.5rem;
                }
                .card.blue {
                  background-color: #eff6ff;
                }
                .card.green {
                  background-color: #f0fdf4;
                }
                .card h2 {
                  font-size: 1.5rem;
                  font-weight: 600;
                  margin-bottom: 1rem;
                }
                .card.blue h2 {
                  color: #1e40af;
                }
                .card.green h2 {
                  color: #166534;
                }
                .card p {
                  color: #374151;
                  margin-bottom: 1rem;
                }
                .button {
                  display: inline-block;
                  padding: 0.5rem 1.1rem;
                  border-radius: 0.5rem;
                  color: white;
                  cursor: pointer;
                  transition: background-color 0.2s;
                }
                .button.blue {
                  background-color: #2563eb;
                }
                .button.blue:hover {
                  background-color: #1d4ed8;
                }
                .button.green {
                  background-color: #16a34a;
                }
                .button.green:hover {
                  background-color: #15803d;
                }
                .features {
                  margin-top: 3rem;
                }
                .features h2 {
                  font-size: 1.875rem;
                  font-weight: 600;
                  color: #1f2937;
                  margin-bottom: 1.5rem;
                }
                .features-grid {
                  display: grid;
                  grid-template-columns: repeat(3, 1fr);
                  gap: 1.5rem;
                }
                .feature {
                  text-align: center;
                }
                .emoji-circle {
                  width: 4rem;
                  height: 4rem;
                  background-color: #f3f4f6;
                  border-radius: 9999px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  margin: 0 auto 1rem auto;
                }
                .emoji {
                  font-size: 2rem;
                }
                .feature h3 {
                  font-weight: 600;
                  margin-bottom: 0.5rem;
                }
                .feature p {
                  color: #4b5563;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="inner-container">
                  <h1>Welcome to Doggo Training</h1>
                  <div class="grid">
                    <div class="card blue">
                      <h2>Expert Training</h2>
                      <p>Transform your furry friend into a well-behaved companion with our professional dog training services.</p>
                      <button class="button blue">Get Started</button>
                    </div>
                    <div class="card green">
                      <h2>Online Resources</h2>
                      <p>Access our comprehensive library of training guides, videos, and tips to help you train your dog at home.</p>
                      <button class="button green">Browse Resources</button>
                    </div>
                  </div>
                  <div class="features">
                    <h2>Why Choose Us?</h2>
                    <div class="features-grid">
                      <div class="feature">
                        <div class="emoji-circle">
                          <span class="emoji">🎓</span>
                        </div>
                        <h3>Certified Trainers</h3>
                        <p>Expert guidance from certified professionals</p>
                      </div>
                      <div class="feature">
                        <div class="emoji-circle">
                          <span class="emoji">🐾</span>
                        </div>
                        <h3>Proven Methods</h3>
                        <p>Science-based training techniques</p>
                      </div>
                      <div class="feature">
                        <div class="emoji-circle">
                          <span class="emoji">💝</span>
                        </div>
                        <h3>Loving Care</h3>
                        <p>Positive reinforcement approach</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </body>
          </html>
        `;
      case 'doggo-training':
      default:
        return `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body {
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                  margin: 0;
                  padding: 0;
                  line-height: 1.6;
                  background: white;
                }
                .container {
                  max-width: 1200px;
                  margin: 0 auto;
                  padding: 1.25rem;
                }
                h1 {
                  font-size: 1.5rem;
                  font-weight: bold;
                  color: #1f2937;
                  text-align: center;
                  margin-bottom: 0;
                }
                .content {
                  background-color: #f3f4f6;
                  padding: 1.25rem;
                  border-radius: 0.5rem;
                  margin-top: 1.25rem;
                }
                .content h2 {
                  font-size: 1.25rem;
                  font-weight: 600;
                  color: #1f2937;
                  margin-bottom: 0.75rem;
                }
                .content p {
                  color: #374151;
                  margin-bottom: 1rem;
                }
                .content ul {
                  list-style-type: disc;
                  padding-left: 1.25rem;
                  margin: 0;
                  color: #374151;
                }
                .content ul li {
                  margin-bottom: 0.5rem;
                }
                .content ul li:last-child {
                  margin-bottom: 0;
                }
                .footer {
                  text-align: center;
                  margin-top: 1.25rem;
                  color: #6b7280;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>Welcome to Preview</h1>
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
        `;
    }
  };

  return (
    <div className={`h-full w-full bg-white ${className}`}>
      <iframe
        srcDoc={getPreviewContent()}
        className="w-full h-full border-none"
        title="preview"
      />
    </div>
  );
} 