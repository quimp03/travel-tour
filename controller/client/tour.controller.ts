import { Request, Response } from "express"
import sequelize from "../../config/database";
import Tour from "../../model/tour.modle"
import {QueryTypes } from "sequelize";
export const index = async (req: Request, res: Response) => {
    const slug = req.params.slugCategory
    const tours = await sequelize.query(
         `select tours.*, ROUND(price * ( 1 - discount/100),0)  as special_price from tours 
          join tours_categories on tours.id = tours_categories.tour_id join categories
          on tours_categories.category_id = categories.id
          where categories.slug = '${slug}'
          and tours.deleted = false
          and categories.deleted = false
          `,
          {
            type: QueryTypes.SELECT
          }
    )
    tours.forEach(tour => {
        if(tour["images"]){
            const images = JSON.parse(tour["images"]); //change from json to str
            tour["img"]  = images[0] //get first img
        }
        tour["special_price"] = parseFloat(tour["special_price"]) 
    });
    res.render("client/pages/tours/index.pug", {
        tours: tours,
        pageTitle: "Tour du lich"
    })
};
export const detail = async(req: Request, res: Response) => {
    const slugTour = req.params.slugTour
    const tour = await Tour.findOne({
        where: {
            slug: slugTour,
            deleted: false,
            status: "active"
        },
        raw: true
    })
    if(tour["images"]) {
        tour["images"] = JSON.parse(tour["images"]);
    }
    tour["price_special"] = (tour["price"] * (1 - tour["discount"]/100))
    res.render("client/pages/tours/detail.pug", {
        tourDetail: tour,
        pageTitle: "Trang chi tiết"
    })
}