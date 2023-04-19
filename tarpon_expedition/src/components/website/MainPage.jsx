import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MainPageStyle.css";


export function MainPage() {
    const navigate = useNavigate();
    const handleHome = () =>{
        navigate('/',{});
    }

    const handleTour = () =>{
        navigate('/Tours',{});
    }

    const handleSignIn = () =>{
        navigate('/Register',{});
    }

    const handleMyAccount = () =>{
        // VALIDAR QUE LA SESIÓN ESTÉ INICIADA PARA PODER ENTRAR
        // CASO CONTRARIO QUE LO MANDE A INICIAR SESIÓN
        navigate('/ClientMenu',{});
    }

    return (
        <Fragment>
            <div className='banner'>
                <div class='navbar'>
                    <img src={require('./hostia.png')} class = 'logo'/>
                        <ul>
                            <li><a onClick={handleHome} style= {{color: '#fff'}}> Home </a></li>
                            <li><a onClick={handleTour} style= {{color: '#fff'}}> Tours </a></li>
                            <li><a href="#"> About </a></li>
                            <li><a href="#"> Contact </a></li>
                            <li><a onClick={handleSignIn} style= {{color: '#fff'}}> SIGN IN </a></li>
                            <li><a onClick={handleMyAccount} style= {{color: '#fff'}}>MY ACCOUNT</a></li>
                        </ul>
                </div>

                <div class='content'>
                    <h1 style={{fontSize: '76px'}}>Explore The Beauty of Fishing</h1>
                    <p style={{fontSize: '30px'}}>Book now any of our exciting Fishing Tours</p>
                    <div>
                        <button class='btn btn1'>BOOK NOW</button>
                    </div>
                </div>

            </div>  
        </Fragment>    
    )
}