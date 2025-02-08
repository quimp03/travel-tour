import { Request, Response } from "express"
import Tour from "../../model/tour.modle"
import Category from "../../model/category.modle"
import TourCategory from "../../model/tour-category.modle"
import {generateTourCode} from "../../helper/generate.helper"
import { systemConfig } from "../../config/system"
export const index = async(req: Request, res: Response  ) => {
    const tours = await Tour.findAll({
        raw: true,
        where: {
            deleted: false
        }
    })
    for (const tour of tours) {
        if (tour["images"]) {
            tour["image"] = JSON.parse(tour["images"])[0];
        } else {
            tour["image"] = null; 
        }
        tour["price_special"] = (tour["price"] * (1 - tour["discount"]/100))
    }
    res.render("admin/pages/tour/index.pug", {
        tours: tours
    })
}
export const create = async(req: Request, res: Response) => {
    const categories = await Category.findAll({
        raw: true,
        where: {
            status: "active",
            deleted: false
        }
    })
    res.render("admin/pages/tour/create.pug", {
        pageTitle: "Trang thêm mới tour",
        categories: categories
    })
}
export const createPost = async(req: Request, res: Response) => {
    const countTour = await Tour.count()
    const tourCode = generateTourCode(countTour + 1)
    if(req.body.position === ""){
        req.body.position = countTour + 1
    }else{
        req.body.position = parseInt(req.body.position)
    }
    const dataTour = {
        title: req.body.title,
        code: tourCode,
        images: JSON.stringify(req.body.images),
        status: req.body.status,
        price: parseInt(req.body.price),
        discount: parseInt(req.body.discount),
        stock: parseInt(req.body.stock),
        timeStart: req.body.timeStart,
        position: req.body.position
    }
    const tour = await Tour.create(dataTour)
    const dataTourCategory = {
        tour_id: tour["id"],
        category_id: parseInt(req.body.category_id)
    }
    await TourCategory.create(dataTourCategory)
    res.redirect(`/${systemConfig.prefixAdmin}/tours`)
}