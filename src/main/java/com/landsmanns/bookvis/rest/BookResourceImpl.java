package com.landsmanns.bookvis.rest;

import com.google.inject.Inject;
import com.landsmanns.bookvis.service.BookService;

import static spark.Spark.get;

/**
 * Created by uzilan on 2015-01-18.
 */
public class BookResourceImpl implements BookResource {

    @Inject
    private BookService bookService;



    public BookResourceImpl() {
        get("/books", (req, res) -> {
            return bookService.getAllBooks();
        });
    }
}
