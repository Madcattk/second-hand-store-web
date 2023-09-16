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

export async function getPromotionById(Promotion_Id) {
    try {
        const response = await fetch(`http://localhost:3000/api/promotion/getPromotionById`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Promotion_Id }),
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

export async function addPromotion(promotion) {
    try {
        const response = await fetch(`http://localhost:3000/api/promotion/addPromotion`, {
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

export async function editPromotionById(promotion) {
    try {
        const response = await fetch(`http://localhost:3000/api/promotion/editPromotionById`, {
            method: 'PUT',
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

export async function deletePromotionById(Promotion_Id) {
    try {
        const response = await fetch(`http://localhost:3000/api/promotion/deletePromotionById`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Promotion_Id }),
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

export async function getAllPromotions() {
    try {
        const response = await fetch(`http://localhost:3000/api/promotion/getAllPromotions`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
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