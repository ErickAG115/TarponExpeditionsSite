import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AboutUsStyle.css";


export function AboutUs() {
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
    return (
        <Fragment>
                <div style={{backgroundColor: '#D2D7DB', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto', height: '120vh', flexDirection: 'column'}}>
                    
                    <div class='navbarAbout'>
                    <img src={require('./logoNegro.png')} class = 'logo'/>
                            <ul>
                                <li><button onClick={handleHome}> Home </button></li>
                                <li><button onClick={handleTour}> Tours </button></li>
                                <li><button onClick={handleAbout}> About </button></li>
                                <li><button onClick={handleContact}> Contact </button></li>
                                <li><button onClick={handleLogin}> LOGIN </button></li>
                                <li><button onClick={handleMyAccount}>MY ACCOUNT</button></li>
                            </ul>
                    </div>


                    <div style={{width: '50%', height:'40%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <div style={{float: 'left', width: '50%', height:'120%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto', marginRight:'10px'}}>
                            <img src={require('./Company Logo.jpg')} alt={'company logo'} style={{height:'60%',width:'100%', borderRadius: '10px'}}/>
                        </div>
                        <div style={{float: 'right', width: '50%', height:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto', marginLeft:'10px', marginTop:'15px'}}>
                            <p style={{fontFamily:'lato'}}>In Tarpon Expedition, we believe in sustainable fishing practices that preserve the delicate ecosystem of the Caribbean coast. Our skilled guides will take you out to the best fishing spots in the area, where you can catch a variety of fish, including snapper, marlin, and tuna. We provide all the necessary equipment, including rods, reels, bait, and tackle.</p>
                        </div>
                    </div>
                    <label style={{fontFamily: 'lato', fontSize: '30px', fontWeight:'bold', position: 'relative', left: '-290px'}}>Team</label>
                    <div style={{width: '50%', height:'20%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <img src={require('./Team Member 1.jpg')} alt={'company logo'} style={{height:'110%',width:'80%', borderRadius: '10px', marginRight:'10px'}}/>
                        <img src={require('./Team Member 2.jpg')} alt={'company logo'} style={{height:'110%',width:'80%', borderRadius: '10px'}}/>
                        <img src={require('./Team Member 3.jpg')} alt={'company logo'} style={{height:'110%',width:'80%', borderRadius: '10px', marginLeft:'10px'}}/>
                    </div>
                    <label style={{fontFamily: 'lato', fontSize: '30px', fontWeight:'bold', position: 'relative', left: '-250px'}}>Equipment</label>
                    <div style={{width: '50%', height:'20%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <img src={require('./Boats.jpg')} alt={'company logo'} style={{height:'100%',width:'80%', borderRadius: '10px', marginRight:'10px'}}/>
                        <img src={require('./Fishing Lures.jpg')} alt={'company logo'} style={{height:'100%',width:'80%', borderRadius: '10px'}}/>
                        <img src={require('./Fishing Rods.jpg')} alt={'company logo'} style={{height:'100%',width:'80%', borderRadius: '10px', marginLeft:'10px'}}/>
                    </div>
                    <div>
                        <br />
                    </div>
                </div>
           
        </Fragment>
    )
}