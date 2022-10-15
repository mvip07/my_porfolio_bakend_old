const getDb = require("../util/db").getDb;
const { ObjectId } = require("mongodb");
const Skills = require("../models/skills");

exports.getSkills= (req, res) => {
    Skills.getSkills().then(skills => {
        return res.json(skills);
    });
};

exports.addSkills = (req, res) => {
    const {skillsName, skillsPercentage} = req.body;

    try {
        const skills = new Skills(skillsName, skillsPercentage);
        skills.addSkills();
        return res.status(200).json({ message: "You are cool!" });
    } catch (err) {
        return res.status(500).json({ err: err, message: "Something is wrong!" });
    }
};

exports.getSkillsUpdate = (req, res) => {
    const db = getDb();
    const { skillsName, skillsPercentage, id} = req.body;
        return db.collection("skills").updateOne(
            { _id: ObjectId(id) },
            { $set: {
                "skillsName": skillsName,
                "skillsPercentage": skillsPercentage,
            } },
        ).then((obj) => {
            res.status(200).json({ message: "You are cool!" });
        }).catch((err) => {
            console.log('Errors: ' + err);
        })
    
}

exports.deleteSkills = (req, res) => {
    const db = getDb();
    return db.collection("skills")
        .deleteOne({ _id: ObjectId(req.params.id) })
        .then(() => res.status(200).json({ message: "You are cool!" }))
        .catch(() => res.status(500).json({ message: "You are not cool!" }));
};