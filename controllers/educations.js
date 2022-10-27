const getDb = require("../util/db").getDb;
const { ObjectId } = require("mongodb");
const Educations = require("../models/educations");

exports.getEducations= (req, res) => {
    Educations.getEducations().then(educations => {
        return res.json(educations);
    });
};

exports.addEducations = (req, res) => {
    const {educationName, educationYear, educationWhere, description} = req.body;

    try {
        const educations = new Educations(educationName, educationYear, educationWhere, description);
        educations.addEducations();
        return res.status(200).json({ message: "You are cool!" });
    } catch (err) {
        return res.status(500).json({ err: err, message: "Something is wrong!" });
    }
};

exports.getEducationsUpdate = (req, res) => {
    const db = getDb();
    const { educationName, educationYear, educationWhere, description } = req.body;
        return db.collection("educations").updateOne(
            { _id: ObjectId(req.params.id) },
            { $set: {
                "educationName": educationName,
                "educationYear": educationYear,
                "educationWhere": educationWhere,
                "description": description,
            } },
        ).then((obj) => {
            res.status(200).json({ message: "You are cool!" });
        }).catch((err) => {
            console.log('Errors: ' + err);
        })
    
}

exports.deleteEducations = (req, res) => {
    const db = getDb();
    return db.collection("educations")
        .deleteOne({ _id: ObjectId(req.params.id) })
        .then(() => res.status(200).json({ message: "You are cool!" }))
        .catch(() => res.status(500).json({ message: "You are not cool!" }));
};