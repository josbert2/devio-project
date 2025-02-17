import { int, mysqlTable, serial, varchar, text, datetime } from 'drizzle-orm/mysql-core';
import { relations } from "drizzle-orm";

// Tabla de proyectos
export const projects = mysqlTable("projects", {
  id: int("id").primaryKey().autoincrement(),  // En lugar de serial()
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  status: varchar("status", { length: 50 }).notNull(),
  link: varchar("link", { length: 255 }),
  start_date: datetime("start_date").notNull(),
  end_date: datetime("end_date").notNull(),
});

export const modules = mysqlTable("modules", {
  id: int("id").primaryKey().autoincrement(),  // En lugar de serial()
  title: varchar("title", { length: 255 }).notNull(),
  status: varchar("status", { length: 50 }).notNull(),
  assigned_to: varchar("assigned_to", { length: 255 }).notNull(),
  project_id: int("project_id", { mode: "bigint" }).notNull().references(() => projects.id, { onDelete: "cascade" }),
});

// Tabla de tareas
export const tasks = mysqlTable("tasks", {
  task_id: int("task_id").primaryKey().autoincrement(),  // En lugar de serial()
  description: text("description").notNull(),
  status: varchar("status", { length: 50 }).notNull(), // "Finalizado", "Pendiente"
  module_id: int("module_id", { mode: "bigint" }).notNull().references(() => modules.id, { onDelete: "cascade" }),
});

export const usersTable = mysqlTable('users_table', {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  age: int().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});


// Relation between projects and modules
export const projectRelations = relations(projects, ({ many }) => ({
  modules: many(modules),
}));

export const moduleRelations = relations(modules, ({ one, many }) => ({
  project: one(projects, {
    fields: [modules.project_id],
    references: [projects.id]
  }),
  tasks: many(tasks),
}));

export const taskRelations = relations(tasks, ({ one }) => ({
  module: one(modules, { fields: [tasks.module_id], references: [modules.id] }),
}));