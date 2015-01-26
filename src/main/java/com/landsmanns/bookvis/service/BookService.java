package com.landsmanns.bookvis.service;

import com.landsmanns.bookvis.model.Book;
import com.landsmanns.bookvis.model.Genre;

import java.util.List;

/**
 * Created by uzilan on 2015-01-18.
 */
public interface BookService {
    List<Genre> getAllBooks();

    Book getBook(String id);

    Book createBook(String name, String authorId, String genreId);

    Book updateBook(String bookId);
}
