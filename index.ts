import express, {Express, Request, Response} from "express"
import sequelize from "./config/database"
import dotenv from "dotenv"
dotenv.config()
sequelize;
const app: Express = express();
const port: number = 3000
app.set("view", "./views")
app.set("view engine", "pug")
app.get('/', (req: Request, res: Response) => {
    res.render("client/pages/tours/index.pug")
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})