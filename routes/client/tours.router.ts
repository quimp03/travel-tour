import express from "express"
import { Router } from "express";
import * as controller from "../../controller/client/tour.controller"
const router = express()
router.get("/:slugCategory",  controller.index)
router.get("/detail/:slugTour", controller.detail)
export const tour: Router = router;