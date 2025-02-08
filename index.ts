import express, {Express, Request, Response} from "express"
import sequelize from "./config/database"
import dotenv from "dotenv"
import clientRouter from "./routes/client/index.router"
import adminRouter from "./routes/admin/index.category"
import {momentSystem} from "./config/system"
import bodyParser from 'body-parser';
import { systemConfig } from "./config/system"
dotenv.config()

sequelize;
const app: Express = express();
const port: number | String = process.env.PORT || 3000
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))
app.use(express.static("public"));
app.set("views", "./views")
app.set("view engine", "pug")
app.use(momentSystem)
app.locals.prefixAdmin = systemConfig.prefixAdmin
clientRouter(app)
adminRouter(app)
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})