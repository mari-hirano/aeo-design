"use client";

import { useState } from 'react';
import Image from 'next/image';

interface PasswordScreenProps {
  onCorrectPassword: () => void;
}

export function PasswordScreen({ onCorrectPassword }: PasswordScreenProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_APP_PASSWORD) {
      localStorage.setItem('orion-auth', 'true');
      onCorrectPassword();
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#1E1E1E]">
      <div className="w-full max-w-md p-8 bg-[#292929] rounded-lg shadow-xl">
        <div className="flex justify-center mb-8">
          <Image
            src="/orion/images/WebflowLogo.png"
            alt="Webflow"
            width={40}
            height={40}
            className="object-contain"
          />
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-[#CCCCCC] mb-2"
            >
              Enter Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              className={`w-full px-4 py-2 bg-[#1E1E1E] border ${
                error ? 'border-red-500' : 'border-[#454545]'
              } rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter password to access the app"
            />
            {error && (
              <p className="mt-2 text-sm text-red-500">
                Incorrect password. Please try again.
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
} 