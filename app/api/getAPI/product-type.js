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

export async function getProductTypesById(Product_Type_Id) {
    try {
        const response = await fetch(`http://localhost:3000/api/product_type/getProductTypesById`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({Product_Type_Id}),
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

export async function addProductTypes(product_type) {
    try {
        const response = await fetch(`http://localhost:3000/api/product_type/addProductTypes`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(product_type),
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

export async function deleteProductTypeById(Product_Type_Id) {
    try {
        const response = await fetch(`http://localhost:3000/api/product_type/deleteProductTypeById`, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({Product_Type_Id}),
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

export async function editProductTypesById(product_type) {
    try {
        const response = await fetch(`http://localhost:3000/api/product_type/editProductTypesById`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(product_type),
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