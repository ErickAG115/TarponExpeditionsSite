import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login() {
    return (
        <Fragment>
            <div style={{backgroundColor: '#D2D7DB', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh',}}>
                <div style={{float: 'left', width: '50%', height:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <img src={require('./TarponLogo.png')} alt={'tarpon logo'} style={{height:'50%',width:'50%'}}/>
                </div>
                <div style={{float: 'right', width: '50%', height:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                    <div style={{backgroundColor: 'white', height:'80%', width:'80%', display: 'flex', flexDirection: 'column', overflow: 'auto', alignItems: 'center', justifyContent: 'center', borderRadius: '10px'}}>
                        <label style={{fontFamily: 'lato', fontSize: '30px', fontWeight:'bold', marginBottom:'40px'}}>Log In</label>

                        <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', left: '-80px'}}>Email Address</label>
                        <input type="text" id="Email" style={{ borderRadius: '5px', width:'45%', marginBottom:'20px'}} />

                        <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', left: '-100px'}}>Password</label>
                        <input type="text" id="Password" style={{ borderRadius: '5px', width:'45%'}} />
                        <button style={{color: 'blue', fontFamily: 'lato', fontSize: '15px', position: 'relative', left: '-85px', marginBottom:'20px', border: 'none'}}>Forgot Password?</button>

                        <div style={{height:'20%', width:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                            <button style={{width:'30%', fontSize: '20px', fontFamily: 'lato', backgroundColor:'#24AFC1',color: 'white', border: 'none', borderRadius: '10px', marginRight:'10px'}}>Log In</button>
                            <button style={{width:'30%', fontSize: '20px', fontFamily: 'lato', backgroundColor:'#24AFC1',color: 'white', border: 'none', borderRadius: '10px', marginLeft:'10px'}}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}