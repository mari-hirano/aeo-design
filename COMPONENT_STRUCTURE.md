# Component Folder Structure

This document explains the reorganized component folder structure for better maintainability and developer comprehension.

## Overview

The `src/components/` directory has been reorganized into logical groupings based on component purpose and functionality. This structure makes it easier for new developers to understand the codebase and locate relevant components.

## Folder Structure

```
src/components/
├── layout/              # Main application layout components and panels
│   ├── panels/         # Panel components organized by type
│   │   ├── leftpanel/  # Left sidebar panel components
│   │   └── rightpanel/ # Right panel components
├── sections/           # Main application sections
│   └── CMS/           # CMS-specific components
└── ui/                # Reusable UI components
```

## Detailed Structure

### `layout/` - Main Layout Components and Panels
Contains the core layout components that structure the main application interface, as well as all panel-related components:

#### Core Layout Components:
- `LayoutContent.tsx` - Main layout wrapper component
- `Navbar.tsx` - Top navigation bar
- `LeftSidebar.tsx` - Left sidebar with tool icons
- `Canvas.tsx` - Main canvas/workspace area
- `theme-provider.tsx` - Theme context provider

#### `layout/panels/` - Panel Components
Contains all panel-related components organized by their location and purpose:

##### Core Panel Infrastructure:
- `Panel.tsx` - Base panel component with common functionality
- `PanelHeader.tsx` - Reusable panel header component

##### `layout/panels/leftpanel/` - Left Sidebar Panels
Panel components that appear from the left sidebar:
- `AddPanel.tsx` - Element addition panel
- `NavigatorPanel.tsx` - DOM tree navigator panel
- `PagesPanel.tsx` - Pages management panel

##### `layout/panels/rightpanel/` - Right Panel Components
Components that make up the right panel interface:
- `RightPanel.tsx` - Main right panel container
- `StyleTabContent.tsx` - Style editing tab content
- `InteractionsTabContent.tsx` - Interactions tab content
- `SettingsTabContent.tsx` - Settings tab content

### `sections/` - Application Sections
Contains the main application section components:

- `AppsSection.tsx` - Apps section component
- `InsightsSection.tsx` - Insights section component
- `CMSSection.tsx` - Main CMS section component
- `CMS/` - CMS-specific sub-components:
  - `CMSNavigation.tsx` - CMS navigation component
  - `CMSTable.tsx` - CMS data table component
  - `CMSItemDetail.tsx` - CMS item detail view

### `ui/` - Reusable UI Components
Contains all reusable UI components (unchanged from original structure):
- Form components (input, button, select, etc.)
- Layout components (modal, popover, tooltip, etc.)
- Data display components (table, badge, avatar, etc.)

## Organization Principles

### 1. **Logical Grouping**
- Layout and panel components are co-located since they work together
- Left and right panel components are separated for clarity
- Core panel infrastructure is shared between both sides

### 2. **Hierarchical Organization**
- Components are grouped by their primary purpose and location
- Sub-folders organize related components within each category
- Clear parent-child relationships in folder structure

### 3. **Discoverability**
- Panel components are easily found within the layout they belong to
- Left and right panel components are clearly separated
- Related components are co-located

### 4. **Maintainability**
- Changes to specific panel functionality are isolated to relevant folders
- Layout and panel dependencies are clear and logical
- Easier to refactor and update related components

## Import Patterns

### Absolute Imports
Most imports use absolute paths from the `@/components` alias:

```typescript
// Layout components
import { Navbar } from "@/components/designer/layout/Navbar";
import LeftSidebar from "@/components/designer/layout/LeftSidebar";

// Panel components
import RightPanel from "@/components/designer/layout/panels/rightpanel/RightPanel";
import NavigatorPanel from "@/components/designer/layout/panels/leftpanel/NavigatorPanel";

// Section components
import CMSSection from "@/components/designer/sections/CMSSection";

// UI components
import { Button } from "@/components/spring-ui/button";
```

### Relative Imports
Within the same directory or for closely related components, relative imports are used:

```typescript
// Within panels/Panel.tsx
import PanelHeader from './PanelHeader';

// Within rightpanel/RightPanel.tsx
import StyleTabContent from './StyleTabContent';

// Within layout/LeftSidebar.tsx
import Panel from './panels/Panel';
import AddPanel from './panels/leftpanel/AddPanel';
```

## Migration Notes

All import statements have been updated to reflect the new structure. The build process validates that all imports are correctly resolved.

### Key Changes Made:
1. Moved all panel components into `layout/panels/` directory
2. Organized left panel components in `layout/panels/leftpanel/`
3. Organized right panel components in `layout/panels/rightpanel/`
4. Updated all import statements throughout the codebase
5. Maintained clear separation between layout, sections, and UI components

This reorganization improves the logical grouping of layout and panel components while maintaining clear separation of concerns. 