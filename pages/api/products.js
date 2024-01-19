import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";
import { isAdminRequest } from "./auth/[...nextauth]"

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  await isAdminRequest(req, res)

  try {
    if (method === 'GET') {
      if (req.query?.id) {
        res.json(await Product.findOne({ _id: req.query.id }));
      } else {
        res.json(await Product.find());
      }
    } else if (method === 'POST') {
      const { title, description, price, images, category, properties } = req.body;
      const productDoc = await Product.create({ title, description, price, images,category,properties });
      res.status(201).json(productDoc);

    }else if(method=='PUT'){
        const {title, description, price, images,category, properties, _id} = req.body
        await Product.updateOne({_id}, {title, description, price, images, category, properties}) 
        res.status(200).json(true)
    }else if(method=='DELETE'){
        if (req.query?.id){
            await Product.deleteOne({_id:req.query?.id})
            res.status(200).json(true)
        }
    }
    else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error in /api/products:", error);
    res.status(500).json({ error: "Internal Server Error" });
    
  }
}