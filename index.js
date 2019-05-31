const express = require("express");
// const helmet = require("helmet");
const knex = require("knex");
const knexConfig = require("./knexfile.js");

const db = knex(knexConfig.development);

// const helmet = require("helmet");

const server = express();

// server.use(helmet());
server.use(express.json());

//List all cohorts (SELECT * FROM cohorts)
server.get("/api/cohorts", async (req, res) => {
  //get the cohorts from database
  try {
    //Not using db helper functions
    const cohorts = await db("cohorts");
    res.status(200).json(cohorts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//List cohort with id
server.get("/api/cohorts/:id", async (req, res) => {
  try {
    const cohort = await db("cohorts")
      .where({ id: req.params.id })
      .first();
    res.status(200).json(cohort);
  } catch (err) {
    res.status(500).json(err);
  }
});

//List student with specified cohort id
server.get("/api/cohorts/:id/students", async (req, res) => {
  try {
    //Joins the two tables together, and uses the cohort_id foreign key to match id of cohorts and returns data
    const students = await db("students as s")
      .join("cohorts as c", "c.id", "s.cohort_id")
      .select("s.*")
      .where("s.cohort_id", req.params.id);
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Post cohort
server.post("/api/cohorts", async (req, res) => {
  try {
    //Inserts the req.body into db
    const [id] = await db("cohorts").insert(req.body);

    //acceses db whereever the specified id is and returns the object
    const role = await db("cohorts")
      .where({ id })
      .first();

    res.status(201).json(role);
  } catch (error) {
    const message = errors[error.errno] || "We ran into an error";
    res.status(500).json({ message, error });
  }
});

// update cohort
server.put("/api/cohorts/:id", async (req, res) => {
  try {
    //Updates the specified item in db
    const count = await db("cohorts")
      .where({ id: req.params.id })
      .update(req.body);

    //Checks it was updated then returns the updated item
    if (count > 0) {
      const role = await db("cohorts")
        .where({ id: req.params.id })
        .first();

      res.status(200).json(role);
    } else {
      res.status(404).json({ message: "Records not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete cohort
server.delete("/api/cohorts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    //Deletes the specified item in db returns a number > 0 if deleted
    const counts = await db("cohorts")
      .where({ id: id })
      .del();

    //if item was deleted...
    if (counts > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: "records not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`\n** API running on http://localhost:${port} **\n`)
);
