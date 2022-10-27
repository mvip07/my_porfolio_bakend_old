const getDb = require("../util/db").getDb;
const { ObjectId } = require("mongodb");
const Experiences = require("../models/experiences");

exports.getExperiences = (req, res) => {
    Experiences.getExperince().then(experiences => {
        return res.json(experiences);
    });
};

exports.addExperiences = (req, res) => {
    const { experienceName, experienceYear, experienceWhere, description } = req.body;

    try {
        const experience = new Experiences(experienceName, experienceYear, experienceWhere, description);
        experience.addExperiences();
        return res.status(200).json({ message: "You are cool!" });
    } catch (err) {
        return res.status(500).json({ err: err, message: "Something is wrong!" });
    }
};

exports.getExperiencesUpdate = (req, res) => {
    const db = getDb();
    const { experienceName, experienceYear, experienceWhere, description } = req.body;
    return db.collection("experiences").updateOne(
        { _id: ObjectId(req.params.id) },
        { $set: {
                "experienceName": experienceName,
                "experienceYear": experienceYear,
                "experienceWhere": experienceWhere,
                "description": description,
        }  },
    ).then((obj) => {
        res.status(200).json({ message: "You are cool!" });
    }).catch((err) => {
        console.log('Errors: ' + err);
    })

}

exports.deleteExperiences = (req, res) => {
    const db = getDb();
    return db.collection("experiences")
        .deleteOne({ _id: ObjectId(req.params.id) })
        .then(() => res.status(200).json({ message: "You are cool!" }))
        .catch(() => res.status(500).json({ message: "You are not cool!" }));
};