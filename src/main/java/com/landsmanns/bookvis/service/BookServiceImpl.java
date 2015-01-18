package com.landsmanns.bookvis.service;

import com.google.inject.Inject;
import com.landsmanns.bookvis.repository.BookDao;

/**
 * Created by uzilan on 2015-01-18.
 */
public class BookServiceImpl implements BookService {

    @Inject
    private BookDao bookDao;

    @Override
    public String getAllBooks() {
        return bookDao.getAllBooks();
    }
}
