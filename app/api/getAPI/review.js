export async function addReview(review) {
    try {
        const response = await fetch(`http://localhost:3000/api/review/addReview`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(review),
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