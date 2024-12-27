import express from "express"
import { Router } from "express";
import * as controller from "../../controller/client/tour.controller"
const router = express()
router.get("/", controller.index)
export const tour: Router = router;