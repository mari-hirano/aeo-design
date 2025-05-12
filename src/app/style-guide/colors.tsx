import React, { useState, useEffect } from "react";

// Helper function to get computed CSS value
const getCssVarValue = (varName: string): string => {
  if (typeof window !== 'undefined') {
    return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  }
  return '';
};

type ColorSampleProps = {
  name: string;
  variable: string;
  backgroundClass?: string;
  borderClass?: string;
};

const ColorSample = ({ name, variable, backgroundClass, borderClass }: ColorSampleProps) => {
  const [colorValue, setColorValue] = useState<string>('');
  const [isHovering, setIsHovering] = useState<boolean>(false);

  useEffect(() => {
    setColorValue(getCssVarValue(variable));
  }, [variable]);

  const style = backgroundClass ? {} : { backgroundColor: `var(${variable})` };
  const classes = `h-16 rounded-md ${backgroundClass || ''} ${borderClass || ''}`;

  return (
    <div className="flex flex-col">
      <div 
        className={classes} 
        style={style}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      ></div>
      <p className="title-text mt-2 text-[var(--text-primary)]">{name}</p>
      <span className="text-xs text-[var(--text-secondary)]">var({variable}) {colorValue}</span>
    </div>
  );
};

export function ColorsSection() {
  return (
    <div className="space-y-8">
      
      {/* Action Colors */}
      <section>
        <h3 className="text-lg font-medium mb-3">Action Colors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Primary Action */}
          <div className="space-y-4">
            <h4 className="title-text">Primary Action</h4>
            <ColorSample name="action-primary-bg" variable="--action-primary-bg" />
            <ColorSample name="action-primary-bg-hover" variable="--action-primary-bg-hover" />
          </div>
          
          {/* Secondary Action */}
          <div className="space-y-4">
            <h4 className="text-md font-medium ">Secondary Action</h4>
            <ColorSample name="action-secondary-bg" variable="--action-secondary-bg" />
            <ColorSample name="action-secondary-selected-bg" variable="--action-secondary-selected-bg" />
          </div>
        </div>
      </section>
      
      {/* Background Colors */}
      <section>
        <h3 className="text-lg font-medium mb-3">Background Colors</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ColorSample name="bg-primary" variable="--bg-primary" />
          <ColorSample name="bg-secondary" variable="--bg-secondary" />
          <ColorSample name="bg-tertiary" variable="--bg-tertiary" />
          <ColorSample name="bg-raised" variable="--bg-raised" />
        </div>
      </section>

      {/* Text Colors */}
      <section>
        <h3 className="text-lg font-medium mb-3">Text Colors</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <ColorSample name="text-primary" variable="--text-primary" />
          <ColorSample name="text-secondary" variable="--text-secondary" />
          <ColorSample name="text-dimmed" variable="--text-dimmed" />
        </div>
      </section>
      
      {/* Border Colors */}
      <section>
        <h3 className="text-lg font-medium mb-3">Border Colors</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <ColorSample name="border-default" variable="--border-default" />
          <ColorSample name="border-text-input" variable="--border-text-input" />
          <ColorSample name="border-checkbox-radio" variable="--border-checkbox-radio" />
        </div>
      </section>
      
      {/* Semantic Colors */}
      <section>
        <h3 className="text-lg font-medium mb-3">Semantic Colors</h3>
        
        {/* Blue */}
        <h4 className="title-text mb-2 text-[var(--text-primary)]">Blue</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <ColorSample name="blue-bg" variable="--blue-bg" />
          <ColorSample name="blue-canvas" variable="--blue-canvas" />
          <ColorSample name="blue-text" variable="--blue-text" />
          <ColorSample name="blue-transparent" variable="--blue-transparent" />
        </div>
        
        {/* Green */}
        <h4 className="title-text mb-2 text-[var(--text-primary)]">Green</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <ColorSample name="green-bg" variable="--green-bg" />
          <ColorSample name="green-canvas" variable="--green-canvas" />
          <ColorSample name="green-text" variable="--green-text" />
          <ColorSample name="green-transparent" variable="--green-transparent" />
        </div>
        
        {/* Red */}
        <h4 className="title-text mb-2 text-[var(--text-primary)]">Red</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <ColorSample name="red-bg" variable="--red-bg" />
          <ColorSample name="red-canvas" variable="--red-canvas" />
          <ColorSample name="red-text" variable="--red-text" />
          <ColorSample name="red-transparent" variable="--red-transparent" />
        </div>
        
        {/* Orange */}
        <h4 className="title-text mb-2 text-[var(--text-primary)]">Orange</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <ColorSample name="orange-bg" variable="--orange-bg" />
          <ColorSample name="orange-canvas" variable="--orange-canvas" />
          <ColorSample name="orange-text" variable="--orange-text" />
          <ColorSample name="orange-transparent" variable="--orange-transparent" />
        </div>
        
        {/* Purple */}
        <h4 className="title-text mb-2 text-[var(--text-primary)]">Purple</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <ColorSample name="purple-bg" variable="--purple-bg" />
          <ColorSample name="purple-canvas" variable="--purple-canvas" />
          <ColorSample name="purple-text" variable="--purple-text" />
          <ColorSample name="purple-transparent" variable="--purple-transparent" />
        </div>
        
        {/* Pink */}
        <h4 className="title-text mb-2 text-[var(--text-primary)]">Pink</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <ColorSample name="pink-bg" variable="--pink-bg" />
          <ColorSample name="pink-canvas" variable="--pink-canvas" />
          <ColorSample name="pink-text" variable="--pink-text" />
          <ColorSample name="pink-transparent" variable="--pink-transparent" />
        </div>
        
        {/* Yellow */}
        <h4 className="title-text mb-2 text-[var(--text-primary)]">Yellow</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <ColorSample name="yellow-bg" variable="--yellow-bg" />
          <ColorSample name="yellow-canvas" variable="--yellow-canvas" />
          <ColorSample name="yellow-text" variable="--yellow-text" />
          <ColorSample name="yellow-transparent" variable="--yellow-transparent" />
        </div>
      </section>
      
    </div>
  );
} 