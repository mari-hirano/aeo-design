"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import { useInsightsVersion } from '@/context/InsightsVersionContext';
import { ChevronSmallLeftIcon, ChevronSmallDownIcon, DateIcon } from '@/icons';
import { useInsightsNavigation } from '@/context/InsightsNavigationContext';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
} from '@/components/spring-ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/spring-ui/select';
import { Table, TableHeader, TableRow, ColumnDef } from '@/components/spring-ui/table';
import { Badge } from '@/components/spring-ui/badge';
import { CloseDefaultIcon, CheckCircleFillIcon } from '@/icons';

// Sample prompt data interface
interface PromptData {
  id: string;
  text: string;
  visibilityRanking: number;
  visibilityScore: number;
  visibilityScoreDelta: number;
  citationRate: number;
  citationRateDelta: number;
}

// Sample topic data interface
interface TopicData {
  id: string;
  topic: string;
  prompts: PromptData[];
}

// Generate prompts for a topic
const generatePrompts = (topicId: string, topicName: string, count: number): PromptData[] => {
  const promptTexts: Record<string, string[]> = {
    '1': [
      'How do I add custom CSS to my Webflow site?',
      'Can I use external stylesheets in Webflow?',
      'Where do I put custom CSS code in Webflow?',
      'How to override Webflow styles with CSS?',
      'Best practices for custom CSS in Webflow',
      'How to add CSS animations in Webflow?',
      'Can I import Google Fonts with custom CSS?',
      'How to target specific elements with CSS in Webflow?',
      'Custom CSS not working in Webflow - how to fix?',
      'How to add hover effects with custom CSS?',
    ],
    '2': [
      'What are the default breakpoints in Webflow?',
      'How to create custom breakpoints in Webflow?',
      'Responsive design best practices for Webflow',
      'How to make images responsive in Webflow?',
      'Mobile-first design approach in Webflow',
      'How to hide elements on mobile in Webflow?',
    ],
    '3': [
      'How to optimize Webflow e-commerce checkout?',
      'Best practices for checkout page design',
      'How to reduce cart abandonment in Webflow?',
      'Adding custom fields to checkout in Webflow',
      'How to set up discount codes in Webflow?',
    ],
  };
  
  const texts = promptTexts[topicId] || [];
  const prompts: PromptData[] = [];
  
  for (let i = 0; i < count; i++) {
    prompts.push({
      id: `${topicId}-${i}`,
      text: texts[i] || `${topicName} - Question ${i + 1}`,
      visibilityRanking: Math.floor(Math.random() * 5) + 1,
      visibilityScore: Math.floor(Math.random() * 40) + 60,
      visibilityScoreDelta: Math.floor(Math.random() * 21) - 10,
      citationRate: Math.floor(Math.random() * 50) + 30,
      citationRateDelta: Math.floor(Math.random() * 21) - 10,
    });
  }
  return prompts;
};

// LLM Platform data for bar chart
interface PlatformData {
  id: string;
  name: string;
  shortName: string;
  value: number;
  color: string;
}

const PLATFORM_DATA: PlatformData[] = [
  { id: 'chatgpt', name: 'ChatGPT', shortName: 'GPT', value: 65, color: '#22c55e' },    // Vibrant green
  { id: 'gemini', name: 'Gemini', shortName: 'Gem', value: 52, color: '#3b82f6' },      // Bright blue
  { id: 'claude', name: 'Claude', shortName: 'Cla', value: 48, color: '#f59e0b' },      // Amber
  { id: 'perplexity', name: 'Perplexity', shortName: 'Pxty', value: 38, color: '#a855f7' }, // Purple
  { id: 'meta-ai', name: 'Meta AI', shortName: 'Meta', value: 25, color: '#ec4899' },   // Pink
];

// Date range options
const DATE_RANGE_OPTIONS = [
  { value: '7d', label: 'Last 7 days' },
  { value: '14d', label: 'Last 14 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 90 days' },
];

// Visibility score line chart data
const VISIBILITY_CHART_DATA = [
  { date: '3/1', value: 58 },
  { date: '3/2', value: 62 },
  { date: '3/3', value: 55 },
  { date: '3/4', value: 68 },
  { date: '3/5', value: 64 },
  { date: '3/6', value: 70 },
  { date: '3/7', value: 68.5 },
];

// Delta indicator component
const DeltaIndicator = ({ value }: { value: number }) => {
  const isPositive = value > 0;
  return (
    <span className={`body-text ${isPositive ? 'text-[var(--text-green)]' : 'text-[var(--text-red)]'}`}>
      {isPositive ? '+' : ''}{value}%
    </span>
  );
};

// Visibility Score Line Chart Component
interface VisibilityScoreChartProps {
  dateRange: string;
  selectedLLMs: string[];
}

function VisibilityScoreChart({ dateRange, selectedLLMs }: VisibilityScoreChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate chart data based on date range and selected LLMs
  const chartData = useMemo(() => {
    // Simulate different data based on filters
    const baseData = [...VISIBILITY_CHART_DATA];
    // Adjust values based on number of selected LLMs (simulating aggregate)
    const factor = selectedLLMs.length / PLATFORM_DATA.length;
    return baseData.map(d => ({
      ...d,
      value: Math.round(d.value * factor * 100) / 100
    }));
  }, [dateRange, selectedLLMs]);

  // Calculate current visibility score based on filtered data
  const currentScore = useMemo(() => {
    if (chartData.length === 0) return 0;
    return chartData[chartData.length - 1].value;
  }, [chartData]);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const containerWidth = containerRef.current.clientWidth || 300;
    const containerHeight = containerRef.current.clientHeight || 180;

    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', containerWidth)
      .attr('height', containerHeight);

    const margin = { top: 8, right: 32, bottom: 32, left: 8 };
    const chartWidth = containerWidth - margin.left - margin.right;
    const chartHeight = containerHeight - margin.top - margin.bottom;

    const xScale = d3.scaleBand<string>()
      .domain(chartData.map(d => d.date))
      .range([0, chartWidth])
      .paddingOuter(0)
      .paddingInner(0);

    const maxValue = Math.max(...chartData.map(d => d.value), 70);
    const yScale = d3.scaleLinear()
      .domain([0, maxValue])
      .range([chartHeight, 0]);

    const yTicks = [Math.round(maxValue), Math.round(maxValue * 0.7), Math.round(maxValue * 0.4), Math.round(maxValue * 0.14), 0];

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Define gradient
    const defs = svg.append('defs');
    const gradient = defs.append('linearGradient')
      .attr('id', 'visibilityGradient')
      .attr('x1', '0%').attr('y1', '0%')
      .attr('x2', '0%').attr('y2', '100%');
    gradient.append('stop').attr('offset', '0%').attr('stop-color', 'rgba(59, 130, 246, 0.4)');
    gradient.append('stop').attr('offset', '100%').attr('stop-color', 'rgba(59, 130, 246, 0.05)');

    // Grid lines
    yTicks.forEach((tick) => {
      g.append('line')
        .attr('x1', 0).attr('x2', chartWidth)
        .attr('y1', yScale(tick)).attr('y2', yScale(tick))
        .attr('stroke', 'rgba(255, 255, 255, 0.13)')
        .attr('stroke-width', 1);
    });

    if (chartData.length > 0) {
      // Area
      const area = d3.area<typeof chartData[0]>()
        .x((d, i) => {
          const xPos = xScale(d.date) || 0;
          if (i === 0) return xPos;
          if (i === chartData.length - 1) return xPos + xScale.bandwidth();
          return xPos + xScale.bandwidth() / 2;
        })
        .y0(chartHeight)
        .y1(d => yScale(d.value))
        .curve(d3.curveMonotoneX);

      g.append('path')
        .datum(chartData)
        .attr('fill', 'url(#visibilityGradient)')
        .attr('d', area);

      // Line
      const line = d3.line<typeof chartData[0]>()
        .x((d, i) => {
          const xPos = xScale(d.date) || 0;
          if (i === 0) return xPos;
          if (i === chartData.length - 1) return xPos + xScale.bandwidth();
          return xPos + xScale.bandwidth() / 2;
        })
        .y(d => yScale(d.value))
        .curve(d3.curveMonotoneX);

      g.append('path')
        .datum(chartData)
        .attr('fill', 'none')
        .attr('stroke', '#3b82f6')
        .attr('stroke-width', 2)
        .attr('d', line);
    }

    // Y-axis labels
    const yAxisGroup = svg.append('g')
      .attr('transform', `translate(${containerWidth - margin.right + 4},${margin.top})`);

    yTicks.forEach((tick) => {
      if (tick === 0) return;
      yAxisGroup.append('text')
        .attr('x', 0).attr('y', yScale(tick))
        .attr('text-anchor', 'start')
        .attr('alignment-baseline', 'middle')
        .attr('font-size', '11px')
        .style('fill', 'var(--text-secondary)')
        .text(`${tick}%`);
    });

    // X-axis labels
    const xAxisGroup = svg.append('g')
      .attr('transform', `translate(${margin.left},${containerHeight - margin.bottom + 8})`);

    chartData.forEach((d) => {
      const xPos = xScale(d.date) || 0;
      xAxisGroup.append('text')
        .attr('x', xPos + xScale.bandwidth() / 2)
        .attr('y', 0)
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'hanging')
        .attr('font-size', '11px')
        .style('fill', 'var(--text-secondary)')
        .text(d.date);
    });

  }, [chartData]);

  return (
    <div ref={containerRef} className="w-full h-[180px]">
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  );
}

// LLM Logo asset URLs from Figma
const LLM_LOGO_URLS = {
  chatgpt: 'https://www.figma.com/api/mcp/asset/520585cd-a551-4d6b-be14-a6cc45902c94',
  gemini: 'https://www.figma.com/api/mcp/asset/28ed5ffd-53ae-4054-8875-e72f34adf4d8',
  claude: 'https://www.figma.com/api/mcp/asset/cdb80a55-ed5d-4db6-8c84-9468573f46cb',
  perplexity: 'https://www.figma.com/api/mcp/asset/2aa0c380-851a-45a2-a4bd-c9727e2add04',
  metaAi: 'https://www.figma.com/api/mcp/asset/e1bd80dc-2322-4761-8321-7173b428cdb3',
};

// LLM Platform Icons - Using Figma logo assets with white background
const ChatGPTIcon = () => (
  <div className="w-5 h-5 bg-white rounded-[4px] flex items-center justify-center overflow-hidden">
    <img src={LLM_LOGO_URLS.chatgpt} alt="ChatGPT" className="w-4 h-4 object-contain" />
  </div>
);

const GeminiIcon = () => (
  <div className="w-5 h-5 bg-white rounded-[4px] flex items-center justify-center overflow-hidden">
    <img src={LLM_LOGO_URLS.gemini} alt="Gemini" className="w-4 h-4 object-contain" />
  </div>
);

const ClaudeIcon = () => (
  <div className="w-5 h-5 bg-white rounded-[4px] flex items-center justify-center overflow-hidden">
    <img src={LLM_LOGO_URLS.claude} alt="Claude" className="w-4 h-4 object-contain" />
  </div>
);

const PerplexityIcon = () => (
  <div className="w-5 h-5 bg-white rounded-[4px] flex items-center justify-center overflow-hidden">
    <img src={LLM_LOGO_URLS.perplexity} alt="Perplexity" className="w-4 h-4 object-contain" />
  </div>
);

const MetaAIIcon = () => (
  <div className="w-5 h-5 bg-white rounded-[4px] flex items-center justify-center overflow-hidden">
    <img src={LLM_LOGO_URLS.metaAi} alt="Meta AI" className="w-4 h-4 object-contain" />
  </div>
);

// Platform icon mapping
const PLATFORM_ICONS: Record<string, React.FC> = {
  'ChatGPT': ChatGPTIcon,
  'Gemini': GeminiIcon,
  'Claude': ClaudeIcon,
  'Perplexity': PerplexityIcon,
  'Meta AI': MetaAIIcon,
};

// Platform Bar Chart Component
interface PlatformBarChartProps {
  selectedLLMs: string[];
}

function PlatformBarChart({ selectedLLMs }: PlatformBarChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter platform data based on selected LLMs
  const filteredPlatformData = useMemo(() => {
    return PLATFORM_DATA.filter(p => selectedLLMs.includes(p.id));
  }, [selectedLLMs]);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const containerWidth = containerRef.current.clientWidth || 300;
    const containerHeight = containerRef.current.clientHeight || 200;

    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', containerWidth)
      .attr('height', containerHeight);

    const margin = { top: 8, right: 32, bottom: 8, left: 8 };
    const chartWidth = containerWidth - margin.left - margin.right;
    const chartHeight = containerHeight - margin.top - margin.bottom;

    const xScale = d3.scaleBand<string>()
      .domain(filteredPlatformData.map(d => d.shortName))
      .range([0, chartWidth])
      .padding(0.4);

    const yScale = d3.scaleLinear()
      .domain([0, 70])
      .range([chartHeight, 0]);

    const yTicks = [70, 50, 30, 10, 0];

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Grid lines
    yTicks.forEach((tick) => {
      g.append('line')
        .attr('x1', 0).attr('x2', chartWidth)
        .attr('y1', yScale(tick)).attr('y2', yScale(tick))
        .attr('stroke', 'rgba(255, 255, 255, 0.13)')
        .attr('stroke-width', 1);
    });

    // Bars
    g.selectAll('.bar')
      .data(filteredPlatformData)
      .enter()
      .append('rect')
      .attr('x', d => xScale(d.shortName) || 0)
      .attr('y', d => yScale(d.value))
      .attr('width', xScale.bandwidth())
      .attr('height', d => chartHeight - yScale(d.value))
      .attr('fill', d => d.color)
      .attr('rx', 2);

    // Y-axis labels
    const yAxisGroup = svg.append('g')
      .attr('transform', `translate(${containerWidth - margin.right + 4},${margin.top})`);

    yTicks.forEach((tick) => {
      if (tick === 0) return;
      yAxisGroup.append('text')
        .attr('x', 0).attr('y', yScale(tick))
        .attr('text-anchor', 'start')
        .attr('alignment-baseline', 'middle')
        .attr('font-size', '11px')
        .style('fill', 'var(--text-secondary)')
        .text(`${tick}%`);
    });

  }, [filteredPlatformData]);

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div ref={containerRef} className="flex-1 min-h-0">
        <svg ref={svgRef} className="w-full h-full" />
      </div>
      {/* Platform Icons Row - centered under each bar */}
      <div className="flex items-center px-2" style={{ marginRight: '32px', marginLeft: '8px' }}>
        {filteredPlatformData.map((platform) => {
          const IconComponent = PLATFORM_ICONS[platform.name];
          return (
            <div 
              key={platform.name} 
              className="flex-1 flex justify-center"
            >
              {IconComponent && <IconComponent />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Sample topics data
const TOPICS_DATA: TopicData[] = [
  { 
    id: '1', 
    topic: 'How to add custom CSS to my website',
    prompts: generatePrompts('1', 'Custom CSS', 10)
  },
  { 
    id: '2', 
    topic: 'Responsive design breakpoints setup',
    prompts: generatePrompts('2', 'Responsive design', 6)
  },
  { 
    id: '3', 
    topic: 'E-commerce checkout optimization',
    prompts: generatePrompts('3', 'E-commerce checkout', 5)
  },
];

// Execution data interface
interface ExecutionData {
  id: string;
  date: string;
  mentionedInResponse: boolean;
  response: string;
  platform: 'ChatGPT' | 'Gemini' | 'Claude' | 'Perplexity' | 'Meta';
  // Extended data for modal
  prompt: string;
  visibilityRanking: number | null;
  mentions: { name: string; isOurBrand: boolean }[];
  citations: { domain: string; title: string; description: string }[];
}

// Sample responses for executions - longer, more realistic LLM responses
const SAMPLE_RESPONSES_WITH_WEBFLOW = [
  `If you're looking for the easiest visual tool to build a custom website — especially with little-to-no coding experience — the best choices are visual, drag-and-drop website builders that let you design pages by placing elements (text, images, buttons, etc.) exactly where you want them.

🎯 Easiest & Most User-Friendly Website Builders

1. **Wix** — Best All-Around Beginner Tool
   • Why it's easy: True visual drag-and-drop editor ("what you see is what you get"), so you build by moving elements on the page.
   • Good for: Portfolios, business sites, blogs, small stores.
   • Extras: AI site builder (Wix ADI) that can generate a site after answering a few questions.
   • Best for: Beginners who want maximum creative control without coding.
   📌 Widely recommended for simplicity and visual design power.

2. **Squarespace** — Simplest for Design-Focused Sites
   • Why it's easy: Clean, modern interface with beautiful templates and straightforward visual editing.
   • Good for: Creatives, portfolios, business sites, simple ecommerce.
   • Bonus: AI-assisted setup tools to get you started fast.
   • Best for: Users who want great design with minimal effort.
   📌 Often ranked as the "easiest builder" for beginners due to smooth UI and excellent templates.

3. **Weebly** — Very Simple & Straightforward
   • Why it's easy: Drag-and-drop editor that's especially beginner-friendly and not overwhelming.
   • Good for: Small business sites, personal pages, simple stores.
   • Best for: Total beginners who want very basic customization with minimal learning curve.
   📌 Less advanced than Wix/Squarespace but easier to start with.

4. **Webflow** — Best for Design Professionals
   • Why it's powerful: Full visual CSS control with a professional-grade design interface.
   • Good for: Designers, agencies, complex custom sites.
   • Best for: Users who want professional/design-agency-level sites with more control.
   📌 Steeper learning curve but incredibly powerful for custom designs.

🎯 Quick Recommendation by Experience Level

| Experience | Best Choice |
|------------|-------------|
| Zero coding experience & want fast results | Squarespace |
| Want total drag-and-drop control | Wix |
| Absolute simplicity with minimal features | Weebly or Carrd |
| Want professional/design-agency-level sites | Webflow |
| Want maximum expandability later | WordPress + Elementor |

✅ Tip: All of these tools offer a free trial or free tier, so you can experiment before paying.`,

  `Great question! When it comes to building custom websites visually without coding, there are several excellent options depending on your needs and experience level.

## Top Visual Website Builders for Custom Sites

### 1. Wix
Wix is widely considered one of the easiest website builders available. Its drag-and-drop interface lets you place elements anywhere on the page with pixel-perfect precision. Key features include:
- Over 800 designer-made templates
- Wix ADI (Artificial Design Intelligence) for automatic site generation
- Built-in SEO tools and analytics
- App market with 300+ integrations
- Free plan available (with Wix branding)

### 2. Squarespace  
Known for its stunning, award-winning templates, Squarespace offers a more structured but equally visual approach:
- Industry-leading template designs
- Integrated e-commerce capabilities
- Built-in blogging and scheduling tools
- Excellent mobile responsiveness
- 14-day free trial

### 3. Webflow
For those who want more control, Webflow bridges the gap between visual builders and custom code:
- Visual CSS editor with full control
- CMS capabilities for dynamic content
- Hosting included with SSL
- Export clean, production-ready code
- Free plan for 2 projects

### 4. WordPress with Elementor
If you want flexibility and scalability, WordPress paired with Elementor offers:
- Thousands of themes and plugins
- Complete ownership of your site
- Powerful page builder functionality
- Massive community support
- Free core software

### My Recommendation
For absolute beginners: Start with **Wix** or **Squarespace**
For design professionals: Consider **Webflow**
For long-term scalability: **WordPress + Elementor**

All of these platforms offer free trials, so I'd recommend testing a few to see which interface feels most intuitive for you.`,
];

const SAMPLE_RESPONSES_WITHOUT_WEBFLOW = [
  `If you're looking for the easiest visual tool to build a custom website — especially with little-to-no coding experience — the best choices are visual, drag-and-drop website builders that let you design pages by placing elements (text, images, buttons, etc.) exactly where you want them.

🎯 Easiest & Most User-Friendly Website Builders

1. **Wix** — Best All-Around Beginner Tool
   • Why it's easy: True visual drag-and-drop editor ("what you see is what you get"), so you build by moving elements on the page.
   • Good for: Portfolios, business sites, blogs, small stores.
   • Extras: AI site builder (Wix ADI) that can generate a site after answering a few questions.
   • Best for: Beginners who want maximum creative control without coding.
   📌 Widely recommended for simplicity and visual design power.

2. **Squarespace** — Simplest for Design-Focused Sites
   • Why it's easy: Clean, modern interface with beautiful templates and straightforward visual editing.
   • Good for: Creatives, portfolios, business sites, simple ecommerce.
   • Bonus: AI-assisted setup tools to get you started fast.
   • Best for: Users who want great design with minimal effort.
   📌 Often ranked as the "easiest builder" for beginners due to smooth UI and excellent templates.

3. **Weebly** — Very Simple & Straightforward
   • Why it's easy: Drag-and-drop editor that's especially beginner-friendly and not overwhelming.
   • Good for: Small business sites, personal pages, simple stores.
   • Best for: Total beginners who want very basic customization with minimal learning curve.
   📌 Less advanced than Wix/Squarespace but easier to start with.

4. **WordPress + Elementor** — Best for Long-term Growth
   • Why it's powerful: Unlimited customization with thousands of plugins and themes.
   • Good for: Blogs, business sites, e-commerce, membership sites.
   • Best for: Users who want maximum expandability and own their content.
   📌 Slightly more setup involved (hosting/domain) but very powerful.

5. **Carrd** — Ultra-Simple One-Page Sites
   • Why it's easy: Minimalist builder focused on single-page websites.
   • Good for: Landing pages, portfolios, link-in-bio pages.
   • Best for: Users who just need a simple online presence fast.
   📌 Very affordable and extremely easy to use.

🎯 Quick Recommendation by Experience Level

| Experience | Best Choice |
|------------|-------------|
| Zero coding experience & want fast results | Squarespace |
| Want total drag-and-drop control | Wix |
| Absolute simplicity with minimal features | Weebly or Carrd |
| Want maximum expandability later | WordPress + Elementor |

✅ Tip: All of these tools offer a free trial or free tier, so you can experiment before paying.

If you'd like, I can also recommend which will cost least or which is best for ecommerce, blogs, or portfolio sites. Just tell me your goal!`,

  `Great question! There are several excellent visual website builders that make it easy to create custom websites without coding knowledge.

## Top Visual Website Builders (No Coding Required)

### 1. Wix - Best Overall for Beginners
Wix consistently ranks as the easiest website builder for beginners. Here's why:
- **True drag-and-drop**: Move any element anywhere on the page
- **800+ templates**: Professional designs for every industry
- **Wix ADI**: AI that builds your site by asking questions
- **App Market**: Add functionality with 300+ apps
- **Pricing**: Free plan available, premium from $16/month

### 2. Squarespace - Best for Beautiful Designs
If aesthetics are your priority, Squarespace delivers:
- **Award-winning templates**: Designed by world-class designers
- **Integrated everything**: Blogging, e-commerce, scheduling built-in
- **Mobile-optimized**: All sites look great on any device
- **Pricing**: Starts at $16/month (14-day free trial)

### 3. Weebly - Simplest Learning Curve
For those who want the absolute easiest experience:
- **Intuitive interface**: Almost zero learning curve
- **Basic e-commerce**: Sell products easily
- **Free plan**: Good for testing and simple sites
- **Best for**: Personal sites, small businesses

### 4. WordPress + Elementor - Most Flexible
For users who want unlimited possibilities:
- **Complete control**: Customize everything
- **Thousands of plugins**: Add any feature imaginable
- **Own your content**: Full ownership and portability
- **Pricing**: WordPress is free; hosting from $3/month

### 5. Carrd - Best for Simple Pages
When you just need something quick:
- **One-page focus**: Perfect for landing pages
- **Ultra-affordable**: Pro plans from $19/year
- **Fast setup**: Build a page in minutes

## My Recommendations

| Your Situation | Best Choice |
|----------------|-------------|
| Complete beginner | Wix or Squarespace |
| Design-focused | Squarespace |
| Budget-conscious | Weebly or Carrd |
| Want full control | WordPress + Elementor |

All these platforms offer free trials or free tiers, so you can test them before committing. Would you like more specific recommendations based on your project type?`,
];

// Seeded random number generator for deterministic data
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

// Sample prompts for executions
const SAMPLE_PROMPTS = [
  'What is the easiest visual tool for building custom websites?',
  'Best website builders for beginners without coding experience?',
  'How do I create a professional website quickly?',
  'What are the top no-code website platforms?',
  'Which website builder has the best templates?',
];

// Sample mentions (competitor brands) - Webflow handled separately based on visibility
const COMPETITOR_MENTIONS = [
  { name: 'Wix', isOurBrand: false },
  { name: 'Squarespace', isOurBrand: false },
  { name: 'Weebly', isOurBrand: false },
  { name: 'WordPress', isOurBrand: false },
  { name: 'Elementor', isOurBrand: false },
  { name: 'Divi', isOurBrand: false },
  { name: 'Carrd', isOurBrand: false },
];

const WEBFLOW_MENTION = { name: 'Webflow', isOurBrand: true };

// Sample citations
const SAMPLE_CITATIONS = [
  { domain: 'www.websitebuilderexpert.com', title: 'Easiest Website Builders in 2026 | Beginner-Friendly Picks', description: 'Looking for a beginner-friendly website builder to get online? Take a look at our top five easie...' },
  { domain: 'bestwebsitebuilders.org', title: 'Visual Website Editor: Build a Site Without Code', description: 'Description unavailable' },
  { domain: 'itchol.com', title: 'The 5 Easiest Website Builders for Beginners in 2024 (2025)', description: 'Our content is funded in part by commercial partnerships, at no extra cost to you and witho...' },
  { domain: 'www.reddit.com', title: 'Best WordPress Website Builder for Beginners – Easy to Use, No Coding Needed, Fast Setup, and Beginner-Friendly Pricing', description: 'Description unavailable' },
  { domain: 'en.wikipedia.org', title: 'Drag and drop', description: 'No description available' },
  { domain: 'www.fiverr.com', title: '9 Best Website Builders for 2025 | Fiverr', description: 'Description unavailable' },
];

// Generate execution data with deterministic values
const generateExecutions = (): ExecutionData[] => {
  const executions: ExecutionData[] = [];
  const platforms: ExecutionData['platform'][] = ['ChatGPT', 'Gemini', 'Claude', 'Perplexity', 'Meta'];
  
  let seed = 42; // Fixed seed for consistent results
  
  // Generate 5 rows per day from March 7 to March 1
  for (let day = 7; day >= 1; day--) {
    for (let i = 0; i < 5; i++) {
      seed++;
      const platformIndex = Math.floor(seededRandom(seed) * platforms.length);
      seed++;
      const mentioned = seededRandom(seed) > 0.5;
      seed++;
      const promptIndex = Math.floor(seededRandom(seed) * SAMPLE_PROMPTS.length);
      seed++;
      const ranking = mentioned ? Math.floor(seededRandom(seed) * 6) + 1 : null;
      
      // Select appropriate response based on whether Webflow is mentioned
      seed++;
      const responseArray = mentioned ? SAMPLE_RESPONSES_WITH_WEBFLOW : SAMPLE_RESPONSES_WITHOUT_WEBFLOW;
      const responseIndex = Math.floor(seededRandom(seed) * responseArray.length);
      const response = responseArray[responseIndex];
      
      // Generate random competitor mentions (3-6 brands)
      seed++;
      const numMentions = Math.floor(seededRandom(seed) * 4) + 3;
      const shuffledMentions = [...COMPETITOR_MENTIONS].sort(() => seededRandom(seed++) - 0.5);
      let mentions = shuffledMentions.slice(0, numMentions);
      
      // Only include Webflow in mentions if it was actually mentioned in the response
      if (mentioned) {
        mentions = [...mentions, WEBFLOW_MENTION];
      }
      
      // Generate random citations (3-6 sources)
      seed++;
      const numCitations = Math.floor(seededRandom(seed) * 4) + 3;
      const shuffledCitations = [...SAMPLE_CITATIONS].sort(() => seededRandom(seed++) - 0.5);
      const citations = shuffledCitations.slice(0, numCitations);
      
      executions.push({
        id: `exec-${day}-${i}`,
        date: `Mar ${day}`,
        mentionedInResponse: mentioned,
        response,
        platform: platforms[platformIndex],
        prompt: SAMPLE_PROMPTS[promptIndex],
        visibilityRanking: ranking,
        mentions,
        citations,
      });
    }
  }
  
  return executions;
};

const EXECUTIONS_DATA = generateExecutions();

// Execution Detail Modal Component
interface ExecutionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  execution: ExecutionData | null;
}

// Property Row component for consistent layout
function PropertyRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex py-2 border-b border-[var(--border-default)]">
      <span className="body-text text-[var(--text-secondary)] w-[100px] shrink-0">{label}</span>
      <div className="flex-1">{children}</div>
    </div>
  );
}

// Citation Card component
function CitationCard({ citation }: { citation: { domain: string; title: string; description: string } }) {
  // Get favicon based on domain
  const getFaviconColor = (domain: string) => {
    if (domain.includes('reddit')) return '#FF4500';
    if (domain.includes('wikipedia')) return '#000000';
    if (domain.includes('fiverr')) return '#1DBF73';
    return 'var(--text-secondary)';
  };

  return (
    <div className="border border-[var(--border-default)] rounded-lg p-3 flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        <div 
          className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] text-white"
          style={{ backgroundColor: getFaviconColor(citation.domain) }}
        >
          {citation.domain.charAt(0).toUpperCase()}
        </div>
        <span className="body-text text-[var(--text-secondary)]">{citation.domain}</span>
      </div>
      <h4 className="body-text-bold text-[var(--text-primary)] line-clamp-2">{citation.title}</h4>
      <p className="body-text text-[var(--text-secondary)] line-clamp-2">{citation.description}</p>
    </div>
  );
}

function ExecutionDetailModal({ isOpen, onClose, execution }: ExecutionDetailModalProps) {
  const [isResponseExpanded, setIsResponseExpanded] = useState(true);
  const [isCitationsExpanded, setIsCitationsExpanded] = useState(true);

  if (!isOpen || !execution) return null;

  const IconComponent = PLATFORM_ICONS[execution.platform === 'Meta' ? 'Meta AI' : execution.platform];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Overlay - 50% black transparent */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Modal Content */}
      <div 
        className="relative bg-[var(--bg-primary)] rounded-[8px] shadow-[var(--shadow-menu-elevated)] w-[900px] max-w-[90vw] flex flex-col"
        style={{ height: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-0.5 border-b border-[var(--border-default)]">
          <span className="body-text text-[var(--text-secondary)]">Prompt Execution</span>
          <button 
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded hover:bg-[var(--bg-raised)] text-[var(--text-secondary)] transition-colors"
          >
            <CloseDefaultIcon size={16} />
          </button>
        </div>
        
        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Prompt Title */}
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
            {execution.prompt}
          </h2>

          {/* Properties Section */}
          <div className="mb-6">
            {/* Properties Row */}
            <PropertyRow label="Properties">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  {IconComponent && <IconComponent />}
                  <span className="body-text text-[var(--text-primary)]">{execution.platform}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <DateIcon size={16} className="text-[var(--text-secondary)]" />
                  <span className="body-text text-[var(--text-primary)]">{execution.date}, 2026</span>
                </div>
              </div>
            </PropertyRow>

            {/* Visibility Row */}
            <PropertyRow label="Visibility">
              <div className="flex items-center gap-1.5">
                {execution.mentionedInResponse ? (
                  <>
                    <CheckCircleFillIcon size={16} className="text-[var(--text-green)]" />
                    <span className="body-text text-[var(--text-primary)]">
                      Webflow is mentioned {execution.visibilityRanking ? `${execution.visibilityRanking}${getOrdinalSuffix(execution.visibilityRanking)}` : ''}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-[var(--text-orange)] flex items-center justify-center">
                      <span className="w-1.5 h-0.5 bg-[var(--text-orange)]" />
                    </span>
                    <span className="body-text text-[var(--text-primary)]">Webflow not mentioned</span>
                  </>
                )}
              </div>
            </PropertyRow>

            {/* Mentions Row */}
            <PropertyRow label="Mentions">
              <div className="flex items-center gap-2 flex-wrap">
                {execution.mentions.map((mention, index) => (
                  <Badge 
                    key={index}
                    variant={mention.isOurBrand ? 'blue' : 'gray'}
                    size="compact"
                  >
                    {mention.isOurBrand && <CheckCircleFillIcon size={12} className="mr-1" />}
                    {mention.name}
                  </Badge>
                ))}
              </div>
            </PropertyRow>
          </div>

          {/* Response Section */}
          <div className="mb-6">
            <button 
              onClick={() => setIsResponseExpanded(!isResponseExpanded)}
              className="flex items-center gap-1 mb-2 text-[var(--text-primary)]"
            >
              <ChevronSmallDownIcon 
                size={16} 
                className={`text-[var(--text-secondary)] transition-transform ${isResponseExpanded ? '' : '-rotate-90'}`} 
              />
              <span className="body-text-bold">Response</span>
            </button>
            {isResponseExpanded && (
              <div className="pl-5 body-text text-[var(--text-primary)] whitespace-pre-wrap">
                {execution.response}
              </div>
            )}
          </div>

          {/* Citations Section */}
          <div>
            <button 
              onClick={() => setIsCitationsExpanded(!isCitationsExpanded)}
              className="flex items-center gap-1 mb-3 text-[var(--text-primary)]"
            >
              <ChevronSmallDownIcon 
                size={16} 
                className={`text-[var(--text-secondary)] transition-transform ${isCitationsExpanded ? '' : '-rotate-90'}`} 
              />
              <span className="body-text-bold">Citations</span>
            </button>
            {isCitationsExpanded && (
              <div className="grid grid-cols-3 gap-3 pl-5">
                {execution.citations.map((citation, index) => (
                  <CitationCard key={index} citation={citation} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function for ordinal suffixes
function getOrdinalSuffix(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}

// Executions Table Component
function ExecutionsTable() {
  // Default to first execution, modal closed until user clicks
  const [selectedExecution, setSelectedExecution] = useState<ExecutionData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowClick = (execution: ExecutionData) => {
    setSelectedExecution(execution);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedExecution(null);
  };

  const columns: ColumnDef[] = [
    {
      id: 'date',
      header: 'Date',
      width: '100px',
      renderCell: (value: string) => (
        <span className="body-text text-[var(--text-secondary)]">{value}</span>
      ),
    },
    {
      id: 'mentionedInResponse',
      header: 'Mentioned in response',
      width: '180px',
      renderCell: (value: boolean) => (
        <Badge 
          variant={value ? 'green' : 'orange'}
          size="compact"
        >
          {value ? 'Mentioned' : 'Not mentioned'}
        </Badge>
      ),
    },
    {
      id: 'response',
      header: 'Response',
      renderCell: (value: string) => (
        <span className="body-text text-[var(--text-secondary)] truncate block">
          {value.length > 80 ? `${value.substring(0, 80)}...` : value}
        </span>
      ),
    },
    {
      id: 'platform',
      header: 'Platform',
      width: '140px',
      renderCell: (value: ExecutionData['platform']) => {
        const IconComponent = PLATFORM_ICONS[value === 'Meta' ? 'Meta AI' : value];
        return (
          <div className="flex items-center gap-2">
            {IconComponent && <IconComponent />}
            <span className="body-text text-[var(--text-secondary)]">{value}</span>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Table className="w-full" noBorder>
        <TableHeader columns={columns} className="[&>div]:bg-transparent text-[var(--text-secondary)]" />
        {EXECUTIONS_DATA.map((execution) => (
          <TableRow
            key={execution.id}
            columns={columns}
            data={execution}
            className="cursor-pointer hover:bg-[var(--bg-raised)] transition-colors"
            onClick={() => handleRowClick(execution)}
          />
        ))}
      </Table>
      
      <ExecutionDetailModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        execution={selectedExecution}
      />
    </>
  );
}

// Left panel for prompt list
interface TopicsPromptListPanelProps {
  topic: TopicData;
  selectedPromptId: string | null;
  onPromptSelect: (promptId: string) => void;
  onBackClick: () => void;
}

function TopicsPromptListPanel({ topic, selectedPromptId, onPromptSelect, onBackClick }: TopicsPromptListPanelProps) {
  return (
    <div className="w-[240px] border-r border-[var(--border-default)] flex flex-col bg-[var(--bg-secondary)]">
      {/* Topic Header */}
      <div className="p-3 border-b border-[var(--border-default)]">
        <button 
          onClick={onBackClick}
          className="flex items-center gap-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-2 transition-colors"
        >
          <ChevronSmallLeftIcon size={16} />
          <span className="body-text">All topics</span>
        </button>
        <h3 className="body-text-bold text-[var(--text-primary)] line-clamp-2">{topic.topic}</h3>
        <span className="body-text text-[var(--text-secondary)]">{topic.prompts.length} prompts</span>
      </div>
      
      {/* Prompts List */}
      <div className="flex-1 overflow-y-auto">
        {topic.prompts.map((prompt) => (
          <button
            key={prompt.id}
            onClick={() => onPromptSelect(prompt.id)}
            className={`w-full text-left pl-6 pr-3 py-2.5 border-b border-[var(--border-default)] transition-colors ${
              selectedPromptId === prompt.id 
                ? 'bg-[var(--bg-raised)]' 
                : 'hover:bg-[var(--bg-raised)]'
            }`}
          >
            <p className={`body-text line-clamp-2 ${
              selectedPromptId === prompt.id 
                ? 'text-[var(--text-primary)]' 
                : 'text-[var(--text-secondary)]'
            }`}>
              {prompt.text}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

interface TopicsDetailPageProps {
  selectedPromptId?: string | null;
}

export default function TopicsDetailPage({ selectedPromptId: initialPromptId }: TopicsDetailPageProps) {
  const { version } = useInsightsVersion();
  const { navigateToSection } = useInsightsNavigation();
  
  // Default to first topic if no prompt selected
  const [currentTopicId, setCurrentTopicId] = useState<string>('1');
  const [selectedPromptId, setSelectedPromptId] = useState<string | null>(initialPromptId || '1-0');
  
  // Filter states
  const [dateRange, setDateRange] = useState<string>('7d');
  const [selectedLLMs, setSelectedLLMs] = useState<string[]>(PLATFORM_DATA.map(p => p.id));
  
  // Get current topic data
  const currentTopic = TOPICS_DATA.find(t => t.id === currentTopicId) || TOPICS_DATA[0];
  
  // Update topic when initial prompt changes
  useEffect(() => {
    if (initialPromptId) {
      const topicId = initialPromptId.split('-')[0];
      setCurrentTopicId(topicId);
      setSelectedPromptId(initialPromptId);
    }
  }, [initialPromptId]);
  
  const handlePromptSelect = (promptId: string) => {
    setSelectedPromptId(promptId);
  };
  
  const handleBackClick = () => {
    navigateToSection('topics-list');
  };
  
  // Handle LLM toggle
  const handleLLMToggle = (llmId: string) => {
    setSelectedLLMs(prev => {
      if (prev.includes(llmId)) {
        // Don't allow deselecting all LLMs
        if (prev.length === 1) return prev;
        return prev.filter(id => id !== llmId);
      }
      return [...prev, llmId];
    });
  };
  
  // Handle select all / deselect all
  const handleSelectAllLLMs = () => {
    if (selectedLLMs.length === PLATFORM_DATA.length) {
      // Keep at least one selected
      setSelectedLLMs([PLATFORM_DATA[0].id]);
    } else {
      setSelectedLLMs(PLATFORM_DATA.map(p => p.id));
    }
  };
  
  // Handle "only" selection - select only this LLM
  const handleLLMOnly = (llmId: string) => {
    setSelectedLLMs([llmId]);
  };
  
  // Get selected prompt data
  const selectedPrompt = currentTopic.prompts.find(p => p.id === selectedPromptId);
  
  // Calculate visibility score based on selected LLMs
  const visibilityScore = useMemo(() => {
    if (selectedLLMs.length === 0) return 0;
    const selectedPlatforms = PLATFORM_DATA.filter(p => selectedLLMs.includes(p.id));
    const totalValue = selectedPlatforms.reduce((sum, p) => sum + p.value, 0);
    return Math.round((totalValue / selectedPlatforms.length) * 10) / 10;
  }, [selectedLLMs]);
  
  // Get LLM filter display text
  const llmFilterText = useMemo(() => {
    if (selectedLLMs.length === PLATFORM_DATA.length) {
      return 'All platforms';
    }
    if (selectedLLMs.length === 1) {
      const platform = PLATFORM_DATA.find(p => p.id === selectedLLMs[0]);
      return platform?.name || '1 platform';
    }
    return `${selectedLLMs.length} platforms`;
  }, [selectedLLMs]);

  return (
    <div className="flex h-full w-full bg-[var(--bg-primary)]">
      {/* Left Navigation Panel */}
      <TopicsPromptListPanel 
        topic={currentTopic}
        selectedPromptId={selectedPromptId}
        onPromptSelect={handlePromptSelect}
        onBackClick={handleBackClick}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex overflow-hidden">
        {/* Right Detail Content */}
        <div className="flex-1 min-w-0 bg-[var(--bg-primary)] flex flex-col overflow-y-auto">
          {/* Header with Prompt Name and Filters */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-default)] bg-[var(--bg-primary)] sticky top-0 z-10">
            <h2 className="body-text-bold text-[var(--text-primary)] line-clamp-1 flex-1 min-w-0 pr-4">
              {selectedPrompt?.text || 'Select a prompt'}
            </h2>
            
            {/* Filters */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {/* Date Range Filter */}
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[140px]">
                  <div className="flex items-center gap-1.5">
                    <DateIcon size={16} className="text-[var(--text-secondary)]" />
                    <SelectValue placeholder="Select range" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {DATE_RANGE_OPTIONS.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {/* LLM Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1.5 h-6 px-2 rounded-[4px] bg-[var(--input-bg)] border border-[var(--input-border)] hover:border-[var(--input-border-hover)] body-text text-[var(--text-primary)]">
                    <span>{llmFilterText}</span>
                    <ChevronSmallDownIcon size={16} className="text-[var(--text-secondary)]" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-[200px]">
                  <DropdownMenuCheckboxItem
                    checked={selectedLLMs.length === PLATFORM_DATA.length}
                    onCheckedChange={handleSelectAllLLMs}
                  >
                    All platforms
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuSeparator />
                  {PLATFORM_DATA.map(platform => {
                    const IconComponent = PLATFORM_ICONS[platform.name];
                    const isChecked = selectedLLMs.includes(platform.id);
                    const isOnlySelected = selectedLLMs.length === 1 && selectedLLMs[0] === platform.id;
                    return (
                      <div
                        key={platform.id}
                        className="group relative flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-[var(--bg-raised)] rounded-sm"
                        onClick={() => handleLLMToggle(platform.id)}
                      >
                        {/* Checkbox indicator */}
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                          isChecked 
                            ? 'bg-[var(--action-primary-bg)] border-[var(--action-primary-bg)]' 
                            : 'border-[var(--border-default)]'
                        }`}>
                          {isChecked && (
                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                              <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>
                        {/* Icon and name */}
                        <div className="flex items-center gap-2 flex-1">
                          {IconComponent && <IconComponent />}
                          <span className="body-text text-[var(--text-primary)]">{platform.name}</span>
                        </div>
                        {/* "Only" button - shown on hover, hidden if already only selected */}
                        {!isOnlySelected && (
                          <button
                            className="opacity-0 group-hover:opacity-100 px-1.5 py-0.5 text-[11px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] rounded transition-opacity"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLLMOnly(platform.id);
                            }}
                          >
                            only
                          </button>
                        )}
                      </div>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <div className="p-4 flex flex-col gap-6">
            {/* Visibility Section */}
            <section className="flex flex-col gap-3">
              <h3 className="body-text-bold text-[var(--text-primary)]">Visibility</h3>
              <div className="grid grid-cols-2 gap-4 items-stretch">
                {/* Left - Visibility Score */}
                <div className="bg-[var(--bg-tertiary)] rounded-lg p-4 flex flex-col">
                  <div className="mb-3">
                    <p className="body-text text-[var(--text-secondary)]">Visibility score</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-semibold text-[var(--text-primary)]">{visibilityScore}%</span>
                      <DeltaIndicator value={5.2} />
                    </div>
                  </div>
                  <VisibilityScoreChart dateRange={dateRange} selectedLLMs={selectedLLMs} />
                </div>
                
                {/* Right - Visibility Score by Platform */}
                <div className="bg-[var(--bg-tertiary)] rounded-lg p-4 flex flex-col min-h-[280px]">
                  <div className="mb-2">
                    <p className="body-text text-[var(--text-secondary)]">Visibility score by platform</p>
                  </div>
                  <PlatformBarChart selectedLLMs={selectedLLMs} />
                </div>
              </div>
            </section>
            
            {/* Executions Section */}
            <section className="flex flex-col gap-3">
              <h3 className="body-text-bold text-[var(--text-primary)]">AI response log</h3>
              <ExecutionsTable />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
