import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../website/MainPageStyle.css";

export function ClientMenu() {
    const navigate = useNavigate();
    const handleBack = () =>{
        // VALIDAR QUE LA SESIÓN ESTÉ INICIADA PARA PODER ENTRAR
        // CASO CONTRARIO QUE LO MANDE A INICIAR SESIÓN
        navigate('/',{});
    }
    return (
        <Fragment>
            <div class='banner'>
                <button style={{background:'transparent',border:'none'}}>
                    <img onClick={handleBack} src={require('../website/icons8-go-back-64.png')} style={{padding:'5px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft:'20px'}}/>
                </button>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh',}}>
                    <div style={{float: 'right', width: '65%', height:'90%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                        <div style={{background: 'transparent', height:'80%', width:'80%', display: 'flex', flexDirection: 'column', overflow: 'auto', alignItems: 'center', justifyContent: 'center', borderRadius: '10px',backdropFilter: 'blur(15px)',border: '2px solid rgba(255,255,255,.5)',boxShadow: '0 0 30px rgba(0,0,0,.5)'}}>
                            <label style={{fontFamily: 'lato', fontSize: '40px', fontWeight:'bold', marginBottom:'60px', color:'#fff'}}>User Information</label>
                            <button style={{width:'27%', height:'10%', fontSize: '25px', fontFamily: 'lato', backgroundColor:'#24AFC1',color: 'white', border: 'none', borderRadius: '7px', marginBottom:'40px'}}>Check Reservations</button>
                            <button style={{width:'27%', height:'10%', fontSize: '25px', fontFamily: 'lato', backgroundColor:'#24AFC1',color: 'white', border: 'none', borderRadius: '7px', marginBottom:'20px'}}>Change Password</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}