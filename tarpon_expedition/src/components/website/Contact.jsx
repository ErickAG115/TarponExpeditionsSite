import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Contact() {
    return (
        <Fragment>
            <div style={{backgroundColor: '#D2D7DB', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto', height: '100vh', flexDirection: 'column'}}>
            <label style={{fontFamily: 'Lato', fontSize: '40px', fontWeight:'bold', marginBottom:'20px'}}>Contact Information</label>
            <div style={{width: '50%', height:'40%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom:'30px'}}>
                <div style={{float: 'left', width: '30%', height:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto',flexDirection: 'column', position: 'relative', left: '80px'}}>
                    <img src={require('./Phone Number.png')} alt={'company logo'} style={{height:'35%',width:'20%', borderRadius: '10px'}}/>
                    <img src={require('./Email.png')} alt={'company logo'} style={{height:'35%',width:'20%', borderRadius: '10px'}}/>
                </div>
                <div style={{float: 'right', width: '70%', height:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto', flexDirection: 'column', position: 'relative', left: '-40px'}}>
                    <label style={{fontFamily: 'Lato', fontSize: '25px', fontWeight:'bold', position: 'relative', left: '-100px'}}>8435 7999</label>
                    <label style={{fontFamily: 'Lato', fontSize: '25px', fontWeight:'bold', position: 'relative', left: '-20px'}}>jirodriguezx@gmail.com</label>
                </div>
                </div>
                <img src={require('./Facebook Link.png')} alt={'Facebook Link'} style={{height:'12%',width:'4%', borderRadius: '10px', marginBottom:'10px'}}/>
                <img src={require('./Location.PNG')} alt={'location'} style={{height:'55%',width:'35%'}}/>
            </div>
        </Fragment>
    )
}