const {
  pgTable,
  serial,
  varchar,
  integer,
  decimal,
  timestamp,
} = require("drizzle-orm/pg-core");

const products = pgTable("products", {
  id: serial("id").primaryKey(),

  name: varchar("name", {
    length: 150,
  }).notNull(),

  sku: varchar("sku", {
    length: 50,
  }).notNull().unique(),

  category: varchar("category", {
    length: 100,
  }),

  quantity: integer("quantity").notNull().default(0),

  price: decimal("price", {
    precision: 10,
    scale: 2,
  }).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

module.exports = {
  products,
};