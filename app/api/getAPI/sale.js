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

export async function getMemberOrdersById(Member_Id) {
    try {
        const response = await fetch(`http://localhost:3000/api/sale/getMemberOrdersById`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({Member_Id}),
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

export async function getSaleById(Sale_Id) {
    try {
        const response = await fetch(`http://localhost:3000/api/sale/getSaleById`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({Sale_Id}),
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

export async function updateSaleStatusById(sale) {
    try {
        const response = await fetch(`http://localhost:3000/api/sale/updateSaleStatusById`, {
            method: 'PUT',
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

export async function getBestSellerProductReport(date) {
    try {
        const response = await fetch(`http://localhost:3000/api/sale/getBestSellerProductReport`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(date),
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

export async function cutLot() {
    try {
        const response = await fetch(`http://localhost:3000/api/sale/cutLot`, {
            method: 'PUT',
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
