import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export function ClientMenu() {
    return (
        <Fragment>
            <div style={{backgroundColor: '#D2D7DB', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh',}}>
                <div style={{float: 'right', width: '85%', height:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                    <div style={{backgroundColor: 'white', height:'80%', width:'80%', display: 'flex', flexDirection: 'column', overflow: 'auto', alignItems: 'center', justifyContent: 'center', borderRadius: '10px'}}>
                        <label style={{fontFamily: 'Rosario', fontSize: '40px', fontWeight:'bold', marginBottom:'60px'}}>User Information</label>
                        <button style={{width:'35%', height:'15%', fontSize: '30px', fontFamily: 'Rosario', backgroundColor:'#24AFC1',color: 'white', border: 'none', borderRadius: '20px', marginBottom:'40px'}}>Check Reservations</button>
                        <button style={{width:'35%', height:'15%', fontSize: '30px', fontFamily: 'Rosario', backgroundColor:'#24AFC1',color: 'white', border: 'none', borderRadius: '20px', marginBottom:'20px'}}>Change Password</button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}