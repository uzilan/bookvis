package com.landsmanns.bookvis;

import com.google.inject.AbstractModule;
import com.google.inject.Guice;
import com.google.inject.Injector;
import com.landsmanns.bookvis.repository.BookDao;
import com.landsmanns.bookvis.repository.BookDaoImpl;
import com.landsmanns.bookvis.rest.BookResource;
import com.landsmanns.bookvis.rest.BookResourceImpl;
import com.landsmanns.bookvis.service.BookService;
import com.landsmanns.bookvis.service.BookServiceImpl;

/**
 * Created by uzilan on 2015-01-18.
 */
public class Bookvis extends AbstractModule {

    public static void main(String[] args) {
        Injector injector = Guice.createInjector(new Bookvis());
        BookResource bookResource = injector.getInstance(BookResource.class);
    }

    @Override
    protected void configure() {
        bind(BookDao.class).to(BookDaoImpl.class);
        bind(BookService.class).to(BookServiceImpl.class);
        bind(BookResource.class).to(BookResourceImpl.class);
    }

}
