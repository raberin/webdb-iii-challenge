exports.up = function(knex, Promise) {
  return knex.schema.createTable("students", tbl => {
    //primary key called id, integer, auto-increment
    tbl.increments();

    //Name of each student
    tbl.string("name", 128).notNullable();

    //cohort_id references which cohort from the cohort table
    tbl
      .integer("cohort_id")
      .notNullable()
      //Sets the current column references as a foreign key
      .references("id")
      //After references is called, sets the table where foreign key column is located
      .inTable("cohorts")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    //2 timestamp fields added to each row
    tbl.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {};
