const cds = require('@sap/cds');
const logger = cds.log('capb2b')

class Main extends cds.ApplicationService {

    init() {
        const { Books } = this.entities;

        // Don't forget to pass on "return next()" on an on handler otherwise content will not be returned
        this.on('READ', Books, (req, next) => {
            // do something
            return next();
        })

        // After handlers do not require the return statement to work properly
        // 
        this.after('READ', Books, books => {
            if (books) {
                const booksArray = Array.isArray(books) ? books : [books]; 
                booksArray.map(b => logger(b.title))
            }
        })

        // This is vital for correct framework functionality
        return super.init();
    }
}

module.exports = Main;