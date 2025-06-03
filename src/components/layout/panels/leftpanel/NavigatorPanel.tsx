"use client";

import React, { useState, ReactNode } from 'react';
import { 
  ElementContainerIcon,
  ElementComponentIcon,
  ElementButtonIcon,
  ElementDivIcon,
  ElementImageIcon,
  ElementFormBlockIcon,
  ElementSectionIcon,
  ElementSpanIcon,
  ElementSplineIcon,
  ElementInputIcon,
  EmptyLightning64Icon,
  ChevronSmallDownIcon,
  ChevronSmallRightIcon,
  CMSDefaultIcon
} from '@/icons';

// Define the structure for navigation items
interface NavItem {
  id: string;
  label: string;
  icon: 'frame' | 'component' | 'text' | 'image' | 'form' | 'button' | 'spline' | 'section' | 'input' | 'cms';
  children?: NavItem[];
  highlighted?: boolean;
  actionIcon?: 'lightning' | null;
  specialType?: 'cms' | 'component';
}

// Props for the NavigatorRow component
interface NavigatorRowProps {
  item: NavItem;
  level: number;
  expanded: string[];
  toggleExpand: (id: string) => void;
  selectedId: string | null;
  setSelectedId: (id: string) => void;
}

const NavigatorRow: React.FC<NavigatorRowProps> = ({ 
  item, 
  level, 
  expanded, 
  toggleExpand, 
  selectedId, 
  setSelectedId 
}) => {
  const hasChildren = item.children && item.children.length > 0;
  const isExpanded = expanded.includes(item.id);
  const isSelected = selectedId === item.id;

  // Get text and icon color based on special type and selection
  const getTextStyle = () => {
    // If selected, use blue text for standard items
    if (isSelected && !item.specialType) {
      return { color: '#8AC2FF' }; // blue-text
    }
    
    if (item.specialType === 'cms') return { color: '#B89EFF' }; // Purple text color
    if (item.specialType === 'component') return { color: '#63D489' }; // Green text color
    return item.highlighted ? { color: '#ffffff' } : { color: 'rgba(255, 255, 255, 0.67)' }; // Default colors
  };

  // Get background color based on selection and special type
  const getBackgroundStyle = () => {
    if (!isSelected) return {};
    
    if (item.specialType === 'cms') return { backgroundColor: 'rgba(127, 90, 233, 0.25)' }; // purple-transparent
    if (item.specialType === 'component') return { backgroundColor: 'rgba(0, 133, 71, 0.25)' }; // green-transparent
    return { backgroundColor: 'rgba(0, 115, 230, 0.25)' }; // blue-transparent
  };

  // Handle row click
  const handleRowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedId(item.id);
  };

  // Handle chevron click
  const handleChevronClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasChildren) {
      toggleExpand(item.id);
    }
  };

  // Determine which icon to use based on the item type
  const getIcon = (iconType: string): ReactNode => {
    const iconProps = { size: 16, style: getTextStyle() };
    
    // Apply special colors to icons based on item type
    if (item.specialType === 'cms') {
      return <CMSDefaultIcon size={16} style={getTextStyle()} />;
    }
    
    if (item.specialType === 'component') {
      return <ElementComponentIcon size={16} style={getTextStyle()} />;
    }

    switch (iconType) {
      case 'frame': return <ElementContainerIcon {...iconProps} />;
      case 'component': return <ElementComponentIcon {...iconProps} />;
      case 'text': return <ElementSpanIcon {...iconProps} />;
      case 'image': return <ElementImageIcon {...iconProps} />;
      case 'form': return <ElementFormBlockIcon {...iconProps} />;
      case 'button': return <ElementButtonIcon {...iconProps} />;
      case 'spline': return <ElementSplineIcon {...iconProps} />;
      case 'section': return <ElementSectionIcon {...iconProps} />;
      case 'input': return <ElementInputIcon {...iconProps} />;
      case 'cms': return <CMSDefaultIcon {...iconProps} />;
      default: return <ElementDivIcon {...iconProps} />;
    }
  };

  return (
    <div>
      <div 
        className={`h-6 pl-2 pr-2 hover:bg-[#353535] cursor-pointer flex items-center justify-between`}
        style={{ 
          paddingLeft: `${level * 12}px`,
          ...getBackgroundStyle()
        }}
        onClick={handleRowClick}
      >
        <div className="flex items-center flex-1 min-w-0">
          {hasChildren ? (
            <div className="mr-0.5 w-4 flex items-center" onClick={handleChevronClick}>
              {isExpanded ? (
                <ChevronSmallDownIcon size={16} style={getTextStyle()} />
              ) : (
                <ChevronSmallRightIcon size={16} style={getTextStyle()} />
              )}
            </div>
          ) : (
            <div className="w-4"></div>
          )}
          <span className="w-4 mr-1 flex items-center">{getIcon(item.icon)}</span>
          <span className="truncate" style={getTextStyle()}>{item.label}</span>
        </div>
        
        {item.actionIcon && (
          <div className="flex-shrink-0">
            <EmptyLightning64Icon size={16} style={getTextStyle()} />
          </div>
        )}
      </div>
      
      {isExpanded && hasChildren && (
        <div>
          {item.children?.map((child) => (
            <NavigatorRow
              key={child.id}
              item={child}
              level={level + 1}
              expanded={expanded}
              toggleExpand={toggleExpand}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const NavigatorPanel: React.FC = () => {
  const [expanded, setExpanded] = useState<string[]>([
    'body', 'pageWrapper', 'section1', 'container', 'ctaHeader', 
    'heroHeader', 'heroTextWrapper', 'heroSubheading', 'formBlock', 
    'form', 'successMessage', 'errorMessage', 'buttonRow'
  ]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    if (expanded.includes(id)) {
      setExpanded(expanded.filter(item => item !== id));
    } else {
      setExpanded([...expanded, id]);
    }
  };

  // Sample navigation data structure matching the image
  const navigationData: NavItem[] = [
    {
      id: 'body',
      label: 'Body',
      icon: 'frame',
      highlighted: true,
      children: [
        {
          id: 'navbar',
          label: 'Navbar',
          icon: 'component',
          highlighted: true,
          specialType: 'component'
        },
        {
          id: 'pageWrapper',
          label: 'Page wrapper',
          icon: 'frame',
          children: [
            {
              id: 'section1',
              label: 'Section',
              icon: 'section',
              children: [
                {
                  id: 'container',
                  label: 'Container',
                  icon: 'frame',
                  children: [
                    {
                      id: 'ctaHeader',
                      label: 'CTA header component',
                      icon: 'component',
                      children: [
                        {
                          id: 'heroHeader',
                          label: 'Hero header component',
                          icon: 'frame',
                          children: [
                            {
                              id: 'heroTextWrapper',
                              label: 'Hero Text Wrapper',
                              icon: 'frame',
                              children: [
                                {
                                  id: 'heroHeading',
                                  label: 'Hero heading',
                                  icon: 'text',
                                  actionIcon: 'lightning'
                                },
                                {
                                  id: 'heroSubheading',
                                  label: 'Hero subheading',
                                  icon: 'text',
                                  children: [
                                    {
                                      id: 'textSpan',
                                      label: 'Text Span',
                                      icon: 'text'
                                    }
                                  ]
                                }
                              ]
                            },
                            {
                              id: 'formBlock',
                              label: 'Form Block',
                              icon: 'form',
                              children: [
                                {
                                  id: 'form',
                                  label: 'Form',
                                  icon: 'form',
                                  children: [
                                    {
                                      id: 'fieldLabel1',
                                      label: 'Field Label',
                                      icon: 'text'
                                    },
                                    {
                                      id: 'textField1',
                                      label: 'Text Field',
                                      icon: 'input'
                                    },
                                    {
                                      id: 'fieldLabel2',
                                      label: 'Field Label',
                                      icon: 'text'
                                    },
                                    {
                                      id: 'textField2',
                                      label: 'Text Field',
                                      icon: 'input'
                                    },
                                    {
                                      id: 'submitButton',
                                      label: 'Submit Button',
                                      icon: 'button'
                                    }
                                  ]
                                },
                                {
                                  id: 'successMessage',
                                  label: 'Success Message',
                                  icon: 'frame',
                                  children: [
                                    {
                                      id: 'successText',
                                      label: 'Text Block',
                                      icon: 'text'
                                    }
                                  ]
                                },
                                {
                                  id: 'errorMessage',
                                  label: 'Error Message',
                                  icon: 'frame',
                                  children: [
                                    {
                                      id: 'errorText',
                                      label: 'Text Block',
                                      icon: 'text'
                                    }
                                  ]
                                },
                                {
                                  id: 'splineScene',
                                  label: 'Spline Scene',
                                  icon: 'spline',
                                  actionIcon: 'lightning'
                                },
                                {
                                  id: 'buttonRow',
                                  label: 'Button row',
                                  icon: 'frame',
                                  children: [
                                    {
                                      id: 'primaryButton',
                                      label: 'Button',
                                      icon: 'button',
                                      children: [
                                        {
                                          id: 'buttonText1',
                                          label: 'Text Block',
                                          icon: 'text'
                                        }
                                      ]
                                    },
                                    {
                                      id: 'secondaryButton',
                                      label: 'Button secondary',
                                      icon: 'button',
                                      children: [
                                        {
                                          id: 'buttonText2',
                                          label: 'Text Block',
                                          icon: 'text'
                                        }
                                      ]
                                    }
                                  ]
                                }
                              ]
                            },
                            {
                              id: 'headerImageWrapper',
                              label: 'Header image wrapper',
                              icon: 'frame',
                              children: [
                                {
                                  id: 'headerImage',
                                  label: 'Image',
                                  icon: 'image'
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              id: 'section2',
              label: 'Section',
              icon: 'section'
            },
            {
              id: 'section3',
              label: 'Section',
              icon: 'section'
            },
            {
              id: 'section4',
              label: 'Section',
              icon: 'section'
            },
            {
              id: 'cmsCollection',
              label: 'CMS Collection',
              icon: 'cms',
              specialType: 'cms'
            }
          ]
        },
        {
          id: 'footer',
          label: 'Footer',
          icon: 'component',
          highlighted: true,
          specialType: 'component'
        }
      ]
    }
  ];

  return (
    <div className="flex flex-col w-full h-full pt-1 bg-bg-primary border-t border-border">
      <div className="flex-1 overflow-auto body-text">
        {navigationData.map((item) => (
          <NavigatorRow
            key={item.id}
            item={item}
            level={0}
            expanded={expanded}
            toggleExpand={toggleExpand}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
          />
        ))}
      </div>
    </div>
  );
};

export default NavigatorPanel; 