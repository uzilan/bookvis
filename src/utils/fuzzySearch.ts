import Fuse from 'fuse.js';

export interface FuzzySearchOptions {
  keys: string[];
  threshold?: number;
  minMatchCharLength?: number;
}

export function fuzzySearch<T>(
  allItems: T[],
  chapterItems: T[],
  filterText: string,
  showAll: boolean,
  options: FuzzySearchOptions
): T[] {
  const defaultOptions: FuzzySearchOptions = {
    threshold: 0.6,
    minMatchCharLength: 1,
    ...options
  };

  // Create fuzzy search instance
  const fuse = new Fuse(allItems, {
    ...defaultOptions,
    includeScore: true
  });

  // Determine which items to search
  const itemsToSearch = showAll ? allItems : chapterItems;

  // If no filter text, return items without sorting (let components handle sorting)
  if (!filterText.trim()) {
    return itemsToSearch;
  }

  // Perform fuzzy search
  const results = fuse.search(filterText);
  return results
    .filter(result => result.score && result.score < 0.7)
    .map(result => result.item);
} 