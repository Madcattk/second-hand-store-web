export async function getAllProductTypes() {
    try {
        const response = await fetch(`http://localhost:3000/api/product_type/getAllProductTypes`, {
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