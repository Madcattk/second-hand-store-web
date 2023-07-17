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