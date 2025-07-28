# Example YAML Files

This folder contains example YAML files that can be uploaded to the BookVis application.

## Available Examples

### 📚 **alice-bookvis.yaml**
- **Book:** Alice's Adventures in Wonderland
- **Author:** Lewis Carroll
- **Characters:** Alice, White Rabbit, Cheshire Cat, Mad Hatter, Queen of Hearts, etc.
- **Structure:** Simple chapter-based structure
- **Use Case:** Good starting example for simple books

### 📚 **crime-and-punishment-bookvis.yaml**
- **Book:** Crime and Punishment
- **Author:** Fyodor Dostoevsky
- **Characters:** Raskolnikov, Sonya, Porfiry, Svidrigailov, etc.
- **Structure:** Complex part/chapter hierarchy (6 parts, 48 chapters)
- **Use Case:** Example of complex book structure with parts and chapters

### 📚 **lotr-bookvis.yaml**
- **Book:** The Lord of the Rings
- **Author:** J.R.R. Tolkien
- **Characters:** Frodo, Sam, Gandalf, Aragorn, Legolas, Gimli, etc.
- **Structure:** 3 books, 6 parts, 60 chapters
- **Use Case:** Large-scale epic with multiple books and complex relationships

### 📋 **bookvis-format-example.yaml**
- **Purpose:** Template showing the exact YAML schema format
- **Use Case:** Reference for creating new YAML files
- **Contains:** All required fields with example values

## How to Use

1. **Upload via UI:** Use the "Upload YAML" feature in the BookVis application
2. **Create New:** Use `bookvis-format-example.yaml` as a template
3. **Modify Existing:** Copy any example and modify for your own book

## Schema Requirements

All YAML files must follow the schema defined in `src/schema/bookvis-schema.json` and include:

- **book:** Book metadata (id, title, author)
- **characters:** Array of character objects with factions and attributes
- **factions:** Array of faction definitions with colors
- **chapters:** Array of chapter objects with hierarchy levels
- **hierarchy:** Array defining the book's structure (book/part/chapter)
- **relationships:** Array of character relationships with chapter descriptions
- **locations:** Array of location objects (optional)
- **map_url:** URL to a map image (optional)

## Tips

- Use `chapter-1`, `chapter-2`, etc. for chapter IDs
- Use `part-1`, `part-2`, etc. for part IDs
- Use `book-1`, `book-2`, etc. for book IDs
- Ensure all character IDs in relationships match character definitions
- Ensure all faction IDs in characters match faction definitions 