import { mongooseConnect } from "@/lib/mongoose"
import { Setting } from "@/models/setting"


export default async function handler(req, res){
    if (req.method === "GET"){
        await mongooseConnect()
        const settingsData = await Setting.getSingleton()
        return res.json(settingsData)
    }

    if (req.method === "POST") {
        const newSettings = req.body;
        console.log(req.body)
        if (newSettings) {
          try {
            await mongooseConnect();
            const settingsData = await Setting.getSingleton();
            settingsData.headerBanner = newSettings.headerImage;
            settingsData.salesBannerLeft = newSettings.salesBannerLeft;
            settingsData.salesBannerRight = newSettings.salesBannerRight;
      
            await settingsData.save();
      
            return res.status(200).json({ message: "Settings Updated Successfully" });
          } catch (error) {
            console.error("Error saving settings:", error);
            return res.status(500).json({ message: "Internal Server Error" });
          }
        } else {
          return res.status(400).json({ message: "Invalid request. Missing new settings data." });
        }
    }
}