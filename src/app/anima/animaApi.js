import { db } from "../providers/IndexedDbQuery";
const {animelist} = db;

const globalurl = process.env.NEXT_PUBLIC_ANIMA_URL;
export const getAllshowing = async (req) => {
    try {
        const res = await fetch(`${globalurl}${req}`);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}


export const addWatchdb = async (item) => {
    const { mal_id, title, images, episodes, aired, status, type } = item;
    const singleData = { mal_id, title, images, episodes, aired, status, type}
    await animelist.add({...singleData });
}


export const deleteWatch = async(id) => {
    animelist.delete(id)
}
