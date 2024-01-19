const { model, Schema, models } = require("mongoose");

const OrderSchema = new Schema({
    line_items: Object,
    name:String,
    city:String,
    pinCode:String,
    address:String,
    country:String,
    order_status:{type:String},
    paid:{type:Boolean}
}, {
    timestamps:true,
})

export const Order = models?.Order || model('Order', OrderSchema)