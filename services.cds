using { cuid, managed } from '@sap/cds/common';

service bookshop {
    entity Books : cuid, managed {
        title: String;
        author: Association to Authors;
    }

    entity Authors : cuid {
        name: String;
        books: Association to many Books on books.author = $self;
    }
}
