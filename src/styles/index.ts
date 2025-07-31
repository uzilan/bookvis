import sharedClasses from './shared.module.css';
import homePageClasses from './components/homePage.module.css';
import characterGraphClasses from './components/characterGraph.module.css';
import chapterSliderClasses from './components/chapterSlider.module.css';
import worldMapClasses from './components/worldMap.module.css';
import characterListClasses from './components/characterList.module.css';
import factionListClasses from './components/factionList.module.css';
import locationListClasses from './components/locationList.module.css';
import factionsTabClasses from './components/factionsTab.module.css';
import { materialUITheme } from './materialUITheme';

// Export shared classes
export const classes = {
  // Shared classes (used across multiple components)
  ...sharedClasses,
  
  // Component-specific classes
  ...homePageClasses,
  ...characterGraphClasses,
  ...chapterSliderClasses,
  ...worldMapClasses,
  ...characterListClasses,
  ...factionListClasses,
  ...locationListClasses,
  ...factionsTabClasses,
};

// Export Material-UI theme configurations
export { materialUITheme };

// Utility function to combine multiple class names
export function combineClasses(...classNames: (string | undefined | null | false)[]): string {
  return classNames.filter(Boolean).join(' ');
}

// Type-safe access to all available classes
export type AvailableClasses = typeof classes; 