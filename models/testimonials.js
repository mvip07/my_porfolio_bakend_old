const getDb = require("../util/db").getDb;
class Testimonial {
    constructor(name, email, subject, message, image) {
        this.name = name;
        this.email = email;
        this.subject = subject;
        this.message = message;
        this.image = image;
        this.createDate = new Date();
    }

    static getTestimonials() {
        const db = getDb();
        return db.collection("testimonials").find({}).toArray().then(testimonials => {
            return testimonials.map(testimonial => {
                return {
                    _id: testimonial._id,
                    name: testimonial.name,
                    email: testimonial.email,
                    subject: testimonial.subject,
                    message: testimonial.message,
                    image: testimonial.image,
                    createDate: testimonial.createDate 
                }
            })
        });
    };

    addTestimonials() {
        const db = getDb();
        return db.collection("testimonials").insertOne(this);
    }
};

module.exports = Testimonial;
