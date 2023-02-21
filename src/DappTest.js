import React, { useEffect, useState, useRef } from "react";

import { v4 as uuidv4 } from 'uuid';
import WalletTest from './WalletTest';

const DappTest = (props) => {
    const uuid = uuidv4();
    const [socketConnected, setSocketConnected] = useState(false);
    // const [sendMsg, setSendMsg] = useState(false);
    const [sessionItems, SetSessionItems] = useState();
    const token = props.value;

    const webSocketUrl = `ws://10.16.43.78:8000/v1/ws/${uuid}?token=${token}`;
    let ws = useRef(null);

    // useEffect(() => {
    // if (!ws.current) {
    //     ws.current = new WebSocket(webSocketUrl);

    //     ws.current.onopen = () => {
    //         console.log("connected to " + webSocketUrl);
    //         setSocketConnected(true);
    //     };
    //     // ws.current.onclose = (error) => {
    //     //     console.log("disconnect from " + webSocketUrl);
    //     //     console.log(error);
    //     // };
    //     ws.current.onerror = (error) => {
    //         console.log("connection error " + webSocketUrl);
    //         console.log(error);
    //     };
    //     ws.current.onmessage = (res) => {
    //         console.log('res ++ ', res);
    //         const data = JSON.parse(res.data);
    //         console.log("Create Session ++  ", data.result);
    //         SetSessionItems((prevItems) => [...prevItems, data.result]);
    //     };
    // }
    // return () => {
    //     console.log("clean up");
    //     ws.current.close();
    // };
    // }, []);

    // 0. ws connect

    useEffect(() => {
        // init Session
        if (!ws.current) {
            ws.current = new WebSocket(webSocketUrl);
            ws.current.onopen = () => {
                console.log("connected to " + webSocketUrl);
                setSocketConnected(true);
            };
        }
    }, [])

    // 1.create session (Dapp → server)
    const CreateSession = () => {
        if (socketConnected) {
            ws.current.send(
                JSON.stringify({
                    "cmd": "create_session",
                    "type": "application",
                    "meta": {
                        "description": "ABC Example DAPP",
                        "icon": "data:image/png;base64,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",
                        "name": "ExampleDApp",
                        "url": "https://myabcwallet.io",
                        "chain_id": 1,
                        "rpc_url": "http://ethereum.net"
                    }
                })
            );
        }
    }

    // 2.send meta data (DAPP, QR, App URI)
    // 1번에서 받은 session_id를 지갑으로 전달한다. 

    // 3.create session (Wallet → server)
    // Success message: "A session has been created."

    // 4.notify connection (server → dapp)
    // Success message: "The wallet is connected."

    // 5.request (dapp → server)
    const requestDappToServer = () => {
        if (socketConnected) {
            ws.current.send(
                JSON.stringify({
                    "cmd": "request",
                    "type": "application",
                    "session_id": sessionItems,
                    "json_rpc": { "method": "eth_requestAccounts", "params": [] }
                })
            );
        }
    }
    // 6.notify request(server → wallet)
    // Success message : The Dapp makes a request to the wallet

    // 7.response(wallet → server)
    // Success message : The wallet sends a response to the dapp.

    // 8.notify response(server → dapp)
    // Success message : "The Dapp makes a request to the wallet."

    useEffect(() => {
        if (socketConnected) {
            ws.current.onmessage = (res) => {
                const data = JSON.parse(res.data);
                console.log("Server To Dapp Message ++ ", data.result);
                if (data.result.session_id) {
                    SetSessionItems(data.result.session_id);
                }
            }
        };
    })

    // 세션 종료
    const close = () => {
        if (socketConnected) {
            console.log("clean up");
            ws.current.close();
            setSocketConnected(false);
        }
    }

    let script3 = `
    {
        "cmd": "create_session",
        "type": "wallet",
        "session_id": "${sessionItems}"
    }`

    let script7 = `
    {
        "cmd": "response",
        "type": "wallet",
        "session_id": "${sessionItems}",
        "json_rpc": {"result_data":["0xD49C1C5B157A106Fee6FaB4E509754fB49B2651B"]}
    }`

    return (
        <div>
            <div style={{ width: "50%", float: "left", boxSizing: "border-box", }}>
                <h1> Dapp Test</h1>
                <h1>0. ws connect</h1>
                {/* <button onClick={() => initSession()}>Create Web Socket Url</button> */}
                <h3>connected : {`${socketConnected}`}</h3>

                <h1>1.create session (Dapp → server)</h1>
                <button onClick={() => CreateSession()}>Connection</button>
                <h4>{sessionItems}</h4>

                <h1 style={{ color: "#FF0000 " }}>3.create session (Wallet → server) </h1>
                <h4>wallet 에서 데이터 전송..</h4>
                <div>{script3}</div>
                <h4>성공시 메시지 -> "A session has been created."</h4>

                <h1>4.notify connection (server → dapp)</h1>
                <h4>성공시 메시지 -> "The wallet is connected."</h4>

                <h1>5.request (dapp → server)</h1>
                <button onClick={() => requestDappToServer()}>requestDappToServer</button>
                <h4>성공시 메시지 -> "Request received."</h4>

                <h1>6.notify request(server → wallet)</h1>
                <h4>성공시 메시지 -> "The Dapp makes a request to the wallet.",</h4>

                <h1 style={{ color: "#FF0000 " }}>7.response(wallet → server)</h1>
                <h4>wallet 에서 데이터 전송..</h4>
                <div>{script7}</div>
                <h4>성공시 메시지 -> "The wallet sends a response to the dapp."</h4>

                <h1>8.notify response(server → dapp)</h1>
                <h4>성공시 메시지 -> "The Dapp makes a request to the wallet."</h4>

                <h1>세션 종료</h1>
                <button onClick={() => close()}>close</button>
            </div>
            {<WalletTest value={sessionItems} token={token} style={{ width: "50%", float: "right", boxSizing: "border-box" }} />}
        </div>
    );
};

export default DappTest;