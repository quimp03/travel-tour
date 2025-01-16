import { Request, Response } from "express";
import Order from "../../model/order.modle"
import {generateOrderCode} from "../../helper/generate.helper"
export const index = async(req: Request, res: Response) => {
    const data = req.body
    console.log(data)
    const dataOrder = {
        code:"",
        fullName: data.inforUser.fullName,
        phone: data.inforUser.phone,
        note: data.inforUser.note,
        status: "initial",
    }
    const order = await Order.create(dataOrder)
    const orderId = order.dataValues.id
    const code = generateOrderCode(orderId)
    await order.update({
        code: code
    },{
        where: {
            id: orderId,
        }
    })
    res.json({
        code: 200,
        message: "Đặt hành thành công",
        orderCode: code
    })
}