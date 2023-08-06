// src/utils/scheduleCutLot.js
import { cutLot } from "@app/api/getAPI/sale";

const scheduleCutLot = () => {
    setInterval(async () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();

        // console.log(hours, minutes);
    
        if (hours === 0 && minutes === 0) {
            try {
                const res = await cutLot(); // Call the cutLot function if it's midnight
                // console.log(res);
            } catch (error) {
                console.error("Error in cutLot:", error);
            }
        }
    }, 10000); // Check every 10 seconds
};

export default scheduleCutLot;
