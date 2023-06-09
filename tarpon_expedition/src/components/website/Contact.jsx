import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";


export function Contact() {
    const navigate = useNavigate();
    const location = useLocation();

    
    const pageNumber = 7;


    // Data from login
    const idUser = location?.state?.idUser;
    const email = location?.state?.email;
    const firstName = location?.state?.firstName;
    const lastName = location?.state?.lastName;
    console.log('Contact userData', idUser,email,firstName,lastName);


    const handleHome = () =>{
        navigate('/',{state:{idUser: idUser, email: email, firstName: firstName, lastName: lastName}});
    }

    const handleTour = () =>{
        navigate('/Tours',{state:{idUser: idUser, email: email, firstName: firstName, lastName: lastName}});
    }

    const handleAbout = () =>{
        navigate('/AboutUs',{state:{idUser: idUser, email: email, firstName: firstName, lastName: lastName}});
    }

    const handleLogin = () =>{
        if(idUser == undefined && email == undefined && firstName == undefined && lastName == undefined){
            navigate('/Login',{state:{pageNumber: pageNumber}});    
        }
        else{
            alert("You've already Login");
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

    return (
        <Fragment>
            <div style={{backgroundColor: '#D2D7DB', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto', height: '110vh', flexDirection: 'column'}}>
            <div class='navbarAbout'>
                    <img src={require('./logoNegro.png')} class = 'logo'/>
                            <ul>
                                <li><button onClick={handleHome}> Home </button></li>
                                <li><button onClick={handleTour}> Tours </button></li>
                                <li><button onClick={handleAbout}> About </button></li>
                                <li><button> Contact </button></li>
                                <li><button onClick={handleLogin}> LOGIN </button></li>
                                <li><button onClick={handleMyAccount}>MY ACCOUNT</button></li>
                            </ul>
                    </div>
            <h1 style={{fontFamily: 'Lato', fontSize: '40px', fontWeight:'bold', marginBottom:'20px'}}>Contact Information</h1>
            <div style={{width: '50%', height:'40%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom:'30px'}}>
                <div style={{float: 'left', width: '30%', height:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto',flexDirection: 'column', position: 'relative', left: '80px'}}>
                    <img src={require('./Phone Number.png')} alt={'company logo'} style={{height:'35%',width:'22%', borderRadius: '10px'}}/>
                    <img src={require('./Email.png')} alt={'company logo'} style={{height:'35%',width:'22%', borderRadius: '10px'}}/>
                </div>
                <div style={{float: 'right', width: '70%', height:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto', flexDirection: 'column', position: 'relative', left: '-40px'}}>
                    <label tabIndex='0' style={{fontFamily: 'Lato', fontSize: '25px', fontWeight:'bold', position: 'relative', left: '-50px', top: '-10px'}}>Contact number: +506 8435 7999</label>
                    <label tabIndex='0' style={{fontFamily: 'Lato', fontSize: '25px', fontWeight:'bold', position: 'relative', left: '-55px', top: '10px'}}>Email: jirodriguezx@gmail.com</label>
                </div>
                </div>
                <img tabIndex='0' src={require('./Facebook Link.png')} alt={'Facebook Link'} style={{height:'10%',width:'3%', borderRadius: '10px', marginBottom:'10px', position: 'relative', top:'-20px'}}/>
                <img tabIndex='0' src={require('./Location.PNG')} alt={'location'} style={{height:'55%',width:'35%', position: 'relative', top: '-20px'}}/>
            
            </div>
        </Fragment>
    )
}