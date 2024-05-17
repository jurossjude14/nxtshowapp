
const globalurl = process.env.NEXT_PUBLIC_ANIMA_URL;


export const getAllshowing = async (req) => {
    try {
        const res = await fetch(`${globalurl}${req}`);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}
