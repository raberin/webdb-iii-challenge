const express = require("express");
const helmet = require("helmet");
const knex = require("knex");
const knexConfig = require("./knexfile.js");

const db = knex(knexConfig.development);

const helmet = require("helmet");

const server = express();

server.use(helmet());
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
    const { id } = req.params;
    const cohort = db("cohort")
      .where({ id: id })
      .first();
  } catch (err) {}
});

//Post a cohort in cohorts table

const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`\n** API running on http://localhost:${port} **\n`)
);
