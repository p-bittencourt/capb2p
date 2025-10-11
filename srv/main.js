const cds = require('@sap/cds');
const { SELECT } = require('@sap/cds/lib/ql/cds-ql');
const logger = cds.log('capb2b')

class Main extends cds.ApplicationService {

    async init() {
        const { Books } = this.entities;

        const changeUrgencyDueToSubject = (data) => {
            if (data) {
                const books = Array.isArray(data) ? data : [data];
                books.forEach((book) => {
                    if (book.title?.toLowerCase().includes('startup')) {
                        book.urgency = 'HIGH'
                    }
                })
            }
        }

        // Don't forget to pass on "return next()" on an on handler otherwise content will not be returned
        this.on('READ', Books, (req, next) => {
            // do something
            return next();
        })

        // After handlers do not require the return statement to work properly
        // this.after('READ', Books, books => {
        //     if (books) {
        //         const booksArray = Array.isArray(books) ? books : [books]; 
        //         booksArray.map(b => logger(b.title))
        //     }
        // })

        this.after('READ', Books, changeUrgencyDueToSubject);

        // Function implementation
        this.on('totalStock', async () => {
            const result = await SELECT.one.from(Books).columns('sum(stock) as total')
            return result.total;
        }
        );

        // Bound-function implementation
        // this.on('getStock','Foo', () => stocks[id])
        this.on('stockValue', Books, async ({ params: [id] }) => {
            const stockValue = await SELECT
                .one()
                .from(Books)
                .columns('stock * price as stockValue')
                .where(id);
            return stockValue;
        })

        // This is vital for correct functionality of the generic handlers
        return super.init();
    }


}

module.exports = Main;