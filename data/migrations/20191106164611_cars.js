exports.up = function(knex, Promise) {
  return knex.schema.createTable("cars", tbl => {
    tbl.increments();
    tbl
      .string("VIN")
      .notNullable()
      .unique();
    tbl.text("make").notNullable();
    tbl.text("model").notNullable();
    tbl.integer("mileage").notNullable();
    tbl.text("transmission");
    tbl.text("title");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("cars");
};
