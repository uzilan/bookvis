import type { Chapter } from '../models/Chapter';

export interface ChapterNode {
  chapter: Chapter;
  level: number;
  path: string[];
  children: ChapterNode[];
  isLeaf: boolean;
}

/**
 * Builds a hierarchical tree structure from flat chapter list
 */
export function buildChapterTree(chapters: Chapter[]): ChapterNode[] {
  const nodes: ChapterNode[] = chapters.map(chapter => ({
    chapter,
    level: chapter.level || 0,
    path: chapter.path || [chapter.title],
    children: [],
    isLeaf: true, // Will be updated when children are found
  }));

  // Build parent-child relationships
  const nodeMap = new Map<string, ChapterNode>();
  nodes.forEach(node => {
    nodeMap.set(node.chapter.title, node);
  });

  const rootNodes: ChapterNode[] = [];
  
  nodes.forEach(node => {
    if (node.chapter.parent) {
      // Find parent by matching the parent object's title
      const parentNode = nodeMap.get(node.chapter.parent.title);
      if (parentNode) {
        parentNode.children.push(node);
        parentNode.isLeaf = false;
      } else {
        // If parent not found, treat as root node
        rootNodes.push(node);
      }
    } else {
      rootNodes.push(node);
    }
  });

  return rootNodes;
}

/**
 * Flattens a hierarchical chapter structure into a linear list
 * with proper global indexing
 */
export function flattenChapterHierarchy(chapters: Chapter[]): Chapter[] {
  const flattened: Chapter[] = [];
  let globalIndex = 1;

  function traverse(chapterList: Chapter[], level: number = 0, path: string[] = []) {
    chapterList.forEach((chapter) => {
      const currentPath = [...path, chapter.title];
      
      // Create flattened version
      const flatChapter: Chapter = {
        ...chapter,
        level,
        globalIndex,
        path: currentPath,
        type: level === 0 ? 'chapter' : (level === 1 ? 'part' : 'book'),
      };
      
      flattened.push(flatChapter);
      globalIndex++;

      // Find children by looking for chapters that have this chapter as parent
      const children = chapters.filter(ch => ch.parent && ch.parent.title === chapter.title);
      if (children.length > 0) {
        traverse(children, level + 1, currentPath);
      }
    });
  }

  // Start with root chapters (those without parents)
  const rootChapters = chapters.filter(chapter => !chapter.parent);
  traverse(rootChapters);
  return flattened;
}

/**
 * Gets all chapters at a specific level
 */
export function getChaptersAtLevel(chapters: Chapter[], level: number): Chapter[] {
  return chapters.filter(chapter => (chapter.level || 0) === level);
}

/**
 * Gets the path to a specific chapter
 */
export function getChapterPath(chapters: Chapter[], targetChapter: Chapter): string[] {
  const chapterMap = new Map<string, Chapter>();
  chapters.forEach(chapter => chapterMap.set(chapter.title, chapter));
  
  const path: string[] = [];
  let current: Chapter | undefined = targetChapter;
  
  while (current) {
    path.unshift(current.title);
    current = current.parent;
  }
  
  return path;
}

/**
 * Finds a chapter by its path
 */
export function findChapterByPath(chapters: Chapter[], path: string[]): Chapter | undefined {
  const chapterMap = new Map<string, Chapter>();
  chapters.forEach(chapter => chapterMap.set(chapter.title, chapter));
  
  let current: Chapter | undefined;
  
  for (const title of path) {
    if (!current) {
      current = chapterMap.get(title);
    } else {
      // Find child by looking for chapters that have current as parent
      current = chapters.find(ch => ch.parent && ch.parent.title === current!.title && ch.title === title);
    }
    
    if (!current) break;
  }
  
  return current;
}

/**
 * Creates a breadcrumb navigation path
 */
export function createBreadcrumb(chapter: Chapter): Array<{ title: string; level: number }> {
  const breadcrumb: Array<{ title: string; level: number }> = [];
  let current: Chapter | undefined = chapter;
  
  while (current) {
    breadcrumb.unshift({
      title: current.title,
      level: current.level || 0,
    });
    current = current.parent;
  }
  
  return breadcrumb;
}

/**
 * Gets a formatted display path for a chapter (e.g., "The Ring Sets Out, Chapter 1")
 * Omits the book name if there is only one book in the hierarchy
 */
export function getChapterDisplayPath(chapter: Chapter, chapters?: Chapter[]): string {
  const breadcrumb = createBreadcrumb(chapter);

  if (!chapters) {
    // fallback: join all
    return breadcrumb.map(item => item.title).join(', ');
  }

  // Count unique books and parts
  const bookNodes = chapters.filter(ch => ch.type === 'book');
  const partNodes = chapters.filter(ch => ch.type === 'part');
  const uniqueBookTitles = Array.from(new Set(bookNodes.map(b => b.title)));
  const uniquePartTitles = Array.from(new Set(partNodes.map(p => p.title)));

  // Use findLastIndex for book and part in breadcrumb
  const findLastIndex = <T>(arr: T[], predicate: (item: T) => boolean) => {
    for (let i = arr.length - 1; i >= 0; i--) {
      if (predicate(arr[i])) return i;
    }
    return -1;
  };
  const bookIdx = findLastIndex(breadcrumb, item => bookNodes.some(b => b.title === item.title));
  const partIdx = findLastIndex(breadcrumb, item => partNodes.some(p => p.title === item.title));
  const chapterIdx = breadcrumb.length - 1;

  if (uniqueBookTitles.length > 1) {
    // Multiple books: show book, part, chapter (if part exists)
    if (bookIdx > -1 && partIdx > -1 && partIdx < chapterIdx) {
      return [breadcrumb[bookIdx].title, breadcrumb[partIdx].title, breadcrumb[chapterIdx].title].join(', ');
    } else if (bookIdx > -1) {
      return [breadcrumb[bookIdx].title, breadcrumb[chapterIdx].title].join(', ');
    }
  } else if (uniqueBookTitles.length === 1 && uniquePartTitles.length > 1) {
    // One book, multiple parts: show part, chapter
    if (partIdx > -1 && partIdx < chapterIdx) {
      return [breadcrumb[partIdx].title, breadcrumb[chapterIdx].title].join(', ');
    }
  }
  // Fallback: just chapter name
  return breadcrumb[chapterIdx].title;
} 