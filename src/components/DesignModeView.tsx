"use client";

import React from 'react';
import Image from 'next/image';
import { usePages } from '@/context/PagesContext';

export function DesignModeView() {
  const { selectedPage } = usePages();

  const renderContent = () => {
    switch (selectedPage) {
      case 'home':
        return (
          <div className="container mx-auto p-5">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl font-bold text-gray-800 mb-8">Welcome to Doggo Training</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h2 className="text-2xl font-semibold mb-4 text-blue-800">Expert Training</h2>
                  <p className="text-gray-700 mb-4">Transform your furry friend into a well-behaved companion with our professional dog training services.</p>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Get Started
                  </button>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h2 className="text-2xl font-semibold mb-4 text-green-800">Online Resources</h2>
                  <p className="text-gray-700 mb-4">Access our comprehensive library of training guides, videos, and tips to help you train your dog at home.</p>
                  <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    Browse Resources
                  </button>
                </div>
              </div>
              <div className="mt-12">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">Why Choose Us?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🎓</span>
                    </div>
                    <h3 className="font-semibold mb-2">Certified Trainers</h3>
                    <p className="text-gray-600">Expert guidance from certified professionals</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🐾</span>
                    </div>
                    <h3 className="font-semibold mb-2">Proven Methods</h3>
                    <p className="text-gray-600">Science-based training techniques</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">💝</span>
                    </div>
                    <h3 className="font-semibold mb-2">Loving Care</h3>
                    <p className="text-gray-600">Positive reinforcement approach</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="container mx-auto p-5">
            <h1 className="text-2xl font-bold text-gray-800 text-center">Welcome to Preview</h1>
            <div className="bg-gray-100 p-5 rounded-lg mt-5">
              <h2 className="text-xl font-semibold mb-3 text-gray-800">Sample Content</h2>
              <p className="mb-4 text-gray-700">This is a simple preview panel showing HTML content. Later, this can be connected to display the rendered output of your code editor.</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Feature 1</li>
                <li>Feature 2</li>
                <li>Feature 3</li>
              </ul>
            </div>
            <div className="text-center mt-5 text-gray-500">
              <p>Preview Footer</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 flex min-h-0">
      <div className="flex-1 flex flex-col min-h-0 bg-[#1E1E1E] text-white">
        {/* Design Mode Toolbar */}
        <div className="h-[40px] flex items-center justify-between border-b border-[#454545] bg-[#292929] px-2">
          <Image
            src="/orion/images/designbarleft.png"
            alt="Design Bar Left"
            width={200}
            height={24}
            priority
            className="h-[24px] w-auto"
          />
          <Image
            src="/orion/images/designbarright.png"
            alt="Design Bar Right"
            width={200}
            height={24}
            priority
            className="h-[24px] w-auto"
          />
        </div>

        {/* Design Canvas */}
        <div className="flex-1 overflow-auto flex justify-center">
          <div className="w-full max-w-[1200px] min-h-full bg-white shadow-lg">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Style Panel */}
      <div className="w-[240px] flex flex-col min-h-0 bg-[#292929]">
        <div className="flex-1 overflow-auto [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:bg-[#1E1E1E] [&::-webkit-scrollbar-thumb]:bg-[#424242] [&::-webkit-scrollbar-thumb]:hover:bg-[#4F4F4F]">
          <Image
            src="/orion/images/StylePanel.png"
            alt="Style Panel"
            width={240}
            height={800}
            priority
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
} 