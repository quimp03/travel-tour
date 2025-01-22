import { Request, Response } from "express";
import Order from "../../model/order.modle"
import OrderItem from "../../model/order-item.nodle";
import {generateOrderCode} from "../../helper/generate.helper"
import Tour from "../../model/tour.modle";
export const index = async(req: Request, res: Response) => {
    const data = req.body
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
    // db order_item
    for (const tour of data.cart) {
        const orderItem = {
            orderId: orderId,
            tourId: tour.tourId,
            quantity: tour.quantity  
        }
        const inforTour = await Tour.findOne({
            where: {
                id: tour.tourId,
                deleted: false,
                status: "active"
            },
            raw: true
        })
        orderItem["price"] = inforTour["price"]
        orderItem["discount"] = inforTour["discount"]
        orderItem["timeStart"] = inforTour["timeStart"]
        console.log(orderItem)
        await OrderItem.create(orderItem)
    }

    res.json({
        code: 200,
        message: "Đặt hành thành công",
        orderCode: code
    })
}
export const orderSuccess = async (req: Request, res: Response) => {
    const orderCode = req.query.orderCode
    const order = await Order.findOne({
        raw: true,
        where: {
            code: orderCode,
            deleted: false
        }
    })
    const orderItems = await OrderItem.findAll({
        raw: true,
        where: {
            orderId: order["id"]
        }
    })
    
    for (const order of orderItems) {
        order["special_price"] = ((order["price"] * (1 - order["discount"]/100)))
        order["total"] = order["special_price"] * order["quantity"]
        const tour = await Tour.findOne({
            raw: true,
            where: {
                id: order["tourId"],
                deleted: false
            }
        })
        order["title"] = tour["title"]
        order["slug"] = tour["slug"]
        order["image"] = JSON.parse(tour["images"])[0]
    }
    order["totalPrice"] = orderItems.reduce((sum, item) => sum +item["total"], 0)
    res.render("client/pages/order/success", {
        pageTitle: "Đặt hàng thành công",
        order: order,
        orderItems: orderItems
    })
}