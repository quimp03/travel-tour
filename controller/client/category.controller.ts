import { Request, Response } from "express";
import Category from "../../model/category.modle";
// [GET] /categories
export const index = async (req: Request, res: Response) => {
  const records = await Category.findAll({
    where: {
      deleted: false,
      status: "active"
    },
    raw: true
  })
  res.render("client/pages/categories/index", {
      records: records
  });
}