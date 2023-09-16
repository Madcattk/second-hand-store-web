export async function loginEmployee(Employee_Email, Employee_Password) {
    try {
        const response = await fetch(`http://localhost:3000/api/employee/loginEmployee`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Employee_Email, Employee_Password }),
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

export async function getEmployeeById(Employee_Id) {
    try {
        const response = await fetch(`http://localhost:3000/api/employee/getEmployeeById`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({Employee_Id}),
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

export async function addEmployee(employee) {
    try {
        const response = await fetch(`http://localhost:3000/api/employee/addEmployee`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(employee),
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

export async function editEmployeeById(employee) {
    try {
        const response = await fetch(`http://localhost:3000/api/employee/editEmployeeById`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(employee),
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

export async function getEmployeeAddressesById(Employee_Id) {
    try {
        const response = await fetch(`http://localhost:3000/api/employee/getEmployeeAddressesById`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({Employee_Id}),
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
}

export async function deleteEmployeeAddressesById(Employee_Id, Employee_Address) {
    try {
        const response = await fetch(`http://localhost:3000/api/employee/deleteEmployeeAddressById`, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({Employee_Id, Employee_Address}),
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

export async function addEmployeeAddressById(employeeAddress) {
    try {
        const response = await fetch(`http://localhost:3000/api/employee/addEmployeeAddressById`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(employeeAddress),
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

export async function editEmployeeAddressById(employeeAddress) {
    try {
        const response = await fetch(`http://localhost:3000/api/employee/editEmployeeAddressById`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(employeeAddress),
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

export async function getAllEmployees() {
    try {
        const response = await fetch(`http://localhost:3000/api/employee/getAllEmployees`, {
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

export async function deleteEmployeeById(Employee_Id) {
    try {
        const response = await fetch(`http://localhost:3000/api/employee/deleteEmployeeById`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({Employee_Id}),
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