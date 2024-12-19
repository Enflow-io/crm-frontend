import {NextPage} from "next";
import React from "react";
import Login from "../components/Login/Login";
import { NextPageWithLayout } from "./_app";


const LoginPage: NextPageWithLayout = () =>{
    return <div style={{
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        // maxWidth: 500,
        height: '100vh',
        width: '100vw',
        background: 'url(https://source.unsplash.com/1600x900/?building)'
    }}>
        <Login />
    </div>
}

LoginPage.public = true


export default LoginPage

