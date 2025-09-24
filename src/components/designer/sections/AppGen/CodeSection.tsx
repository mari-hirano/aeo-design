"use client";

import React, { useState } from 'react';
import { Button } from '@/components/spring-ui/button';
import { IconButton } from '@/components/spring-ui/icon-button';
import { 
  ChevronSmallRightIcon,
  ChevronSmallDownIcon,
  CodeIcon,
  PreviewIcon,
  ArrowRightIcon,
  SettingsIcon
} from '@/icons';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';

export default function CodeSection() {
  const [activeTab, setActiveTab] = useState('code');
  const [isExpanded, setIsExpanded] = useState(true);

  const tabs = [
    { id: 'code', label: 'Code', icon: <CodeIcon size={16} /> },
    { id: 'preview', label: 'Preview', icon: <PreviewIcon size={16} /> }
  ];

  const codeContent = `// Pricing Calculator Component
import React, { useState } from 'react';

const PricingCalculator = () => {
  const [selectedPlan, setSelectedPlan] = useState('basic');
  const [addOns, setAddOns] = useState([]);
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = {
    basic: { monthly: 29, yearly: 290 },
    pro: { monthly: 59, yearly: 590 },
    enterprise: { monthly: 99, yearly: 990 }
  };

  const calculateTotal = () => {
    const basePrice = plans[selectedPlan][billingCycle];
    const addOnPrice = addOns.length * 10;
    return basePrice + addOnPrice;
  };

  return (
    <div className="pricing-calculator">
      <h2>Choose Your Plan</h2>
      {/* Plan selection UI */}
      <div className="total-price">
        Total: \${calculateTotal()}/{billingCycle === 'monthly' ? 'month' : 'year'}
      </div>
    </div>
  );
};

export default PricingCalculator;`;

  return (
    <div className="flex-1 flex flex-col">
      {/* Code Editor */}
      <div className="flex-1">
        <Highlight {...defaultProps} code={codeContent} language="jsx" theme={{ ...theme, plain: { ...theme.plain, backgroundColor: 'transparent' } }}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={`${className} text-sm font-mono leading-relaxed overflow-auto h-full bg-[var(--bg-primary)] p-4 rounded-md shadow-[var(--shadow-input)]`} style={{ ...style, fontFamily: 'Roboto Mono, monospace' }}>
              {tokens.map((line, index) => {
                const { key: lineKey, ...lineProps } = getLineProps({ line, key: index });
                return (
                  <div key={lineKey ?? index} {...lineProps}>
                    {line.map((token, tokenIndex) => {
                      const { key: tokenKey, ...tokenProps } = getTokenProps({ token, key: tokenIndex });
                      return <span key={tokenKey ?? tokenIndex} {...tokenProps} />;
                    })}
                  </div>
                );
              })}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
}
