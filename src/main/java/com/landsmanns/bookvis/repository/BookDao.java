package com.landsmanns.bookvis.repository;

import com.landsmanns.bookvis.model.Book;
import com.landsmanns.bookvis.model.Genre;

import java.util.List;

/**
 * Created by uzilan on 2015-01-18.
 */
public interface BookDao extends BaseDao {

    List<Genre> getAllBooks();

    Book getBook(long id);
}
