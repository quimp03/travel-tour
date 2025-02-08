import {Router } from "express";
import * as controller from "../../controller/admin/tour.controller"
import multer from "multer"
import * as uploadCloud from "../../middlewares/admin/uploadCloud.middlewares"
const upload = multer()
const router: Router = Router()
router.get("/", controller.index)
router.get("/create", controller.create)
router.post("/create",upload.fields([{ name: 'images', maxCount: 10 }]),uploadCloud.uploadFields, controller.createPost)
export const tourRouters: Router = router