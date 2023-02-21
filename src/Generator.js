import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

function Generator() {

    const [token, setToken] = useState();
    const uuid = uuidv4();

    useEffect(() => {
        const url = "http://10.16.43.78:8000/token/02A76430400AC3A783D945639344EBE1";
        axios.get(url,
            {
                headers: {
                    User: "9CEE63743D57F0A63153D741E0425DD0",
                },
            }
        ).then(function (response) {
            console.log('response ++ ', response.data.token);
            setToken(response.data.token)
        }).catch(function (error) {
            console.log("실패");
        })
    }, []);

    return (
        <>
            <h1>임시 월렛용 Generator</h1>
            <p style={{ whiteSpace: "nowrap" }}>token : {token}</p>
            <p>uuid : {uuid}</p>
            <hr />
        </>
    )
}

export default Generator