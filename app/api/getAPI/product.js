export async function getAllProducts() {
    try {
        const response = await fetch(`http://localhost:3000/api/product/getAllProducts`, {
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

export async function getProductById(Product_Id) {
    try {
        const response = await fetch(`http://localhost:3000/api/product/getProductById`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({Product_Id}),
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

export async function getCartByProductId(Product_Id) {
    try {
        const response = await fetch(`http://localhost:3000/api/product/getCartByProductId`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({Product_Id}),
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

export async function updateProductStatusAndSaleId(product) {
    try {
        const response = await fetch(`http://localhost:3000/api/product/updateProductStatusAndSaleId`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
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

export async function getProductsBySearch(product) {
    try {
        const response = await fetch(`http://localhost:3000/api/product/getProductsBySearch`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
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
<<<<<<< HEAD

export async function addProduct(product_name) {
    try {
        const response = await fetch(`http://localhost:3000/api/product_name/addProduct`, {
=======
export async function addProduct(product) {
    try {
        const response = await fetch(`http://localhost:3000/api/product/addProduct`, {
>>>>>>> main
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
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

<<<<<<< HEAD
export async function editProductById(product_name) {
=======
export async function editProductById(product) {
>>>>>>> main
    try {
        const response = await fetch(`http://localhost:3000/api/product/editProductById`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
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