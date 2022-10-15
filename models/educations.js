const getDb = require("../util/db").getDb;
class Education {
    constructor(educationName, educationYear, educationWhere, description) {
        this.educationName = educationName;
        this.educationYear = educationYear;
        this.educationWhere = educationWhere;
        this.description = description;
        this.createDate = new Date();
    }

    static getEducations() {
        const db = getDb();
        return db.collection("educations").find({}).toArray().then(educations => {
            return educations.map(education => {
                return {
                    _id: education._id,
                    educationName: education.educationName,
                    educationYear: education.educationYear,
                    educationWhere: education.educationWhere,
                    description: education.description,
                    createDate: education.createDate 
                }
            })
        });
    };

    addEducations() {
        const db = getDb();
        return db.collection("educations").insertOne(this);
    }
};

module.exports = Education;
