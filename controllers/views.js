const getDb = require("../util/db").getDb;
const { ObjectId } = require("mongodb");
const Views = require("../models/views");

exports.getViews= (req, res) => {
    Views.getViews().then(views => {
        return res.json(views);
    });
};

exports.addViews = (req, res) => {
    const {ip} = req.body;

    try {
        const views = new Views(ip);
        views.addViews();
        return res.status(200).json({ message: "You are cool!" });
    } catch (err) {
        return res.status(500).json({ err: err, message: "Something is wrong!" });
    }
};

exports.getViewsUpdate = (req, res) => {
    const db = getDb();
    const { ip, id} = req.body;
        return db.collection("views").updateOne(
            { _id: ObjectId(id) },
            { $set: {
                "ip": ip,
            } },
        ).then((obj) => {
            res.status(200).json({ message: "You are cool!" });
        }).catch((err) => {
            console.log('Errors: ' + err);
        })
    
}

exports.deleteViews = (req, res) => {
    const db = getDb();
    return db.collection("views")
        .deleteOne({ _id: ObjectId(req.params.id) })
        .then(() => res.status(200).json({ message: "You are cool!" }))
        .catch(() => res.status(500).json({ message: "You are not cool!" }));
};