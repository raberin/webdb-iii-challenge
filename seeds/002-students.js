exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("students")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("students").insert([
        { name: "Roenz Aberin", cohort_id: "2" },
        { name: "Joey Steel", cohort_id: "1" },
        { name: "Raymond Tan", cohort_id: "4" }
      ]);
    });
};
