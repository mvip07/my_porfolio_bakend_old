const express = require("express");
const about = require("./controllers/about")
const education = require("./controllers/educations")
const experience = require("./controllers/experiences")
const view = require("./controllers/views")
const portfolio = require("./controllers/portfolios")
const skill = require("./controllers/skills")
const testimonial = require("./controllers/testimonials")
const mongoConnect = require("./util/db").mongoConnect;
const app = express();

require("dotenv").config();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/about/all", about.getAbouts);
app.delete("/about/delete/:id", about.deleteAbout);
app.post("/about/create", about.addAbout);
app.post("/about/update/:id", about.getAboutUpdate);

app.get("/education/all", education.getEducations);
app.delete("/education/delete/:id", education.deleteEducations);
app.post("/education/create", education.addEducations);
app.post("/education/update/:id", education.getEducationsUpdate);

app.get("/experience/all", experience.getExperiences);
app.delete("/experience/delete/:id", experience.deleteExperiences);
app.post("/experience/create", experience.addExperiences);
app.post("/experience/update/:id", experience.getExperiencesUpdate);

app.get("/view/all", view.getViews);
app.delete("/view/delete/:id", view.deleteViews);
app.post("/view/create", view.addViews);
app.post("/view/update/:id", view.getViewsUpdate);

app.get("/portfolio/all", portfolio.getPortfolios);
app.delete("/portfolio/delete/:id", portfolio.deletePortfolios);
app.post("/portfolio/create", portfolio.addPortfolios);
app.post("/portfolio/update/:id", portfolio.getPortfoliosUpdate);

app.get("/skill/all", skill.getSkills);
app.delete("/skill/delete/:id", skill.deleteSkills);
app.post("/skill/create", skill.addSkills);
app.post("/skill/update/:id", skill.getSkillsUpdate);

app.get("/testimonial/all", testimonial.getTestimonials);
app.delete("/testimonial/delete/:id", testimonial.deleteTestimonials);
app.post("/testimonial/create", testimonial.addTestimonials);
app.post("/testimonial/update/:id", testimonial.getTestimonialsUpdate);

mongoConnect(() => {
  app.listen(process.env.PORT || 8000, () => console.log("Server Started!"));
});