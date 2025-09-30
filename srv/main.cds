using org from '../db/schema';

extend org.pbsap.Books with {
    virtual urgency: String;
}
service bookshop {
    entity Books as projection on org.pbsap.Books;
    entity Authors as projection on org.pbsap.Authors;
    entity Orders as projection on org.pbsap.Orders;

    // Functions don't modify data; we call them with GET
    function totalStock() returns Integer;

    // Actions modify data; we call them with POST
}
