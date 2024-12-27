import { Express } from "express";
import { tour } from "./tours.router"
import { categoryRoutes } from "./category.router";
export = (app: Express) => {
    app.use("/tours", tour)
    app.use(`/categories`, categoryRoutes);
}