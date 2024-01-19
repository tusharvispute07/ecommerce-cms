import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function OrdersPage(){

    const [orders, setOrders] = useState([])
    useEffect(() => {
        axios.get('/api/orders').then(response => {
            setOrders(response.data)
            console.log(orders)
        })
    },[handleOrderStatusChange])

    async function handleOrderStatusChange(id, value){
        const orderId = id
        const status = value
        try{
            response = await axios.post(`/api/orders/${orderId}`, {orderStatus:status})
        }catch(error){
            console.log("Error updating order status")
        }

    }

    return (
        <Layout>
            <h1>Orders</h1>
            <table className="basic"> 
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Payment Status</th>
                        <th>Recipient</th>
                        <th>Products</th>
                        <th>Order Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 && orders.map(order => (
                        <tr>
                            <td>{(new Date(order.createdAt)).toLocaleString()}</td>
                            <td className={order.paid?"text-green-700 bg-green-300" : "text-red-700 bg-red-300 border-r-2"}>
                                {order.paid ? 'Paid' : 'Unpaid'}
                            </td>
                            <td>
                                {order.name} <br />
                                {order.city} {order.pincode} 
                                {order.country} <br/>
                                {order.address}
                            </td>

                            <td>
                                {order.line_items.map(item =>(
                                    <>
                                        {item.price_data?.product_data?.name} X
                                        {item.quantity} <br/>
                                        
                                    </>
                                ))}
                            </td>
                            <td className="text-center flex flex-col items-center">
                                <select className="w-36 mt-3" value={order.order_status} onChange={(e) => handleOrderStatusChange(order._id, e.target.value)}>
                                    <option disabled>Set Status</option>
                                    <option value='confirm'>confirm ⌛</option>
                                    <option value='shipped'>shipped 🚚</option>
                                    <option value='delivered'>delivered ✅</option>
                                </select>
                                
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    )
}