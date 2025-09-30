const cds = require('@sap/cds');
const logger = cds.log('capb2b')

class Main extends cds.ApplicationService {

    init() {
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
        this.on('totalStock', () => 99);

        // This is vital for correct functionality of the generic handlers
        return super.init();
    }

    
}

module.exports = Main;