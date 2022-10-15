const getDb = require("../util/db").getDb;
class View {
    constructor(ip) {
        this.ip = ip;
        this.createDate = new Date();
    }

    static getViews() {
        const db = getDb();
        return db.collection("views").find({}).toArray().then(views => {
            return views.map(view => {
                return {
                    _id: view._id,
                    ip: view.ip,
                    createDate: view.createDate 
                }
            })
        });
    };

    addViews() {
        const db = getDb();
        return db.collection("views").insertOne(this);
    }
};

module.exports = View;
