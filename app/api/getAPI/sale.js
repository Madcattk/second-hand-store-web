export async function addSaleByMemberId(sale) {
    try {
        const response = await fetch(`http://localhost:3000/api/sale/addSaleByMemberId`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(sale),
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