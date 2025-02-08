import { Express} from "express";
import { categorieRouters } from "./category.router";
import {systemConfig} from "../../config/system"
import {tourRouters} from "./tour.router"
export = (app: Express) => {
    app.use(`/${systemConfig.prefixAdmin}/categories`, categorieRouters)
    app.use(`/${systemConfig.prefixAdmin}/tours`, tourRouters)
}
