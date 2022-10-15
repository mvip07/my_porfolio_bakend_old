const getDb = require("../util/db").getDb;
class Skill {
    constructor(skillsName, skillsPercentage) {
        this.skillsName = skillsName;
        this.skillsPercentage = skillsPercentage;
        this.createDate = new Date();
    }

    static getSkills() {
        const db = getDb();
        return db.collection("skills").find({}).toArray().then(skills => {
            return skills.map(skill => {
                return {
                    _id: skill._id,
                    skillsName: skill.skillsName,
                    skillsPercentage: skill.skillsPercentage,
                    createDate: skill.createDate 
                }
            })
        });
    };

    addSkills() {
        const db = getDb();
        return db.collection("skills").insertOne(this);
    }
};

module.exports = Skill;
