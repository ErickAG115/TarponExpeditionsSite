import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";


export function Contact() {
    const navigate = useNavigate();
    const location = useLocation();


    // Data from login
    const idUser = location?.state?.idUser;
    const email = location?.state?.email;
    const firstName = location?.state?.firstName;
    const lastName = location?.state?.lastName;
    console.log('Contact userData', idUser,email,firstName,lastName);


    const handleHome = () =>{
        navigate('/',{});
    }

    const handleTour = () =>{
        navigate('/Tours',{state:{idUser: idUser, email: email, firstName: firstName, lastName: lastName}});
    }
    return (
        <Fragment>
            <div style={{backgroundColor: '#D2D7DB', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto', height: '110vh', flexDirection: 'column'}}>
            <div class='navbarAbout'>
                    <img src={require('./logoNegro.png')} class = 'logo'/>
                            <ul>
                                <li><button onClick={handleHome}> Home </button></li>
                                <li><button onClick={handleTour}> Tours </button></li>
                                <li><button> About </button></li>
                                <li><button> Contact </button></li>
                                <li><button> LOGIN </button></li>
                                <li><button>MY ACCOUNT</button></li>
                            </ul>
                    </div>
            <label style={{fontFamily: 'Lato', fontSize: '40px', fontWeight:'bold', marginBottom:'20px'}}>Contact Information</label>
            <div style={{width: '50%', height:'40%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom:'30px'}}>
                <div style={{float: 'left', width: '30%', height:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto',flexDirection: 'column', position: 'relative', left: '80px'}}>
                    <img src={require('./Phone Number.png')} alt={'company logo'} style={{height:'35%',width:'22%', borderRadius: '10px'}}/>
                    <img src={require('./Email.png')} alt={'company logo'} style={{height:'35%',width:'22%', borderRadius: '10px'}}/>
                </div>
                <div style={{float: 'right', width: '70%', height:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto', flexDirection: 'column', position: 'relative', left: '-40px'}}>
                    <label style={{fontFamily: 'Lato', fontSize: '25px', fontWeight:'bold', position: 'relative', left: '-73px'}}>+506 8435 7999</label>
                    <label style={{fontFamily: 'Lato', fontSize: '25px', fontWeight:'bold', position: 'relative', left: '-20px'}}>jirodriguezx@gmail.com</label>
                </div>
                </div>
                <img src={require('./Facebook Link.png')} alt={'Facebook Link'} style={{height:'10%',width:'3%', borderRadius: '10px', marginBottom:'10px', position: 'relative', top:'-20px'}}/>
                <img src={require('./Location.PNG')} alt={'location'} style={{height:'55%',width:'35%', position: 'relative', top: '-20px'}}/>
            
            </div>
        </Fragment>
    )
}