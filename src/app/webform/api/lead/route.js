

import { NextResponse } from "next/server";
import { senddata } from "../../components/mailaction";

//const API_KEY = '68821227a4ba380f5f084c86869e66b7e35fd'; // Replace with your actual API key
//const API_URL = 'https://jurosleads-d86e.restdb.io/rest/leadsdb';

export async function POST(request) {
  try {
      const body = await request.json();
      const raw = JSON.stringify({...body});
      const myHeaders = new Headers();
            myHeaders.append('x-apikey', process.env.NEXT_PUBLIC_RESTDB_API_KEY);
            myHeaders.append('Content-Type', 'application/json');
    
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      const response = await fetch(process.env.NEXT_PUBLIC_RESTDB_API_URL, requestOptions);
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      if (response.status === 201) {
        senddata(body);
        console.log('Sucessfully Created Data',response.status);
      }
      return NextResponse.json({ message:"Sucessfully Added Data", status:response.status});
  } catch (error) {
      console.log(error);
  }
};

export async function GET(request) {
    try {   
        const myHeaders = new Headers();
        myHeaders.append('x-apikey', process.env.NEXT_PUBLIC_RESTDB_API_KEY);
        myHeaders.append('Content-Type', 'application/json');

        const requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        const response = await fetch(process.env.NEXT_PUBLIC_RESTDB_API_URL, requestOptions);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        if (response.status === 200) {
          console.log('Sucessfully Fetched All Data',result, response.status);
        }
        return NextResponse.json({ message:"Sucessfully Fetched All Data", status:response.status, data:result});    
    } catch (error) {
      return NextResponse.json({ message:`${error}`});
    }
};
