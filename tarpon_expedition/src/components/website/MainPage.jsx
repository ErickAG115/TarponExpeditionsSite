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

    const handleAbout = () =>{
        navigate('/AboutUs',{});
    }

    const handleContact = () =>{
        navigate('/Contact',{});
    }

    const handleLogin = () =>{
        navigate('/Login',{});
    }

    const handleMyAccount = () =>{
        // VALIDAR QUE LA SESIÓN ESTÉ INICIADA PARA PODER ENTRAR
        // CASO CONTRARIO QUE LO MANDE A INICIAR SESIÓN
        navigate('/ClientMenu',{});
    }

    const handleBookNow = () =>{
        // VALIDAR QUE LA SESIÓN ESTÉ INICIADA PARA PODER ENTRAR
        // CASO CONTRARIO QUE LO MANDE A INICIAR SESIÓN
        navigate('/Tours',{});
    }

    return (
        <Fragment>
            <div className='banner'>
                <div class='navbar'>
                    <img src={require('./logoNegro.png')} class = 'logo'/>
                        <ul>
                            <li><button onClick={handleHome} style= {{color: '#fff'}}> Home </button></li>
                            <li><button onClick={handleTour} style= {{color: '#fff'}}> Tours </button></li>
                            <li><button onClick={handleAbout} style= {{color: '#fff'}}> About </button></li>
                            <li><button onClick={handleContact} style= {{color: '#fff'}}> Contact </button></li>
                            <li><button onClick={handleLogin} style= {{color: '#fff'}}> LOGIN </button></li>
                            <li><button onClick={handleMyAccount} style= {{color: '#fff'}}>MY ACCOUNT</button></li>
                        </ul>
                </div>

                <div class='content'>
                    <h1 style={{fontSize: '76px'}}>Explore The Beauty of Fishing</h1>
                    <p style={{fontSize: '30px'}}>Book now any of our exciting Fishing Tours</p>
                    <div>
                        <button onClick={handleBookNow} class='btn btn1'>BOOK NOW</button>
                    </div>
                </div>

            </div>  
        </Fragment>    
    )
}