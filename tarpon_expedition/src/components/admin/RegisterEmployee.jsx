import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export function RegisterEmployee() {
    return (
        <Fragment>
            <div style={{backgroundColor: '#D2D7DB', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh',}}>
            <div style={{float: 'right', width: '85%', height:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                    <div style={{backgroundColor: 'white', height:'80%', width:'60%', display: 'flex', flexDirection: 'column', overflow: 'auto', alignItems: 'center', justifyContent: 'center', borderRadius: '10px'}}>
                        <label style={{fontFamily: 'Rosario', fontSize: '30px', fontWeight:'bold', marginBottom:'20px', marginTop:'20px'}}>Employee Registration</label>
                        <div style={{height:'7%', width:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                            <label style={{fontFamily: 'Rosario', fontSize: '20px', position: 'relative', left: '-110px'}}>First Name</label>
                            <label style={{fontFamily: 'Rosario', fontSize: '20px', position: 'relative', left: '10px'}}>Last Name</label>
                        </div>
                        <div style={{height:'7%', width:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto',marginBottom:'20px'}}>
                            <input type="text" id="First Name" style={{ borderRadius: '5px', marginRight:'10px'}} />
                            <input type="text" id="Lasr Name" style={{ borderRadius: '5px', marginLeft:'10px'}} />
                        </div>
                        <label style={{fontFamily: 'Rosario', fontSize: '20px', position: 'relative', left: '-141px'}}>Email Address</label>
                        <input type="text" id="Email" style={{height:'7%', borderRadius: '5px', width:'61%', marginBottom:'20px', position: 'relative'}} />
                        <label style={{fontFamily: 'Rosario', fontSize: '20px', position: 'relative', left: '-147px'}}>Date of Birth</label>
                        <input type="date" id="Date of Birth" style={{height:'7%', borderRadius: '5px', width:'61%', marginBottom:'20px', position: 'relative'}} />
                        <div style={{height:'7%', width:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                            <label style={{fontFamily: 'Rosario', fontSize: '20px', position: 'relative', left: '-85px'}}>Password</label>
                            <label style={{fontFamily: 'Rosario', fontSize: '20px', position: 'relative',left: '47px'}}>Confirm Password</label>
                        </div>
                        <div style={{height:'7%', width:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                            <input type="text" id="Password" style={{ borderRadius: '5px', marginRight:'10px'}} />
                            <input type="text" id="Confirm Password" style={{ borderRadius: '5px', marginLeft:'10px'}} />
                        </div>

                        <div style={{height:'20%', width:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                           <button style={{width:'30%', fontSize: '20px', fontFamily: 'Rosario', backgroundColor:'#24AFC1',color: 'white', border: 'none', borderRadius: '10px', marginRight:'10px'}}>Register</button>
                           <button style={{width:'30%', fontSize: '20px', fontFamily: 'Rosario', backgroundColor:'#24AFC1',color: 'white', border: 'none', borderRadius: '10px', marginLeft:'10px'}}>Back</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}