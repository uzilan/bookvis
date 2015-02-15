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

import static spark.Spark.staticFileLocation;

/**
 * Created by uzilan on 2015-01-18.
 */
public class Bookvis extends AbstractModule {

    public static void main(String[] args) {

        // redirect everything that is not mapped using spark to the public directory under resources
        staticFileLocation("/public");

        try {

            // create the Guice dependency graph
            Injector injector = Guice.createInjector(new Bookvis());
            BookResource bookResource = injector.getInstance(BookResource.class);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void configure() {
        bind(BookDao.class).to(BookDaoImpl.class);
        bind(BookService.class).to(BookServiceImpl.class);
        bind(BookResource.class).to(BookResourceImpl.class);
    }
}
