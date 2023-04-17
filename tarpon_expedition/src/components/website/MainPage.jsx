import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MainPageStyle.css";


export function MainPage() {
    const navigate = useNavigate();
    const handle = () =>{
        navigate('/',{});
    }
    return (
        <Fragment>
            <div className='banner'>
                <div class='navbar'>
                    <img src={require('./hostia.png')} class = 'logo'/>
                        <ul>
                            <li><a onClick={handle} style= {{color: '#fff'}}> Home </a></li>
                            <li><a href="#"> Tours </a></li>
                            <li><a href="#"> About </a></li>
                            <li><a href="#"> Contact </a></li>
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