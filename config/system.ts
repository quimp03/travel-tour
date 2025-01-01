import moment from "moment"
import { Request, Response, NextFunction} from "express"
export const momentSystem  = async(req: Request, res: Response, next: NextFunction) => {
    res.locals.moment = moment
    next();
}