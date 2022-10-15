const getDb = require("../util/db").getDb;
const { ObjectId } = require("mongodb");
const Testimonials = require("../models/testimonials");

exports.getTestimonials= (req, res) => {
    Testimonials.getTestimonials().then(testimonials => {
        return res.json(testimonials);
    });
};

exports.addTestimonials = (req, res) => {
    const {name, email, subject, message, image} = req.body;

    try {
        const testimonials = new Testimonials(name, email, subject, message, image);
        testimonials.addTestimonials();
        return res.status(200).json({ message: "You are cool!" });
    } catch (err) {
        return res.status(500).json({ err: err, message: "Something is wrong!" });
    }
};

exports.getTestimonialsUpdate = (req, res) => {
    const db = getDb();
    const { name, email, subject, message, image, id} = req.body;
        return db.collection("testimonials").updateOne(
            { _id: ObjectId(id) },
            { $set: {
                "name": name,
                "email": email,
                "subject": subject,
                "message": message,
                "image": image,
            } },
        ).then((obj) => {
            res.status(200).json({ message: "You are cool!" });
        }).catch((err) => {
            console.log('Errors: ' + err);
        })
    
}

exports.deleteTestimonials = (req, res) => {
    const db = getDb();
    return db.collection("testimonials")
        .deleteOne({ _id: ObjectId(req.params.id) })
        .then(() => res.status(200).json({ message: "You are cool!" }))
        .catch(() => res.status(500).json({ message: "You are not cool!" }));
};