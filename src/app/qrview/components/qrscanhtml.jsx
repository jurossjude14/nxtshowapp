import { Html5QrcodeScanner } from "html5-qrcode"
import { useState, useEffect } from "react";

const Qrscanhtml = () => {
  const [scanResult, setScanresult] = useState(null);


  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox:{
        width:250,
        height:250,
      },
      fps:5,
    });

    scanner.render(success, error);
  
    function success(result) {
      scanner.clear();
      setScanresult(result);
    }
  
    function error(err) {
      console.log(err);
    }
  },[]);

  return (
    <div>
      { scanResult ? 
      <div>
          <a href={scanResult} className="redirect-preview" target="_blank">
            Click Here: 
            <span>{scanResult}</span>
          </a>
      </div>:
          <div id="reader"></div>
      }
    </div>
  )
}

export default Qrscanhtml
