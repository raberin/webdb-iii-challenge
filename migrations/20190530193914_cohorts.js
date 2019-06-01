exports.up = function(knex, Promise) {
  return knex.schema.createTable("cohorts", tbl => {
    //primary key called id, integer, auto-increment
    tbl.increments();

    tbl.string("name", 128).notNullable();

    //2 timestamp fields added to each row
    tbl.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("cohorts");
};

//After exports.up and exports.down table function has been finished
