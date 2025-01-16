import { Request, Response } from "express"
import Tour from "../../model/tour.modle"
export const index = async(req: Request, res: Response) => {
    res.render("client/pages/cart/index", {
        pageTitle: "Trang thanh toán"
    })
}
export const listJson = async(req: Request, res: Response) => {
    const tours = req.body
    
    for (const tour of tours) {
        const id = tour.tourId
         const inforUser = await Tour.findOne({
            where: {
                id: id,
                deleted: false,
                status: "active"
            },
            raw: true
         })
        tour["inforUser"] = inforUser
        tour["image"] = JSON.parse(inforUser["images"])[0]
        tour["special_price"]= (inforUser["price"] * (1 - inforUser["discount"]/100))
        tour["total_price"] = tour["special_price"] * tour["quantity"]
    }
    res.json({
        tours: tours
    })
}