namespace org.pbsap;

using {
    cuid,
    managed
} from '@sap/cds/common';

entity Books : cuid, managed {
    title  : String;
    author : Association to Authors;
}

entity Authors : cuid {
    name  : String;
    books : Association to many Books
                on books.author = $self;
}

entity Orders : cuid {
    comment: String;
    Items: Composition of many OrderItems on Items.parent = $self;
}

entity OrderItems { // to be accessed through orders only
    key parent : Association to Orders;
    key pos    : Integer;
    quantity   : Integer;
    book      : Association to Books;
}