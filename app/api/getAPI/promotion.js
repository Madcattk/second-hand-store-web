export async function getPromotionByConditions(promotion) {
    try {
        const response = await fetch(`http://localhost:3000/api/promotion/getPromotionByConditions`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(promotion),
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