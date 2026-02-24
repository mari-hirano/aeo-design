"use client";

import React, { useState, useEffect } from 'react';
import InsightsLeftSidebar from './insights/InsightsLeftSidebar';
import { InsightsVersionProvider } from '@/context/InsightsVersionContext';
import { InsightsFeatureState } from '@/types/insights';
import SiteOverviewPage from './insights/pages/analyze/SiteOverviewPage';
import PagesListPage from './insights/pages/analyze/PagesListPage';
import PagesDetailPage from './insights/pages/analyze/PagesDetailPage';
import GoalsListPage from './insights/pages/analyze/GoalsListPage';
import GoalsDetailPage from './insights/pages/analyze/GoalsDetailPage';
import TopicsListPage from './insights/pages/analyze/TopicsListPage';
import TopicsDetailPage from './insights/pages/analyze/TopicsDetailPage';
import { InsightsPage } from './insights/InsightsPagesListPanel';
import { InsightsGoal } from './insights/InsightsGoalsListPanel';
import OptimizationOverviewPage from './insights/pages/optimize/OptimizationOverviewPage';
import AllOptimizationsListPage from './insights/pages/optimize/AllOptimizationsListPage';
import AllOptimizationsDetailPage from './insights/pages/optimize/AllOptimizationsDetailPage';
import TrackingPage from './insights/pages/settings/TrackingPage';
import AudiencesPage from './insights/pages/settings/AudiencesPage';
import IntegrationsPage from './insights/pages/settings/IntegrationsPage';
import { InsightsNavigationProvider } from '@/context/InsightsNavigationContext';

export default function InsightsSection() {
  // Feature state - controlled by UI selector
  const [featureState, setFeatureState] = useState<InsightsFeatureState>('analyze-and-optimize');
  
  // Selected section and detail state
  const [selectedSection, setSelectedSection] = useState("site-overview");
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  const [selectedOptimizationId, setSelectedOptimizationId] = useState<string | null>(null);
  const [selectedPromptId, setSelectedPromptId] = useState<string | null>(null);

  const handleSectionChange = (section: string) => {
    setSelectedSection(section);
    // Reset detail states when changing sections
    setSelectedPageId(null);
    setSelectedGoalId(null);
    setSelectedOptimizationId(null);
    setSelectedPromptId(null);
  };

  const handlePageSelect = (page: InsightsPage) => {
    setSelectedPageId(page.id);
    setSelectedSection("pages-detail");
  };

  const handleGoalSelect = (goal: InsightsGoal) => {
    setSelectedGoalId(goal.id);
    setSelectedSection("goals-detail");
  };

  const handleOptimizationSelect = (optimizationId: string) => {
    setSelectedOptimizationId(optimizationId);
    setSelectedSection("all-optimizations-detail");
  };

  const handlePromptSelect = (promptId: string) => {
    setSelectedPromptId(promptId);
    setSelectedSection("topics-detail");
  };

  // Update default view when feature state changes
  useEffect(() => {
    if (featureState === 'optimize-only') {
      setSelectedSection("all-optimizations-list");
    } else if (featureState === 'analyze-only' || featureState === 'analyze-and-optimize') {
      setSelectedSection("site-overview");
    }
    // Reset detail states when feature state changes
    setSelectedPageId(null);
    setSelectedGoalId(null);
    setSelectedOptimizationId(null);
    setSelectedPromptId(null);
  }, [featureState]);

  const renderMainContent = () => {
    switch (selectedSection) {
      // Analyze section
      case "site-overview":
        return <SiteOverviewPage />;
      case "pages-list":
        return <PagesListPage onPageSelect={handlePageSelect} />;
      case "pages-detail":
        return <PagesDetailPage selectedPageId={selectedPageId} />;
      case "goals-list":
        return <GoalsListPage onGoalSelect={handleGoalSelect} />;
      case "goals-detail":
        return <GoalsDetailPage selectedGoalId={selectedGoalId} />;
      case "topics-list":
        return <TopicsListPage onPromptSelect={handlePromptSelect} />;
      case "topics-detail":
        return <TopicsDetailPage selectedPromptId={selectedPromptId} />;
      
      // Optimize section
      case "optimization-overview":
        return <OptimizationOverviewPage />;
      case "all-optimizations-list":
        return <AllOptimizationsListPage onOptimizationSelect={handleOptimizationSelect} />;
      case "all-optimizations-detail":
        return <AllOptimizationsDetailPage selectedOptimizationId={selectedOptimizationId} />;
      
      // Settings section
      case "tracking":
        return <TrackingPage />;
      case "audiences":
        return <AudiencesPage />;
      case "integrations":
        return <IntegrationsPage />;
      
      default:
        return <SiteOverviewPage />;
    }
  };

  return (
    <InsightsVersionProvider>
      <InsightsNavigationProvider navigateToSection={setSelectedSection}>
        <div className="flex h-full w-full">
          <InsightsLeftSidebar 
            selectedSection={selectedSection} 
            onSectionChange={handleSectionChange}
            featureState={featureState}
            onFeatureStateChange={setFeatureState}
          />
          <div className="flex-1 min-w-0 overflow-hidden flex flex-col">
            {renderMainContent()}
          </div>
        </div>
      </InsightsNavigationProvider>
    </InsightsVersionProvider>
  );
}
