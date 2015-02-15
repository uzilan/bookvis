package com.landsmanns.bookvis.rest;

import com.google.inject.Inject;
import com.landsmanns.bookvis.model.Model;
import com.landsmanns.bookvis.service.BookService;
import com.landsmanns.bookvis.utils.JsonUtils;

import static spark.Spark.*;

/**
 * Created by uzilan on 2015-01-18.
 */
public class BookResourceImpl implements BookResource {

    @Inject
    private BookService bookService;

    public BookResourceImpl() {

        get("/books", (request, response) -> {
            return JsonUtils.toJson(bookService.getAllBooks(), Model.DetailLevel.BOOK);
        });

        get("/books/:bookId", (request, response) -> {
            return bookService.getBook(Long.parseLong(request.params("bookId"))).toJson(Model.DetailLevel.RELATION);
        });

        post("/books", (request, response) -> {
            return bookService.createBook(request.params("name"), request.params("authorId"), request.params("genreId"));
        });

        put("/books/:bookId", (request, respone) -> {
            return bookService.updateBook(request.params("bookId"));
        });
    }
}
