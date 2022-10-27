const getDb = require("../util/db").getDb;
const { ObjectId } = require("mongodb");
const Portfolios = require("../models/portfolios");

exports.getPortfolios= (req, res) => {
    Portfolios.getPortfolios().then(portfolios => {
        return res.json(portfolios);
    });
};

exports.addPortfolios = (req, res) => {
    const {category, githubUrl, serverUrl, image} = req.body;

    try {
        const portfolios = new Portfolios(category, githubUrl, serverUrl, image);
        portfolios.addPortfolios();
        return res.status(200).json({ message: "You are cool!" });
    } catch (err) {
        return res.status(500).json({ err: err, message: "Something is wrong!" });
    }
};

exports.getPortfoliosUpdate = (req, res) => {
    const db = getDb();
    const { category, githubUrl, serverUrl, image} = req.body;
        return db.collection("portfolios").updateOne(
            { _id: ObjectId(req.params.id) },
            { $set: {
                "category": category,
                "githubUrl": githubUrl,
                "serverUrl": serverUrl,
                "image": image,
            } },
        ).then((obj) => {
            res.status(200).json({ message: "You are cool!" });
        }).catch((err) => {
            console.log('Errors: ' + err);
        })
    
}

exports.deletePortfolios = (req, res) => {
    const db = getDb();
    return db.collection("portfolios")
        .deleteOne({ _id: ObjectId(req.params.id) })
        .then(() => res.status(200).json({ message: "You are cool!" }))
        .catch(() => res.status(500).json({ message: "You are not cool!" }));
};