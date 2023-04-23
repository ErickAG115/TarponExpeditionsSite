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
                        <label style={{fontFamily: 'lato', fontSize: '30px', fontWeight:'bold', marginBottom:'20px', marginTop:'20px'}}>Sign Up</label>
                        <div style={{height:'7%', width:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                            <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', left: '-117px'}}>First Name</label>
                            <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', left: '10px'}}>Last Name</label>
                        </div>
                        <div style={{height:'7%', width:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto',marginBottom:'20px'}}>
                            <input type="text" id="First Name" style={{ borderRadius: '5px', marginRight:'10px'}} />
                            <input type="text" id="Lasr Name" style={{ borderRadius: '5px', marginLeft:'10px'}} />
                        </div>
                        <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', left: '-147px'}}>Email Address</label>
                        <input type="text" id="Email" style={{height:'5%', borderRadius: '5px', width:'67.5%', marginBottom:'20px', position: 'relative'}} />
                        <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', left: '-153px'}}>Date of Birth</label>
                        <input type="date" id="Date of Birth" style={{height:'5%', borderRadius: '5px', width:'67.5%', marginBottom:'20px', position: 'relative'}} />
                        <div style={{height:'7%', width:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                            <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', left: '-93px'}}>Password</label>
                            <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative',left: '49px'}}>Confirm Password</label>
                        </div>
                        <div style={{height:'7%', width:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                            <input type="text" id="Password" style={{ borderRadius: '5px', marginRight:'11.5px'}} />
                            <input type="text" id="Confirm Password" style={{ borderRadius: '5px', marginLeft:'11.5px'}} />
                        </div>

                        <div style={{height:'20%', width:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                           <button style={{width:'30%', fontSize: '20px', fontFamily: 'lato', backgroundColor:'#24AFC1',color: 'white', border: 'none', borderRadius: '10px', marginRight:'10px'}}>Sign Up</button>
                           <button style={{width:'30%', fontSize: '20px', fontFamily: 'lato', backgroundColor:'#24AFC1',color: 'white', border: 'none', borderRadius: '10px', marginLeft:'10px'}}>Back</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}