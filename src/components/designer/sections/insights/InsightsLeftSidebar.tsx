"use client";

import React, { useState, useEffect } from 'react';
import { Row } from '@/components/spring-ui/row';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/spring-ui/select';
import { 
  TemplatesIcon,
  PageDefaultIcon,
  ElementButtonIcon,
  SettingsIcon,
  GoalsIcon,
  IntegrationsIcon,
  ChevronSmallDownIcon,
  ChevronSmallRightIcon
} from '@/icons';
import { Robot24Icon } from '@/icons/Robot24Icon';
import { InsightsFeatureState } from '@/types/insights';

interface InsightsLeftSidebarProps {
  selectedSection: string;
  onSectionChange: (section: string) => void;
  featureState: InsightsFeatureState;
  onFeatureStateChange: (state: InsightsFeatureState) => void;
}

export default function InsightsLeftSidebar({ 
  selectedSection, 
  onSectionChange,
  featureState,
  onFeatureStateChange
}: InsightsLeftSidebarProps) {
  const [aiVisibilityExpanded, setAiVisibilityExpanded] = useState(false);

  // Close AI visibility section when navigating to other pages
  useEffect(() => {
    const sectionsToCloseAiVisibility = ['site-overview', 'pages-list', 'pages-detail', 'goals-list', 'goals-detail'];
    if (sectionsToCloseAiVisibility.includes(selectedSection)) {
      setAiVisibilityExpanded(false);
    }
  }, [selectedSection]);

  // Determine if Analyze section should be shown
  const showAnalyze = featureState === 'analyze-only' || featureState === 'analyze-and-optimize' || featureState === 'optimize-only';
  
  // Determine if Optimize section should be shown
  const showOptimize = featureState === 'optimize-only' || featureState === 'analyze-and-optimize' || featureState === 'analyze-only';
  
  // Determine what to show in Analyze section
  const showAnalyzeUpsell = featureState === 'optimize-only';
  const showAnalyzeContent = featureState === 'analyze-only' || featureState === 'analyze-and-optimize';
  const showGoalsInAnalyze = featureState === 'analyze-only' || featureState === 'analyze-and-optimize';
  
  // Determine what to show in Optimize section
  const showOptimizeUpsell = featureState === 'analyze-only';
  const showOptimizeContent = featureState === 'optimize-only' || featureState === 'analyze-and-optimize';
  const showGoalsInOptimize = featureState === 'optimize-only';
  
  // Determine Settings section visibility
  const showTracking = true; // Always shown
  const showAudiences = featureState === 'optimize-only' || featureState === 'analyze-and-optimize';
  const showIntegrations = featureState === 'optimize-only' || featureState === 'analyze-and-optimize';

  return (
    <div className="w-60 h-full bg-[var(--bg-primary)] border-r border-[var(--border-default)] flex flex-col px-[var(--space-md)]">
      {/* Analyze Section */}
      {showAnalyze && (
        <>
          <div className="flex items-center justify-between h-10 px-2 py-2 border-[var(--border-default)]">
            <div className="flex items-center gap-1">
              <h2 className="text-[var(--text-primary)] body-text-bold">Analyze</h2>
            </div>
          </div>

          <div className="flex flex-col pb-2 gap-0.5">
            {showAnalyzeUpsell ? (
              <Row 
                label="Get started with Analyze" 
                icon={<TemplatesIcon size={16} />}
                selected={false}
                onClick={() => {}}
              />
            ) : showAnalyzeContent ? (
              <>
                <Row 
                  label="Site overview" 
                  icon={<TemplatesIcon size={16} />}
                  selected={selectedSection === "site-overview"}
                  showChevron={selectedSection === "site-overview"}
                  onClick={() => onSectionChange("site-overview")}
                />
                <Row 
                  label="Pages" 
                  icon={<PageDefaultIcon size={16} />}
                  selected={selectedSection === "pages-list" || selectedSection === "pages-detail"}
                  showChevron={selectedSection === "pages-list" || selectedSection === "pages-detail"}
                  onClick={() => onSectionChange("pages-list")}
                />
                {showGoalsInAnalyze && (
                  <Row 
                    label="Goals" 
                    icon={<GoalsIcon size={16} />}
                    selected={selectedSection === "goals-list" || selectedSection === "goals-detail"}
                    showChevron={selectedSection === "goals-list" || selectedSection === "goals-detail"}
                    onClick={() => onSectionChange("goals-list")}
                  />
                )}
                {showGoalsInAnalyze && (
                  <>
                    <Row 
                      label="AI visibility" 
                      icon={<Robot24Icon size={16} />}
                      selected={false}
                      showChevron={false}
                      onClick={() => {
                        setAiVisibilityExpanded(!aiVisibilityExpanded);
                        if (!aiVisibilityExpanded) {
                          onSectionChange("topics-list");
                        }
                      }}
                      suffixButtons={aiVisibilityExpanded ? [
                        <ChevronSmallDownIcon key="chevron" size={16} className="text-[var(--text-secondary)]" />
                      ] : []}
                    />
                    {aiVisibilityExpanded && (
                      <div className="flex flex-col gap-0.5">
                        {/* Topics - clickable */}
                        <div 
                          className={`relative w-full flex items-center min-h-7 pl-[30px] pr-2 py-1.5 rounded cursor-pointer transition-colors duration-100 ${
                            selectedSection === "topics-list" || selectedSection === "topics-detail"
                              ? 'bg-[var(--bg-raised)]'
                              : 'hover:bg-[var(--bg-raised)]'
                          }`}
                          onClick={() => onSectionChange("topics-list")}
                        >
                          <span className={`body-text ${
                            selectedSection === "topics-list" || selectedSection === "topics-detail"
                              ? 'text-[var(--text-primary)]'
                              : 'text-[var(--text-secondary)]'
                          }`}>Topics</span>
                        </div>
                        {/* Recommendations - not clickable */}
                        <div className="relative w-full flex items-center min-h-7 pl-[30px] pr-2 py-1.5 rounded cursor-default">
                          <span className="body-text text-[var(--text-dimmed)]">Recommendations</span>
                        </div>
                        {/* Site audit - not clickable */}
                        <div className="relative w-full flex items-center min-h-7 pl-[30px] pr-2 py-1.5 rounded cursor-default">
                          <span className="body-text text-[var(--text-dimmed)]">Site audit</span>
                        </div>
                        {/* AEO/SEO settings - not clickable */}
                        <div className="relative w-full flex items-center min-h-7 pl-[30px] pr-2 py-1.5 rounded cursor-default">
                          <span className="body-text text-[var(--text-dimmed)]">AEO/SEO settings</span>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </>
            ) : null}
          </div>

          <div className="h-px bg-[var(--border-default)]" />
        </>
      )}

      {/* Optimize Section */}
      {showOptimize && (
        <>
          <div className="flex flex-col pb-2">
            <div className="flex items-center justify-between h-10 px-2 py-2">
              <h3 className="text-[var(--text-primary)] body-text-bold">Optimize</h3>
            </div>
            {showOptimizeUpsell ? (
              <Row 
                label="Get started with Optimize" 
                icon={<TemplatesIcon size={16} />}
                selected={false}
                onClick={() => {}}
              />
            ) : showOptimizeContent ? (
              <>
                <Row 
                  label="Optimization overview" 
                  icon={<TemplatesIcon size={16} />}
                  selected={selectedSection === "optimization-overview"}
                  showChevron={selectedSection === "optimization-overview"}
                  onClick={() => onSectionChange("optimization-overview")}
                />
                <Row 
                  label="All optimizations" 
                  icon={<ElementButtonIcon size={16} />}
                  selected={selectedSection === "all-optimizations-list" || selectedSection === "all-optimizations-detail"}
                  showChevron={selectedSection === "all-optimizations-list" || selectedSection === "all-optimizations-detail"}
                  onClick={() => onSectionChange("all-optimizations-list")}
                />
                {showGoalsInOptimize && (
                  <Row 
                    label="Goals" 
                    icon={<GoalsIcon size={16} />}
                    selected={selectedSection === "goals-list" || selectedSection === "goals-detail"}
                    showChevron={selectedSection === "goals-list" || selectedSection === "goals-detail"}
                    onClick={() => onSectionChange("goals-list")}
                  />
                )}
              </>
            ) : null}
          </div>

          <div className="h-px bg-[var(--border-default)]" />
        </>
      )}

      {/* Settings Section */}
      <div className="flex flex-col pb-2">
        <div className="flex items-center justify-between h-10 px-2 py-2">
          <h3 className="text-[var(--text-primary)] body-text-bold">Settings</h3>
        </div>
        {showTracking && (
          <Row 
            label="Tracking" 
            icon={<SettingsIcon size={16} />}
            selected={selectedSection === "tracking"}
            onClick={() => onSectionChange("tracking")}
          />
        )}
        {showAudiences && (
          <Row 
            label="Audiences" 
            icon={<ElementButtonIcon size={16} />}
            selected={selectedSection === "audiences"}
            onClick={() => onSectionChange("audiences")}
          />
        )}
        {showIntegrations && (
          <Row 
            label="Integrations" 
            icon={<IntegrationsIcon size={16} />}
            selected={selectedSection === "integrations"}
            onClick={() => onSectionChange("integrations")}
          />
        )}
      </div>

      <div className="h-px bg-[var(--border-default)]" />

      {/* Feature State Selector */}
      <div className="mt-auto py-2">
        <Select value={featureState} onValueChange={(value) => onFeatureStateChange(value as InsightsFeatureState)}>
          <SelectTrigger variant="default">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="analyze-only">Analyze Only</SelectItem>
            <SelectItem value="optimize-only">Optimize Only</SelectItem>
            <SelectItem value="analyze-and-optimize">Analyze & Optimize</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
