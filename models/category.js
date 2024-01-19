import { Schema, model, models } from "mongoose";
import mongoose from "mongoose";

const CategorySchema = new Schema({
    name: {type:String, required:true},
    parent: {type:  mongoose.Schema.Types.ObjectId, ref:'Category'},
    url: {type:String}
})

export const Category = models.Category || model('Category', CategorySchema)