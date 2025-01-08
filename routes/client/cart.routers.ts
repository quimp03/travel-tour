import { Router } from "express";
const router: Router = Router()
import * as controller from "../../controller/client/cart.controller"
router.get("/", controller.index)
router.post("/list-json", controller.listJson)
export const cart: Router = router