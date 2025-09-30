using org from '../db/schema';

extend org.pbsap.Books with {
    virtual urgency : String;
}

service bookshop {
    // We can restrict the objects that are returned from the entity on the service layer
    // using a select with the appropriate clauses

    // Had to add this annotation here to affirm where to redirect the associations
    @cds.redirection.target
    entity Books as projection on org.pbsap.Books actions {
        function stockValue() returns Decimal;
    };
    entity LowStock as select from org.pbsap.Books where stock <=20;

    entity Authors       as projection on org.pbsap.Authors;
    entity Orders        as projection on org.pbsap.Orders;

    // Functions don't modify data; we call them with GET
    function totalStock() returns Integer;

    // Actions modify data; we call them with POST
}
