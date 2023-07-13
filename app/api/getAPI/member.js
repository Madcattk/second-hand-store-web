export async function getAllMembers() {
    try {
        const response = await fetch(`http://localhost:3000/api/member/getAllMembers`, {
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

export async function loginMember(Member_Email, Member_Password) {
    try {
        const response = await fetch(`http://localhost:3000/api/member/login`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Member_Email, Member_Password }),
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

export async function getMemberById(Member_Id) {
    try {
        const response = await fetch(`http://localhost:3000/api/member/getMemberById`, {
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

export async function addMember(member) {
    try {
        const response = await fetch(`http://localhost:3000/api/member/addMember`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(member),
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

export async function editMemberById(member) {
    console.log(member);
    try {
        const response = await fetch(`http://localhost:3000/api/member/editMemberById`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(member),
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

export async function getMemberAddressesById(Member_Id) {
    try {
        const response = await fetch(`http://localhost:3000/api/member/getMemberAddressesById`, {
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