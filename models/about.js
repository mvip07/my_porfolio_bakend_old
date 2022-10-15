const getDb = require("../util/db").getDb;
class About {
    constructor(fullName, job, birthday, website, phone, city, age, degree, email, interesting, telegramLink, facabookLink, instagramLink, linkedinLink, description, image) {
        this.fullName = fullName;
        this.job = job;
        this.birthday = birthday;
        this.website = website;
        this.phone = phone;
        this.city = city;
        this.age = age;
        this.degree = degree;
        this.email = email;
        this.interesting = interesting;
        this.telegramLink = telegramLink;
        this.facabookLink = facabookLink;
        this.instagramLink = instagramLink;
        this.linkedinLink = linkedinLink;
        this.description = description;
        this.image = image;
        this.createDate = new Date();
    }

    static getAbout() {
        const db = getDb();
        return db.collection("about").find({}).toArray().then(abouts => {
            return abouts.map(about => {
                return {
                    _id: about._id,
                    fullName: about.fullName,
                    job: about.job,
                    birthday: about.birthday,
                    website: about.website,
                    phone: about.phone,
                    city: about.city,
                    age: about.age,
                    degree: about.degree,
                    email: about.email,
                    interesting: about.interesting,
                    telegramLink: about.telegramLink,
                    facabookLink: about.facabookLink,
                    instagramLink: about.instagramLink,
                    linkedinLink: about.linkedinLink,
                    description: about.description,
                    image: about.image,
                    createDate: about.createDate 
                }
            })
        });
    };

    addAbout() {
        const db = getDb();
        return db.collection("about").insertOne(this);
    }
};

module.exports = About;
