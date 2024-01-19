import axios from "axios"
import { useEffect, useState} from "react"
import { useRouter } from "next/router"
import Spinner from "./Spinner"
import {ReactSortable} from 'react-sortablejs'

export default function ProductForm({
    _id,
    title: existingTitle, 
    description: existingDescription, 
    price: existingPrice,
    images:existingImages,
    category: assignedCategory,
    properties: assignedProperties
}){
    
    const [title, setTitle] = useState(existingTitle ||'')
    const [description, setDescription] = useState(existingDescription ||'')
    const [category, setCategory] =  useState(assignedCategory || '')    
    const [price, setPrice] = useState(existingPrice ||'')
    const [images, setImages] = useState(existingImages || [])
    const [goToProducts, setGoToProducts] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [categories, setCategories] = useState([])
    const [properties, setProperties] = useState(assignedProperties || [])
    const router = useRouter()
    useEffect(()=>{
        axios.get('/api/categories').then(result =>{
            setCategories(result.data)
        })
    },[])

    async function saveProduct(event){
        event.preventDefault()
        console.log(properties)
        const data = {title, description, price, images, category,
            properties:properties.map(p => ({
                name:p.name, 
                values:p.values.split(',')}))
        }
        if (_id){
            await axios.put('/api/products',{...data, _id})
            setGoToProducts(true)
        }else{
            await axios.post('/api/products', data)
            setGoToProducts(true)
        }
        
    }
    if (goToProducts){
        router.push('/products')
    }
    async function uploadImages(ev){
        const files = ev.target?.files
        if (files.length>0){
            setIsUploading(true)
            const data = new FormData()
            for (const file of files){
                data.append('file',file)
            }
        const res = await axios.post('/api/upload', data)
        setImages(oldImages => {
            return [...oldImages, ...res.data.links]
        } )
        setIsUploading(false)
        }
    }

    function updateImagesOrder(images){
        setImages(images)
    }
    

    function addProperty(){
        setProperties(prev => {
            return [...prev, {name:'', values:''}]
        })
    }
    function handlePropertyNameChange(index,property,newName){
        setProperties(prev => {
            const properties = [...prev]
            properties[index].name = newName
            return properties
        })
    }
    function handlePropertyValuesChange(index,property,newValues){
        setProperties(prev => {
            const properties = [...prev]
            properties[index].values = newValues
            return properties
        })
    }
    function removeProperty(indexToRemove){
        setProperties(prev => {
            return [...prev].filter((p, pIndex)=>{
                return pIndex !== indexToRemove
            })
    
        })
    }

     return(
            <form onSubmit={saveProduct}>
                <label>Product Name</label>
                <input 
                type='text' 
                placeholder="Product Name" 
                value={title}
                onChange={event => setTitle(event.target.value)}/>
                
                <label>Category</label>
                <select value={category} onChange={ev => setCategory(ev.target.value)}>
                    <option value="">Uncategorized</option>
                    {categories.length>0 && categories.map(c => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                </select>
                
                <label>
                    Photos
                </label>
                <div className="mb-2 flex flex-wrap gap-1">
                    <ReactSortable
                     list={images}
                     className="flex flex-wrap gap-1"
                      setList={updateImagesOrder}>
                        {!!images?.length && images.map(link=>(
                            <div key={link} className="h-24 bg-white p-4 shadow-sm rounded-sm
                            border border-gray-200">
                            <img src={link} alt="product-image" className="rounded-lg "/>         
                            </div>  
                    ))}
                    </ReactSortable>

                    {isUploading && (
                        <div className="h-24 flex items-center">
                            <Spinner />
                        </div>
                    )}
                    <label className="w-24 h-24 text-center cursor-pointer
                    flex flex-col items-center justify-center text-sm gap-1
                    text-primary rounded-sm bg-white shadow-sm border border-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                        <div>Add Image</div>
                        <input type="file" onChange={uploadImages} className="hidden"/>
                    </label>

                </div>

                <div className="mb-2">
                        <label className="block">Properties (Optional)</label>
                        <button type="button" 
                        className="btn-default text-sm mb-2"
                        onClick={addProperty}
                        >Add new property</button>
                        {properties.length>0 && properties.map((property, index) => (
                            <div key={index} className="flex gap-1 mb-2">
                                <input className="mb-0" type="text" value={property.name}
                                onChange={ev=>handlePropertyNameChange(index,property,ev.target.value)}
                                 placeholder="property name (example: color)" />
                                <input className="mb-0" type="text" value={property.values}
                                onChange={ev=>handlePropertyValuesChange(index, property, ev.target.value)} 
                                placeholder="values, comma separated" />
                            <button 
                            onClick={()=>removeProperty(index)}
                            type="button"
                            className="btn-default">Remove</button>
                            </div>
                        ))}
                    </div>
                
                <label>Description</label>
                <textarea 
                placeholder="description" 
                value={description} 
                onChange={event => setDescription(event.target.value)}></textarea>

                <label>Price (in INR)</label>
                <input type='text' 
                placeholder="Price" 
                value={price} onChange={event => setPrice(event.target.value)} />
                <button type="submit" className="btn-primary">Save</button>
            </form>

    )
}

