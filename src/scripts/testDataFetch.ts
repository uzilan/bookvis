import { FirebaseService } from '../services/firebase';

async function testDataFetch() {
  try {
    console.log('Testing data fetch...');
    
    // Test getting all books
    const books = await FirebaseService.getAllBooks();
    console.log('Books found:', books.length);
    books.forEach((book, index) => {
      console.log(`Book ${index + 1}:`, {
        id: book.book.id,
        title: book.book.title,
        author: book.book.author.name,
        isPublic: book.isPublic,
        ownerId: book.ownerId,
        characters: book.characters.length,
        chapters: book.chapters.length
      });
    });
    
    // Test getting all authors
    const authors = await FirebaseService.getAllAuthors();
    console.log('Authors found:', authors.length);
    authors.forEach((author, index) => {
      console.log(`Author ${index + 1}:`, {
        id: author.id,
        name: author.name
      });
    });
    
  } catch (error) {
    console.error('Error testing data fetch:', error);
  }
}

testDataFetch(); 