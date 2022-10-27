const getDb = require("../util/db").getDb;
class Experince {
    constructor(experinceName, experinceYear, experienceWhere, description) {
        this.experinceName = experinceName;
        this.experinceYear = experinceYear;
        this.experienceWhere = experienceWhere;
        this.description = description;
        this.createDate = new Date();
    }

    static getExperince() {
        const db = getDb();
        return db.collection("experiences").find({}).toArray().then(experinces => {
            return experinces.map(experince => {
                return {
                    _id: experince._id,
                    experienceName: experince.experienceName,
                    experienceYear: experince.experienceYear,
                    experienceWhere: experince.experienceWhere,
                    description: experince.description,
                    createDate: experince.createDate
                }
            })
        });
    };

    addExperiences() {
        const db = getDb();
        return db.collection("experiences").insertOne(this);
    }
};

module.exports = Experince;
