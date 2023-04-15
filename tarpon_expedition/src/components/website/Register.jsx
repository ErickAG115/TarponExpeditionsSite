import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Register() {
    return (
        <Fragment>
            <div style={{backgroundColor: '#D2D7DB', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh',}}>
                <div style={{float: 'left', width: '50%', height:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <img src={require('./TarponLogo.png')} alt={'tarpon logo'} style={{height:'50%',width:'50%'}}/>
                </div>
                <div style={{float: 'right', width: '50%', height:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                    <div style={{backgroundColor: 'white', height:'80%', width:'80%', display: 'flex', flexDirection: 'column', overflow: 'auto', alignItems: 'center', justifyContent: 'center', borderRadius: '10px'}}>
                        <label style={{fontFamily: 'Rosario', fontSize: '30px', fontWeight:'bold', marginBottom:'20px', marginTop:'20px'}}>Sign Up</label>
                        <div style={{height:'7%', width:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                            <label style={{fontFamily: 'Rosario', fontSize: '20px', position: 'relative', left: '-110px'}}>First Name</label>
                            <label style={{fontFamily: 'Rosario', fontSize: '20px', position: 'relative', left: '10px'}}>Last Name</label>
                        </div>
                        <div style={{height:'7%', width:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto',marginBottom:'20px'}}>
                            <input type="text" id="input1" style={{ borderRadius: '5px', marginRight:'10px'}} />
                            <input type="text" id="input2" style={{ borderRadius: '5px', marginLeft:'10px'}} />
                        </div>
                        <label style={{fontFamily: 'Rosario', fontSize: '20px', position: 'relative', left: '-141px'}}>Email Address</label>
                        <input type="text" id="input1" style={{borderRadius: '5px', width:'78%', marginBottom:'20px', position: 'relative'}} />
                        <label style={{fontFamily: 'Rosario', fontSize: '20px', position: 'relative', left: '-147px'}}>Date of Birth</label>
                        <input type="date" id="input1" style={{borderRadius: '5px', width:'78%', marginBottom:'20px', position: 'relative'}} />
                        <div style={{height:'7%', width:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                            <label style={{fontFamily: 'Rosario', fontSize: '20px', position: 'relative', left: '-85px'}}>Password</label>
                            <label style={{fontFamily: 'Rosario', fontSize: '20px', position: 'relative',left: '47px'}}>Confirm Password</label>
                        </div>
                        <div style={{height:'7%', width:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                            <input type="text" id="input1" style={{ borderRadius: '5px', marginRight:'10px'}} />
                            <input type="text" id="input2" style={{ borderRadius: '5px', marginLeft:'10px'}} />
                        </div>

                    <div style={{height:'20%', width:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                        <button style={{width:'30%', fontSize: '20px', fontFamily: 'Rosario', backgroundColor:'#24AFC1',color: 'white', border: 'none', borderRadius: '10px', marginRight:'10px'}}>Sign In</button>
                        <button style={{width:'30%', fontSize: '20px', fontFamily: 'Rosario', backgroundColor:'#24AFC1',color: 'white', border: 'none', borderRadius: '10px', marginLeft:'10px'}}>Sign Up</button>
                    </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}