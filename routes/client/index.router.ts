import { Express } from "express";
import { tour } from "./tours.router"
import { categoryRoutes } from "./category.router";
import { cart } from "./cart.routers";
export = (app: Express) => {
    app.use("/tours", tour)
    app.use(`/categories`, categoryRoutes);
    app.use("/cart", cart)
}