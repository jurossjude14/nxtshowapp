
'use client';

import { useState } from 'react';
import { Datacontext } from '../providers/UseContextProvider';
import Animefeed from "./components/animefeed"

const anima = () => {
  const [objdata, setObjdata] = useState([]);
  return (
    <>
    <Datacontext.Provider value={{ objdata,setObjdata}} > 
       <Animefeed />
    </Datacontext.Provider>
    </>
  )
}

export default anima


