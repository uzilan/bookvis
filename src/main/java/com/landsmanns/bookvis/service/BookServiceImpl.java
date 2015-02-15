package com.landsmanns.bookvis.service;

import com.google.inject.Inject;
import com.landsmanns.bookvis.model.Book;
import com.landsmanns.bookvis.model.Genre;
import com.landsmanns.bookvis.repository.BookDao;

import java.util.List;

/**
 * Created by uzilan on 2015-01-18.
 */
public class BookServiceImpl implements BookService {

    @Inject
    private BookDao bookDao;

    @Override
    public List<Genre> getAllBooks() {
        return bookDao.getAllBooks();
    }

    @Override
    public Book getBook(long id) {
        return bookDao.getBook(id);
    }

    @Override
    public Book createBook(String name, String authorId, String genreId) {
        return null;
    }

    @Override
    public Book updateBook(String bookId) {
        return null;
    }
}
