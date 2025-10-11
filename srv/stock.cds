using org from '../db/schema';

// The where clause wasn't being applied on main.cds
// That's likely because there were conflicts with the projections and associations
// on main.cds --
// update: after creating a separate LowStock projection on main.cds 
// I was able to access the "where" clause in it

// This service is no longer needed.
service bookstock {
    entity BooksLowStock as
        select from org.pbsap.Books {
            ID,
            title,
            author,
            stock
        }
        where
            stock <= 20;
}
