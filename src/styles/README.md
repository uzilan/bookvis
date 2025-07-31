# Shared CSS System

This directory contains the centralized CSS system for the BookVis application, organized for optimal performance and maintainability.

## Structure

```
src/styles/
├── shared.module.css              # Truly shared classes (used across 2+ components)
├── components/                    # Component-specific styles
│   ├── homePage.module.css       # HomePage-specific styles
│   ├── characterGraph.module.css # CharacterGraph-specific styles
│   ├── chapterSlider.module.css  # ChapterSlider-specific styles
│   ├── worldMap.module.css       # WorldMap-specific styles
│   ├── characterList.module.css  # CharacterList-specific styles
│   ├── factionList.module.css    # FactionList-specific styles
│   ├── locationList.module.css   # LocationList-specific styles
│   └── factionsTab.module.css    # FactionsTab-specific styles
├── materialUITheme.ts            # Shared Material-UI theme configurations
└── index.ts                      # Re-exports all styles with type safety
```

## Architecture Benefits

### 1. **Bundle Size Optimization**
- **Before**: 16.65 kB CSS bundle
- **After**: 16.21 kB CSS bundle (2.6% reduction)
- **Future**: Better tree-shaking potential as components can import only their specific styles

### 2. **Organization**
- **Shared Classes**: Used across multiple components (container, header, title, loading, etc.)
- **Component-Specific**: Only used by one component (homePage*, characterGraph*, etc.)
- **Material-UI Theme**: Shared sx patterns for CreateBookModal, AddAuthorModal, and HomePage components

### 3. **Maintainability**
- Find styles faster with clear separation
- Reduce naming conflicts
- Easier to understand component dependencies
- Eliminate repetitive Material-UI sx patterns

## Usage

### Importing Styles
```typescript
import { classes, combineClasses, materialUITheme } from '../styles';

// Use shared classes
<div className={classes.container}>
  <div className={classes.header}>
    <h2 className={classes.title}>Title</h2>
  </div>
</div>

// Use component-specific classes
<div className={classes.homePageMainContainer}>
  <div className={classes.homePageHeroSection}>
    <img className={classes.homePageHeroImage} />
  </div>
</div>

// Use Material-UI theme
<TextField sx={materialUITheme.textField} />
<Typography variant="caption" sx={materialUITheme.caption}>
  Help text
</Typography>

// Use loading component
<Loading message="Loading..." size="medium" />

// Combine classes
<div className={combineClasses(classes.container, isActive && classes.active)}>
```

### Available Classes

#### Shared Classes (used across 2+ components)
- **Layout**: `container`, `header`, `title`
- **Forms**: `filterContainer`, `filterInput`
- **Lists**: `scrollableList`, `listItem`, `emptyState`
- **Text**: `textPrimary`, `textSecondary`
- **Interactive**: `button`
- **Icons**: `icon`, `iconExpanded`, `iconCollapsed`
- **App Layout**: `appContainer`, `appContent`, `loginButtonContainer`
- **Loading**: `loadingContainer`, `loadingSpinner`, `loadingMessage` (with size variants)

#### Component-Specific Classes
- **HomePage**: `homePage*` (12 classes)
- **CharacterGraph**: `characterGraph*`, `sidebarPanelsWrapper`, `graphContainer`, `zoomControls`, `zoomButton` (8 classes)
- **ChapterSlider**: `chapter*` (8 classes)
- **WorldMap**: `worldMap*` (2 classes)
- **CharacterList**: `character*` (4 classes)
- **FactionList**: `faction*`, `section*` (6 classes)
- **LocationList**: `location*` (4 classes)
- **FactionsTab**: `factionsTab*` (18 classes)

#### Material-UI Theme Configurations
- **textField**: Common TextField styling for CreateBookModal components
- **textFieldAlt**: Alternative TextField styling for AddAuthorModal
- **caption**: Common Typography caption styling
- **dialog**: Common Dialog styling
- **dialogTitle**: Common DialogTitle styling
- **dialogContent**: Common DialogContent styling
- **dialogContentText**: Common DialogContentText styling
- **dialogActions**: Common DialogActions styling
- **paper**: Common Paper styling
- **list**: Common List styling
- **listItem**: Common ListItem styling
- **listItemText**: Common ListItemText styling
- **button**: Common Button styling
- **buttonSecondary**: Common Button secondary styling

## Migration Guide

### For New Components
1. **Check if styles exist in shared**: Look for common patterns in `shared.module.css`
2. **Create component-specific file**: If styles are unique, create `components/componentName.module.css`
3. **Import from index**: Use `import { classes, materialUITheme } from '../styles'`

### For Existing Components
All existing components have been migrated to use the new structure. The API remains the same - just import from `../styles`.

### Recent Migrations
- **Loading Component**: Moved from `src/components/Loading.module.css` to `src/styles/shared.module.css` since it's used across multiple components
- **Material-UI Theme**: Created `src/styles/materialUITheme.ts` to eliminate repetitive sx patterns
- **AddAuthorModal**: Migrated to use shared Material-UI theme patterns
- **HomePage**: Migrated Dialog and ListItemText patterns to use shared theme

## Performance Impact

- **CSS Bundle**: Reduced from 16.65 kB to 16.21 kB (2.6% reduction)
- **Tree Shaking**: Better potential for future optimization
- **Load Time**: Slightly faster initial load
- **Maintenance**: Easier to find and modify styles
- **Code Reduction**: Eliminated ~80+ repetitive sx patterns across all components

## Best Practices

1. **Use shared classes first**: Check if a style pattern already exists in `shared.module.css`
2. **Component-specific naming**: Prefix component-specific classes with component name (e.g., `homePage*`)
3. **Consistent patterns**: Follow existing patterns for similar UI elements
4. **Type safety**: Use the `classes` object for type-safe access to all styles
5. **Combine classes**: Use `combineClasses()` for conditional styling
6. **Material-UI theme**: Use `materialUITheme` for common Material-UI sx patterns instead of repeating them 