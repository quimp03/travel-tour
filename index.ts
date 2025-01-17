import express, {Express, Request, Response} from "express"
import sequelize from "./config/database"
import dotenv from "dotenv"
import clientRouter from "./routes/client/index.router"
import {momentSystem} from "./config/system"
import bodyParser from 'body-parser';
dotenv.config()

sequelize;
const app: Express = express();
const port: number | String = process.env.PORT || 3000
app.use(bodyParser.json())
app.use(express.static("public"));
app.set("views", "./views")
app.set("view engine", "pug")
app.use(momentSystem)
clientRouter(app)
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})