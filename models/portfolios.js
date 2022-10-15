const getDb = require("../util/db").getDb;
class Portfolio {
    constructor(category, githubUrl, serverUrl, image) {
        this.category = category;
        this.githubUrl = githubUrl;
        this.serverUrl = serverUrl;
        this.image = image;
        this.createDate = new Date();
    }

    static getPortfolios() {
        const db = getDb();
        return db.collection("portfolios").find({}).toArray().then(portfolios => {
            return portfolios.map(portfolio => {
                return {
                    _id: portfolio._id,
                    category: portfolio.category,
                    githubUrl: portfolio.githubUrl,
                    serverUrl: portfolio.serverUrl,
                    image: portfolio.image,
                    createDate: portfolio.createDate 
                }
            })
        });
    };

    addPortfolios() {
        const db = getDb();
        return db.collection("portfolios").insertOne(this);
    }
};

module.exports = Portfolio;
