import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "@/components/productForm";

export default function EditProductPage(){
    
    const [productInfo, setProductInfo] = useState(null)

    const router = useRouter()
    const {id} = router.query
    useEffect(() => {
        if (!id){
            return
        }
        axios.get('/api/products?id='+id).then(response => {
            console.log("this is the response data: ",response.data)
            const data = response.data
            if (data.properties){
                for (const property of data.properties){
                    if (Array.isArray(property.values)){
                        property.values = property.values.join()
                    }
                }
                setProductInfo(data)
            }else{
                setProductInfo(response.data)
            }
        })
    }, [id])
    console.log({router})
    return (
        <Layout>
        <h1>Edit Product</h1>
        {productInfo ? (
            <ProductForm {...productInfo} />
      ) : (
        <p>Loading...</p>
      )}
        </Layout>
    )
}