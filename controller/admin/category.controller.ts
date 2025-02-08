import { Request, Response} from "express"
import Category from "../../model/category.modle"
export const index = async(req: Request, res: Response) => {
    const categories = await Category.findAll({
        where: {
            deleted: false
        },
        raw: true
    })
    res.render("admin/pages/categories/index.pug", {
        pageTitle: "Trang danh mục",
        categories: categories
    })
}