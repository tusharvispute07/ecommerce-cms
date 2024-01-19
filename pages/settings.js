import Layout from "@/components/Layout";
import { mongooseConnect } from "@/lib/mongoose";
import { Setting } from "@/models/setting";
import axios from "axios";
import { useEffect, useState } from "react";

export default function SettingsPage(){

    const [headerImage, setHeaderImage] = useState(null);
    const [salesBannerLeft, setSalesBannerLeft] = useState(null);
    const [salesBannerRight, setSalesBannerRight] = useState(null);
    const [isUploading, setIsUploading] = useState(false)


    useEffect(()=>{
        async function fetchData(){
            const response = await axios.get('/api/settings')
            const settingsData = response.data
            if (settingsData){
                setHeaderImage(settingsData.headerBanner)
                setSalesBannerLeft(settingsData.salesBannerLeft)
                setSalesBannerRight(settingsData.salesBannerRight)
            }
            return
        }
        fetchData()
    }, [])

    async function uploadImage(ev, inputName){
        const file = ev.target?.files[0]
        if (file){
            const data = new FormData()
            data.append("file",file)

            try{
                const response = await axios.post('/api/upload', data) 
                const imageUrl = response.data.links[0]

                switch (inputName) {
                    case "headerImage":
                        setHeaderImage(imageUrl)
                        break
                    case "salesBannerLeft":
                        setSalesBannerLeft(imageUrl)
                        break
                    case "salesBannerRight":
                        setSalesBannerRight(imageUrl)
                        break
                    default:
                        break
                }
            }catch(error){
                console.log("Error uploading the image", error)
            }
        }  
    }

    async function saveSettings(){
        try{
            const data = {
                headerImage:headerImage,
                salesBannerLeft:salesBannerLeft,
                salesBannerRight:salesBannerRight
            }
            console.log(data)
            const response = await axios.post('/api/settings', data )
            console.log("Settings saved successfully!")
        }catch(error){
            console.log("Error saving the settings", error)
        }
    }

    return (
        <Layout>
            <h1>Settings</h1>
            
            <div className="mb-5 max-w-sm">
            <h2 className="mb-3 font-bold text-gray-500">Header Banner:</h2>
            <div>
            <img className='mb-2 shadow-sm' src={headerImage} />
                <label className="p-2 text-center cursor-pointer
                        flex flex-row items-center justify-center text-sm gap-1
                        text-white rounded-md bg-gray-700 shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                        </svg>
                            <div>Add Image</div>
                            <input type="file" onChange={(ev)=>uploadImage(ev,"headerImage")}  className="hidden"/>
                </label>
            </div>
                
                
            </div>
            
            <div className="mb-5 max-w-sm">
                <h2 className="mb-3 font-bold text-gray-500">Sale's Banner:</h2>
                <div className="flex flex-row mt-5 ">
                
                <div className="mr-3 text-center">
                    <p className="mb-2 text-sm text-gray-500">Banner Left</p>
                    <img className='mb-2 shadow-sm' src={salesBannerLeft} />
                    <label className="p-2 text-center cursor-pointer mb-5
                        flex flex-row items-center justify-center text-sm gap-1
                        text-white rounded-md bg-gray-700 shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                        </svg>
                            <div>Add Image</div>
                            <input type="file" onChange={(ev)=>uploadImage(ev,"salesBannerLeft")}  className="hidden"/>
                </label>
                </div>
                  
                
                <div className="mr-3 text-center">
                    <p className="mb-2 text-sm text-gray-500">Banner Right</p>
                    <img className='mb-2 shadow-sm' src={salesBannerRight} /> 
                    <label className="p-2 text-center cursor-pointer mb-5
                            flex flex-row items-center justify-center text-sm gap-1
                            text-white rounded-md bg-gray-700 shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                            </svg>
                                <div>Add Image</div>
                                <input type="file" onChange={(ev)=>uploadImage(ev,"salesBannerRight")}  className="hidden"/>
                    </label> 
                </div>
                </div>
                
                
                
            </div>

            <button className="btn-primary mt-5" onClick={saveSettings}>Save</button>
            

        </Layout>
    )
}