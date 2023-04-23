import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export function ReservationCompanions() {
    return (
        <Fragment>
            <div style={{backgroundColor: '#D2D7DB', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh',}}>
                <div style={{float: 'right', width: '60%', height:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                    <div style={{backgroundColor: 'white', height:'80%', width:'80%', display: 'flex', flexDirection: 'column', overflow: 'auto', alignItems: 'center', justifyContent: 'center', borderRadius: '10px'}}>
                        <label style={{fontFamily: 'lato', fontSize: '30px', fontWeight:'bold', marginTop:'20px', marginBottom:'40px'}}>Adding Companions</label>
                        <div style={{height:'20%', width:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto', position: 'relative'}}>
                            <button style={{width:'6.5%', height:'40%', fontSize: '30px', fontFamily: 'lato', backgroundColor:'white', color: '#FF5B15', borderRadius: '100%', marginRight:'10px', position: 'relative', fontWeight:'bold'}}>-</button>
                            <label style={{width:'2.5%', height:'40%', fontFamily: 'lato', fontSize: '20px', position: 'relative', justifyContent: 'center', display: 'flex', alignItems: 'center'}}>0</label>
                            <button style={{width:'6.5%', height:'40%', fontSize: '30px', fontFamily: 'lato', backgroundColor:'white', color: '#24AFC1', borderRadius: '100%', marginLeft:'10px', position: 'relative', fontWeight:'bold'}}>+</button>
                            <div style={{height:'100%', width:'20%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto', position: 'relative', flexDirection: 'column'}}>
                                <label style={{fontFamily: 'lato', fontSize: '25px'}}>Adult</label>
                                <label style={{fontFamily: 'lato', fontSize: '20px'}}>$100 each</label>                            
                            </div>
                        </div>
                        <div style={{height:'20%', width:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto', position: 'relative'}}>
                            <button style={{width:'6.5%', height:'40%', fontSize: '30px', fontFamily: 'lato', backgroundColor:'white', color: '#FF5B15', borderRadius: '100%', marginRight:'10px', position: 'relative', fontWeight:'bold'}}>-</button>
                            <label style={{width:'2.5%', height:'40%', fontFamily: 'lato', fontSize: '20px', position: 'relative', justifyContent: 'center', display: 'flex', alignItems: 'center'}}>0</label>
                            <button style={{width:'6.5%', height:'40%', fontSize: '30px', fontFamily: 'lato', backgroundColor:'white', color: '#24AFC1', borderRadius: '100%', marginLeft:'10px', position: 'relative', fontWeight:'bold'}}>+</button>
                            <div style={{height:'100%', width:'20%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto', position: 'relative', flexDirection: 'column'}}>
                                <label style={{fontFamily: 'lato', fontSize: '25px'}}>Child</label>
                                <label style={{fontFamily: 'lato', fontSize: '20px'}}>$75 each</label>                            
                            </div>
                        </div>
                        <div style={{height:'20%', width:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto', position: 'relative'}}>
                            <button style={{width:'6.5%', height:'40%', fontSize: '30px', fontFamily: 'L', backgroundColor:'white', color: '#FF5B15', borderRadius: '100%', marginRight:'10px', position: 'relative', fontWeight:'bold'}}>-</button>
                            <label style={{width:'2.5%', height:'40%', fontFamily: 'lato', fontSize: '20px', position: 'relative', justifyContent: 'center', display: 'flex', alignItems: 'center'}}>0</label>
                            <button style={{width:'6.5%', height:'40%', fontSize: '30px', fontFamily: 'lato', backgroundColor:'white', color: '#24AFC1', borderRadius: '100%', marginLeft:'10px', position: 'relative', fontWeight:'bold'}}>+</button>
                            <div style={{height:'100%', width:'20%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto', position: 'relative', flexDirection: 'column'}}>
                                <label style={{fontFamily: 'lato', fontSize: '25px'}}>Senior</label>
                                <label style={{fontFamily: 'lato', fontSize: '20px'}}>$50 each</label>                            
                            </div>
                        </div>
                            
                        <div style={{height:'20%', width:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                           <button style={{width:'30%', height:'40%', fontSize: '25px', fontFamily: 'lato', backgroundColor:'#24AFC1',color: 'white', border: 'none', borderRadius: '10px', marginRight:'10px'}}>Back</button>
                           <button style={{width:'30%', height:'40%', fontSize: '25px', fontFamily: 'lato', backgroundColor:'#24AFC1',color: 'white', border: 'none', borderRadius: '10px', marginLeft:'10px'}}>Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}