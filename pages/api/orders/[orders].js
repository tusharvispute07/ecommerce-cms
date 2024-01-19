import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/order";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const orderId = req.query.orders; 
        const orderStatus = req.body.orderStatus;

        if (orderId && orderStatus) {
            try {
                mongooseConnect();
                await Order.findOneAndUpdate({ _id: orderId }, { order_status: orderStatus });

                return res.status(200).json({ message: "Order status updated successfully" });
            } catch (error) {
                console.error("Error updating order status:", error);
                return res.status(500).json({ message: "Internal Server Error" });
            }
        } else {
            return res.status(400).json({ message: "Invalid orderId or data" });
        }
    } else {
        return res.status(405).json({ message: "Method Not Allowed" });
    }
}