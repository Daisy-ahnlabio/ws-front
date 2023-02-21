import React, { useEffect, useState, useRef } from "react";

import { v4 as uuidv4 } from 'uuid';

const WalletTest = (props) => {
    const uuid = uuidv4();
    const [socketConnected, setSocketConnected] = useState(false);
    const sessionItems = props.value;
    const token = props.token;


    const webSocketUrl = `ws://10.16.43.78:8000/v1/ws/${uuid}?token=${token}`;
    let ws = useRef(null);

    // 0. ws connect
    useEffect(() => {
        if (!ws.current) {
            ws.current = new WebSocket(webSocketUrl);
            ws.current.onopen = () => {
                console.log(" wallet connected to " + webSocketUrl);
                setSocketConnected(true);
            };
        }
    }, []);

    // 3.create session (Wallet → server)
    const SessionSend = () => {
        if (socketConnected) {
            ws.current.send(
                JSON.stringify({
                    "cmd": "create_session",
                    "type": "wallet",
                    "session_id": sessionItems
                })
            );
        }
    }

    // 7.response(wallet → server)
    const responseWalletToServer = () => {
        // result_data에 임시로 지갑 주소 보냄
        if (socketConnected) {
            ws.current.send(
                JSON.stringify({
                    "cmd": "response",
                    "type": "wallet",
                    "session_id": sessionItems,
                    "json_rpc": { "result_data": ["0xD49C1C5B157A106Fee6FaB4E509754fB49B2651B"] }
                })
            );
        }
    }

    useEffect(() => {
        if (socketConnected) {
            ws.current.onmessage = (res) => {
                const data = JSON.parse(res.data);
                console.log("Server To Wallet Message ++  ", data.result);
            }
        };
    })

    // 세션 종료
    const close = () => {
        if (socketConnected) {
            console.log("clean up");
            ws.current.close();
        }
    }

    return (
        <div>
            <h1> Wallet Test</h1>
            <h1>0. ws connect</h1>
            {/* <button onClick={() => initSession()}>Create Web Socket Url</button> */}
            <h3>connected : {`${socketConnected}`}</h3>

            <h1>3.create session (Wallet → server) </h1>
            <button onClick={() => SessionSend()}>SessionSend</button>
            <h4>성공시 메시지 -> "A session has been created."</h4>

            <h1>7.response(wallet → server)</h1>
            <button onClick={() => responseWalletToServer()}>responseWalletToServer</button>
            <h4>성공시 메시지 -> "The wallet sends a response to the dapp."</h4>

            <h1>세션 종료</h1>
            <button onClick={() => close()}>close</button>

        </div>
    );
};

export default WalletTest;