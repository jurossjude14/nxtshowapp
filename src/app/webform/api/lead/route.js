

import { NextResponse } from "next/server";
import { senddata } from "../../components/mailaction";

export async function POST(request) {
    try {
        const body = await request.json();
        //console.log(body);
        senddata(body);
        return NextResponse.json({ message:"Sucessfully Added Data", status:200});
    } catch (error) {
        console.log(error);
    }
};


