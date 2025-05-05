"use client";

import React, { useState } from 'react';
import { IconButton } from '@/components/ui/icon-button';
import { SettingsAltIcon, CloseDefaultIcon } from '@/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Canvas: React.FC = () => {
  const defaultUrl = 'https://webflow.com/?r=0';
  const [iframeUrl, setIframeUrl] = useState<string>(defaultUrl);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [tempUrl, setTempUrl] = useState<string>(defaultUrl);

  const handleSaveSettings = () => {
    setIframeUrl(tempUrl);
    setIsSettingsOpen(false);
  };

  return (
    <div className="absolute inset-0 w-full h-full bg-[#1E1E1E]">
      <iframe 
        src={iframeUrl}
        className="w-full h-full border-none"
        title="Canvas Content"
        sandbox="allow-scripts allow-same-origin allow-forms"
      />
      
      <div className="absolute bottom-4 right-4">
        <IconButton
          variant="ghost"
          size="comfortable"
          aria-label="Canvas settings"
          className="h-8 w-8 bg-[#292929] rounded-full shadow-md hover:bg-[#3a3a3a]"
          onClick={() => setIsSettingsOpen(true)}
        >
          <SettingsAltIcon size={18} />
        </IconButton>
      </div>

      {isSettingsOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <div className="bg-[#292929] p-6 rounded-md border border-white/13 w-full max-w-md relative">
            <Button 
              variant="ghost" 
              className="absolute right-4 top-4 p-1 h-6 w-6"
              onClick={() => setIsSettingsOpen(false)}
            >
              <CloseDefaultIcon size={16} />
            </Button>
            
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-white mb-6">Canvas Settings</h2>
            </div>
            
            <div className="mb-6">
              <div className="mb-2">
                <label htmlFor="url" className="text-sm font-medium text-white block mb-1">
                  URL
                </label>
                <Input
                  id="url"
                  value={tempUrl}
                  onChange={(e) => setTempUrl(e.target.value)}
                  placeholder="Enter iframe URL"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsSettingsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveSettings}>
                Save
              </Button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        iframe {
          overflow: auto;
        }
        
        iframe::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        
        iframe::-webkit-scrollbar-track {
          background: transparent;
        }
        
        iframe::-webkit-scrollbar-thumb {
          background-color: rgba(80, 80, 80, 0.5);
          border-radius: 3px;
        }
        
        iframe::-webkit-scrollbar-thumb:hover {
          background-color: rgba(100, 100, 100, 0.8);
        }
      `}</style>
    </div>
  );
};

export default Canvas; 