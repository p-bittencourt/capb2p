const cds = require('@sap/cds');

class Main extends cds.ApplicationService {

    init() {
        const { Books } = this.entities;

        // Don't forget to pass on "return next()" on an on handler
        this.on('READ', Books, (_, req) => {
            // do something
            return next();
        })

        this.after('READ', Books, books => {
            books.map(b => console.log(b.title))
        })

        return super.init();
    }
}

module.exports = Main;