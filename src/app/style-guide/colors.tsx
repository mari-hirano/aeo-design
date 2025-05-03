import React from "react";

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
              <div className="h-16 bg-action-primary-bg rounded-md" style={{backgroundColor: "#0084FF"}}></div>
              <p className="text-sm mt-2 text-text-secondary">action-primary-bg</p>
              <p className="text-xs text-text-secondary">#0084FF</p>
            </div>
            <div className="flex flex-col">
              <div className="h-16 bg-action-primary-bg-hover rounded-md" style={{backgroundColor: "#2496FF"}}></div>
              <p className="text-sm mt-2 text-text-secondary">action-primary-bg-hover</p>
              <p className="text-xs text-text-secondary">#2496FF</p>
            </div>
          </div>
          
          {/* Secondary Action */}
          <div className="space-y-4">
            <h4 className="text-md font-medium text-text-secondary">Secondary Action</h4>
            <div className="flex flex-col">
              <div className="h-16 border border-action-secondary-border rounded-md" style={{background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.13) 0%, rgba(255, 255, 255, 0.11) 100%)'}}></div>
              <p className="text-sm mt-2 text-text-secondary">action-secondary-bg</p>
              <p className="text-xs text-text-secondary">linear-gradient(180deg, rgba(255, 255, 255, 0.13) 0%, rgba(255, 255, 255, 0.11) 100%)</p>
            </div>
            <div className="flex flex-col">
              <div className="h-16 bg-action-secondary-selected-bg rounded-md" style={{backgroundColor: "rgba(0, 0, 0, 0.50)"}}></div>
              <p className="text-sm mt-2 text-text-secondary">action-secondary-selected-bg</p>
              <p className="text-xs text-text-secondary">rgba(0, 0, 0, 0.50)</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Background Colors */}
      <section>
        <h3 className="text-lg font-medium mb-3 text-text-secondary">Background Colors</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col">
            <div className="h-16 bg-bg-primary rounded-md" style={{backgroundColor: "#141414"}}></div>
            <p className="text-sm mt-2 text-text-secondary">bg-primary</p>
            <p className="text-xs text-text-secondary">#141414</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 bg-bg-secondary rounded-md" style={{backgroundColor: "#242424"}}></div>
            <p className="text-sm mt-2 text-text-secondary">bg-secondary</p>
            <p className="text-xs text-text-secondary">#242424</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 bg-bg-tertiary rounded-md" style={{backgroundColor: "#525252"}}></div>
            <p className="text-sm mt-2 text-text-secondary">bg-tertiary</p>
            <p className="text-xs text-text-secondary">#525252</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 bg-bg-raised rounded-md" style={{backgroundColor: "rgba(255, 255, 255, 0.07)"}}></div>
            <p className="text-sm mt-2 text-text-secondary">bg-raised</p>
            <p className="text-xs text-text-secondary">rgba(255, 255, 255, 0.07)</p>
          </div>
        </div>
      </section>

      {/* Text Colors */}
      <section>
        <h3 className="text-lg font-medium mb-3 text-text-secondary">Text Colors</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <div className="h-16 bg-text-primary rounded-md" style={{backgroundColor: "#ffffff"}}></div>
            <p className="text-sm mt-2 text-text-secondary">text-primary</p>
            <p className="text-xs text-text-secondary">#ffffff</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 bg-text-secondary rounded-md" style={{backgroundColor: "rgba(255, 255, 255, 0.67)"}}></div>
            <p className="text-sm mt-2 text-text-secondary">text-secondary</p>
            <p className="text-xs text-text-secondary">rgba(255, 255, 255, 0.67)</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 bg-text-dimmed rounded-md" style={{backgroundColor: "rgba(255, 255, 255, 0.50)"}}></div>
            <p className="text-sm mt-2 text-text-secondary">text-dimmed</p>
            <p className="text-xs text-text-secondary">rgba(255, 255, 255, 0.50)</p>
          </div>
        </div>
      </section>
      
      {/* Border Colors */}
      <section>
        <h3 className="text-lg font-medium mb-3 text-text-secondary">Border Colors</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <div className="h-16 bg-border-default rounded-md" style={{backgroundColor: "rgba(255, 255, 255, 0.13)"}}></div>
            <p className="text-sm mt-2 text-text-secondary">border-default</p>
            <p className="text-xs text-text-secondary">rgba(255, 255, 255, 0.13)</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 bg-border-text-input rounded-md" style={{backgroundColor: "rgba(255, 255, 255, 0.16)"}}></div>
            <p className="text-sm mt-2 text-text-secondary">border-text-input</p>
            <p className="text-xs text-text-secondary">rgba(255, 255, 255, 0.16)</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 bg-border-checkbox-radio rounded-md" style={{backgroundColor: "rgba(255, 255, 255, 0.19)"}}></div>
            <p className="text-sm mt-2 text-text-secondary">border-checkbox-radio</p>
            <p className="text-xs text-text-secondary">rgba(255, 255, 255, 0.19)</p>
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
            <div className="h-16 bg-blue-bg rounded-md" style={{backgroundColor: "#0084FF"}}></div>
            <p className="text-sm mt-2 text-text-secondary">blue-bg</p>
            <p className="text-xs text-text-secondary">#0084FF</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 bg-blue-canvas rounded-md" style={{backgroundColor: "#0073E6"}}></div>
            <p className="text-sm mt-2 text-text-secondary">blue-canvas</p>
            <p className="text-xs text-text-secondary">#0073E6</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 bg-blue-text rounded-md" style={{backgroundColor: "#8AC2FF"}}></div>
            <p className="text-sm mt-2 text-text-secondary">blue-text</p>
            <p className="text-xs text-text-secondary">#8AC2FF</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 bg-blue-transparent rounded-md" style={{backgroundColor: "rgba(0, 115, 230, 0.25)"}}></div>
            <p className="text-sm mt-2 text-text-secondary">blue-transparent</p>
            <p className="text-xs text-text-secondary">rgba(0, 115, 230, 0.25)</p>
          </div>
        </div>
        
        {/* Green */}
        <h4 className="text-md font-medium mb-2 text-text-secondary">Green</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="flex flex-col">
            <div className="h-16 bg-green-bg rounded-md" style={{backgroundColor: "#00a457"}}></div>
            <p className="text-sm mt-2 text-text-secondary">green-bg</p>
            <p className="text-xs text-text-secondary">#00a457</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 bg-green-canvas rounded-md" style={{backgroundColor: "#008547"}}></div>
            <p className="text-sm mt-2 text-text-secondary">green-canvas</p>
            <p className="text-xs text-text-secondary">#008547</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 bg-green-text rounded-md" style={{backgroundColor: "#63D489"}}></div>
            <p className="text-sm mt-2 text-text-secondary">green-text</p>
            <p className="text-xs text-text-secondary">#63D489</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 bg-green-transparent rounded-md" style={{backgroundColor: "rgba(0, 133, 71, 0.25)"}}></div>
            <p className="text-sm mt-2 text-text-secondary">green-transparent</p>
            <p className="text-xs text-text-secondary">rgba(0, 133, 71, 0.25)</p>
          </div>
        </div>
        
        {/* Red */}
        <h4 className="text-md font-medium mb-2 text-text-secondary">Red</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="flex flex-col">
            <div className="h-16 bg-red-bg rounded-md" style={{backgroundColor: "#ED273E"}}></div>
            <p className="text-sm mt-2 text-text-secondary">red-bg</p>
            <p className="text-xs text-text-secondary">#ED273E</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 bg-red-canvas rounded-md" style={{backgroundColor: "#CF313B"}}></div>
            <p className="text-sm mt-2 text-text-secondary">red-canvas</p>
            <p className="text-xs text-text-secondary">#CF313B</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 bg-red-text rounded-md" style={{backgroundColor: "#FF8A8A"}}></div>
            <p className="text-sm mt-2 text-text-secondary">red-text</p>
            <p className="text-xs text-text-secondary">#FF8A8A</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 bg-red-transparent rounded-md" style={{backgroundColor: "rgba(207, 49, 59, 0.25)"}}></div>
            <p className="text-sm mt-2 text-text-secondary">red-transparent</p>
            <p className="text-xs text-text-secondary">rgba(207, 49, 59, 0.25)</p>
          </div>
        </div>
        
        {/* Orange */}
        <h4 className="text-md font-medium mb-2 text-text-secondary">Orange</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="flex flex-col">
            <div className="h-16 bg-orange-bg rounded-md" style={{backgroundColor: "#F85900"}}></div>
            <p className="text-sm mt-2 text-text-secondary">orange-bg</p>
            <p className="text-xs text-text-secondary">#F85900</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 bg-orange-canvas rounded-md" style={{backgroundColor: "#C75300"}}></div>
            <p className="text-sm mt-2 text-text-secondary">orange-canvas</p>
            <p className="text-xs text-text-secondary">#C75300</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 bg-orange-text rounded-md" style={{backgroundColor: "#FFAB66"}}></div>
            <p className="text-sm mt-2 text-text-secondary">orange-text</p>
            <p className="text-xs text-text-secondary">#FFAB66</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 bg-orange-transparent rounded-md" style={{backgroundColor: "rgba(248, 89, 0, 0.2)"}}></div>
            <p className="text-sm mt-2 text-text-secondary">orange-transparent</p>
            <p className="text-xs text-text-secondary">rgba(248, 89, 0, 0.2)</p>
          </div>
        </div>
        
        {/* Purple */}
        <h4 className="text-md font-medium mb-2 text-text-secondary">Purple</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="flex flex-col">
            <div className="h-16 bg-purple-bg rounded-md" style={{backgroundColor: "#8A61FF"}}></div>
            <p className="text-sm mt-2 text-text-secondary">purple-bg</p>
            <p className="text-xs text-text-secondary">#8A61FF</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 bg-purple-canvas rounded-md" style={{backgroundColor: "#7F5AE9"}}></div>
            <p className="text-sm mt-2 text-text-secondary">purple-canvas</p>
            <p className="text-xs text-text-secondary">#7F5AE9</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 bg-purple-text rounded-md" style={{backgroundColor: "#B89EFF"}}></div>
            <p className="text-sm mt-2 text-text-secondary">purple-text</p>
            <p className="text-xs text-text-secondary">#B89EFF</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 bg-purple-transparent rounded-md" style={{backgroundColor: "rgba(127, 90, 233, 0.25)"}}></div>
            <p className="text-sm mt-2 text-text-secondary">purple-transparent</p>
            <p className="text-xs text-text-secondary">rgba(127, 90, 233, 0.25)</p>
          </div>
        </div>
        
        {/* Pink */}
        <h4 className="text-md font-medium mb-2 text-text-secondary">Pink</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="flex flex-col">
            <div className="h-16 bg-pink-bg rounded-md" style={{backgroundColor: "#E148C0"}}></div>
            <p className="text-sm mt-2 text-text-secondary">pink-bg</p>
            <p className="text-xs text-text-secondary">#E148C0</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 bg-pink-canvas rounded-md" style={{backgroundColor: "#BE4AA5"}}></div>
            <p className="text-sm mt-2 text-text-secondary">pink-canvas</p>
            <p className="text-xs text-text-secondary">#BE4AA5</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 bg-pink-text rounded-md" style={{backgroundColor: "#F7A9F9"}}></div>
            <p className="text-sm mt-2 text-text-secondary">pink-text</p>
            <p className="text-xs text-text-secondary">#F7A9F9</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 bg-pink-transparent rounded-md" style={{backgroundColor: "rgba(190, 74, 165, 0.25)"}}></div>
            <p className="text-sm mt-2 text-text-secondary">pink-transparent</p>
            <p className="text-xs text-text-secondary">rgba(190, 74, 165, 0.25)</p>
          </div>
        </div>
        
        {/* Yellow */}
        <h4 className="text-md font-medium mb-2 text-text-secondary">Yellow</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col">
            <div className="h-16 bg-yellow-bg rounded-md" style={{backgroundColor: "#EAA700"}}></div>
            <p className="text-sm mt-2 text-text-secondary">yellow-bg</p>
            <p className="text-xs text-text-secondary">#EAA700</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 bg-yellow-canvas rounded-md" style={{backgroundColor: "#EAA700"}}></div>
            <p className="text-sm mt-2 text-text-secondary">yellow-canvas</p>
            <p className="text-xs text-text-secondary">#EAA700</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 bg-yellow-text rounded-md" style={{backgroundColor: "#EAA700"}}></div>
            <p className="text-sm mt-2 text-text-secondary">yellow-text</p>
            <p className="text-xs text-text-secondary">#EAA700</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 bg-yellow-transparent rounded-md" style={{backgroundColor: "rgba(255, 199, 0, 0.15)"}}></div>
            <p className="text-sm mt-2 text-text-secondary">yellow-transparent</p>
            <p className="text-xs text-text-secondary">rgba(255, 199, 0, 0.15)</p>
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