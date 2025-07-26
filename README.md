# BookVis - Character Relationship Visualizer

A React-based web application for visualizing character relationships and factions from various books.

## Features

- **Interactive Character Graphs**: Visualize character relationships using Vis.js
- **Multi-Faction Support**: Characters can belong to multiple factions with pie chart visualization
- **Hierarchical Chapter Navigation**: Support for complex book structures (Parts, Books, Chapters)
- **Character Details Panel**: Detailed information about selected characters
- **Multiple Book Support**: Currently includes:
  - Winnie-the-Pooh
  - Alice's Adventures in Wonderland
  - Dune
  - Crime and Punishment
  - The Lord of the Rings

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bookvis
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in the terminal)

## Usage

1. **Select a Book**: Use the dropdown to choose from available books
2. **Navigate Chapters**: Use the chapter slider to move through the story
3. **Explore Characters**: Click on character nodes to see detailed information
4. **View Relationships**: Lines between characters show their relationships
5. **Understand Factions**: Different colors represent different factions/groups

## Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Vis.js** - Graph visualization
- **Material-UI** - UI components
- **React Hooks** - State management

## Project Structure

```
├── src/
│   ├── components/          # React components
│   ├── models/             # TypeScript interfaces
│   ├── books/              # Book data files
│   ├── utils/              # Utility functions
│   └── App.tsx            # Main application
├── public/                 # Static assets
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

### Pre-commit Hook

The project includes a pre-commit hook that automatically runs:
- **TypeScript type checking** - Ensures type safety
- **ESLint** - Checks code style and potential issues

The hook will prevent commits if any checks fail. To bypass the hook (not recommended), use:
```bash
git commit --no-verify -m "Your message"
```

### Adding New Books

1. Create a new data file in `src/books/`
2. Follow the existing pattern for character, faction, and relationship definitions
3. Import and add the book data to `src/App.tsx`

## License

This project is open source and available under the [MIT License](LICENSE).
