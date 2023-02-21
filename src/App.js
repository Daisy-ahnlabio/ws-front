import React, { useEffect, useState } from 'react'
import axios from 'axios';
import DappTest from './DappTest';
// import Generator from './Generator';

function App() {
  const [token, setToken] = useState();
  useEffect(() => {
    const url = "http://10.16.43.78:8000/token/02A76430400AC3A783D945639344EBE1";
    axios.get(url,
      {
        headers: {
          User: "9CEE63743D57F0A63153D741E0425DD0",
        },
      }
    ).then(function (response) {
      // console.log('response ++ ', response.data.token);
      setToken(response.data.token)
    }).catch(function (error) {
      console.log("실패");
    })
  }, []);

  return (
    <>
      {/* <Generator /> */}
      {token && <DappTest value={token} />}
    </>
  )
}

export default App