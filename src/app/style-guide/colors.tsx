import React from "react";

// Helper function to get computed CSS value
const getCssVarValue = (varName: string): string => {
  if (typeof window !== 'undefined') {
    return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  }
  return '';
};

export function ColorsSection() {
  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold mb-4 text-text-secondary">Color Palette</h2>
      
      {/* Action Colors */}
      <section>
        <h3 className="text-lg font-medium mb-3 text-text-secondary">Action Colors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Primary Action */}
          <div className="space-y-4">
            <h4 className="text-md font-medium text-text-secondary">Primary Action</h4>
            <div className="flex flex-col">
              <div className="h-16 bg-action-primary-bg rounded-md"></div>
              <p className="text-sm mt-2 text-text-secondary">action-primary-bg</p>
              <p className="text-xs text-text-secondary">var(--action-primary-bg)</p>
            </div>
            <div className="flex flex-col">
              <div className="h-16 bg-action-primary-bg-hover rounded-md"></div>
              <p className="text-sm mt-2 text-text-secondary">action-primary-bg-hover</p>
              <p className="text-xs text-text-secondary">var(--action-primary-bg-hover)</p>
            </div>
          </div>
          
          {/* Secondary Action */}
          <div className="space-y-4">
            <h4 className="text-md font-medium text-text-secondary">Secondary Action</h4>
            <div className="flex flex-col">
              <div className="h-16 border border-action-secondary-border bg-action-secondary-bg rounded-md"></div>
              <p className="text-sm mt-2 text-text-secondary">action-secondary-bg</p>
              <p className="text-xs text-text-secondary">var(--action-secondary-bg)</p>
            </div>
            <div className="flex flex-col">
              <div className="h-16 bg-action-secondary-selected-bg rounded-md"></div>
              <p className="text-sm mt-2 text-text-secondary">action-secondary-selected-bg</p>
              <p className="text-xs text-text-secondary">var(--action-secondary-selected-bg)</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Background Colors */}
      <section>
        <h3 className="text-lg font-medium mb-3 text-text-secondary">Background Colors</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col">
            <div className="h-16 bg-bg-primary rounded-md"></div>
            <p className="text-sm mt-2 text-text-secondary">bg-primary</p>
            <p className="text-xs text-text-secondary">var(--bg-primary)</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 bg-bg-secondary rounded-md"></div>
            <p className="text-sm mt-2 text-text-secondary">bg-secondary</p>
            <p className="text-xs text-text-secondary">var(--bg-secondary)</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 bg-bg-tertiary rounded-md"></div>
            <p className="text-sm mt-2 text-text-secondary">bg-tertiary</p>
            <p className="text-xs text-text-secondary">var(--bg-tertiary)</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 bg-bg-raised rounded-md"></div>
            <p className="text-sm mt-2 text-text-secondary">bg-raised</p>
            <p className="text-xs text-text-secondary">var(--bg-raised)</p>
          </div>
        </div>
      </section>

      {/* Text Colors */}
      <section>
        <h3 className="text-lg font-medium mb-3 text-text-secondary">Text Colors</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <div className="h-16 rounded-md" style={{backgroundColor: 'var(--text-primary)'}}></div>
            <p className="text-sm mt-2 text-text-secondary">text-primary</p>
            <p className="text-xs text-text-secondary">var(--text-primary)</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 rounded-md" style={{backgroundColor: 'var(--text-secondary)'}}></div>
            <p className="text-sm mt-2 text-text-secondary">text-secondary</p>
            <p className="text-xs text-text-secondary">var(--text-secondary)</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 rounded-md" style={{backgroundColor: 'var(--text-dimmed)'}}></div>
            <p className="text-sm mt-2 text-text-secondary">text-dimmed</p>
            <p className="text-xs text-text-secondary">var(--text-dimmed)</p>
          </div>
        </div>
      </section>
      
      {/* Border Colors */}
      <section>
        <h3 className="text-lg font-medium mb-3 text-text-secondary">Border Colors</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <div className="h-16 rounded-md" style={{backgroundColor: 'var(--border-default)'}}></div>
            <p className="text-sm mt-2 text-text-secondary">border-default</p>
            <p className="text-xs text-text-secondary">var(--border-default)</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 rounded-md" style={{backgroundColor: 'var(--border-text-input)'}}></div>
            <p className="text-sm mt-2 text-text-secondary">border-text-input</p>
            <p className="text-xs text-text-secondary">var(--border-text-input)</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 rounded-md" style={{backgroundColor: 'var(--border-checkbox-radio)'}}></div>
            <p className="text-sm mt-2 text-text-secondary">border-checkbox-radio</p>
            <p className="text-xs text-text-secondary">var(--border-checkbox-radio)</p>
          </div>
        </div>
      </section>
      
      {/* Semantic Colors */}
      <section>
        <h3 className="text-lg font-medium mb-3 text-text-secondary">Semantic Colors</h3>
        
        {/* Blue */}
        <h4 className="text-md font-medium mb-2 text-text-secondary">Blue</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="flex flex-col">
            <div className="h-16 bg-blue-bg rounded-md"></div>
            <p className="text-sm mt-2 text-text-secondary">blue-bg</p>
            <p className="text-xs text-text-secondary">var(--blue-bg)</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 rounded-md" style={{backgroundColor: 'var(--blue-canvas)'}}></div>
            <p className="text-sm mt-2 text-text-secondary">blue-canvas</p>
            <p className="text-xs text-text-secondary">var(--blue-canvas)</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 rounded-md" style={{backgroundColor: 'var(--blue-text)'}}></div>
            <p className="text-sm mt-2 text-text-secondary">blue-text</p>
            <p className="text-xs text-text-dimmed text-blue-text">var(--blue-text)</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 rounded-md" style={{backgroundColor: 'var(--blue-transparent)'}}></div>
            <p className="text-sm mt-2 text-text-secondary">blue-transparent</p>
            <p className="text-xs text-text-secondary">var(--blue-transparent)</p>
          </div>
        </div>
        
        {/* Green */}
        <h4 className="text-md font-medium mb-2 text-text-secondary">Green</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="flex flex-col">
            <div className="h-16 bg-green-bg rounded-md"></div>
            <p className="text-sm mt-2 text-text-secondary">green-bg</p>
            <p className="text-xs text-text-secondary">var(--green-bg)</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 rounded-md" style={{backgroundColor: 'var(--green-canvas)'}}></div>
            <p className="text-sm mt-2 text-text-secondary">green-canvas</p>
            <p className="text-xs text-text-secondary">var(--green-canvas)</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 rounded-md" style={{backgroundColor: 'var(--green-text)'}}></div>
            <p className="text-sm mt-2 text-text-secondary">green-text</p>
            <p className="text-xs text-text-dimmed text-green-text">var(--green-text)</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 rounded-md" style={{backgroundColor: 'var(--green-transparent)'}}></div>
            <p className="text-sm mt-2 text-text-secondary">green-transparent</p>
            <p className="text-xs text-text-secondary">var(--green-transparent)</p>
          </div>
        </div>
        
        {/* Red */}
        <h4 className="text-md font-medium mb-2 text-text-secondary">Red</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="flex flex-col">
            <div className="h-16 bg-red-bg rounded-md"></div>
            <p className="text-sm mt-2 text-text-secondary">red-bg</p>
            <p className="text-xs text-text-secondary">var(--red-bg)</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 rounded-md" style={{backgroundColor: 'var(--red-canvas)'}}></div>
            <p className="text-sm mt-2 text-text-secondary">red-canvas</p>
            <p className="text-xs text-text-secondary">var(--red-canvas)</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 rounded-md" style={{backgroundColor: 'var(--red-text)'}}></div>
            <p className="text-sm mt-2 text-text-secondary">red-text</p>
            <p className="text-xs text-text-dimmed text-red-text">var(--red-text)</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 rounded-md" style={{backgroundColor: 'var(--red-transparent)'}}></div>
            <p className="text-sm mt-2 text-text-secondary">red-transparent</p>
            <p className="text-xs text-text-secondary">var(--red-transparent)</p>
          </div>
        </div>
        
        {/* Orange */}
        <h4 className="text-md font-medium mb-2 text-text-secondary">Orange</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="flex flex-col">
            <div className="h-16 bg-orange-bg rounded-md"></div>
            <p className="text-sm mt-2 text-text-secondary">orange-bg</p>
            <p className="text-xs text-text-secondary">var(--orange-bg)</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 rounded-md" style={{backgroundColor: 'var(--orange-canvas)'}}></div>
            <p className="text-sm mt-2 text-text-secondary">orange-canvas</p>
            <p className="text-xs text-text-secondary">var(--orange-canvas)</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 rounded-md" style={{backgroundColor: 'var(--orange-text)'}}></div>
            <p className="text-sm mt-2 text-text-secondary">orange-text</p>
            <p className="text-xs text-text-dimmed text-orange-text">var(--orange-text)</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 rounded-md" style={{backgroundColor: 'var(--orange-transparent)'}}></div>
            <p className="text-sm mt-2 text-text-secondary">orange-transparent</p>
            <p className="text-xs text-text-secondary">var(--orange-transparent)</p>
          </div>
        </div>
        
        {/* Purple */}
        <h4 className="text-md font-medium mb-2 text-text-secondary">Purple</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="flex flex-col">
            <div className="h-16 bg-purple-bg rounded-md"></div>
            <p className="text-sm mt-2 text-text-secondary">purple-bg</p>
            <p className="text-xs text-text-secondary">var(--purple-bg)</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 rounded-md" style={{backgroundColor: 'var(--purple-canvas)'}}></div>
            <p className="text-sm mt-2 text-text-secondary">purple-canvas</p>
            <p className="text-xs text-text-secondary">var(--purple-canvas)</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 rounded-md" style={{backgroundColor: 'var(--purple-text)'}}></div>
            <p className="text-sm mt-2 text-text-secondary">purple-text</p>
            <p className="text-xs text-text-dimmed text-purple-text">var(--purple-text)</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 rounded-md" style={{backgroundColor: 'var(--purple-transparent)'}}></div>
            <p className="text-sm mt-2 text-text-secondary">purple-transparent</p>
            <p className="text-xs text-text-secondary">var(--purple-transparent)</p>
          </div>
        </div>
        
        {/* Pink */}
        <h4 className="text-md font-medium mb-2 text-text-secondary">Pink</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="flex flex-col">
            <div className="h-16 bg-pink-bg rounded-md"></div>
            <p className="text-sm mt-2 text-text-secondary">pink-bg</p>
            <p className="text-xs text-text-secondary">var(--pink-bg)</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 rounded-md" style={{backgroundColor: 'var(--pink-canvas)'}}></div>
            <p className="text-sm mt-2 text-text-secondary">pink-canvas</p>
            <p className="text-xs text-text-secondary">var(--pink-canvas)</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 rounded-md" style={{backgroundColor: 'var(--pink-text)'}}></div>
            <p className="text-sm mt-2 text-text-secondary">pink-text</p>
            <p className="text-xs text-text-dimmed text-pink-text">var(--pink-text)</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 rounded-md" style={{backgroundColor: 'var(--pink-transparent)'}}></div>
            <p className="text-sm mt-2 text-text-secondary">pink-transparent</p>
            <p className="text-xs text-text-secondary">var(--pink-transparent)</p>
          </div>
        </div>
        
        {/* Yellow */}
        <h4 className="text-md font-medium mb-2 text-text-secondary">Yellow</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="flex flex-col">
            <div className="h-16 bg-yellow-bg rounded-md"></div>
            <p className="text-sm mt-2 text-text-secondary">yellow-bg</p>
            <p className="text-xs text-text-secondary">var(--yellow-bg)</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 rounded-md" style={{backgroundColor: 'var(--yellow-canvas)'}}></div>
            <p className="text-sm mt-2 text-text-secondary">yellow-canvas</p>
            <p className="text-xs text-text-secondary">var(--yellow-canvas)</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 rounded-md" style={{backgroundColor: 'var(--yellow-text)'}}></div>
            <p className="text-sm mt-2 text-text-secondary">yellow-text</p>
            <p className="text-xs text-text-dimmed text-yellow-text">var(--yellow-text)</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 rounded-md" style={{backgroundColor: 'var(--yellow-transparent)'}}></div>
            <p className="text-sm mt-2 text-text-secondary">yellow-transparent</p>
            <p className="text-xs text-text-secondary">var(--yellow-transparent)</p>
          </div>
        </div>
      </section>
      
      {/* Color Token Mapping */}
      <section>
        <h3 className="text-lg font-medium mb-3 text-text-secondary">Color Token Mapping Guide</h3>
        <div className="bg-bg-secondary p-4 rounded-md space-y-3">
          <div>
            <p className="text-text-primary font-medium">Previous: Primary Blue (#006ACC)</p>
            <p className="text-text-secondary">Now: blue-bg (#0084FF)</p>
          </div>
          <div>
            <p className="text-text-primary font-medium">Previous: Success Green (#007A41)</p>
            <p className="text-text-secondary">Now: green-canvas (#008547)</p>
          </div>
          <div>
            <p className="text-text-primary font-medium">Previous: Destructive Red (#CF313B)</p>
            <p className="text-text-secondary">Now: red-canvas (#CF313B) - exact match</p>
          </div>
          <div>
            <p className="text-text-primary font-medium">Previous: Warning Orange (#BF4704)</p>
            <p className="text-text-secondary">Now: orange-canvas (#C75300)</p>
          </div>
          <div>
            <p className="text-text-primary font-medium">Previous: Subtle Blue</p>
            <p className="text-text-secondary">Now: blue-transparent (rgba(0, 115, 230, 0.25))</p>
          </div>
          <div>
            <p className="text-text-primary font-medium">Previous: Subtle Green</p>
            <p className="text-text-secondary">Now: green-transparent (rgba(0, 133, 71, 0.25))</p>
          </div>
          <div>
            <p className="text-text-primary font-medium">Previous: Subtle Red</p>
            <p className="text-text-secondary">Now: red-transparent (rgba(207, 49, 59, 0.25))</p>
          </div>
          <div>
            <p className="text-text-primary font-medium">Previous: Subtle Orange</p>
            <p className="text-text-secondary">Now: orange-transparent (rgba(248, 89, 0, 0.2))</p>
          </div>
          <div>
            <p className="text-text-primary font-medium">Previous: Secondary Text (White @ 67%)</p>
            <p className="text-text-secondary">Now: text-secondary (rgba(255, 255, 255, 0.67)) - exact match</p>
          </div>
          <div>
            <p className="text-text-primary font-medium">Previous: Border Color (White @ 13%)</p>
            <p className="text-text-secondary">Now: border-default (rgba(255, 255, 255, 0.13)) - exact match</p>
          </div>
          <div>
            <p className="text-text-primary font-medium">Previous: Selected Button (Black @ 50%)</p>
            <p className="text-text-secondary">Now: action-secondary-selected-bg (rgba(0, 0, 0, 0.50)) - exact match</p>
          </div>
        </div>
      </section>
    </div>
  );
} 