const getDb = require("../util/db").getDb;
const { ObjectId } = require("mongodb");
const About = require("../models/about");

exports.getAbouts = (req, res) => {
    About.getAbout().then(abouts => {
        return res.json(abouts);
    });
};

exports.addAbout = (req, res) => {
    const {fullName, job, birthday, website, phone, city, age, degree, email, interesting, telegramLink, facabookLink, instagramLink, linkedinLink, description, image} = req.body;

    try {
        const about = new About(fullName, job, birthday, website, phone, city, age, degree, email, interesting, telegramLink, facabookLink, instagramLink, linkedinLink, description, image);
        about.addAbout();
        return res.status(200).json({ message: "You are cool!" });
    } catch (err) {
        return res.status(500).json({ err: err, message: "Something is wrong!" });
    }
};

exports.getAboutUpdate = (req, res) => {
    const db = getDb();
    const { fullName, job, birthday, website, phone, city, age, degree, email, interesting, telegramLink, facabookLink, instagramLink, linkedinLink, description, image, id} = req.body;
        return db.collection("about").updateOne(
            { _id: ObjectId(id) },
            { $set: {
                "fullName" : fullName,
                "job": job,
                "birthday": birthday,
                "website": website,
                "phone": phone,
                "city": city,
                "age": age,
                "degree": degree,
                "email": email,
                "interesting": interesting,
                "telegramLink": telegramLink,
                "facabookLink": facabookLink,
                "instagramLink": instagramLink,
                "linkedinLink": linkedinLink,
                "description": description,
                "image": image,
            } },
        ).then((obj) => {
            res.status(200).json({ message: "You are cool!" });
        }).catch((err) => {
            console.log('Errors: ' + err);
        })
    
}

exports.deleteAbout = (req, res) => {
    const db = getDb();
    return db.collection("about")
        .deleteOne({ _id: ObjectId(req.params.id) })
        .then(() => res.status(200).json({ message: "You are cool!" }))
        .catch(() => res.status(500).json({ message: "You are not cool!" }));
};
