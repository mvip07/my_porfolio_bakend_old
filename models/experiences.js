const getDb = require("../util/db").getDb;
class Experince {
    constructor(experinceName, experinceYear, experinceWhere, description) {
        this.experinceName = experinceName;
        this.experinceYear = experinceYear;
        this.experincesWhere = experinceWhere;
        this.description = description;
        this.createDate = new Date();
    }

    static getExperince() {
        const db = getDb();
        return db.collection("experinces").find({}).toArray().then(experinces => {
            return experinces.map(experince => {
                return {
                    _id: experince._id,
                    experinceName: experince.experinceName,
                    experinceYear: experince.experinceYear,
                    experinceWhere: experince.experinceWhere,
                    description: experince.description,
                    createDate: experince.createDate 
                }
            })
        });
    };

    addExperiences() {
        const db = getDb();
        return db.collection("experinces").insertOne(this);
    }
};

module.exports = Experince;
