export async function getPromotionByConditions(Sale_Total_Price) {
    try {
        const response = await fetch(`http://localhost:3000/api/promotion/getPromotionByConditions`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({Sale_Total_Price}),
        });
        if (response.ok) {
            return await response.json();
        } else {
            const errorData = await response.json();
            console.error(errorData);
        }
        } catch (error) {
            console.error(error);
        }
};