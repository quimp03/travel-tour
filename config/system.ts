import moment from "moment"
import { Request, Response, NextFunction} from "express"
const PREFIX_ADMIN: string = "admin";
export const momentSystem  = async(req: Request, res: Response, next: NextFunction) => {
    res.locals.moment = moment
    next();
}
export const systemConfig = {
    prefixAdmin: PREFIX_ADMIN
};