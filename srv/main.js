const cds = require('@sap/cds');

class Main extends cds.ApplicationService {

    init() {
        const { Books } = this.entities;

        this.after('READ', Books, books => {
            books.map(b => console.log(b.title))
        })

        return super.init();
    }
}

module.exports = Main;