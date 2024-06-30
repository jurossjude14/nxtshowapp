import { NextResponse } from "next/server";

export async function GET(request,{params}) {
    try {
        const id = params?.id;      
        const myHeaders = new Headers();
        myHeaders.append('x-apikey', process.env.NEXT_PUBLIC_RESTDB_API_KEY);
        myHeaders.append('Content-Type', 'application/json');

        const requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow',
        };
        const response = await fetch(`https://jurosleads-d86e.restdb.io/rest/leadsdb/${id}`, requestOptions);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        if (response.status === 200) {
          console.log('Sucessfully Fetched Data',result, response.status);
        }
        return NextResponse.json({ message:"Sucessfully Fetched Data", status:response.status, data:result});    
    } catch (error) {
      return NextResponse.json({ message:`${error}`});
    }
}