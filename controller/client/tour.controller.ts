import { Request, Response } from "express"
import Tour from "../../model/tour.modle";
import sequelize from "../../config/database";
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
        tours: tours
    })
};