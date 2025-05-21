"use client";

import React from 'react';
import { usePages } from '@/context/PagesContext';

const Canvas: React.FC = () => {
  const { selectedPage } = usePages();

  // Placeholder content for different pages
  const renderPageContent = () => {
    switch (selectedPage) {
      case '/':
        return (
          <div className="p-8 text-black">
            <h1 className="text-2xl font-bold mb-4">Home Page</h1>
            <p>This is the home page placeholder.</p>
          </div>
        );
      case '/contact':
        return (
          <div className="p-8 text-black">
            <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
            <p>This is the contact page content placeholder.</p>
            <form className="mt-4">
              <div className="mb-4">
                <label className="block mb-1">Name</label>
                <input type="text" className="border p-2 w-full" placeholder="Your name" />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Email</label>
                <input type="email" className="border p-2 w-full" placeholder="Your email" />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Message</label>
                <textarea className="border p-2 w-full h-24" placeholder="Your message"></textarea>
              </div>
              <button type="button" className="bg-blue-500 text-white px-4 py-2">Send Message</button>
            </form>
          </div>
        );
      case '/styles':
        return (
          <div className="p-8 text-black">
            <h1 className="text-2xl font-bold mb-4">[Draft] Styles Page</h1>
            <p>This page is still in draft mode.</p>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="p-4 bg-red-100">Color Sample</div>
              <div className="p-4 bg-blue-100">Color Sample</div>
              <div className="p-4 bg-green-100">Color Sample</div>
            </div>
          </div>
        );
      case '/testimonials':
        return (
          <div className="p-8 text-black">
            <h1 className="text-2xl font-bold mb-4">Testimonials</h1>
            <div className="mt-4 space-y-4">
              <div className="p-4 border rounded">
                <p className="italic">"This product changed my life!"</p>
                <p className="mt-2 font-bold">- John Doe</p>
              </div>
              <div className="p-4 border rounded">
                <p className="italic">"Excellent service and quality."</p>
                <p className="mt-2 font-bold">- Jane Smith</p>
              </div>
            </div>
          </div>
        );
      case '/password':
        return (
          <div className="p-8 text-black">
            <h1 className="text-2xl font-bold mb-4">Password Protected</h1>
            <p>This page requires a password to access.</p>
            <div className="mt-4">
              <input type="password" className="border p-2" placeholder="Enter password" />
              <button type="button" className="bg-blue-500 text-white px-4 py-2 ml-2">Submit</button>
            </div>
          </div>
        );
      case '/404':
        return (
          <div className="p-8 text-black">
            <h1 className="text-2xl font-bold mb-4">404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <button type="button" className="bg-blue-500 text-white px-4 py-2 mt-4">Return Home</button>
          </div>
        );
      default:
        return (
          <div className="p-8 text-black">
            <h1 className="text-2xl font-bold mb-4">Select a Page</h1>
            <p>Please select a page from the Pages panel.</p>
          </div>
        );
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full bg-white overflow-auto">
      {renderPageContent()}
    </div>
  );
};

export default Canvas; 