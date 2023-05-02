import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./MainPageStyle.css";


export function MainPage() {

    const location = useLocation();
    const pageNumber = 1; 
    
    const navigate = useNavigate();

    // Data from login
    const idUser = location?.state?.idUser;
    const email = location?.state?.email;
    const firstName = location?.state?.firstName;
    const lastName = location?.state?.lastName;
    console.log('HomePage userData', idUser,email,firstName,lastName);

    
    const handleTour = () =>{
        navigate('/Tours',{state:{idUser: idUser, email: email, firstName: firstName, lastName: lastName}});
    }

    const handleAbout = () =>{
        navigate('/AboutUs',{state:{idUser: idUser, email: email, firstName: firstName, lastName: lastName}});
    }

    const handleContact = () =>{
        navigate('/Contact',{state:{idUser: idUser, email: email, firstName: firstName, lastName: lastName}});
    }

    const handleLogin = () =>{
        if(idUser == undefined && email == undefined && firstName == undefined && lastName == undefined){
            navigate('/Login',{state:{pageNumber: pageNumber}});    
        }
        else{
            alert("You've already Login")
        }
    }

    const handleMyAccount = () =>{
        // VALIDATE THAT THE USER HAS ALREADY LOGIN
        // ANY OTHER CASE, SEND HIM TO LOGIN
        if(idUser == undefined && email == undefined && firstName == undefined && lastName == undefined){
            navigate('/Login',{state:{pageNumber: pageNumber}});
        }
        else{
            navigate('/ClientMenu',{state:{pageNumber: pageNumber, idUser: idUser, email: email, firstName: firstName, lastName: lastName}});
        }
    }

    const handleBookNow = () =>{
        navigate('/Tours',{state:{idUser: idUser, email: email, firstName: firstName, lastName: lastName}});
    }

    return (
        <Fragment>
            <div className='banner'>
                <div class='navbar'>
                    <img src={require('./logoNegro.png')} class = 'logo'/>
                        <ul>
                            <li><button style= {{color: '#fff'}}> Home </button></li>
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