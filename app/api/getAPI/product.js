export async function getAllProducts(Limit) {
    try {
        const response = await fetch(`http://localhost:3000/api/product/getAllProducts`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({Limit}),
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

export async function getLatestProduct() {
    try {
        const response = await fetch(`http://localhost:3000/api/product/getLatestProduct`, {
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

export async function getImageFooter() {
    try {
        const response = await fetch(`http://localhost:3000/api/product/getImageFooter`, {
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

export async function addProduct(product) {
    try {
        const response = await fetch(`http://localhost:3000/api/product/addProduct`, {

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


export async function editProductById(product) {

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