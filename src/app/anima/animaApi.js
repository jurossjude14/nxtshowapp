const globalurl = 'https://api.jikan.moe/v4/';


export const getAllshowing = async (req) => {
    try {
        const res = await fetch(`${globalurl}${req}`);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}