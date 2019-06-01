exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("cohorts")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("cohorts").insert([
        { name: "WEB18" },
        { name: "FSWPT4" },
        { name: "WEB19" },
        { name: "WEB20" },
        { name: "FSWPT5" },
        { name: "WEB21" }
      ]);
    });
};
