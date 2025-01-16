import { Express } from "express";
import { tourRoutes } from "./tours.router"
import { categoryRoutes } from "./category.router";
import { cartRoutes } from "./cart.routers";
import {orderRoutes} from "../../routes/client/order.toutes"
export = (app: Express) => {
    app.use("/tours", tourRoutes)
    app.use(`/categories`, categoryRoutes);
    app.use("/cart", cartRoutes)
    app.use("/order", orderRoutes)
}