import { Router } from "express";
const router: Router = Router();
import * as controller from "../../controller/client/order.controller";
router.post("/", controller.index);
export const orderRoutes: Router = router;